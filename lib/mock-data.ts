import type {
  Patient,
  Doctor,
  Nurse,
  Bed,
  Appointment,
  AdmissionRequest,
  Notification,
  QueueEntry,
  AnalyticsData,
  User,
  Ward,
} from "./types"

// ===== USERS (for auth) =====
export const mockUsers: User[] = [
  { id: "u1", name: "Rahul Sharma", phone: "9876543210", role: "patient", email: "rahul@email.com" },
  { id: "u2", name: "Priya Patel", phone: "9876543211", role: "patient", email: "priya@email.com" },
  { id: "u3", name: "Anita Desai", phone: "9876543212", role: "nurse", email: "anita@hospital.com" },
  { id: "u4", name: "Sunita Rao", phone: "9876543213", role: "nurse", email: "sunita@hospital.com" },
  { id: "u5", name: "Dr. Vikram Mehta", phone: "9876543214", role: "doctor", email: "vikram@hospital.com" },
  { id: "u6", name: "Dr. Kavita Singh", phone: "9876543215", role: "doctor", email: "kavita@hospital.com" },
  { id: "u7", name: "Admin Raj Kumar", phone: "9876543216", role: "admin", email: "admin@hospital.com" },
]

// ===== PATIENTS =====
export const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "Rahul Sharma",
    age: 34,
    phone: "9876543210",
    gender: "male",
    bloodType: "O+",
    symptoms: ["Fever", "Headache", "Body pain"],
    selfAssessedSeverity: "moderate",
    priority: "moderate",
    ward: "general",
    preferredLanguage: "English",
    tokenNumber: 101,
    queuePosition: 3,
    status: "in-queue",
    estimatedWaitTime: 25,
    assignedDoctorId: "d1",
    arrivalTime: "2026-02-21T08:30:00",
    visitType: "general",
    previousVisits: [
      { date: "2026-01-15", doctorName: "Dr. Vikram Mehta", diagnosis: "Common cold", ward: "general", notes: "Prescribed rest and fluids" },
      { date: "2025-11-20", doctorName: "Dr. Kavita Singh", diagnosis: "Gastritis", ward: "general", notes: "Follow-up in 2 weeks" },
    ],
  },
  {
    id: "p2",
    name: "Priya Patel",
    age: 28,
    phone: "9876543211",
    gender: "female",
    bloodType: "A+",
    symptoms: ["Chest pain", "Shortness of breath"],
    selfAssessedSeverity: "severe",
    priority: "severe",
    ward: "emergency",
    preferredLanguage: "Hindi",
    tokenNumber: 102,
    queuePosition: 1,
    status: "with-doctor",
    estimatedWaitTime: 5,
    assignedDoctorId: "d2",
    arrivalTime: "2026-02-21T07:45:00",
    visitType: "emergency",
    previousVisits: [
      { date: "2025-12-10", doctorName: "Dr. Kavita Singh", diagnosis: "Anxiety", ward: "general", notes: "Referred to specialist" },
    ],
  },
  {
    id: "p3",
    name: "Anil Kumar",
    age: 55,
    phone: "9876543220",
    gender: "male",
    bloodType: "B+",
    symptoms: ["Severe abdominal pain", "Vomiting"],
    selfAssessedSeverity: "critical",
    priority: "critical",
    ward: "emergency",
    preferredLanguage: "English",
    tokenNumber: 103,
    queuePosition: 1,
    status: "in-consultation",
    estimatedWaitTime: 0,
    assignedDoctorId: "d1",
    assignedBedId: "b5",
    arrivalTime: "2026-02-21T06:15:00",
    visitType: "emergency",
    previousVisits: [
      { date: "2026-01-05", doctorName: "Dr. Vikram Mehta", diagnosis: "Kidney stones", ward: "general", notes: "Scheduled for ultrasound" },
    ],
  },
  {
    id: "p4",
    name: "Meena Devi",
    age: 42,
    phone: "9876543221",
    gender: "female",
    bloodType: "AB-",
    symptoms: ["Mild cough", "Runny nose"],
    selfAssessedSeverity: "mild",
    priority: "mild",
    ward: "general",
    preferredLanguage: "English",
    tokenNumber: 104,
    queuePosition: 5,
    status: "in-queue",
    estimatedWaitTime: 45,
    assignedDoctorId: "d1",
    arrivalTime: "2026-02-21T09:00:00",
    visitType: "general",
    previousVisits: [],
  },
  {
    id: "p5",
    name: "Suresh Reddy",
    age: 67,
    phone: "9876543222",
    gender: "male",
    bloodType: "O-",
    symptoms: ["Dizziness", "High blood pressure"],
    selfAssessedSeverity: "moderate",
    priority: "moderate",
    ward: "icu",
    preferredLanguage: "Telugu",
    tokenNumber: 105,
    queuePosition: 2,
    status: "in-queue",
    estimatedWaitTime: 15,
    assignedDoctorId: "d2",
    arrivalTime: "2026-02-21T08:00:00",
    visitType: "general",
    previousVisits: [
      { date: "2026-02-01", doctorName: "Dr. Kavita Singh", diagnosis: "Hypertension", ward: "icu", notes: "Monitor daily" },
    ],
  },
  {
    id: "p6",
    name: "Lakshmi Nair",
    age: 31,
    phone: "9876543223",
    gender: "female",
    bloodType: "A-",
    symptoms: ["Labor contractions"],
    selfAssessedSeverity: "severe",
    priority: "severe",
    ward: "maternity",
    preferredLanguage: "Malayalam",
    tokenNumber: 106,
    queuePosition: 1,
    status: "admitted",
    estimatedWaitTime: 0,
    assignedDoctorId: "d2",
    assignedBedId: "b18",
    arrivalTime: "2026-02-21T05:30:00",
    visitType: "emergency",
    previousVisits: [],
  },
  {
    id: "p7",
    name: "Arjun Das",
    age: 8,
    phone: "9876543224",
    gender: "male",
    symptoms: ["High fever", "Rash"],
    selfAssessedSeverity: "moderate",
    priority: "moderate",
    ward: "pediatric",
    preferredLanguage: "Bengali",
    tokenNumber: 107,
    queuePosition: 2,
    status: "in-queue",
    estimatedWaitTime: 20,
    assignedDoctorId: "d1",
    arrivalTime: "2026-02-21T08:45:00",
    visitType: "general",
    previousVisits: [],
  },
  {
    id: "p8",
    name: "Fatima Begum",
    age: 50,
    phone: "9876543225",
    gender: "female",
    bloodType: "B-",
    symptoms: ["Joint pain", "Swelling"],
    selfAssessedSeverity: "mild",
    priority: "mild",
    ward: "general",
    preferredLanguage: "Urdu",
    tokenNumber: 108,
    queuePosition: 6,
    status: "in-queue",
    estimatedWaitTime: 55,
    assignedDoctorId: "d1",
    arrivalTime: "2026-02-21T09:15:00",
    visitType: "general",
    previousVisits: [
      { date: "2025-10-15", doctorName: "Dr. Vikram Mehta", diagnosis: "Arthritis", ward: "general", notes: "Prescribed medication" },
    ],
  },
  {
    id: "p9",
    name: "Vikash Yadav",
    age: 40,
    phone: "9876543226",
    gender: "male",
    bloodType: "O+",
    symptoms: ["Fracture", "Severe pain"],
    selfAssessedSeverity: "severe",
    priority: "severe",
    ward: "emergency",
    preferredLanguage: "Hindi",
    tokenNumber: 109,
    queuePosition: 2,
    status: "in-queue",
    estimatedWaitTime: 10,
    assignedDoctorId: "d2",
    arrivalTime: "2026-02-21T08:50:00",
    visitType: "emergency",
    previousVisits: [],
  },
  {
    id: "p10",
    name: "Geeta Joshi",
    age: 22,
    phone: "9876543227",
    gender: "female",
    bloodType: "A+",
    symptoms: ["Skin rash", "Itching"],
    selfAssessedSeverity: "mild",
    priority: "mild",
    ward: "general",
    preferredLanguage: "English",
    tokenNumber: 110,
    queuePosition: 7,
    status: "in-queue",
    estimatedWaitTime: 65,
    assignedDoctorId: "d1",
    arrivalTime: "2026-02-21T09:30:00",
    visitType: "general",
    previousVisits: [],
  },
]

