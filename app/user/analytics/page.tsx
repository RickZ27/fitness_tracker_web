import { handleGetAnalyticsDashboard } from '@/lib/actions/analytics-action';
import Link from 'next/link';

const PERIODS = ['7d', '30d', '90d', '180d', '1y', 'all'];

export default async function AnalyticsPage({
    searchParams,
}: {
    searchParams: { period?: string };
}) {
    const period = PERIODS.includes(searchParams.period ?? '') ? searchParams.period! : '30d';
    const res    = await handleGetAnalyticsDashboard(period);
    const data   = res.data;

    const body     = data?.body;
    const goals    = data?.goals;
    const workouts = data?.workouts;
    const summary  = body?.summary;

    return (
        <div className="py-8 space-y-8">
            {/* Header + Period Selector */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Analytics</h1>
                    <p className="text-sm text-foreground/60 mt-1">Your fitness progress over time</p>
                </div>
                <div className="flex gap-1 flex-wrap">
                    {PERIODS.map((p) => (
                        <Link
                            key={p}
                            href={`/user/analytics?period=${p}`}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                period === p
                                    ? 'bg-foreground text-background border-foreground'
                                    : 'border-black/10 dark:border-white/10 hover:bg-foreground/5'
                            }`}
                        >
                            {p === 'all' ? 'All time' : p}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Body Summary */}
            {summary ? (
                <section className="space-y-3">
                    <h2 className="font-semibold">Body Metrics</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <MetricCard label="Weight Change"
                            value={summary.weightChange !== null ? `${summary.weightChange > 0 ? '+' : ''}${summary.weightChange?.toFixed(1)} kg` : '—'}
                            highlight={summary.weightChange < 0 ? 'green' : summary.weightChange > 0 ? 'red' : undefined}
                        />
                        <MetricCard label="Start → End" value={summary.startWeight && summary.endWeight ? `${summary.startWeight?.toFixed(1)} → ${summary.endWeight?.toFixed(1)} kg` : '—'} />
                        <MetricCard label="Avg Weight"  value={summary.avgWeight  ? `${summary.avgWeight?.toFixed(1)} kg` : '—'} />
                        <MetricCard label="Avg BMI"     value={summary.avgBmi     ? summary.avgBmi?.toFixed(1) : '—'} />
                    </div>
                    <p className="text-xs text-foreground/40">Based on {summary.totalLogs} logs</p>
                </section>
            ) : (
                <section className="rounded-xl border border-black/10 dark:border-white/10 p-8 text-center text-foreground/40">
                    <p>No body metrics logged yet for this period.</p>
                    <Link href="/user/dashboard" className="text-sm hover:underline mt-1 block">Log your first metric →</Link>
                </section>
            )}

            {/* Body Trend Table */}
            {body?.trend && body.trend.length > 0 && (
                <section className="space-y-3">
                    <h2 className="font-semibold">Weight Trend</h2>
                    <div className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-black/10 dark:border-white/10 bg-foreground/2">
                                    <th className="text-left px-4 py-3 font-medium text-foreground/50">Date</th>
                                    <th className="text-right px-4 py-3 font-medium text-foreground/50">Avg Weight</th>
                                    <th className="text-right px-4 py-3 font-medium text-foreground/50">Avg BMI</th>
                                    <th className="text-right px-4 py-3 font-medium text-foreground/50">Logs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {body.trend.slice(-14).reverse().map((row: any, i: number) => (
                                    <tr key={i} className="border-b border-black/5 dark:border-white/5 last:border-0">
                                        <td className="px-4 py-2.5 text-foreground/70">
                                            {new Date(row.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2.5 text-right">{row.avgWeight ?? '—'} kg</td>
                                        <td className="px-4 py-2.5 text-right">{row.avgBmi ?? '—'}</td>
                                        <td className="px-4 py-2.5 text-right">{row.logsCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* Goals Analytics */}
            {goals && (
                <section className="space-y-3">
                    <h2 className="font-semibold">Goals</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <MetricCard label="Total Goals"      value={goals.completionRate?.total ?? 0} />
                        <MetricCard label="Completed"        value={goals.completionRate?.completed ?? 0} highlight="green" />
                        <MetricCard label="Completion Rate"  value={`${goals.completionRate?.completionRate ?? 0}%`} />
                        <MetricCard label="Active Goals"     value={goals.completionRate?.active ?? 0} />
                    </div>

                    {goals.progress && goals.progress.length > 0 && (
                        <div className="space-y-2">
                            {goals.progress.map((g: any) => (
                                <div key={g._id} className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="font-medium">{g.title}</span>
                                        <span className="text-foreground/50">{g.progressPercent}%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-foreground/10 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-blue-500 transition-all"
                                            style={{ width: `${g.progressPercent}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs text-foreground/40 mt-1">
                                        <span>Current: {g.currentValue} {g.unit}</span>
                                        <span>Target: {g.targetValue} {g.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Workout Stats */}
            {workouts && (
                <section className="space-y-3">
                    <h2 className="font-semibold">Workout Plans</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <MetricCard label="Total Plans"   value={workouts.totalPlans} />
                        <MetricCard label="Public Plans"  value={workouts.publicPlans} />
                        <MetricCard label="Private Plans" value={workouts.privatePlans} />
                        <MetricCard label="Exercises Set" value={workouts.totalExercisesConfigured} />
                    </div>
                </section>
            )}
        </div>
    );
}

function MetricCard({ label, value, highlight }: { label: string; value: string | number; highlight?: 'green' | 'red' }) {
    const color = highlight === 'green' ? 'text-green-500' : highlight === 'red' ? 'text-red-500' : '';
    return (
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
            <p className="text-xs text-foreground/50 mb-1">{label}</p>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
        </div>
    );
}
