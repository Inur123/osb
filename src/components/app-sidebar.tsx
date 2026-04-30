"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Settings,
  ShieldCheck,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin OSB",
    email: "osbpelajarnumagetan@gmail.com",
    avatar: "/favicon.ico",
  },
  teams: [
    {
      name: "OSB Admin",
      logo: ShieldCheck,
      plan: "IPNU IPPNU",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Data Pendaftar",
      url: "/admin/pendaftar",
      icon: Users,
    },
    {
      title: "Periode Pendaftaran",
      url: "/admin/periode",
      icon: CalendarDays,
    },
    {
      title: "Pengaturan",
      url: "/admin/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
