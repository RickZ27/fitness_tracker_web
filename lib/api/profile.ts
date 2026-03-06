import axiosInstance from './axios';
import { API } from './endpoints';

export const getProfile = async () => {
    const res = await axiosInstance.get(API.PROFILE.GET);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const updateFitnessProfile = async (data: Record<string, unknown>) => {
    const res = await axiosInstance.put(API.PROFILE.UPDATE, data);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const getProfileDashboard = async () => {
    const res = await axiosInstance.get(API.PROFILE.DASHBOARD);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const logBodyMetric = async (data: Record<string, unknown>) => {
    const res = await axiosInstance.post(API.PROFILE.BODY_METRICS, data);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const getBodyMetrics = async (params?: Record<string, unknown>) => {
    const res = await axiosInstance.get(API.PROFILE.BODY_METRICS, { params });
    return {
        success:    res.data.success,
        metrics:    res.data.metrics,
        total:      res.data.total,
        totalPages: res.data.totalPages,
        page:       res.data.page,
    };
};

export const getLatestBodyMetric = async () => {
    const res = await axiosInstance.get(API.PROFILE.LATEST_METRIC);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const deleteBodyMetric = async (id: string) => {
    const res = await axiosInstance.delete(API.PROFILE.DELETE_METRIC(id));
    return { success: res.data.success, message: res.data.message };
};