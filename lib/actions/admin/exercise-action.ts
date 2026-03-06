"use server";
import {
    adminCreateExercise,
    adminGetExercises,
    adminUpdateExercise,
    adminDeleteExercise,
} from '@/lib/api/admin/exercise';
import { revalidatePath } from 'next/cache';

export const handleAdminCreateExercise = async (data: Record<string, any>) => {
    try {
        const result = await adminCreateExercise(data);
        if (result.success) {
            revalidatePath('/admin/exercises');
            return { success: true, message: 'Exercise created', data: result.data };
        }
        return { success: false, message: result.message || 'Failed to create exercise' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleAdminGetExercises = async (params?: Record<string, any>) => {
    try {
        const result = await adminGetExercises(params);
        if (result.success) return { success: true, exercises: result.exercises, total: result.total, totalPages: result.totalPages };
        return { success: false, message: 'Failed to fetch exercises' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleAdminDeleteExercise = async (id: string) => {
    try {
        const result = await adminDeleteExercise(id);
        if (result.success) {
            revalidatePath('/admin/exercises');
            return { success: true, message: 'Exercise deleted' };
        }
        return { success: false, message: result.message || 'Failed to delete exercise' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};
