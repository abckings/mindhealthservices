"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { format } from "date-fns"
import { Loader2, Calendar, Clock, User, FileText, CreditCard } from "lucide-react"

// Types matching API response
type Appointment = {
    id: string
    startTime: string
    endTime: string
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
    paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
    notes?: string
    patient: {
        name: string | null
        email: string
        image: string | null
    }
    service: {
        name: string
        duration: number
    }
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null)

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch('/api/professional/appointments')
                if (res.ok) {
                    const data = await res.json()
                    setAppointments(data)
                } else {
                    console.error("Failed to fetch appointments")
                }
            } catch (error) {
                console.error("Error fetching appointments:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchAppointments()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6 p-4">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
                <p className="text-muted-foreground">Manage your upcoming schedules and patient visits.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>A list of all scheduled appointments for your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    {appointments.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No appointments found.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((appt) => (
                                    <TableRow key={appt.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{format(new Date(appt.startTime), "MMM d, yyyy")}</span>
                                                <span className="text-muted-foreground text-xs">
                                                    {format(new Date(appt.startTime), "h:mm a")}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{appt.patient.name || appt.patient.email}</TableCell>
                                        <TableCell>{appt.service.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={appt.status === 'CONFIRMED' ? 'default' : 'secondary'}>
                                                {appt.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={appt.paymentStatus === 'PAID' ? 'outline' : 'destructive'}
                                                className={appt.paymentStatus === 'PAID' ? "bg-green-50 text-green-700 border-green-200" : ""}
                                            >
                                                {appt.paymentStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-brand-teal hover:text-brand-teal/80 hover:bg-brand-teal/10"
                                                        onClick={() => setSelectedAppt(appt)}
                                                    >
                                                        View
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Appointment Details</DialogTitle>
                                                        <DialogDescription>
                                                            View details for this appointment.
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    {selectedAppt && (
                                                        <div className="grid gap-4 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <User className="h-5 w-5 text-muted-foreground" />
                                                                <div>
                                                                    <p className="font-medium">{selectedAppt.patient.name || "Unknown"}</p>
                                                                    <p className="text-sm text-muted-foreground">{selectedAppt.patient.email}</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3">
                                                                <FileText className="h-5 w-5 text-muted-foreground" />
                                                                <div>
                                                                    <p className="font-medium">{selectedAppt.service.name}</p>
                                                                    <p className="text-sm text-muted-foreground">{selectedAppt.service.duration} mins</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3">
                                                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                                                <div>
                                                                    <p className="font-medium">{format(new Date(selectedAppt.startTime), "EEEE, MMMM d, yyyy")}</p>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {format(new Date(selectedAppt.startTime), "h:mm a")} - {format(new Date(selectedAppt.endTime), "h:mm a")}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3">
                                                                <CreditCard className="h-5 w-5 text-muted-foreground" />
                                                                <div className="flex gap-2">
                                                                    <Badge>{selectedAppt.status}</Badge>
                                                                    <Badge variant="outline">{selectedAppt.paymentStatus}</Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <DialogFooter>
                                                        <Button variant="outline" onClick={() => setSelectedAppt(null)}>Close</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
