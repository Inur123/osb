"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
        Aplikasi
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {items.map((item) => {
          const isActive = pathname === item.url
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                tooltip={item.title} 
                render={<Link href={item.url} />}
                onClick={() => setOpenMobile(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 transition-all duration-200 rounded-lg",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary hover:text-primary-foreground" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn("size-5", isActive ? "text-white" : "text-muted-foreground")} />
                <span className="font-medium">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
