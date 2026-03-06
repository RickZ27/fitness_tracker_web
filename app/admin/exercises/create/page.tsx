import CreateExerciseForm from '../_components/CreateExerciseForm';

export default function CreateExercisePage() {
    return (
        <div className="max-w-lg space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Add Exercise</h1>
                <p className="text-sm text-foreground/60 mt-1">Add a new exercise to the library</p>
            </div>
            <CreateExerciseForm />
        </div>
    );
}
