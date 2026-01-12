"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Types matching Schema
type Appointment = {
    id: string
    patientName: string
    serviceName: string
    date: string
    time: string
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
    paymentStatus: 'PENDING' | 'PAID' | 'FAILED'
}

// Mock Data (since DB is empty until seeded)
const appointments: Appointment[] = [
    { id: '1', patientName: 'Alice Johnson', serviceName: 'Initial Consultation', date: '2025-10-24', time: '10:00 AM', status: 'CONFIRMED', paymentStatus: 'PAID' },
    { id: '2', patientName: 'Bob Smith', serviceName: 'Behavioral Therapy', date: '2025-10-24', time: '02:00 PM', status: 'PENDING', paymentStatus: 'PENDING' },
    { id: '3', patientName: 'Charlie Brown', serviceName: 'Assessment', date: '2025-10-25', time: '11:00 AM', status: 'CONFIRMED', paymentStatus: 'PAID' },
]

export default function AppointmentsPage() {
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
                                            <span className="font-medium">{appt.date}</span>
                                            <span className="text-muted-foreground text-xs">{appt.time}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{appt.patientName}</TableCell>
                                    <TableCell>{appt.serviceName}</TableCell>
                                    <TableCell>
                                        <Badge variant={appt.status === 'CONFIRMED' ? 'default' : 'secondary'}>
                                            {appt.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={appt.paymentStatus === 'PAID' ? 'outline' : 'destructive'} className={appt.paymentStatus === 'PAID' ? "bg-green-50 text-green-700 border-green-200" : ""}>
                                            {appt.paymentStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <button className="text-sm font-medium text-brand-teal hover:underline">View</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
