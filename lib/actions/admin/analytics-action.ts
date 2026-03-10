"use server";

import { cookies } from "next/headers";
import { getAdminAnalytics } from "../../api/admin/analytics";

export async function handleGetAdminAnalytics() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value || "";
        const response = await getAdminAnalytics(token);
        return { success: true, data: response.data, message: response.message };
    } catch (err: any) {
        return {
            success: false,
            data: null,
            message: err.response?.data?.message || err.message || "Failed to fetch analytics",
        };
    }
}