// ===== DOCTORS =====
export const mockDoctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Vikram Mehta",
    specialization: "General Medicine",
    ward: "general",
    phone: "9876543214",
    isAvailable: true,
    currentPatientId: "p3",
    patientsToday: 12,
    availableSlots: [
      { id: "s1", time: "10:00 AM", isBooked: false, date: "2026-02-22" },
      { id: "s2", time: "10:30 AM", isBooked: true, patientId: "p1", date: "2026-02-22" },
      { id: "s3", time: "11:00 AM", isBooked: false, date: "2026-02-22" },
      { id: "s4", time: "11:30 AM", isBooked: false, date: "2026-02-22" },
      { id: "s5", time: "02:00 PM", isBooked: true, patientId: "p4", date: "2026-02-22" },
      { id: "s6", time: "02:30 PM", isBooked: false, date: "2026-02-22" },
      { id: "s7", time: "03:00 PM", isBooked: false, date: "2026-02-22" },
      { id: "s8", time: "03:30 PM", isBooked: false, date: "2026-02-22" },
    ],
  },
  {
    id: "d2",
    name: "Dr. Kavita Singh",
    specialization: "Emergency Medicine",
    ward: "emergency",
    phone: "9876543215",
    isAvailable: true,
    currentPatientId: "p2",
    patientsToday: 8,
    availableSlots: [
      { id: "s9", time: "10:00 AM", isBooked: false, date: "2026-02-22" },
      { id: "s10", time: "10:30 AM", isBooked: false, date: "2026-02-22" },
      { id: "s11", time: "11:00 AM", isBooked: true, patientId: "p5", date: "2026-02-22" },
      { id: "s12", time: "02:00 PM", isBooked: false, date: "2026-02-22" },
      { id: "s13", time: "02:30 PM", isBooked: false, date: "2026-02-22" },
      { id: "s14", time: "03:00 PM", isBooked: false, date: "2026-02-22" },
    ],
  },
  {
    id: "d3",
    name: "Dr. Rajan Pillai",
    specialization: "Pediatrics",
    ward: "pediatric",
    phone: "9876543230",
    isAvailable: true,
    patientsToday: 6,
    availableSlots: [
      { id: "s15", time: "10:00 AM", isBooked: false, date: "2026-02-22" },
      { id: "s16", time: "11:00 AM", isBooked: false, date: "2026-02-22" },
      { id: "s17", time: "02:00 PM", isBooked: false, date: "2026-02-22" },
    ],
  },
  {
    id: "d4",
    name: "Dr. Nandini Rao",
    specialization: "Obstetrics & Gynecology",
    ward: "maternity",
    phone: "9876543231",
    isAvailable: false,
    currentPatientId: "p6",
    patientsToday: 5,
    availableSlots: [
      { id: "s18", time: "10:00 AM", isBooked: true, date: "2026-02-22" },
      { id: "s19", time: "11:00 AM", isBooked: false, date: "2026-02-22" },
    ],
  },
]

