"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function AvailabilityPage() {
    const [schedule, setSchedule] = useState([
        { day: "Monday", active: true, start: "09:00", end: "17:00" },
        { day: "Tuesday", active: true, start: "09:00", end: "17:00" },
        { day: "Wednesday", active: true, start: "09:00", end: "17:00" },
        { day: "Thursday", active: true, start: "09:00", end: "17:00" },
        { day: "Friday", active: true, start: "09:00", end: "17:00" },
        { day: "Saturday", active: false, start: "10:00", end: "14:00" },
        { day: "Sunday", active: false, start: "00:00", end: "00:00" },
    ])

    const handleToggle = (index: number) => {
        const newSchedule = [...schedule]
        newSchedule[index].active = !newSchedule[index].active
        setSchedule(newSchedule)
    }

    const handleTimeChange = (index: number, field: 'start' | 'end', value: string) => {
        const newSchedule = [...schedule]
        // @ts-ignore
        newSchedule[index][field] = value
        setSchedule(newSchedule)
    }

    return (
        <div className="flex flex-col gap-6 p-4">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Availability Settings</h2>
                <p className="text-muted-foreground">Set your weekly schedule for appointments.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>Configure the days and hours you are available.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    {schedule.map((slot, index) => (
                        <div key={slot.day} className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4 min-w-[150px]">
                                <Switch
                                    checked={slot.active}
                                    onCheckedChange={() => handleToggle(index)}
                                    aria-label={`Toggle ${slot.day}`}
                                />
                                <Label className={!slot.active ? "text-muted-foreground" : ""}>{slot.day}</Label>
                            </div>

                            {slot.active ? (
                                <div className="flex items-center gap-2">
                                    <div className="grid gap-1.5">
                                        <Label className="sr-only" htmlFor={`start-${index}`}>Start Time</Label>
                                        <Input
                                            id={`start-${index}`}
                                            type="time"
                                            value={slot.start}
                                            onChange={(e) => handleTimeChange(index, 'start', e.target.value)}
                                            className="w-[120px]"
                                        />
                                    </div>
                                    <span className="text-muted-foreground">-</span>
                                    <div className="grid gap-1.5">
                                        <Label className="sr-only" htmlFor={`end-${index}`}>End Time</Label>
                                        <Input
                                            id={`end-${index}`}
                                            type="time"
                                            value={slot.end}
                                            onChange={(e) => handleTimeChange(index, 'end', e.target.value)}
                                            className="w-[120px]"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 text-sm text-muted-foreground italic pl-4">Unavailable</div>
                            )}
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button>Save Schedule</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
