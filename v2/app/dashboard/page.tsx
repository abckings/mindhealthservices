import { getDashboardStats } from "@/app/actions/dashboard-stats"
import { format } from "date-fns"

export default async function Page() {
    const data = await getDashboardStats()

    if (!data) return <div>Stats unavailable</div>

    const { role, stats, recentActivity } = data

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold mb-2">Upcoming Appointments</h3>
                        <p className="text-sm text-muted-foreground">
                            {role === "PROFESSIONAL" ? "Next 7 days" : "Future"}
                        </p>
                    </div>
                    <div className="text-3xl font-bold">{stats.upcomingAppointments}</div>
                </div>

                {role === "PROFESSIONAL" && (
                    <>
                        <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col justify-between">
                            <div>
                                <h3 className="font-semibold mb-2">Total Patients</h3>
                                <p className="text-sm text-muted-foreground">Unique patients</p>
                            </div>
                            <div className="text-3xl font-bold">{stats.totalPatients}</div>
                        </div>
                        <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col justify-between">
                            <div>
                                <h3 className="font-semibold mb-2">Revenue</h3>
                                <p className="text-sm text-muted-foreground">Total earnings</p>
                            </div>
                            <div className="text-3xl font-bold">
                                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(stats.revenue || 0)}
                            </div>
                        </div>
                    </>
                )}

                {role === "PATIENT" && (
                    <div className="aspect-video rounded-xl bg-brand-sage/20 p-4 flex flex-col justify-center items-center text-center">
                        <h3 className="font-semibold text-lg text-brand-teal">Need help?</h3>
                        <p className="text-sm text-muted-foreground mb-4">Book a new consultation with our experts.</p>
                        <a href="/dashboard/book" className="bg-brand-orange text-white px-4 py-2 rounded-md hover:bg-brand-orange/90 transition-colors">Book Now</a>
                    </div>
                )}
            </div>

            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
                <h3 className="font-semibold text-lg mb-4">
                    {role === "PROFESSIONAL" ? "Recent Patient Activity" : "My Recent Appointments"}
                </h3>
                {recentActivity.length > 0 ? (
                    <div className="space-y-4">
                        {recentActivity.map((appt) => (
                            <div key={appt.id} className="flex items-center justify-between border-b pb-4 last:border-0 hover:bg-white p-2 rounded transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0 text-sm overflow-hidden">
                                        {/* @ts-ignore */}
                                        {role === "PROFESSIONAL" ?
                                            /* @ts-ignore */
                                            (appt.patient.image ? <img src={appt.patient.image} alt="" className="h-full w-full object-cover" /> : appt.patient.name?.[0] || "?")
                                            :
                                            /* @ts-ignore */
                                            (appt.professional.user.image ? <img src={appt.professional.user.image} alt="" className="h-full w-full object-cover" /> : appt.professional.user.name?.[0] || "?")
                                        }
                                    </div>
                                    <div>
                                        <h4 className="font-medium">
                                            {/* @ts-ignore */}
                                            {role === "PROFESSIONAL" ? (appt.patient.name || appt.patient.email) : appt.professional.user.name}
                                        </h4>
                                        <p className="text-sm text-muted-foreground w-32 md:w-auto truncate">
                                            {/* @ts-ignore */}
                                            {appt.service.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {/* @ts-ignore */}
                                    <p className="font-medium">{format(new Date(appt.startTime), "h:mm a")}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {/* @ts-ignore */}
                                        {format(new Date(appt.startTime), "MMM d")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No recent activity.</p>
                )}
            </div>
        </div>
    )
}
