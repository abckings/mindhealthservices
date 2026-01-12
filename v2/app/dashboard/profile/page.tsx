"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, ShieldCheck } from "lucide-react"

export default function ProfilePage() {
    const { data: session, update } = useSession()
    // @ts-ignore
    const role = session?.user?.role as string
    const [accessCode, setAccessCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

    const handleUpgrade = async () => {
        setLoading(true)
        setStatus(null)
        try {
            const res = await fetch('/api/professional/upgrade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessCode })
            })

            const data = await res.json()

            if (res.ok) {
                setStatus({ type: 'success', message: 'Account upgraded successfully! Reloading...' })
                await update({ role: 'PROFESSIONAL' })
                setTimeout(() => window.location.reload(), 1500)
            } else {
                setStatus({ type: 'error', message: data.error || 'Upgrade failed' })
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error occurred' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-6 p-4 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Profile & Settings</h2>
                <p className="text-muted-foreground">Manage your account and professional access.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Your basic account details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input value={session?.user?.name || ''} disabled />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input value={session?.user?.email || ''} disabled />
                        </div>
                        <div className="space-y-2">
                            <Label>Account Type</Label>
                            <div className="flex items-center gap-2">
                                <Badge variant={role === 'PROFESSIONAL' ? "default" : "secondary"}>
                                    {role || 'PATIENT'}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {role !== 'PROFESSIONAL' && (
                    <Card className="border-brand-teal/20 bg-brand-mint/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-brand-teal" />
                                Professional Access
                            </CardTitle>
                            <CardDescription>
                                Have an invite code? Enter it below to join as a professional.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="access-code">One-Time Access Code</Label>
                                <Input
                                    id="access-code"
                                    placeholder="Enter secure code"
                                    value={accessCode}
                                    onChange={(e) => setAccessCode(e.target.value)}
                                />
                            </div>

                            {status && (
                                <Alert variant={status.type === 'error' ? "destructive" : "default"} className={status.type === 'success' ? "border-green-500 text-green-700 bg-green-50" : ""}>
                                    {status.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                    <AlertTitle>{status.type === 'success' ? "Success" : "Error"}</AlertTitle>
                                    <AlertDescription>{status.message}</AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={handleUpgrade}
                                disabled={loading || !accessCode}
                                className="w-full bg-brand-orange hover:bg-brand-orange/90"
                            >
                                {loading ? "Verifying..." : "Join as Professional"}
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    )
}
