import axiosInstance from './axios';
import { API } from './endpoints';

export const getAnalyticsDashboard = async (period: string = '30d') => {
    const res = await axiosInstance.get(API.ANALYTICS.DASHBOARD, { params: { period } });
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const getBodyTrend = async (period: string = '30d', groupBy: string = 'day') => {
    const res = await axiosInstance.get(API.ANALYTICS.BODY, { params: { period, groupBy } });
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const getMeasurementTrend = async (period: string = '90d') => {
    const res = await axiosInstance.get(API.ANALYTICS.MEASUREMENTS, { params: { period } });
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const getGoalAnalytics = async () => {
    const res = await axiosInstance.get(API.ANALYTICS.GOALS);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const getWorkoutAnalytics = async () => {
    const res = await axiosInstance.get(API.ANALYTICS.WORKOUTS);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};
