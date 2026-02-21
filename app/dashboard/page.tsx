"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"

export default function DashboardIndex() {
  const router = useRouter()
  const { state } = useAuth()

  useEffect(() => {
    if (state.user) {
      const roleRoutes = {
        patient: "/dashboard/patient",
        nurse: "/dashboard/nurse",
        doctor: "/dashboard/doctor",
        admin: "/dashboard/admin",
      }
      router.replace(roleRoutes[state.user.role])
    }
  }, [state.user, router])

  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}
