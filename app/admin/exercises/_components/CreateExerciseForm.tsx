"use client";
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { handleAdminCreateExercise } from '@/lib/actions/admin/exercise-action';

const MUSCLE_GROUPS = ['chest','back','shoulders','biceps','triceps','forearms','core','glutes','quads','hamstrings','calves','full_body','cardio'];
const EQUIPMENT     = ['barbell','dumbbell','machine','cable','bodyweight','resistance_band','kettlebell','pull_up_bar','bench','none'];
const CATEGORIES    = ['strength','cardio','flexibility','balance','plyometrics'];

export default function CreateExerciseForm() {
    const router = useRouter();
    const [error, setError]           = useState<string | null>(null);
    const [pending, setTransition]     = useTransition();
    const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

    const [form, setForm] = useState({
        name:         '',
        description:  '',
        category:     'strength',
        difficulty:   'beginner',
        instructions: '',
        videoUrl:     '',
    });

    const toggleMuscle = (m: string) =>
        setSelectedMuscles(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);

    const toggleEquipment = (e: string) =>
        setSelectedEquipment(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (selectedMuscles.length === 0) {
            setError('Select at least one muscle group');
            return;
        }

        setTransition(async () => {
            try {
                const payload: Record<string, any> = {
                    ...form,
                    muscleGroups: selectedMuscles,
                    equipment:    selectedEquipment,
                };
                if (!payload.description)  delete payload.description;
                if (!payload.instructions) delete payload.instructions;
                if (!payload.videoUrl)     delete payload.videoUrl;

                const res = await handleAdminCreateExercise(payload);
                if (!res.success) throw new Error(res.message);
                router.push('/admin/exercises');
            } catch (err: Error | any) {
                setError(err.message || 'Failed to create exercise');
            }
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Name */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Exercise Name</label>
                <input
                    type="text"
                    required
                    placeholder="e.g. Bench Press"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                />
            </div>

            {/* Description */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Description (optional)</label>
                <textarea
                    rows={2}
                    placeholder="Brief description..."
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm outline-none focus:border-foreground/40 resize-none"
                />
            </div>

            {/* Category + Difficulty */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium">Category</label>
                    <select
                        value={form.category}
                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    >
                        {CATEGORIES.map(c => (
                            <option key={c} value={c} className="capitalize">{c}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium">Difficulty</label>
                    <select
                        value={form.difficulty}
                        onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
            </div>

            {/* Muscle Groups */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Muscle Groups *</label>
                <div className="flex flex-wrap gap-2">
                    {MUSCLE_GROUPS.map(m => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => toggleMuscle(m)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                                selectedMuscles.includes(m)
                                    ? 'bg-foreground text-background border-foreground'
                                    : 'border-black/10 dark:border-white/10 hover:bg-foreground/5'
                            }`}
                        >
                            {m.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Equipment */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Equipment (optional)</label>
                <div className="flex flex-wrap gap-2">
                    {EQUIPMENT.map(eq => (
                        <button
                            key={eq}
                            type="button"
                            onClick={() => toggleEquipment(eq)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                                selectedEquipment.includes(eq)
                                    ? 'bg-foreground text-background border-foreground'
                                    : 'border-black/10 dark:border-white/10 hover:bg-foreground/5'
                            }`}
                        >
                            {eq.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Instructions */}
            <div className="space-y-1">
                <label className="text-sm font-medium">Instructions (optional)</label>
                <textarea
                    rows={4}
                    placeholder="Step by step instructions..."
                    value={form.instructions}
                    onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))}
                    className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm outline-none focus:border-foreground/40 resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={pending}
                className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            >
                {pending ? 'Creating...' : 'Create Exercise'}
            </button>
        </form>
    );
}
