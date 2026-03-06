"use server";
import {
    getAnalyticsDashboard,
    getBodyTrend,
    getMeasurementTrend,
    getGoalAnalytics,
    getWorkoutAnalytics,
} from '@/lib/api/analytics';

export const handleGetAnalyticsDashboard = async (period: string = '30d') => {
    try {
        const result = await getAnalyticsDashboard(period);
        if (result.success) return { success: true, data: result.data };
        return { success: false, message: result.message || 'Failed to fetch analytics' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleGetBodyTrend = async (period: string = '30d', groupBy: string = 'day') => {
    try {
        const result = await getBodyTrend(period, groupBy);
        if (result.success) return { success: true, data: result.data };
        return { success: false, message: result.message || 'Failed to fetch body trend' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleGetGoalAnalytics = async () => {
    try {
        const result = await getGoalAnalytics();
        if (result.success) return { success: true, data: result.data };
        return { success: false, message: result.message || 'Failed to fetch goal analytics' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};

export const handleGetWorkoutAnalytics = async () => {
    try {
        const result = await getWorkoutAnalytics();
        if (result.success) return { success: true, data: result.data };
        return { success: false, message: result.message || 'Failed to fetch workout analytics' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
};
