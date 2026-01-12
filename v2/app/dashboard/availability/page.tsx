"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Trash2, Plus } from "lucide-react"

// Types
type TimeRange = {
    id: string; // temp id for UI
    start: string;
    end: string;
}

type DaySchedule = {
    day: string;
    dayIndex: number; // 0-6
    active: boolean;
    ranges: TimeRange[];
}

const DAYS = [
    { name: "Sunday", index: 0 },
    { name: "Monday", index: 1 },
    { name: "Tuesday", index: 2 },
    { name: "Wednesday", index: 3 },
    { name: "Thursday", index: 4 },
    { name: "Friday", index: 5 },
    { name: "Saturday", index: 6 },
];

export default function AvailabilityPage() {
    const [schedule, setSchedule] = useState<DaySchedule[]>(DAYS.map(d => ({
        day: d.name,
        dayIndex: d.index,
        active: false,
        ranges: []
    })));
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const res = await fetch('/api/professional/availability');
                if (res.ok) {
                    const data = await res.json();
                    // Map DB data to UI state
                    setSchedule(prev => prev.map(d => {
                        const slots = data.filter((s: any) => s.dayOfWeek === d.dayIndex);
                        if (slots.length > 0) {
                            return {
                                ...d,
                                active: true,
                                ranges: slots.map((s: any) => ({
                                    id: crypto.randomUUID(),
                                    start: s.startTime,
                                    end: s.endTime
                                }))
                            };
                        }
                        return d;
                    }));
                }
            } catch (e) {
                console.error("Failed to fetch availability", e);
            } finally {
                setFetching(false);
            }
        };
        fetchAvailability();
    }, []);

    const handleToggleDay = (dayIndex: number) => {
        setSchedule(prev => prev.map(d => {
            if (d.dayIndex === dayIndex) {
                const newActive = !d.active;
                // If activating and no ranges, add default
                if (newActive && d.ranges.length === 0) {
                    return { ...d, active: true, ranges: [{ id: crypto.randomUUID(), start: '09:00', end: '17:00' }] };
                }
                return { ...d, active: newActive };
            }
            return d;
        }));
    };

    const addRange = (dayIndex: number) => {
        setSchedule(prev => prev.map(d => {
            if (d.dayIndex === dayIndex) {
                return {
                    ...d,
                    ranges: [...d.ranges, { id: crypto.randomUUID(), start: '09:00', end: '17:00' }]
                };
            }
            return d;
        }));
    };

    const removeRange = (dayIndex: number, rangeId: string) => {
        setSchedule(prev => prev.map(d => {
            if (d.dayIndex === dayIndex) {
                const newRanges = d.ranges.filter(r => r.id !== rangeId);
                return { ...d, ranges: newRanges };
            }
            return d;
        }));
    };

    const updateRange = (dayIndex: number, rangeId: string, field: 'start' | 'end', value: string) => {
        setSchedule(prev => prev.map(d => {
            if (d.dayIndex === dayIndex) {
                return {
                    ...d,
                    ranges: d.ranges.map(r => r.id === rangeId ? { ...r, [field]: value } : r)
                };
            }
            return d;
        }));
    };

    const saveSchedule = async () => {
        setLoading(true);
        // Transform UI state to DB payload
        const payload = schedule.flatMap(d => {
            if (!d.active) return [];
            return d.ranges.map(r => ({
                dayOfWeek: d.dayIndex,
                startTime: r.start,
                endTime: r.end
            }));
        });

        try {
            const res = await fetch('/api/professional/availability', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert("Schedule saved successfully!");
            } else {
                alert("Failed to save schedule.");
            }
        } catch (e) {
            console.error(e);
            alert("Error saving schedule.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-6 p-4">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Availability Settings</h2>
                <p className="text-muted-foreground">Set your working hours. You can add multiple time ranges per day.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>Configure the days and non-continuous hours you are available.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    {schedule.map((day) => (
                        <div key={day.dayIndex} className="flex flex-col sm:flex-row sm:items-start justify-between space-y-4 sm:space-y-0 sm:space-x-4 border-b pb-4 last:border-0">
                            <div className="flex items-center space-x-4 min-w-[150px] pt-2">
                                <Switch
                                    checked={day.active}
                                    onCheckedChange={() => handleToggleDay(day.dayIndex)}
                                    aria-label={`Toggle ${day.day}`}
                                />
                                <Label className={!day.active ? "text-muted-foreground" : "font-medium"}>{day.day}</Label>
                            </div>

                            <div className="flex-1 space-y-3">
                                {day.active ? (
                                    <>
                                        {day.ranges.map((range) => (
                                            <div key={range.id} className="flex items-center gap-2">
                                                <div className="grid gap-1.5">
                                                    <Label className="sr-only">Start</Label>
                                                    <Input
                                                        type="time"
                                                        value={range.start}
                                                        onChange={(e) => updateRange(day.dayIndex, range.id, 'start', e.target.value)}
                                                        className="w-[120px]"
                                                    />
                                                </div>
                                                <span className="text-muted-foreground">-</span>
                                                <div className="grid gap-1.5">
                                                    <Label className="sr-only">End</Label>
                                                    <Input
                                                        type="time"
                                                        value={range.end}
                                                        onChange={(e) => updateRange(day.dayIndex, range.id, 'end', e.target.value)}
                                                        className="w-[120px]"
                                                    />
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeRange(day.dayIndex, range.id)}
                                                    className="text-destructive hover:text-destructive/90"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addRange(day.dayIndex)}
                                            className="mt-2"
                                        >
                                            <Plus className="mr-2 h-4 w-4" /> Add Range
                                        </Button>
                                    </>
                                ) : (
                                    <div className="text-sm text-muted-foreground italic pt-2 pl-1">Unavailable</div>
                                )}
                            </div>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button onClick={saveSchedule} disabled={loading}>{loading ? "Saving..." : "Save Schedule"}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
