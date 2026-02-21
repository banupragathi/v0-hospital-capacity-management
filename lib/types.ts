export type UserRole = "patient" | "nurse" | "doctor" | "admin"

export type Priority = "mild" | "moderate" | "severe" | "critical"

export type TokenStatus =
  | "in-queue"
  | "with-doctor"
  | "in-consultation"
  | "completed"
  | "admitted"
  | "cancelled"

export type BedStatus = "available" | "occupied" | "reserved" | "maintenance"

export type Ward = "general" | "icu" | "emergency" | "pediatric" | "maternity"

export interface User {
  id: string
  name: string
  email?: string
  phone: string
  role: UserRole
  avatar?: string
}

export interface Patient {
  id: string
  name: string
  age: number
  phone: string
  gender: "male" | "female" | "other"
  bloodType?: string
  symptoms: string[]
  selfAssessedSeverity: Priority
  priority: Priority
  ward: Ward
  preferredLanguage: string
  tokenNumber: number
  queuePosition: number
  status: TokenStatus
  estimatedWaitTime: number // minutes
  assignedDoctorId?: string
  assignedBedId?: string
  arrivalTime: string
  visitType: "general" | "emergency"
  previousVisits: PreviousVisit[]
  notes?: string
}

export interface PreviousVisit {
  date: string
  doctorName: string
  diagnosis: string
  ward: Ward
  notes: string
}

export interface Doctor {
  id: string
  name: string
  specialization: string
  ward: Ward
  phone: string
  avatar?: string
  isAvailable: boolean
  currentPatientId?: string
  patientsToday: number
  availableSlots: TimeSlot[]
}

export interface TimeSlot {
  id: string
  time: string
  isBooked: boolean
  patientId?: string
  date: string
}

export interface Nurse {
  id: string
  name: string
  ward: Ward
  phone: string
  avatar?: string
  shift: "morning" | "afternoon" | "night"
  assignedPatients: string[]
}

export interface Bed {
  id: string
  number: string
  ward: Ward
  status: BedStatus
  patientId?: string
  patientName?: string
  floor: number
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
}

export interface AdmissionRequest {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  ward: Ward
  priority: Priority
  reason: string
  timestamp: string
  status: "pending" | "approved" | "rejected"
}

export interface Notification {
  id: string
  type: "info" | "warning" | "critical" | "success"
  title: string
  message: string
  timestamp: string
  read: boolean
  targetRole?: UserRole
}

export interface QueueEntry {
  tokenNumber: number
  patientId: string
  patientName: string
  priority: Priority
  status: TokenStatus
  ward: Ward
  estimatedWaitTime: number
  arrivalTime: string
  assignedDoctorId?: string
}

export interface AnalyticsData {
  patientFlowByHour: { hour: string; patients: number }[]
  avgWaitTimeByWard: { ward: string; minutes: number }[]
  bedOccupancyRate: { date: string; rate: number }[]
  wardDistribution: { ward: string; count: number; fill: string }[]
  peakHours: { hour: string; day: string; value: number }[]
  dailyAdmissions: { date: string; admissions: number; discharges: number }[]
}