// ===== NURSES =====
export const mockNurses: Nurse[] = [
  { id: "n1", name: "Anita Desai", ward: "general", phone: "9876543212", shift: "morning", assignedPatients: ["p1", "p4", "p8", "p10"] },
  { id: "n2", name: "Sunita Rao", ward: "emergency", phone: "9876543213", shift: "morning", assignedPatients: ["p2", "p3", "p9"] },
  { id: "n3", name: "Rekha Gupta", ward: "icu", phone: "9876543232", shift: "morning", assignedPatients: ["p5"] },
  { id: "n4", name: "Pooja Thakur", ward: "pediatric", phone: "9876543233", shift: "afternoon", assignedPatients: ["p7"] },
  { id: "n5", name: "Deepa Iyer", ward: "maternity", phone: "9876543234", shift: "night", assignedPatients: ["p6"] },
]

// ===== BEDS =====
function generateBeds(): Bed[] {
  const wards: Ward[] = ["general", "icu", "emergency", "pediatric", "maternity"]
  const bedsPerWard: Record<Ward, number> = { general: 8, icu: 4, emergency: 6, pediatric: 4, maternity: 4 }
  const beds: Bed[] = []
  let id = 1

  for (const ward of wards) {
    for (let i = 1; i <= bedsPerWard[ward]; i++) {
      const bedId = `b${id}`
      const wardPrefix = ward.charAt(0).toUpperCase()
      let status: Bed["status"] = "available"
      let patientId: string | undefined
      let patientName: string | undefined

      // Assign some beds
      if (bedId === "b5") { status = "occupied"; patientId = "p3"; patientName = "Anil Kumar" }
      else if (bedId === "b18") { status = "occupied"; patientId = "p6"; patientName = "Lakshmi Nair" }
      else if (bedId === "b3") { status = "reserved"; patientName = "Reserved for p5" }
      else if (bedId === "b10") { status = "maintenance" }
      else if (bedId === "b1") { status = "occupied"; patientName = "Old Patient" }
      else if (bedId === "b12") { status = "occupied"; patientName = "Jayant Shah" }
      else if (bedId === "b15") { status = "reserved" }

      beds.push({
        id: bedId,
        number: `${wardPrefix}${String(i).padStart(2, "0")}`,
        ward,
        status,
        patientId,
        patientName,
        floor: ward === "icu" ? 2 : ward === "emergency" ? 1 : ward === "maternity" ? 3 : ward === "pediatric" ? 3 : 1,
      })
      id++
    }
  }
  return beds
}

