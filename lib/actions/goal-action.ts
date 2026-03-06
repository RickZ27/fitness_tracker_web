"use server";
import {
    createGoal,
    getGoals,
    getGoalSummary,
    deleteGoal,
    markGoalComplete,
    markGoalAbandoned,
} from '@/lib/api/goals';
import { revalidatePath } from 'next/cache';

export const handleCreateGoal = async (data: Record<string, any>) => {
    try {
        const result = await createGoal(data);
        if (result.success) {
            revalidatePath('/user/goals');
            return { success: true, message: 'Goal created', data: result.data };
        }
        return { success: false, message: result.message || 'Failed to create goal' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleGetGoals = async (params?: Record<string, any>) => {
    try {
        const result = await getGoals(params);
        if (result.success) return { success: true, goals: result.goals, total: result.total, totalPages: result.totalPages };
        return { success: false, message: 'Failed to fetch goals' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleGetGoalSummary = async () => {
    try {
        const result = await getGoalSummary();
        if (result.success) return { success: true, data: result.data };
        return { success: false, message: result.message || 'Failed to fetch summary' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleDeleteGoal = async (id: string) => {
    try {
        const result = await deleteGoal(id);
        if (result.success) {
            revalidatePath('/user/goals');
            return { success: true, message: 'Goal deleted' };
        }
        return { success: false, message: result.message || 'Failed to delete goal' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleMarkGoalComplete = async (id: string) => {
    try {
        const result = await markGoalComplete(id);
        if (result.success) {
            revalidatePath('/user/goals');
            return { success: true, message: 'Goal completed!', data: result.data };
        }
        return { success: false, message: result.message || 'Failed to complete goal' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleMarkGoalAbandoned = async (id: string) => {
    try {
        const result = await markGoalAbandoned(id);
        if (result.success) {
            revalidatePath('/user/goals');
            return { success: true, message: 'Goal abandoned', data: result.data };
        }
        return { success: false, message: result.message || 'Failed to abandon goal' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};
