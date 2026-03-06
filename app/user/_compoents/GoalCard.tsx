"use client";
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { handleMarkGoalComplete, handleMarkGoalAbandoned, handleDeleteGoal } from '@/lib/actions/goal-action';

interface GoalCardProps {
    goal: {
        _id: string;
        type: string;
        title: string;
        description?: string;
        targetValue?: number;
        currentValue?: number;
        unit?: string;
        direction?: string;
        deadline?: string;
        status: string;
        daysRemaining?: number;
    };
}

const STATUS_COLORS: Record<string, string> = {
    active:    'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    completed: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    abandoned: 'bg-foreground/5 text-foreground/40',
};

const TYPE_LABELS: Record<string, string> = {
    weight:            'Weight',
    body_fat:          'Body Fat',
    workout_frequency: 'Workout Frequency',
    custom:            'Custom',
};

export default function GoalCard({ goal }: GoalCardProps) {
    const router = useRouter();
    const [error, setError]        = useState<string | null>(null);
    const [pending, setTransition]  = useTransition();

    const progress = goal.targetValue && goal.currentValue && goal.direction
        ? goal.direction === 'decrease'
            ? Math.min(100, Math.max(0, ((goal.currentValue - goal.targetValue) / goal.currentValue) * 100))
            : Math.min(100, Math.max(0, (goal.currentValue / goal.targetValue) * 100))
        : null;

    const handleComplete = () => {
        setError(null);
        setTransition(async () => {
            const res = await handleMarkGoalComplete(goal._id);
            if (!res.success) setError(res.message || 'Failed');
            else router.refresh();
        });
    };

    const handleAbandon = () => {
        setError(null);
        setTransition(async () => {
            const res = await handleMarkGoalAbandoned(goal._id);
            if (!res.success) setError(res.message || 'Failed');
            else router.refresh();
        });
    };

    const handleDelete = () => {
        setError(null);
        setTransition(async () => {
            const res = await handleDeleteGoal(goal._id);
            if (!res.success) setError(res.message || 'Failed');
            else router.refresh();
        });
    };

    return (
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 space-y-3">
            {/* Top row */}
            <div className="flex items-start justify-between gap-2">
                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{goal.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[goal.status]}`}>
                            {goal.status}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/50">
                            {TYPE_LABELS[goal.type]}
                        </span>
                    </div>
                    {goal.description && (
                        <p className="text-sm text-foreground/50 mt-0.5">{goal.description}</p>
                    )}
                </div>
                {/* Delete */}
                {goal.status === 'active' && (
                    <button
                        onClick={handleDelete}
                        disabled={pending}
                        className="text-xs text-foreground/30 hover:text-red-500 transition-colors disabled:opacity-40"
                    >
                        Delete
                    </button>
                )}
            </div>

            {/* Progress bar */}
            {progress !== null && (
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-foreground/50">
                        <span>Current: {goal.currentValue} {goal.unit}</span>
                        <span>Target: {goal.targetValue} {goal.unit}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-foreground/10 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-blue-500 transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-xs text-foreground/40 text-right">{progress.toFixed(0)}% progress</p>
                </div>
            )}

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-foreground/40 flex-wrap">
                {goal.deadline && (
                    <span>
                        Deadline: {new Date(goal.deadline).toLocaleDateString()}
                        {goal.daysRemaining !== undefined && goal.daysRemaining !== null && (
                            <span className={goal.daysRemaining < 0 ? ' text-red-500' : ''}>
                                {' '}({goal.daysRemaining < 0 ? `${Math.abs(goal.daysRemaining)}d overdue` : `${goal.daysRemaining}d left`})
                            </span>
                        )}
                    </span>
                )}
                {goal.direction && (
                    <span>Direction: {goal.direction === 'decrease' ? '↓ Decrease' : '↑ Increase'}</span>
                )}
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            {/* Actions */}
            {goal.status === 'active' && (
                <div className="flex gap-2 pt-1">
                    <button
                        onClick={handleComplete}
                        disabled={pending}
                        className="h-8 px-3 rounded-md bg-green-600 text-white text-xs font-semibold hover:opacity-90 disabled:opacity-60"
                    >
                        Mark Complete
                    </button>
                    <button
                        onClick={handleAbandon}
                        disabled={pending}
                        className="h-8 px-3 rounded-md border border-black/10 dark:border-white/10 text-xs font-medium hover:bg-foreground/5 disabled:opacity-60"
                    >
                        Abandon
                    </button>
                </div>
            )}
        </div>
    );
}
