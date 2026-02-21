import { cn } from "@/lib/utils"
import type { Priority } from "@/lib/types"

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  mild: { label: "Mild", className: "bg-priority-mild-bg text-priority-mild" },
  moderate: { label: "Moderate", className: "bg-priority-moderate-bg text-priority-moderate" },
  severe: { label: "Severe", className: "bg-priority-severe-bg text-priority-severe" },
  critical: { label: "Critical", className: "bg-priority-critical-bg text-priority-critical" },
}

export function PriorityBadge({ priority, className }: { priority: Priority; className?: string }) {
  const config = priorityConfig[priority]
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", config.className, className)}>
      {config.label}
    </span>
  )
}
