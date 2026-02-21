"use client"

import { useState } from "react"
import { Users, Clock, AlertTriangle, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { StatCard } from "@/components/dashboard/stat-card"
import { PriorityBadge } from "@/components/dashboard/priority-badge"
import { useApp } from "@/lib/context/app-context"
import { toast } from "sonner"
import type { Priority, TokenStatus, Ward } from "@/lib/types"
import { cn } from "@/lib/utils"

const statusConfig: Record<string, { label: string; className: string }> = {
  "in-queue": { label: "In Queue", className: "bg-muted text-muted-foreground" },
  "with-doctor": { label: "With Doctor", className: "bg-primary/10 text-primary" },
  "in-consultation": { label: "In Consult", className: "bg-priority-moderate-bg text-priority-moderate" },
  completed: { label: "Completed", className: "bg-priority-mild-bg text-priority-mild" },
  admitted: { label: "Admitted", className: "bg-priority-severe-bg text-priority-severe" },
  cancelled: { label: "Cancelled", className: "bg-muted text-muted-foreground" },
}

const wards: Ward[] = ["general", "icu", "emergency", "pediatric", "maternity"]

export default function NurseDashboard() {
  const { state, updatePatientStatus, updatePatientPriority, emergencyOverride } = useApp()
  const [wardFilter, setWardFilter] = useState<string>("all")

  const filteredPatients = wardFilter === "all"
    ? state.patients.filter((p) => p.status !== "completed" && p.status !== "cancelled")
    : state.patients.filter((p) => p.ward === wardFilter && p.status !== "completed" && p.status !== "cancelled")

  const totalActive = state.patients.filter((p) => p.status !== "completed" && p.status !== "cancelled").length
  const inQueue = state.patients.filter((p) => p.status === "in-queue").length
  const criticalCount = state.patients.filter((p) => p.priority === "critical" && p.status !== "completed").length
  const avgWait = Math.round(
    state.patients.filter((p) => p.status === "in-queue").reduce((sum, p) => sum + p.estimatedWaitTime, 0) /
      Math.max(inQueue, 1)
  )

  const handleStatusChange = (patientId: string, status: TokenStatus) => {
    updatePatientStatus(patientId, status)
    toast.success("Status updated")
  }

  const handlePriorityChange = (patientId: string, priority: Priority) => {
    updatePatientPriority(patientId, priority)
    toast.success("Priority updated")
  }

  const handleEscalation = (patientId: string, patientName: string) => {
    emergencyOverride(patientId)
    toast.warning(`Escalated ${patientName} to Critical priority`)
  }

  return (
    <div className="mx-auto max-w-6xl flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Nurse Station</h1>
        <p className="text-muted-foreground">Manage patient tokens, update statuses, and handle escalations.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Patients" value={totalActive} icon={Users} subtitle="Currently being managed" />
        <StatCard title="In Queue" value={inQueue} icon={Clock} subtitle="Waiting for consultation" />
        <StatCard title="Critical Cases" value={criticalCount} icon={AlertTriangle} subtitle="Require immediate attention" iconClassName="bg-priority-critical/10 text-priority-critical" />
        <StatCard title="Avg Wait Time" value={`${avgWait} min`} icon={Activity} subtitle="For patients in queue" />
      </div>

      {/* Ward Filter Tabs */}
      <Tabs value={wardFilter} onValueChange={setWardFilter}>
        <TabsList>
          <TabsTrigger value="all">All Wards</TabsTrigger>
          {wards.map((w) => (
            <TabsTrigger key={w} value={w} className="capitalize">
              {w}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={wardFilter} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Live Token List ({filteredPatients.length} patients)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Token</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead className="w-16">Age</TableHead>
                      <TableHead className="w-28">Priority</TableHead>
                      <TableHead className="w-32">Status</TableHead>
                      <TableHead className="w-20">Wait</TableHead>
                      <TableHead className="w-40 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No patients in this ward
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPatients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-mono font-bold text-primary">#{patient.tokenNumber}</TableCell>
                          <TableCell>
                            <div>
                              <span className="font-medium text-foreground">{patient.name}</span>
                              <span className="block text-xs text-muted-foreground capitalize">{patient.ward}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{patient.age}</TableCell>
                          <TableCell>
                            <Select
                              value={patient.priority}
                              onValueChange={(v) => handlePriorityChange(patient.id, v as Priority)}
                            >
                              <SelectTrigger className="h-7 w-24 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {(["mild", "moderate", "severe", "critical"] as Priority[]).map((p) => (
                                  <SelectItem key={p} value={p} className="text-xs capitalize">
                                    {p}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={patient.status}
                              onValueChange={(v) => handleStatusChange(patient.id, v as TokenStatus)}
                            >
                              <SelectTrigger className="h-7 w-28 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {(["in-queue", "with-doctor", "in-consultation", "completed", "admitted"] as TokenStatus[]).map((s) => (
                                  <SelectItem key={s} value={s} className="text-xs">
                                    {statusConfig[s]?.label || s}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {patient.estimatedWaitTime > 0 ? `${patient.estimatedWaitTime}m` : "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive" className="h-7 text-xs gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  Escalate
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Escalate Patient?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will immediately escalate {patient.name} to Critical priority
                                    and move them to the front of the queue. This action notifies all admins.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleEscalation(patient.id, patient.name)}>
                                    Confirm Escalation
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
