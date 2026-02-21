import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
  className?: string
  iconClassName?: string
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, className, iconClassName }: StatCardProps) {
  return (
    <Card className={cn("border-border", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            {trend && (
              <p className={cn("text-xs font-medium", trend.positive ? "text-priority-mild" : "text-priority-critical")}>
                {trend.value}
              </p>
            )}
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary", iconClassName)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
