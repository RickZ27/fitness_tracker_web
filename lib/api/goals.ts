import axiosInstance from './axios';
import { API } from './endpoints';

export const createGoal = async (data: Record<string, any>) => {
    const res = await axiosInstance.post(API.GOALS.CREATE, data);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const getGoals = async (params?: Record<string, any>) => {
    const res = await axiosInstance.get(API.GOALS.GET_ALL, { params });
    return {
        success:    res.data.success,
        goals:      res.data.goals,
        total:      res.data.total,
        totalPages: res.data.totalPages,
        page:       res.data.page,
    };
};

export const getGoalSummary = async () => {
    const res = await axiosInstance.get(API.GOALS.SUMMARY);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const getGoalById = async (id: string) => {
    const res = await axiosInstance.get(API.GOALS.GET_ONE(id));
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const updateGoal = async (id: string, data: Record<string, any>) => {
    const res = await axiosInstance.put(API.GOALS.UPDATE(id), data);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const deleteGoal = async (id: string) => {
    const res = await axiosInstance.delete(API.GOALS.DELETE(id));
    return { success: res.data.success, message: res.data.message };
};

export const markGoalComplete = async (id: string) => {
    const res = await axiosInstance.patch(API.GOALS.COMPLETE(id));
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const markGoalAbandoned = async (id: string) => {
    const res = await axiosInstance.patch(API.GOALS.ABANDON(id));
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};