export const mockBeds: Bed[] = generateBeds()

// ===== APPOINTMENTS =====
export const mockAppointments: Appointment[] = [
  { id: "a1", patientId: "p1", patientName: "Rahul Sharma", doctorId: "d1", doctorName: "Dr. Vikram Mehta", date: "2026-02-22", time: "10:30 AM", status: "scheduled" },
  { id: "a2", patientId: "p4", patientName: "Meena Devi", doctorId: "d1", doctorName: "Dr. Vikram Mehta", date: "2026-02-22", time: "02:00 PM", status: "scheduled" },
  { id: "a3", patientId: "p5", patientName: "Suresh Reddy", doctorId: "d2", doctorName: "Dr. Kavita Singh", date: "2026-02-22", time: "11:00 AM", status: "scheduled" },
  { id: "a4", patientId: "p1", patientName: "Rahul Sharma", doctorId: "d1", doctorName: "Dr. Vikram Mehta", date: "2026-01-15", time: "10:00 AM", status: "completed" },
]

// ===== ADMISSION REQUESTS =====
export const mockAdmissionRequests: AdmissionRequest[] = [
  {
    id: "ar1",
    patientId: "p9",
    patientName: "Vikash Yadav",
    doctorId: "d2",
    doctorName: "Dr. Kavita Singh",
    ward: "emergency",
    priority: "severe",
    reason: "Compound fracture requiring surgical intervention",
    timestamp: "2026-02-21T09:00:00",
    status: "pending",
  },
  {
    id: "ar2",
    patientId: "p5",
    patientName: "Suresh Reddy",
    doctorId: "d2",
    doctorName: "Dr. Kavita Singh",
    ward: "icu",
    priority: "moderate",
    reason: "Hypertensive crisis - requires monitoring",
    timestamp: "2026-02-21T08:30:00",
    status: "pending",
  },
]

