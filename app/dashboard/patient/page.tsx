"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Clock, Hash, User, Stethoscope, BedDouble, Calendar, History, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { StatCard } from "@/components/dashboard/stat-card"
import { PriorityBadge } from "@/components/dashboard/priority-badge"
import { useApp } from "@/lib/context/app-context"
import { useAuth } from "@/lib/context/auth-context"
import { cn } from "@/lib/utils"

const statusSteps = [
  { key: "in-queue", label: "In Queue" },
  { key: "with-doctor", label: "With Doctor" },
  { key: "in-consultation", label: "In Consultation" },
  { key: "completed", label: "Completed" },
] as const

export default function PatientDashboard() {
  const { state: authState } = useAuth()
  const { state, dispatch, getDoctorById } = useApp()

  // Find patient matching logged-in user (or use first patient as demo)
  const patient = state.patients.find((p) => p.phone === authState.user?.phone) || state.patients[0]
  const doctor = patient?.assignedDoctorId ? getDoctorById(patient.assignedDoctorId) : undefined
  const bed = patient?.assignedBedId ? state.beds.find((b) => b.id === patient.assignedBedId) : undefined
  const appointments = state.appointments.filter((a) => a.patientId === patient?.id)

  // Simulate queue movement
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "ADVANCE_QUEUE" })
    }, 20000)
    return () => clearInterval(timer)
  }, [dispatch])

  if (!patient) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">No patient record found.</p>
        <Button asChild>
          <Link href="/scan">Check in via QR</Link>
        </Button>
      </div>
    )
  }

  const currentStepIndex = statusSteps.findIndex((s) => s.key === patient.status)
  const progressPercent = patient.status === "completed" ? 100 : patient.status === "admitted" ? 75 : ((currentStepIndex + 1) / statusSteps.length) * 100

  return (
    <div className="mx-auto max-w-5xl flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Patient Dashboard</h1>
        <p className="text-muted-foreground">Track your visit status and queue position in real time.</p>
      </div>

      {/* Token & Queue Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Token Number" value={`#${patient.tokenNumber}`} icon={Hash} subtitle="Your unique token" />
        <StatCard title="Queue Position" value={patient.queuePosition} icon={User} subtitle={`of ${state.queue.length} in queue`} />
        <StatCard
          title="Est. Wait Time"
          value={patient.estimatedWaitTime > 0 ? `${patient.estimatedWaitTime} min` : "Now"}
          icon={Clock}
          subtitle={patient.estimatedWaitTime > 0 ? "Approximately" : "You are being seen"}
        />
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">Priority</p>
                <PriorityBadge priority={patient.priority} className="text-sm mt-1" />
                <p className="text-xs text-muted-foreground mt-1 capitalize">{patient.ward} Ward</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Stethoscope className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Visit Progress</CardTitle>
          <CardDescription>Your current visit status</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercent} className="h-2 mb-4" />
          <div className="flex justify-between">
            {statusSteps.map((step, i) => {
              const isActive = i === currentStepIndex
              const isDone = i < currentStepIndex || patient.status === "completed"
              return (
                <div key={step.key} className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                      isDone ? "bg-primary text-primary-foreground" : isActive ? "bg-primary/20 text-primary ring-2 ring-primary" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {i + 1}
                  </div>
                  <span className={cn("text-[10px] sm:text-xs text-center", isActive ? "font-semibold text-primary" : "text-muted-foreground")}>
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Assigned Doctor */}
        {doctor && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assigned Doctor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                  <Badge variant="outline" className="mt-1 text-xs capitalize">{doctor.ward} Ward</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bed Assignment */}
        {bed ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bed Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BedDouble className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Bed {bed.number}</p>
                  <p className="text-sm text-muted-foreground capitalize">{bed.ward} Ward - Floor {bed.floor}</p>
                  <Badge variant="secondary" className="mt-1 text-xs capitalize">{bed.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button asChild variant="outline" className="w-full justify-between">
                <Link href="/appointment">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Book an Appointment
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between">
                <Link href="/scan">
                  <span className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    New Check-in
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Upcoming Appointments */}
      {appointments.filter((a) => a.status === "scheduled").length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {appointments
                .filter((a) => a.status === "scheduled")
                .map((appt) => (
                  <div key={appt.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="font-medium text-foreground">{appt.doctorName}</p>
                      <p className="text-sm text-muted-foreground">{appt.date} at {appt.time}</p>
                    </div>
                    <Badge variant="outline" className="text-primary border-primary/30">Scheduled</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Visit History */}
      {patient.previousVisits.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Visit History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {patient.previousVisits.map((visit, i) => (
                <div key={i}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{visit.diagnosis}</p>
                      <p className="text-sm text-muted-foreground">{visit.doctorName}</p>
                      <p className="text-xs text-muted-foreground mt-1">{visit.notes}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{visit.date}</span>
                  </div>
                  {i < patient.previousVisits.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
