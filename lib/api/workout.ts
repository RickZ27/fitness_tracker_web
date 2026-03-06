import axiosInstance from './axios';
import { API } from './endpoints';

// ─── Exercises ────────────────────────────────────────────────────────────────

export const getExercises = async (params?: Record<string, any>) => {
    const res = await axiosInstance.get(API.WORKOUT.GET_EXERCISES, { params });
    return {
        success:    res.data.success,
        exercises:  res.data.exercises,
        total:      res.data.total,
        totalPages: res.data.totalPages,
        page:       res.data.page,
    };
};
export const getExerciseById = async (id: string) => {
    const res = await axiosInstance.get(API.WORKOUT.GET_EXERCISE(id));
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

// ─── Workout Plans ────────────────────────────────────────────────────────────

export const createWorkoutPlan = async (data: Record<string, any>) => {
    const res = await axiosInstance.post(API.WORKOUT.CREATE_PLAN, data);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const getMyPlans = async (params?: Record<string, any>) => {
    const res = await axiosInstance.get(API.WORKOUT.MY_PLANS, { params });
    return {
        success:    res.data.success,
        plans:      res.data.plans,
        total:      res.data.total,
        totalPages: res.data.totalPages,
        page:       res.data.page,
    };
};

export const getPublicPlans = async (params?: Record<string, any>) => {
    const res = await axiosInstance.get(API.WORKOUT.PUBLIC_PLANS, { params });
    return {
        success:    res.data.success,
        plans:      res.data.plans,
        total:      res.data.total,
        totalPages: res.data.totalPages,
    };
};

export const getWorkoutPlanById = async (id: string) => {
    const res = await axiosInstance.get(API.WORKOUT.GET_PLAN(id));
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const updateWorkoutPlan = async (id: string, data: Record<string, any>) => {
    const res = await axiosInstance.put(API.WORKOUT.UPDATE_PLAN(id), data);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const deleteWorkoutPlan = async (id: string) => {
    const res = await axiosInstance.delete(API.WORKOUT.DELETE_PLAN(id));
    return { success: res.data.success, message: res.data.message };
};