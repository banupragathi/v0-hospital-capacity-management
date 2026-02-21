"use client"

import { useApp } from "@/lib/context/app-context"
import { PriorityBadge } from "@/components/dashboard/priority-badge"

export function QueueTicker() {
  const { state } = useApp()
  const activeQueue = state.queue.filter((q) => q.status === "in-queue" || q.status === "with-doctor")

  if (activeQueue.length === 0) return null

  const items = [...activeQueue, ...activeQueue]

  return (
    <div className="overflow-hidden border-b border-border bg-muted/50 py-1.5">
      <div className="animate-ticker flex whitespace-nowrap">
        {items.map((entry, i) => (
          <span key={`${entry.tokenNumber}-${i}`} className="mx-4 inline-flex items-center gap-2 text-xs">
            <span className="font-mono font-bold text-primary">#{entry.tokenNumber}</span>
            <span className="text-muted-foreground">{entry.patientName}</span>
            <PriorityBadge priority={entry.priority} />
            <span className="text-muted-foreground">
              {entry.estimatedWaitTime > 0 ? `~${entry.estimatedWaitTime}min` : "Now"}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
