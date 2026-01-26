"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { createBooking, getAvailableSlots } from "@/app/actions/book-appointment"

export default function BookingPage() {
    const [date, setDate] = useState<Date>()
    const [selectedSlot, setSelectedSlot] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [service, setService] = useState("")
    const [loadingSlots, setLoadingSlots] = useState(false)
    const [timeSlots, setTimeSlots] = useState<string[]>([])

    // New state for professionals
    const [professionals, setProfessionals] = useState<any[]>([])
    const [selectedProfessional, setSelectedProfessional] = useState<string>("")
    const [availableServices, setAvailableServices] = useState<any[]>([])

    // Load professionals on mount
    useEffect(() => {
        const loadProfessionals = async () => {
            try {
                const { getProfessionals } = await import("@/app/actions/get-professionals")
                const data = await getProfessionals()
                setProfessionals(data)

                if (data.length > 0) {
                    setSelectedProfessional(data[0].id)
                }
            } catch (error) {
                console.error("Failed to load professionals", error)
            }
        }
        loadProfessionals()
    }, [])

    // Update services when professional changes
    useEffect(() => {
        if (selectedProfessional) {
            const pro = professionals.find(p => p.id === selectedProfessional)
            if (pro && pro.services.length > 0) {
                setAvailableServices(pro.services)
                setService(pro.services[0].id)
            } else {
                setAvailableServices([])
                setService("")
            }
        }
    }, [selectedProfessional, professionals])

    const fetchSlots = async () => {
        if (!date || !service) return

        setLoadingSlots(true)
        setTimeSlots([])

        try {
            const slots = await getAvailableSlots({
                date: format(date, "yyyy-MM-dd"),
                serviceId: service
            })
            setTimeSlots(slots)
        } catch (error) {
            console.error("Failed to load slots", error)
        } finally {
            setLoadingSlots(false)
        }
    }

    // Fetch slots when date or service changes
    useEffect(() => {
        fetchSlots()
    }, [date, service])

    const handleBook = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!date || !selectedSlot) return

        setIsSubmitting(true)

        try {
            await createBooking({
                date: date.toISOString(),
                time: selectedSlot,
                serviceId: service
            })
            alert("Booking Successful!")
            await fetchSlots()
            setSelectedSlot("")
        } catch (error) {
            alert("Failed to book: " + (error as Error).message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto w-full">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Book an Appointment</h2>
                <p className="text-muted-foreground">Select a date and time for your consultation.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Appointment Details</CardTitle>
                    <CardDescription>Choose your preferred slot.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="professional">Professional</Label>
                        <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select professional" />
                            </SelectTrigger>
                            <SelectContent>
                                {professionals.map(p => (
                                    <SelectItem key={p.id} value={p.id}>{p.name} ({p.specialty})</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="service">Service Type</Label>
                        <Select value={service} onValueChange={setService} disabled={!availableServices.length}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableServices.map(s => (
                                    <SelectItem key={s.id} value={s.id}>{s.name} - {s.currency} {s.price} ({s.duration} min)</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label>Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {date && (
                        <div className="grid gap-2">
                            <Label>Available Slots</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {loadingSlots ? (
                                    <div className="col-span-3 flex justify-center py-4">
                                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                    </div>
                                ) : timeSlots.length > 0 ? (
                                    timeSlots.map(slot => (
                                        <Button
                                            key={slot}
                                            variant={selectedSlot === slot ? "default" : "outline"}
                                            onClick={() => setSelectedSlot(slot)}
                                            type="button"
                                        >
                                            {slot}
                                        </Button>
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center text-sm text-muted-foreground">
                                        No slots available.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleBook} disabled={!date || !selectedSlot || isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm Booking
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
