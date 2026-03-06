"use client";
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { handleDeleteWorkoutPlan } from '@/lib/actions/workout-action';

const DIFFICULTY_COLORS: Record<string, string> = {
    beginner:     'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    intermediate: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    advanced:     'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
};

interface WorkoutPlanCardProps {
    plan: {
        _id: string;
        name: string;
        description?: string;
        difficulty: string;
        durationWeeks?: number;
        isPublic?: boolean;
    };
    showDelete?: boolean;
}

export default function WorkoutPlanCard({ plan, showDelete }: WorkoutPlanCardProps) {
    const router = useRouter();
    const [error, setError]       = useState<string | null>(null);
    const [pending, setTransition] = useTransition();

    const handleDelete = () => {
        setError(null);
        setTransition(async () => {
            const res = await handleDeleteWorkoutPlan(plan._id);
            if (!res.success) setError(res.message || 'Failed to delete');
            else router.refresh();
        });
    };

    return (
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 space-y-3 flex flex-col">
            {/* Title row */}
            <div className="flex items-start justify-between gap-2">
                <div>
                    <h3 className="font-semibold">{plan.name}</h3>
                    {plan.description && (
                        <p className="text-sm text-foreground/50 mt-0.5 line-clamp-2">{plan.description}</p>
                    )}
                </div>
                {plan.isPublic !== undefined && (
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${plan.isPublic ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-foreground/5 text-foreground/40'}`}>
                        {plan.isPublic ? 'Public' : 'Private'}
                    </span>
                )}
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap text-xs">
                <span className={`px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[plan.difficulty]}`}>
                    {plan.difficulty}
                </span>
                {plan.durationWeeks && (
                    <span className="px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/50">
                        {plan.durationWeeks} weeks
                    </span>
                )}
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            {/* Actions */}
            <div className="flex gap-2 mt-auto pt-1">
                <Link
                    href={`/user/workout/${plan._id}`}
                    className="h-8 px-3 rounded-md border border-black/10 dark:border-white/10 text-xs font-medium hover:bg-foreground/5 flex items-center"
                >
                    View Details
                </Link>
                {showDelete && (
                    <button
                        onClick={handleDelete}
                        disabled={pending}
                        className="h-8 px-3 rounded-md text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 disabled:opacity-60 transition-colors"
                    >
                        {pending ? 'Deleting...' : 'Delete'}
                    </button>
                )}
            </div>
        </div>
    );
}
