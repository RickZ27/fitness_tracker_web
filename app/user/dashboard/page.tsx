import { handleGetProfileDashboard } from '@/lib/actions/profile-action';
import { handleGetGoalSummary } from '@/lib/actions/goal-action';
import Link from 'next/link';
import LogMetricForm from '../_compoents/LogMetricForm';

export default async function DashboardPage() {
    const [dashboardRes, goalSummaryRes] = await Promise.all([
        handleGetProfileDashboard(),
        handleGetGoalSummary(),
    ]);

    const dashboard    = dashboardRes.data;
    const goalSummary  = goalSummaryRes.data;
    const latest       = dashboard?.latestMetric;
    const progress30   = dashboard?.progress?.last30Days;

    return (
        <div className="py-8 space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-foreground/60 mt-1">Your fitness overview</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <StatCard label="Current Weight" value={latest?.weightKg ? `${latest.weightKg} kg` : '—'} />
                <StatCard label="BMI"            value={latest?.bmi       ? latest.bmi.toFixed(1)    : '—'} />
                <StatCard label="Body Fat"       value={latest?.bodyFatPercent ? `${latest.bodyFatPercent}%` : '—'} />
                <StatCard label="Active Goals"   value={goalSummary?.active ?? '—'} />
            </div>

            {/* 30-day progress */}
            {progress30 && (
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
                    <h2 className="font-semibold mb-3">Last 30 Days</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 text-sm">
                        <div>
                            <p className="text-foreground/50">Weight change</p>
                            <p className={`font-semibold text-base ${progress30.weightChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {progress30.weightChange > 0 ? '+' : ''}{progress30.weightChange?.toFixed(1)} kg
                            </p>
                        </div>
                        <div>
                            <p className="text-foreground/50">Avg weight</p>
                            <p className="font-semibold text-base">{progress30.avgWeight?.toFixed(1)} kg</p>
                        </div>
                        <div>
                            <p className="text-foreground/50">Total logs</p>
                            <p className="font-semibold text-base">{progress30.totalLogs}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Goal Summary */}
            {goalSummary && (
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-semibold">Goals</h2>
                        <Link href="/user/goals" className="text-sm hover:underline">View all →</Link>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-center">
                        <div>
                            <p className="text-2xl font-bold text-blue-500">{goalSummary.active}</p>
                            <p className="text-foreground/50">Active</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-500">{goalSummary.completed}</p>
                            <p className="text-foreground/50">Completed</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-orange-500">{goalSummary.overdue}</p>
                            <p className="text-foreground/50">Overdue</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <QuickLink href="/user/goals/create"   label="+ New Goal" />
                <QuickLink href="/user/workout/create" label="+ New Plan" />
                <QuickLink href="/user/analytics"      label="View Analytics" />
                <QuickLink href="/user/profile"        label="Edit Profile" />
            </div>

            {/* Log Body Metric */}
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
                <h2 className="font-semibold mb-4">Log Today&apos;s Metrics</h2>
                <LogMetricForm />
            </div>
        </div>
    );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
            <p className="text-xs text-foreground/50 mb-1">{label}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    );
}

function QuickLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="rounded-xl border border-black/10 dark:border-white/10 p-4 text-sm font-medium hover:bg-foreground/5 text-center transition-colors"
        >
            {label}
        </Link>
    );
}
