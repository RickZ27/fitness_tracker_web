"use server";
import {
    getProfile,
    updateFitnessProfile,
    getProfileDashboard,
    logBodyMetric,
    getBodyMetrics,
    getLatestBodyMetric,
    deleteBodyMetric,
} from '@/lib/api/profile';
import { revalidatePath } from 'next/cache';

export const handleGetProfile = async () => {
    try {
        const result = await getProfile();
        if (result.success) return { success: true, data: result.data };
        return { success: false, message: result.message || 'Failed to fetch profile' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleUpdateFitnessProfile = async (data: Record<string, any>) => {
    try {
        const result = await updateFitnessProfile(data);
        if (result.success) {
            revalidatePath('/user/profile');
            return { success: true, message: 'Profile updated', data: result.data };
        }
        return { success: false, message: result.message || 'Failed to update profile' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleGetProfileDashboard = async () => {
    try {
        const result = await getProfileDashboard();
        if (result.success) return { success: true, data: result.data };
        return { success: false, message: result.message || 'Failed to fetch dashboard' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleLogBodyMetric = async (data: Record<string, any>) => {
    try {
        const result = await logBodyMetric(data);
        if (result.success) {
            revalidatePath('/user/dashboard');
            revalidatePath('/user/analytics');
            return { success: true, message: 'Body metric logged', data: result.data };
        }
        return { success: false, message: result.message || 'Failed to log metric' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleGetBodyMetrics = async (params?: Record<string, any>) => {
    try {
        const result = await getBodyMetrics(params);
        if (result.success) {
            return { success: true, metrics: result.metrics, total: result.total, totalPages: result.totalPages, page: result.page };
        }
        return { success: false, message: 'Failed to fetch metrics' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleGetLatestBodyMetric = async () => {
    try {
        const result = await getLatestBodyMetric();
        if (result.success) return { success: true, data: result.data };
        return { success: false, message: result.message || 'Failed to fetch latest metric' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleDeleteBodyMetric = async (id: string) => {
    try {
        const result = await deleteBodyMetric(id);
        if (result.success) {
            revalidatePath('/user/dashboard');
            return { success: true, message: 'Metric deleted' };
        }
        return { success: false, message: result.message || 'Failed to delete metric' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};
