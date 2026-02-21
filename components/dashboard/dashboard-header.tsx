"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { NotificationPanel } from "@/components/dashboard/notification-panel"
import { QueueTicker } from "@/components/dashboard/queue-ticker"
import { useAuth } from "@/lib/context/auth-context"

export function DashboardHeader() {
  const { state: authState } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
      <QueueTicker />
      <div className="flex items-center gap-3 px-4 py-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <Separator orientation="vertical" className="h-5" />
        <div className="flex-1">
          <h2 className="text-sm font-medium text-foreground">
            Welcome, {authState.user?.name}
          </h2>
          <p className="text-xs text-muted-foreground capitalize">
            {authState.user?.role} Dashboard
          </p>
        </div>
        <NotificationPanel />
      </div>
    </header>
  )
}
