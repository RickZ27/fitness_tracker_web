"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { fitnessProfileSchema, FitnessProfileData } from '../schema';
import { handleUpdateFitnessProfile } from '@/lib/actions/profile-action';

export default function UpdateFitnessProfile({ defaultValues }: { defaultValues?: any }) {
    const router = useRouter();
    const [error, setError]        = useState<string | null>(null);
    const [success, setSuccess]    = useState<string | null>(null);
    const [pending, setTransition]  = useTransition();

    const { register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm<FitnessProfileData>({
            resolver: zodResolver(fitnessProfileSchema),
            defaultValues: {
                heightCm:            defaultValues?.heightCm,
                gender:              defaultValues?.gender,
                dateOfBirth:         defaultValues?.dateOfBirth
                    ? new Date(defaultValues.dateOfBirth).toISOString().split('T')[0]
                    : undefined,
                fitnessLevel:        defaultValues?.fitnessLevel,
                activityLevel:       defaultValues?.activityLevel,
                preferredWeightUnit: defaultValues?.preferredWeightUnit,
                bio:                 defaultValues?.bio,
            },
        });

    const submit = async (values: FitnessProfileData) => {
        setError(null);
        setSuccess(null);
        setTransition(async () => {
            try {
                // Strip empty strings
                const payload: Record<string, any> = {};
                Object.entries(values).forEach(([k, v]) => {
                    if (v !== '' && v !== undefined) payload[k] = v;
                });

                const res = await handleUpdateFitnessProfile(payload);
                if (!res.success) throw new Error(res.message);
                setSuccess('Profile updated successfully');
                router.refresh();
            } catch (err: Error | any) {
                setError(err.message || 'Failed to update profile');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
            {error   && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium">Height (cm)</label>
                    <input
                        type="number"
                        placeholder="175"
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        {...register('heightCm')}
                    />
                    {errors.heightCm && <p className="text-xs text-red-600">{errors.heightCm.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Gender</label>
                    <select
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        {...register('gender')}
                    >
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Date of Birth</label>
                    <input
                        type="date"
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        {...register('dateOfBirth')}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Fitness Level</label>
                    <select
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        {...register('fitnessLevel')}
                    >
                        <option value="">Select...</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                <div className="space-y-1 col-span-2">
                    <label className="text-sm font-medium">Activity Level</label>
                    <select
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        {...register('activityLevel')}
                    >
                        <option value="">Select...</option>
                        <option value="sedentary">Sedentary</option>
                        <option value="lightly_active">Lightly Active</option>
                        <option value="moderately_active">Moderately Active</option>
                        <option value="very_active">Very Active</option>
                        <option value="extra_active">Extra Active</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Preferred Weight Unit</label>
                    <select
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        {...register('preferredWeightUnit')}
                    >
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                    </select>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium">Bio (optional)</label>
                <textarea
                    rows={3}
                    placeholder="Tell us about your fitness journey..."
                    className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm outline-none focus:border-foreground/40 resize-none"
                    {...register('bio')}
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            >
                {isSubmitting || pending ? 'Saving...' : 'Save Profile'}
            </button>
        </form>
    );
}
