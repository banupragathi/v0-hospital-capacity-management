"use client"

import { Bell, AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useApp } from "@/lib/context/app-context"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

const typeIcons = {
  info: Info,
  warning: AlertTriangle,
  critical: AlertCircle,
  success: CheckCircle,
}

const typeColors = {
  info: "text-primary",
  warning: "text-priority-moderate",
  critical: "text-priority-critical",
  success: "text-priority-mild",
}

export function NotificationPanel() {
  const { state, markNotificationRead, markAllNotificationsRead, getUnreadNotificationCount } = useApp()
  const unreadCount = getUnreadNotificationCount()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-priority-critical px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h4 className="text-sm font-semibold text-foreground">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllNotificationsRead} className="text-xs text-primary">
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-80">
          {state.notifications.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">No notifications</p>
          ) : (
            <div className="flex flex-col">
              {state.notifications.map((notification) => {
                const Icon = typeIcons[notification.type]
                return (
                  <button
                    key={notification.id}
                    onClick={() => markNotificationRead(notification.id)}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 border-b border-border last:border-b-0",
                      !notification.read && "bg-primary/5"
                    )}
                  >
                    <Icon className={cn("mt-0.5 h-4 w-4 flex-shrink-0", typeColors[notification.type])} />
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm", !notification.read ? "font-semibold text-foreground" : "text-foreground")}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                    {!notification.read && <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />}
                  </button>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
