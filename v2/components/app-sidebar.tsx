"use client"

import * as React from "react"
import {
    Calendar,
    CalendarPlus,
    Clock,
    Home,
    Settings,
    User,
    LogOut
} from "lucide-react"
import { signOut } from "next-auth/react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"



export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: any }) {
    return (
        <Sidebar {...props} className="!top-[7.5rem] !h-auto !bottom-0 pb-4" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Home className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Mind Health</span>
                                    <span className="">v2.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive>
                            <a href="/dashboard">
                                <Home />
                                <span>Overview</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/dashboard/book">
                                <CalendarPlus />
                                <span>Book Appointment</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    {user?.role === "PROFESSIONAL" && (
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/dashboard/availability">
                                    <Clock />
                                    <span>Availability</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/dashboard/appointments">
                                <Calendar />
                                <span>Appointments</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/dashboard/profile">
                                <User />
                                <span>Profile</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => signOut({ callbackUrl: "/" })}>
                            <LogOut />
                            <span>Sign out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
