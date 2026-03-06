import { handleGetMyPlans, handleGetPublicPlans } from '@/lib/actions/workout-action';
import Link from 'next/link';
import WorkoutPlanCard from '../_compoents/WorkoutPlanCard';


export default async function WorkoutPage({
    searchParams,
}: {
    searchParams: { tab?: string };
}) {
    const tab = searchParams.tab === 'public' ? 'public' : 'my';

    const [myRes, publicRes] = await Promise.all([
        handleGetMyPlans(),
        handleGetPublicPlans(),
    ]);

    const myPlans     = myRes.plans     ?? [];
    const publicPlans = publicRes.plans ?? [];

    return (
        <div className="py-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Workout Plans</h1>
                    <p className="text-sm text-foreground/60 mt-1">Manage and discover workout plans</p>
                </div>
                <Link
                    href="/user/workout/create"
                    className="h-10 px-4 rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 flex items-center"
                >
                    + New Plan
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-black/10 dark:border-white/10">
                {['my', 'public'].map((t) => (
                    <Link
                        key={t}
                        href={`/user/workout?tab=${t}`}
                        className={`px-4 py-2 text-sm font-medium -mb-px border-b-2 transition-colors ${
                            tab === t
                                ? 'border-foreground text-foreground'
                                : 'border-transparent text-foreground/50 hover:text-foreground'
                        }`}
                    >
                        {t === 'my' ? `My Plans (${myPlans.length})` : `Community (${publicPlans.length})`}
                    </Link>
                ))}
            </div>

            {/* Plans List */}
            {tab === 'my' && (
                myPlans.length === 0 ? (
                    <div className="text-center py-16 text-foreground/40">
                        <p className="text-lg">No workout plans yet</p>
                        <p className="text-sm mt-1">Create your first plan to get started</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {myPlans.map((plan: any) => (
                            <WorkoutPlanCard key={plan._id} plan={plan} showDelete />
                        ))}
                    </div>
                )
            )}

            {tab === 'public' && (
                publicPlans.length === 0 ? (
                    <div className="text-center py-16 text-foreground/40">
                        <p>No public plans available yet</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {publicPlans.map((plan: any) => (
                            <WorkoutPlanCard key={plan._id} plan={plan} />
                        ))}
                    </div>
                )
            )}
        </div>
    );
}
