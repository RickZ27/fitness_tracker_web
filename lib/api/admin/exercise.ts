import axiosInstance from '../axios';
import { API } from '../endpoints';

export const adminCreateExercise = async (data: Record<string, any>) => {
    const res = await axiosInstance.post(API.ADMIN.EXERCISE.CREATE, data);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const adminGetExercises = async (params?: Record<string, any>) => {
    const res = await axiosInstance.get(API.ADMIN.EXERCISE.GET_ALL, { params });
    return {
        success:    res.data.success,
        exercises:  res.data.exercises,
        total:      res.data.total,
        totalPages: res.data.totalPages,
        page:       res.data.page,
    };
};

export const adminUpdateExercise = async (id: string, data: Record<string, any>) => {
    const res = await axiosInstance.put(API.ADMIN.EXERCISE.UPDATE(id), data);
    return { success: res.data.success, data: res.data.data, message: res.data.message };
};

export const adminDeleteExercise = async (id: string) => {
    const res = await axiosInstance.delete(API.ADMIN.EXERCISE.DELETE(id));
    return { success: res.data.success, message: res.data.message };
};