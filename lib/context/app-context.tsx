"use client"

import { createContext, useContext, useReducer, type ReactNode, useCallback } from "react"
import type {
  Patient,
  Doctor,
  Nurse,
  Bed,
  Appointment,
  AdmissionRequest,
  Notification,
  QueueEntry,
  Priority,
  TokenStatus,
  Ward,
  BedStatus,
} from "@/lib/types"
import {
  mockPatients,
  mockDoctors,
  mockNurses,
  mockBeds,
  mockAppointments,
  mockAdmissionRequests,
  mockNotifications,
  mockQueue,
} from "@/lib/mock-data"

interface AppState {
  patients: Patient[]
  doctors: Doctor[]
  nurses: Nurse[]
  beds: Bed[]
  appointments: Appointment[]
  admissionRequests: AdmissionRequest[]
  notifications: Notification[]
  queue: QueueEntry[]
  nextTokenNumber: number
}

type AppAction =
  | { type: "UPDATE_PATIENT_STATUS"; payload: { patientId: string; status: TokenStatus } }
  | { type: "UPDATE_PATIENT_PRIORITY"; payload: { patientId: string; priority: Priority } }
  | { type: "EMERGENCY_OVERRIDE"; payload: { patientId: string } }
  | { type: "UPDATE_BED_STATUS"; payload: { bedId: string; status: BedStatus; patientId?: string; patientName?: string } }
  | { type: "ADD_ADMISSION_REQUEST"; payload: AdmissionRequest }
  | { type: "RESOLVE_ADMISSION_REQUEST"; payload: { requestId: string; status: "approved" | "rejected" } }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "MARK_ALL_NOTIFICATIONS_READ" }
  | { type: "ADD_PATIENT"; payload: Patient }
  | { type: "ADD_APPOINTMENT"; payload: Appointment }
  | { type: "ADVANCE_QUEUE" }
  | { type: "GENERATE_TOKEN"; payload: { patient: Patient } }

const initialState: AppState = {
  patients: mockPatients,
  doctors: mockDoctors,
  nurses: mockNurses,
  beds: mockBeds,
  appointments: mockAppointments,
  admissionRequests: mockAdmissionRequests,
  notifications: mockNotifications,
  queue: mockQueue,
  nextTokenNumber: 111,
}

