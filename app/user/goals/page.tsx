import { handleGetGoals, handleGetGoalSummary } from '@/lib/actions/goal-action';
import Link from 'next/link';
import GoalCard from '../_compoents/GoalCard';

export default async function GoalsPage({
    searchParams,
}: {
    searchParams: { status?: string; type?: string };
}) {
    const params: Record<string, any> = {};
    if (searchParams.status) params.status = searchParams.status;
    if (searchParams.type)   params.type   = searchParams.type;

    const [goalsRes, summaryRes] = await Promise.all([
        handleGetGoals(params),
        handleGetGoalSummary(),
    ]);

    const goals   = goalsRes.goals   ?? [];
    const summary = summaryRes.data;

    return (
        <div className="py-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">My Goals</h1>
                    <p className="text-sm text-foreground/60 mt-1">Track what you are working toward</p>
                </div>
                <Link
                    href="/user/goals/create"
                    className="h-10 px-4 rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 flex items-center"
                >
                    + New Goal
                </Link>
            </div>

            {/* Summary */}
            {summary && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <SummaryCard label="Active"    value={summary.active}    color="text-blue-500" />
                    <SummaryCard label="Completed" value={summary.completed} color="text-green-500" />
                    <SummaryCard label="Abandoned" value={summary.abandoned} color="text-foreground/40" />
                    <SummaryCard label="Overdue"   value={summary.overdue}   color="text-red-500" />
                </div>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
                {['', 'active', 'completed', 'abandoned'].map((s) => (
                    <Link
                        key={s}
                        href={s ? `/user/goals?status=${s}` : '/user/goals'}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                            (searchParams.status ?? '') === s
                                ? 'bg-foreground text-background border-foreground'
                                : 'border-black/10 dark:border-white/10 hover:bg-foreground/5'
                        }`}
                    >
                        {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
                    </Link>
                ))}
            </div>

            {/* Goals List */}
            {goals.length === 0 ? (
                <div className="text-center py-16 text-foreground/40">
                    <p className="text-lg">No goals yet</p>
                    <p className="text-sm mt-1">Create your first goal to get started</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {goals.map((goal: any) => (
                        <GoalCard key={goal._id} goal={goal} />
                    ))}
                </div>
            )}
        </div>
    );
}

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-foreground/50 mt-1">{label}</p>
        </div>
    );
}
