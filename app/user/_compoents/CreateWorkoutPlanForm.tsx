"use client";
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createWorkoutPlanSchema, CreateWorkoutPlanData } from '../schema';
import { handleCreateWorkoutPlan } from '@/lib/actions/workout-action';

interface Exercise {
    _id: string;
    name: string;
    category: string;
    muscleGroups: string[];
}

interface Props {
    exercises: Exercise[];
}

export default function CreateWorkoutPlanForm({ exercises }: Props) {
    const router = useRouter();
    const [error, setError]        = useState<string | null>(null);
    const [pending, setTransition]  = useTransition();

    // Days are managed manually (not via react-hook-form useFieldArray)
    // because each day has a dynamic list of exercises
    const [days, setDays] = useState([
        { dayNumber: 1, name: 'Day 1', exercises: [{ exerciseId: '', sets: 3, reps: 10, restSec: 60, order: 1 }] },
    ]);

    const { register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm<CreateWorkoutPlanData>({
            resolver: zodResolver(createWorkoutPlanSchema),
            defaultValues: { difficulty: 'beginner', isPublic: false },
        });

    const addDay = () => {
        setDays(prev => [
            ...prev,
            { dayNumber: prev.length + 1, name: `Day ${prev.length + 1}`, exercises: [{ exerciseId: '', sets: 3, reps: 10, restSec: 60, order: 1 }] },
        ]);
    };

    const removeDay = (idx: number) => {
        setDays(prev => prev.filter((_, i) => i !== idx).map((d, i) => ({ ...d, dayNumber: i + 1 })));
    };

    const addExercise = (dayIdx: number) => {
        setDays(prev => prev.map((d, i) =>
            i === dayIdx
                ? { ...d, exercises: [...d.exercises, { exerciseId: '', sets: 3, reps: 10, restSec: 60, order: d.exercises.length + 1 }] }
                : d
        ));
    };

    const removeExercise = (dayIdx: number, exIdx: number) => {
        setDays(prev => prev.map((d, i) =>
            i === dayIdx
                ? { ...d, exercises: d.exercises.filter((_, j) => j !== exIdx) }
                : d
        ));
    };

    const updateDay = (dayIdx: number, field: string, value: any) => {
        setDays(prev => prev.map((d, i) => i === dayIdx ? { ...d, [field]: value } : d));
    };

    const updateExercise = (dayIdx: number, exIdx: number, field: string, value: any) => {
        setDays(prev => prev.map((d, i) =>
            i === dayIdx
                ? { ...d, exercises: d.exercises.map((e, j) => j === exIdx ? { ...e, [field]: value } : e) }
                : d
        ));
    };

    const submit = async (values: CreateWorkoutPlanData) => {
        setError(null);
        // Validate days
        for (const day of days) {
            if (day.exercises.some(e => !e.exerciseId)) {
                setError('Please select an exercise for each row, or remove empty rows');
                return;
            }
        }

        setTransition(async () => {
            try {
                const payload = {
                    name:          values.name,
                    description:   values.description,
                    difficulty:    values.difficulty,
                    durationWeeks: values.durationWeeks ? Number(values.durationWeeks) : undefined,
                    isPublic:      values.isPublic,
                    days:          days.map(d => ({
                        dayNumber: d.dayNumber,
                        name:      d.name,
                        exercises: d.exercises.map(e => ({
                            exerciseId: e.exerciseId,
                            sets:       Number(e.sets),
                            reps:       Number(e.reps),
                            restSec:    Number(e.restSec),
                            order:      e.order,
                        })),
                    })),
                };

                const res = await handleCreateWorkoutPlan(payload);
                if (!res.success) throw new Error(res.message);
                router.push('/user/workout');
            } catch (err: Error | any) {
                setError(err.message || 'Failed to create plan');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Plan Details */}
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 space-y-4">
                <h2 className="font-semibold text-sm uppercase tracking-wide text-foreground/50">Plan Details</h2>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Plan Name</label>
                    <input
                        type="text"
                        placeholder='e.g. "3 Day Push Pull Legs"'
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        {...register('name')}
                    />
                    {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Description (optional)</label>
                    <textarea
                        rows={2}
                        placeholder="Describe your plan..."
                        className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm outline-none focus:border-foreground/40 resize-none"
                        {...register('description')}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Difficulty</label>
                        <select
                            className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                            {...register('difficulty')}
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Duration (weeks)</label>
                        <input
                            type="number"
                            placeholder="8"
                            min={1}
                            max={52}
                            className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                            {...register('durationWeeks')}
                        />
                    </div>
                </div>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="rounded" {...register('isPublic')} />
                    Make this plan public (visible to all users)
                </label>
            </div>

            {/* Days */}
            <div className="space-y-4">
                <h2 className="font-semibold text-sm uppercase tracking-wide text-foreground/50">Workout Days</h2>

                {days.map((day, dayIdx) => (
                    <div key={dayIdx} className="rounded-xl border border-black/10 dark:border-white/10 p-5 space-y-4">
                        {/* Day header */}
                        <div className="flex items-center justify-between gap-4">
                            <input
                                type="text"
                                value={day.name}
                                onChange={e => updateDay(dayIdx, 'name', e.target.value)}
                                className="h-9 flex-1 rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm font-medium outline-none focus:border-foreground/40"
                            />
                            {days.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeDay(dayIdx)}
                                    className="text-xs text-red-500 hover:underline"
                                >
                                    Remove day
                                </button>
                            )}
                        </div>

                        {/* Exercises */}
                        <div className="space-y-3">
                            {day.exercises.map((ex, exIdx) => (
                                <div key={exIdx} className="grid grid-cols-12 gap-2 items-end">
                                    {/* Exercise select — takes up most space */}
                                    <div className="col-span-12 sm:col-span-5 space-y-1">
                                        {exIdx === 0 && <label className="text-xs text-foreground/50">Exercise</label>}
                                        <select
                                            value={ex.exerciseId}
                                            onChange={e => updateExercise(dayIdx, exIdx, 'exerciseId', e.target.value)}
                                            className="h-9 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-2 text-sm outline-none focus:border-foreground/40"
                                        >
                                            <option value="">Select exercise...</option>
                                            {exercises.map((e) => (
                                                <option key={e._id} value={e._id}>{e.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-4 sm:col-span-2 space-y-1">
                                        {exIdx === 0 && <label className="text-xs text-foreground/50">Sets</label>}
                                        <input type="number" min={1} value={ex.sets}
                                            onChange={e => updateExercise(dayIdx, exIdx, 'sets', e.target.value)}
                                            className="h-9 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-2 text-sm outline-none focus:border-foreground/40"
                                        />
                                    </div>
                                    <div className="col-span-4 sm:col-span-2 space-y-1">
                                        {exIdx === 0 && <label className="text-xs text-foreground/50">Reps</label>}
                                        <input type="number" min={1} value={ex.reps}
                                            onChange={e => updateExercise(dayIdx, exIdx, 'reps', e.target.value)}
                                            className="h-9 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-2 text-sm outline-none focus:border-foreground/40"
                                        />
                                    </div>
                                    <div className="col-span-4 sm:col-span-2 space-y-1">
                                        {exIdx === 0 && <label className="text-xs text-foreground/50">Rest (s)</label>}
                                        <input type="number" min={0} value={ex.restSec}
                                            onChange={e => updateExercise(dayIdx, exIdx, 'restSec', e.target.value)}
                                            className="h-9 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-2 text-sm outline-none focus:border-foreground/40"
                                        />
                                    </div>
                                    <div className="col-span-12 sm:col-span-1 flex justify-end">
                                        {day.exercises.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeExercise(dayIdx, exIdx)}
                                                className="h-9 w-9 rounded-md text-foreground/30 hover:text-red-500 text-lg transition-colors"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => addExercise(dayIdx)}
                            className="text-xs text-foreground/50 hover:text-foreground underline"
                        >
                            + Add exercise
                        </button>
                    </div>
                ))}

                {days.length < 7 && (
                    <button
                        type="button"
                        onClick={addDay}
                        className="h-10 w-full rounded-md border border-dashed border-black/20 dark:border-white/20 text-sm text-foreground/50 hover:bg-foreground/5 transition-colors"
                    >
                        + Add Day
                    </button>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            >
                {isSubmitting || pending ? 'Creating...' : 'Create Workout Plan'}
            </button>
        </form>
    );
}
