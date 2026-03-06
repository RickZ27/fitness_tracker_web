"use client";
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { handleAdminDeleteExercise } from '@/lib/actions/admin/exercise-action';

const DIFFICULTY_COLORS: Record<string, string> = {
    beginner:     'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    intermediate: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    advanced:     'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
};

interface Exercise {
    _id: string;
    name: string;
    category: string;
    muscleGroups: string[];
    difficulty: string;
    equipment: string[];
}

export default function ExerciseTable({ exercises }: { exercises: Exercise[] }) {
    const router = useRouter();
    const [pending, setTransition] = useTransition();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setDeletingId(id);
        setError(null);
        setTransition(async () => {
            const res = await handleAdminDeleteExercise(id);
            if (!res.success) setError(res.message || 'Failed to delete');
            else router.refresh();
            setDeletingId(null);
        });
    };

    return (
        <div className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden">
            {error && <p className="text-sm text-red-600 px-4 py-2">{error}</p>}
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 bg-foreground/[0.02]">
                        <th className="text-left px-4 py-3 font-medium text-foreground/50">Name</th>
                        <th className="text-left px-4 py-3 font-medium text-foreground/50 hidden sm:table-cell">Category</th>
                        <th className="text-left px-4 py-3 font-medium text-foreground/50 hidden md:table-cell">Muscle Groups</th>
                        <th className="text-left px-4 py-3 font-medium text-foreground/50 hidden lg:table-cell">Difficulty</th>
                        <th className="text-right px-4 py-3 font-medium text-foreground/50">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((ex) => (
                        <tr
                            key={ex._id}
                            className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-foreground/[0.02] transition-colors"
                        >
                            <td className="px-4 py-3 font-medium">{ex.name}</td>
                            <td className="px-4 py-3 text-foreground/60 hidden sm:table-cell capitalize">{ex.category}</td>
                            <td className="px-4 py-3 hidden md:table-cell">
                                <div className="flex gap-1 flex-wrap">
                                    {ex.muscleGroups.slice(0, 3).map((m) => (
                                        <span key={m} className="text-xs px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/50">
                                            {m}
                                        </span>
                                    ))}
                                    {ex.muscleGroups.length > 3 && (
                                        <span className="text-xs text-foreground/40">+{ex.muscleGroups.length - 3}</span>
                                    )}
                                </div>
                            </td>
                            <td className="px-4 py-3 hidden lg:table-cell">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[ex.difficulty]}`}>
                                    {ex.difficulty}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                                <button
                                    onClick={() => handleDelete(ex._id)}
                                    disabled={pending && deletingId === ex._id}
                                    className="text-xs text-red-500 hover:underline disabled:opacity-50"
                                >
                                    {pending && deletingId === ex._id ? 'Deleting...' : 'Delete'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
