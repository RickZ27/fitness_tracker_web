import { handleGetExercises } from '@/lib/actions/workout-action';
import CreateWorkoutPlanForm from '../../_compoents/CreateWorkoutPlanForm';

export default async function CreateWorkoutPlanPage() {
    const exercisesRes = await handleGetExercises({ limit: 100 });
    const exercises    = exercisesRes.exercises ?? [];

    return (
        <div className="py-8 max-w-2xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">New Workout Plan</h1>
                <p className="text-sm text-foreground/60 mt-1">Build a custom workout plan with exercises</p>
            </div>
            <CreateWorkoutPlanForm exercises={exercises} />
        </div>
    );
}
