import CreateGoalForm from '../../_compoents/CreateGoalForm';

export default function CreateGoalPage() {
    return (
        <div className="py-8 max-w-lg">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">New Goal</h1>
                <p className="text-sm text-foreground/60 mt-1">Set a new fitness goal to work toward</p>
            </div>
            <CreateGoalForm />
        </div>
    );
}
