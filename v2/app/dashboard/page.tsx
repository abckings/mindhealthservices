export default function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50 p-4">
                    <h3 className="font-semibold mb-2">Upcoming Appointments</h3>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-sm text-muted-foreground">next 7 days</p>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 p-4">
                    <h3 className="font-semibold mb-2">Total Patients</h3>
                    <div className="text-2xl font-bold">148</div>
                    <p className="text-sm text-muted-foreground">+2.5% this month</p>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 p-4">
                    <h3 className="font-semibold mb-2">Revenue</h3>
                    <div className="text-2xl font-bold">$12,450</div>
                    <p className="text-sm text-muted-foreground">this month</p>
                </div>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
                <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 hover:bg-white p-2 rounded transition-all">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                    JS
                                </div>
                                <div>
                                    <h4 className="font-medium">John Smith</h4>
                                    <p className="text-sm text-muted-foreground">General Consultation</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">10:00 AM</p>
                                <p className="text-sm text-muted-foreground">Today</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