function recalculateQueue(patients: Patient[]): QueueEntry[] {
  return patients
    .filter((p) => p.status !== "completed" && p.status !== "cancelled")
    .map((p) => ({
      tokenNumber: p.tokenNumber,
      patientId: p.id,
      patientName: p.name,
      priority: p.priority,
      status: p.status,
      ward: p.ward,
      estimatedWaitTime: p.estimatedWaitTime,
      arrivalTime: p.arrivalTime,
      assignedDoctorId: p.assignedDoctorId,
    }))
    .sort((a, b) => {
      const priorityOrder = { critical: 0, severe: 1, moderate: 2, mild: 3 }
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      return new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime()
    })
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "UPDATE_PATIENT_STATUS": {
      const patients = state.patients.map((p) =>
        p.id === action.payload.patientId ? { ...p, status: action.payload.status } : p
      )
      return { ...state, patients, queue: recalculateQueue(patients) }
    }

    case "UPDATE_PATIENT_PRIORITY": {
      const patients = state.patients.map((p) =>
        p.id === action.payload.patientId ? { ...p, priority: action.payload.priority } : p
      )
      return { ...state, patients, queue: recalculateQueue(patients) }
    }

    case "EMERGENCY_OVERRIDE": {
      const patients = state.patients.map((p) =>
        p.id === action.payload.patientId
          ? { ...p, priority: "critical" as Priority, queuePosition: 1, estimatedWaitTime: 0 }
          : p
      )
      const notification: Notification = {
        id: `n${Date.now()}`,
        type: "critical",
        title: "Emergency Override",
        message: `Patient ${patients.find((p) => p.id === action.payload.patientId)?.name} escalated to Critical`,
        timestamp: new Date().toISOString(),
        read: false,
      }
      return {
        ...state,
        patients,
        queue: recalculateQueue(patients),
        notifications: [notification, ...state.notifications],
      }
    }

    case "UPDATE_BED_STATUS": {
      const beds = state.beds.map((b) =>
        b.id === action.payload.bedId
          ? { ...b, status: action.payload.status, patientId: action.payload.patientId, patientName: action.payload.patientName }
          : b
      )
      return { ...state, beds }
    }

    case "ADD_ADMISSION_REQUEST":
      return {
        ...state,
        admissionRequests: [action.payload, ...state.admissionRequests],
        notifications: [
          {
            id: `n${Date.now()}`,
            type: "warning",
            title: "New Admission Request",
            message: `${action.payload.doctorName} requested admission for ${action.payload.patientName}`,
            timestamp: new Date().toISOString(),
            read: false,
            targetRole: "admin",
          },
          ...state.notifications,
        ],
      }

    case "RESOLVE_ADMISSION_REQUEST": {
      const admissionRequests = state.admissionRequests.map((r) =>
        r.id === action.payload.requestId ? { ...r, status: action.payload.status } : r
      )
      return { ...state, admissionRequests }
    }

    case "ADD_NOTIFICATION":
      return { ...state, notifications: [action.payload, ...state.notifications] }

    case "MARK_NOTIFICATION_READ": {
      const notifications = state.notifications.map((n) =>
        n.id === action.payload ? { ...n, read: true } : n
      )
      return { ...state, notifications }
    }

    case "MARK_ALL_NOTIFICATIONS_READ": {
      const notifications = state.notifications.map((n) => ({ ...n, read: true }))
      return { ...state, notifications }
    }

    case "ADD_PATIENT": {
      const patients = [...state.patients, action.payload]
      return { ...state, patients, queue: recalculateQueue(patients) }
    }

    case "ADD_APPOINTMENT":
      return { ...state, appointments: [...state.appointments, action.payload] }

    case "ADVANCE_QUEUE": {
      const patients = state.patients.map((p) => {
        if (p.status === "in-queue" && p.estimatedWaitTime > 0) {
          return { ...p, estimatedWaitTime: Math.max(0, p.estimatedWaitTime - 5) }
        }
        return p
      })
      return { ...state, patients, queue: recalculateQueue(patients) }
    }

    case "GENERATE_TOKEN": {
      const patient = { ...action.payload, tokenNumber: state.nextTokenNumber }
      const patients = [...state.patients, patient]
      return {
        ...state,
        patients,
        queue: recalculateQueue(patients),
        nextTokenNumber: state.nextTokenNumber + 1,
      }
    }

    default:
      return state
  }
}

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  updatePatientStatus: (patientId: string, status: TokenStatus) => void
  updatePatientPriority: (patientId: string, priority: Priority) => void
  emergencyOverride: (patientId: string) => void
  updateBedStatus: (bedId: string, status: BedStatus, patientId?: string, patientName?: string) => void
  addAdmissionRequest: (request: AdmissionRequest) => void
  resolveAdmissionRequest: (requestId: string, status: "approved" | "rejected") => void
  addNotification: (notification: Notification) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  addAppointment: (appointment: Appointment) => void
  generateToken: (patient: Patient) => void
  getPatientsByWard: (ward: Ward) => Patient[]
  getBedsByWard: (ward: Ward) => Bed[]
  getUnreadNotificationCount: () => number
  getDoctorById: (id: string) => Doctor | undefined
  getPatientById: (id: string) => Patient | undefined
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const updatePatientStatus = useCallback((patientId: string, status: TokenStatus) => {
    dispatch({ type: "UPDATE_PATIENT_STATUS", payload: { patientId, status } })
  }, [])

  const updatePatientPriority = useCallback((patientId: string, priority: Priority) => {
    dispatch({ type: "UPDATE_PATIENT_PRIORITY", payload: { patientId, priority } })
  }, [])

  const emergencyOverride = useCallback((patientId: string) => {
    dispatch({ type: "EMERGENCY_OVERRIDE", payload: { patientId } })
  }, [])

  const updateBedStatus = useCallback((bedId: string, status: BedStatus, patientId?: string, patientName?: string) => {
    dispatch({ type: "UPDATE_BED_STATUS", payload: { bedId, status, patientId, patientName } })
  }, [])

  const addAdmissionRequest = useCallback((request: AdmissionRequest) => {
    dispatch({ type: "ADD_ADMISSION_REQUEST", payload: request })
  }, [])

  const resolveAdmissionRequest = useCallback((requestId: string, status: "approved" | "rejected") => {
    dispatch({ type: "RESOLVE_ADMISSION_REQUEST", payload: { requestId, status } })
  }, [])

  const addNotification = useCallback((notification: Notification) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: notification })
  }, [])

  const markNotificationRead = useCallback((id: string) => {
    dispatch({ type: "MARK_NOTIFICATION_READ", payload: id })
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    dispatch({ type: "MARK_ALL_NOTIFICATIONS_READ" })
  }, [])

  const addAppointment = useCallback((appointment: Appointment) => {
    dispatch({ type: "ADD_APPOINTMENT", payload: appointment })
  }, [])

  const generateToken = useCallback((patient: Patient) => {
    dispatch({ type: "GENERATE_TOKEN", payload: { patient } })
  }, [])

  const getPatientsByWard = useCallback((ward: Ward) => {
    return state.patients.filter((p) => p.ward === ward)
  }, [state.patients])

  const getBedsByWard = useCallback((ward: Ward) => {
    return state.beds.filter((b) => b.ward === ward)
  }, [state.beds])

  const getUnreadNotificationCount = useCallback(() => {
    return state.notifications.filter((n) => !n.read).length
  }, [state.notifications])

  const getDoctorById = useCallback((id: string) => {
    return state.doctors.find((d) => d.id === id)
  }, [state.doctors])

  const getPatientById = useCallback((id: string) => {
    return state.patients.find((p) => p.id === id)
  }, [state.patients])

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        updatePatientStatus,
        updatePatientPriority,
        emergencyOverride,
        updateBedStatus,
        addAdmissionRequest,
        resolveAdmissionRequest,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        addAppointment,
        generateToken,
        getPatientsByWard,
        getBedsByWard,
        getUnreadNotificationCount,
        getDoctorById,
        getPatientById,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within an AppProvider")
  return context
}
