import { handleGetWorkoutPlanById } from '@/lib/actions/workout-action';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const DIFFICULTY_COLORS: Record<string, string> = {
    beginner:     'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    intermediate: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    advanced:     'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
};

export default async function WorkoutPlanDetailPage({ params }: { params: { id: string } }) {
    const res = await handleGetWorkoutPlanById(params.id);
    if (!res.success || !res.data) return notFound();

    const plan = res.data;

    return (
        <div className="py-8 space-y-6 max-w-2xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <Link href="/user/workout" className="text-sm text-foreground/50 hover:underline">← Back to plans</Link>
                    <h1 className="text-2xl font-bold mt-1">{plan.name}</h1>
                    {plan.description && (
                        <p className="text-sm text-foreground/60 mt-1">{plan.description}</p>
                    )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[plan.difficulty]}`}>
                        {plan.difficulty}
                    </span>
                    {plan.isPublic !== undefined && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${plan.isPublic ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-foreground/5 text-foreground/40'}`}>
                            {plan.isPublic ? 'Public' : 'Private'}
                        </span>
                    )}
                </div>
            </div>

            {/* Meta */}
            {plan.durationWeeks && (
                <p className="text-sm text-foreground/50">Duration: {plan.durationWeeks} weeks</p>
            )}

            {/* Days */}
            <div className="space-y-4">
                {plan.days?.map((day: any) => (
                    <div key={day._id} className="rounded-xl border border-black/10 dark:border-white/10 p-5 space-y-4">
                        <h2 className="font-semibold">
                            Day {day.dayNumber} — {day.name}
                        </h2>
                        <div className="space-y-2">
                            {day.exercises?.map((ex: any, idx: number) => {
                                const exercise = ex.exerciseId;
                                return (
                                    <div
                                        key={ex._id}
                                        className="flex items-center justify-between gap-4 rounded-lg bg-foreground/3 dark:bg-white/3 px-4 py-3"
                                    >
                                        <div>
                                            <p className="font-medium text-sm">
                                                {idx + 1}. {typeof exercise === 'object' ? exercise?.name : 'Exercise'}
                                            </p>
                                            {typeof exercise === 'object' && exercise?.muscleGroups?.length > 0 && (
                                                <p className="text-xs text-foreground/40 mt-0.5">
                                                    {exercise.muscleGroups.join(', ')}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex gap-3 text-xs text-foreground/60 shrink-0">
                                            {ex.sets && <span>{ex.sets} sets</span>}
                                            {ex.reps && <span>{ex.reps} reps</span>}
                                            {ex.durationSec && <span>{ex.durationSec}s</span>}
                                            {ex.restSec && <span>{ex.restSec}s rest</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
