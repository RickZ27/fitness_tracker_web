import { API } from "../endpoints";
import axios from "../axios";

export const getAdminAnalytics = async () => {
    try {
        const response = await axios.get(API.ADMIN.ANALYTICS.GET);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(
            error.response?.data?.message || error.message || "Get analytics failed"
        );
    }
};