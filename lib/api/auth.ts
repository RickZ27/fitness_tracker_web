import axiosInstance from './axios';
import { API } from './endpoints';
import { LoginData, RegisterData } from '@/app/(auth)/schema';

export const login = async (data: LoginData) => {
    const res = await axiosInstance.post(API.AUTH.LOGIN, data);
    return {
        success: res.data.success,
        // map accessToken → token so auth-action can store it simply
        token:   res.data.data?.accessToken,
        data:    res.data.data?.user,
        message: res.data.message,
    };
};

export const register = async (data: RegisterData) => {
    // Backend expects: email, username, password, fullName (optional)
    const payload = {
        email:    data.email,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
        fullName: data.fullName, // Add fullName to payload
    };
    const res = await axiosInstance.post(API.AUTH.REGISTER, payload);
    return {
        success: res.data.success,
        data:    res.data.data,
        message: res.data.message,
    };
};

export const whoAmI = async () => {
    const res = await axiosInstance.get(API.AUTH.WHOAMI);
    return {
        success: res.data.success,
        data:    res.data.data,
        message: res.data.message,
    };
};

export const updateProfile = async (formData: FormData) => {
    const res = await axiosInstance.put(API.AUTH.UPDATEPROFILE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return {
        success: res.data.success,
        data:    res.data.data,
        message: res.data.message,
    };
};

export const requestPasswordReset = async (email: string) => {
    const res = await axiosInstance.post(API.AUTH.REQUEST_PASSWORD_RESET, { email });
    return {
        success: res.data.success,
        message: res.data.message,
    };
};

export const resetPassword = async (token: string, newPassword: string) => {
    const res = await axiosInstance.post(API.AUTH.RESET_PASSWORD(token), { newPassword });
    return {
        success: res.data.success,
        message: res.data.message,
    };
};