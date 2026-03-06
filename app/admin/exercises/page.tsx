import { handleAdminGetExercises } from '@/lib/actions/admin/exercise-action';
import Link from 'next/link';
import ExerciseTable from './_components/ExerciseTable';

export default async function AdminExercisesPage() {
    const res       = await handleAdminGetExercises();
    const exercises = res.exercises ?? [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Exercise Library</h1>
                    <p className="text-sm text-foreground/60 mt-1">{res.total ?? 0} exercises total</p>
                </div>
                <Link
                    href="/admin/exercises/create"
                    className="h-10 px-4 rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 flex items-center"
                >
                    + Add Exercise
                </Link>
            </div>

            {exercises.length === 0 ? (
                <div className="text-center py-16 text-foreground/40">
                    <p className="text-lg">No exercises yet</p>
                    <p className="text-sm mt-1">Add the first exercise to the library</p>
                </div>
            ) : (
                <ExerciseTable exercises={exercises} />
            )}
        </div>
    );
}
