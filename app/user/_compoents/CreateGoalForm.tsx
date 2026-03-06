"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createGoalSchema, CreateGoalData } from '../schema';
import { handleCreateGoal } from '@/lib/actions/goal-action';

export default function CreateGoalForm() {
    const router = useRouter();
    const [error, setError]        = useState<string | null>(null);
    const [pending, setTransition]  = useTransition();

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } =
        useForm<CreateGoalData>({
            resolver: zodResolver(createGoalSchema),
            mode: 'onSubmit',
            defaultValues: { type: 'weight', difficulty: undefined },
        });

    const goalType = watch('type');
    const isMeasurable = ['weight', 'body_fat', 'workout_frequency'].includes(goalType);

    const submit = async (values: CreateGoalData) => {
        setError(null);
        setTransition(async () => {
            try {
                const payload: Record<string, any> = {
                    type:  values.type,
                    title: values.title,
                };
                if (values.description) payload.description = values.description;
                if (values.targetValue) payload.targetValue = Number(values.targetValue);
                if (values.direction)   payload.direction   = values.direction;
                if (values.deadline)    payload.deadline    = values.deadline;

                const res = await handleCreateGoal(payload);
                if (!res.success) throw new Error(res.message);
                router.push('/user/goals');
            } catch (err: Error | any) {
                setError(err.message || 'Failed to create goal');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Goal Type */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Goal Type</label>
                <select
                    className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    {...register('type')}
                >
                    <option value="weight">Weight</option>
                    <option value="body_fat">Body Fat %</option>
                    <option value="workout_frequency">Workout Frequency</option>
                    <option value="custom">Custom</option>
                </select>
            </div>

            {/* Title */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Title</label>
                <input
                    type="text"
                    placeholder='e.g. "Reach 70kg by summer"'
                    className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    {...register('title')}
                />
                {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Description (optional)</label>
                <textarea
                    rows={2}
                    placeholder="Any additional notes..."
                    className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm outline-none focus:border-foreground/40 resize-none"
                    {...register('description')}
                />
            </div>

            {/* Target Value — only for measurable types */}
            {isMeasurable && (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium">
                            Target Value {goalType === 'weight' ? '(kg)' : goalType === 'body_fat' ? '(%)' : '(times/week)'}
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            placeholder={goalType === 'weight' ? '70' : goalType === 'body_fat' ? '15' : '4'}
                            className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                            {...register('targetValue')}
                        />
                        {errors.targetValue && <p className="text-xs text-red-600">{errors.targetValue.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Direction</label>
                        <select
                            className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                            {...register('direction')}
                        >
                            <option value="">Select...</option>
                            <option value="decrease">Decrease ↓</option>
                            <option value="increase">Increase ↑</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Deadline */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Deadline (optional)</label>
                <input
                    type="date"
                    className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    {...register('deadline')}
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            >
                {isSubmitting || pending ? 'Creating...' : 'Create Goal'}
            </button>
        </form>
    );
}
