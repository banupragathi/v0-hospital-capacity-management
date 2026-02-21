"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Activity, LayoutDashboard, Users, BedDouble, BarChart3,
  ListOrdered, QrCode, Calendar, LogOut, Stethoscope,
  ClipboardList, AlertTriangle, UserCircle,
} from "lucide-react"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/context/auth-context"
import type { UserRole } from "@/lib/types"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const navByRole: Record<UserRole, NavItem[]> = {
  patient: [
    { title: "My Dashboard", href: "/dashboard/patient", icon: LayoutDashboard },
    { title: "Appointments", href: "/appointment", icon: Calendar },
    { title: "QR Check-in", href: "/scan", icon: QrCode },
  ],
  nurse: [
    { title: "Nurse Station", href: "/dashboard/nurse", icon: ClipboardList },
    { title: "QR Check-in", href: "/scan", icon: QrCode },
  ],
  doctor: [
    { title: "Doctor Panel", href: "/dashboard/doctor", icon: Stethoscope },
    { title: "Appointments", href: "/appointment", icon: Calendar },
  ],
  admin: [
    { title: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { title: "Queue Management", href: "/dashboard/admin/queue", icon: ListOrdered },
    { title: "Bed Management", href: "/dashboard/admin/beds", icon: BedDouble },
    { title: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
    { title: "QR Check-in", href: "/scan", icon: QrCode },
    { title: "Appointments", href: "/appointment", icon: Calendar },
  ],
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { state: authState, logout } = useAuth()
  const role = authState.user?.role || "patient"
  const navItems = navByRole[role]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Activity className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">MediFlow</span>
                  <span className="text-[10px] capitalize text-muted-foreground">{role} Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <div className="flex items-center gap-2 cursor-default">
                <UserCircle className="h-4 w-4" />
                <span className="truncate text-xs">{authState.user?.name}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Sign Out" onClick={() => { logout(); window.location.href = "/" }}>
              <LogOut />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
