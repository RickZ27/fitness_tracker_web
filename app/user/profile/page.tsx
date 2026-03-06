import { handleGetProfile } from '@/lib/actions/profile-action';
import UpdateFitnessProfile from '../_compoents/UpdateFitnessProfile';

export default async function ProfilePage() {
    const res     = await handleGetProfile();
    const profile = res.data;

    return (
        <div className="py-8 max-w-lg space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Fitness Profile</h1>
                <p className="text-sm text-foreground/60 mt-1">Update your body stats and preferences</p>
            </div>
            <UpdateFitnessProfile defaultValues={profile} />
        </div>
    );
}
