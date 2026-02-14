"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ForgotData, forgotSchema, } from "../schema";
import { forgotPassword } from "@/lib/api/auth";
import { toast } from "react-toastify";

export default function ForgotPassword() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotData>({
        resolver: zodResolver(forgotSchema),
        mode: "onSubmit",
    });
    const [pending, setTransition] = useTransition()
    const [error, setError] = useState<string | null>(null);

    const submit = async (values: ForgotData) => {
        setError(null);
        setTransition(async () => {
            try {
                const response= await forgotPassword(values.email);
                if(response.success && response.data.token) {
                    toast.success("Reset email sent successfully! Please check your inbox.");
                    router.push(`/reset-password?token=${response.data.token}`);
                } else {
                    toast.error("Failed to send reset email");
                }
            } catch (err: Error | any) {
                setError(err.message || 'Failed to send reset email');
            }
        })
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
            <div className="space-y-1">
               <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("email")}
                    placeholder="you@example.com"
                />
                {errors.email?.message && (
                    <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
        
            </div>
            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            >
               Send email
            </button>
        </form>
    );
}