// ===== NOTIFICATIONS =====
export const mockNotifications: Notification[] = [
  { id: "n1", type: "critical", title: "Emergency Override", message: "Dr. Vikram escalated patient Anil Kumar to Critical priority", timestamp: "2026-02-21T06:20:00", read: false },
  { id: "n2", type: "warning", title: "Admission Request", message: "Dr. Kavita requested admission for Vikash Yadav", timestamp: "2026-02-21T09:00:00", read: false },
  { id: "n3", type: "info", title: "Bed Assignment", message: "Bed E05 assigned to Anil Kumar in Emergency ward", timestamp: "2026-02-21T06:25:00", read: true },
  { id: "n4", type: "success", title: "Patient Discharged", message: "Patient Jayant Shah has been discharged from ICU", timestamp: "2026-02-21T07:00:00", read: true },
  { id: "n5", type: "warning", title: "Admission Request", message: "Dr. Kavita requested ICU admission for Suresh Reddy", timestamp: "2026-02-21T08:30:00", read: false },
  { id: "n6", type: "info", title: "Queue Update", message: "Token 105 moved to position 2 in queue", timestamp: "2026-02-21T08:35:00", read: true },
]

// ===== QUEUE =====
export const mockQueue: QueueEntry[] = mockPatients
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
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

// ===== ANALYTICS =====
export const mockAnalytics: AnalyticsData = {
  patientFlowByHour: [
    { hour: "6 AM", patients: 3 },
    { hour: "7 AM", patients: 8 },
    { hour: "8 AM", patients: 15 },
    { hour: "9 AM", patients: 22 },
    { hour: "10 AM", patients: 28 },
    { hour: "11 AM", patients: 25 },
    { hour: "12 PM", patients: 18 },
    { hour: "1 PM", patients: 14 },
    { hour: "2 PM", patients: 20 },
    { hour: "3 PM", patients: 24 },
    { hour: "4 PM", patients: 19 },
    { hour: "5 PM", patients: 12 },
    { hour: "6 PM", patients: 7 },
  ],
  avgWaitTimeByWard: [
    { ward: "General", minutes: 35 },
    { ward: "ICU", minutes: 10 },
    { ward: "Emergency", minutes: 8 },
    { ward: "Pediatric", minutes: 25 },
    { ward: "Maternity", minutes: 15 },
  ],
  bedOccupancyRate: [
    { date: "Mon", rate: 72 },
    { date: "Tue", rate: 78 },
    { date: "Wed", rate: 85 },
    { date: "Thu", rate: 80 },
    { date: "Fri", rate: 90 },
    { date: "Sat", rate: 65 },
    { date: "Sun", rate: 55 },
  ],
  wardDistribution: [
    { ward: "General", count: 5, fill: "var(--color-chart-1)" },
    { ward: "Emergency", count: 3, fill: "var(--color-chart-2)" },
    { ward: "ICU", count: 1, fill: "var(--color-chart-3)" },
    { ward: "Pediatric", count: 1, fill: "var(--color-chart-4)" },
    { ward: "Maternity", count: 1, fill: "var(--color-chart-5)" },
  ],
  peakHours: [
    { hour: "8 AM", day: "Mon", value: 18 },
    { hour: "9 AM", day: "Mon", value: 25 },
    { hour: "10 AM", day: "Mon", value: 30 },
    { hour: "8 AM", day: "Tue", value: 20 },
    { hour: "9 AM", day: "Tue", value: 28 },
    { hour: "10 AM", day: "Tue", value: 32 },
    { hour: "8 AM", day: "Wed", value: 22 },
    { hour: "9 AM", day: "Wed", value: 30 },
    { hour: "10 AM", day: "Wed", value: 35 },
  ],
  dailyAdmissions: [
    { date: "Mon", admissions: 12, discharges: 10 },
    { date: "Tue", admissions: 15, discharges: 13 },
    { date: "Wed", admissions: 18, discharges: 14 },
    { date: "Thu", admissions: 14, discharges: 16 },
    { date: "Fri", admissions: 20, discharges: 12 },
    { date: "Sat", admissions: 8, discharges: 15 },
    { date: "Sun", admissions: 5, discharges: 10 },
  ],
}
