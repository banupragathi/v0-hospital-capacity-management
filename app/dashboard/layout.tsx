"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { useAuth } from "@/lib/context/auth-context"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { state } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/auth/login")
    }
  }, [state.isAuthenticated, router])

  if (!state.isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
