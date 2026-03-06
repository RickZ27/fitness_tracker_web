"use server";
import {
    getExercises,
    getExerciseById,
    createWorkoutPlan,
    getMyPlans,
    getPublicPlans,
    getWorkoutPlanById,
    deleteWorkoutPlan,
} from '@/lib/api/workout';
import { revalidatePath } from 'next/cache';

export const handleGetExercises = async (params?: Record<string, any>) => {
    try {
        const result = await getExercises(params);
        if (result.success) return { success: true, exercises: result.exercises, total: result.total, totalPages: result.totalPages };
        return { success: false, message: 'Failed to fetch exercises' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleGetExerciseById = async (id: string) => {
    try {
        const result = await getExerciseById(id);
        if (result.success) return { success: true, data: result.data };
        return { success: false, message: result.message || 'Exercise not found' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleCreateWorkoutPlan = async (data: Record<string, any>) => {
    try {
        const result = await createWorkoutPlan(data);
        if (result.success) {
            revalidatePath('/user/workout');
            return { success: true, message: 'Workout plan created', data: result.data };
        }
        return { success: false, message: result.message || 'Failed to create plan' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleGetMyPlans = async (params?: Record<string, any>) => {
    try {
        const result = await getMyPlans(params);
        if (result.success) return { success: true, plans: result.plans, total: result.total, totalPages: result.totalPages };
        return { success: false, message: 'Failed to fetch plans' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleGetPublicPlans = async (params?: Record<string, any>) => {
    try {
        const result = await getPublicPlans(params);
        if (result.success) return { success: true, plans: result.plans, total: result.total };
        return { success: false, message: 'Failed to fetch public plans' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleGetWorkoutPlanById = async (id: string) => {
    try {
        const result = await getWorkoutPlanById(id);
        if (result.success) return { success: true, data: result.data };
        return { success: false, message: result.message || 'Plan not found' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleDeleteWorkoutPlan = async (id: string) => {
    try {
        const result = await deleteWorkoutPlan(id);
        if (result.success) {
            revalidatePath('/user/workout');
            return { success: true, message: 'Plan deleted' };
        }
        return { success: false, message: result.message || 'Failed to delete plan' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};
