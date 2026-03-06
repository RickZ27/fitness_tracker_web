"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { bodyMetricSchema, BodyMetricData } from '../schema';
import { handleLogBodyMetric } from '@/lib/actions/profile-action';
import { useRouter } from 'next/navigation';

export default function LogMetricForm() {
    const router = useRouter();
    const [error, setError]       = useState<string | null>(null);
    const [success, setSuccess]   = useState<string | null>(null);
    const [pending, setTransition] = useTransition();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
        useForm<BodyMetricData>({
            resolver: zodResolver(bodyMetricSchema),
            mode: 'onSubmit',
        });

    const submit = async (values: BodyMetricData) => {
        setError(null);
        setSuccess(null);
        setTransition(async () => {
            try {
                // Strip empty optional fields
                const payload: Record<string, any> = { weightKg: values.weightKg };
                if (values.bodyFatPercent) payload.bodyFatPercent = values.bodyFatPercent;
                if (values.waistCm)        payload.waistCm        = values.waistCm;
                if (values.hipsCm)         payload.hipsCm         = values.hipsCm;
                if (values.chestCm)        payload.chestCm        = values.chestCm;

                const res = await handleLogBodyMetric(payload);
                if (!res.success) throw new Error(res.message);
                setSuccess('Metrics logged successfully!');
                reset();
                router.refresh();
            } catch (err: Error | any) {
                setError(err.message || 'Failed to log metrics');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
            {error   && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                    <label className="text-sm font-medium">Weight (kg) *</label>
                    <input
                        type="number"
                        step="0.1"
                        placeholder="75.0"
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        {...register('weightKg')}
                    />
                    {errors.weightKg && <p className="text-xs text-red-600">{errors.weightKg.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Body Fat (%)</label>
                    <input
                        type="number"
                        step="0.1"
                        placeholder="18.0"
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        {...register('bodyFatPercent')}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Waist (cm)</label>
                    <input
                        type="number"
                        step="0.1"
                        placeholder="82"
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        {...register('waistCm')}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Hips (cm)</label>
                    <input
                        type="number"
                        step="0.1"
                        placeholder="95"
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        {...register('hipsCm')}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Chest (cm)</label>
                    <input
                        type="number"
                        step="0.1"
                        placeholder="100"
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        {...register('chestCm')}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-10 px-6 rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            >
                {isSubmitting || pending ? 'Saving...' : 'Log Metrics'}
            </button>
        </form>
    );
}
