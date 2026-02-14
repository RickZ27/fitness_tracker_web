"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/api/auth";

type ResetPasswordData = {
  otp: string;
  newPassword: string;
};

export default function ResetPassword() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    mode: "onSubmit",
  });

  const searchParams = useSearchParams();

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const submit = async (values: ResetPasswordData) => {
    setError(null);

    startTransition(async () => {
      try {
        const response = await resetPassword(searchParams.get("token") || "", values.newPassword, values.otp);

        if (response.success) {
          router.push("/login");
        }

      } catch (err: any) {
        setError(err.message || "Failed to reset password");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* OTP Field */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="otp">
          OTP
        </label>
        <input
          id="otp"
          type="text"
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          placeholder="Enter OTP"
          {...register("otp", {
            required: "OTP is required",
            minLength: {
              value: 4,
              message: "OTP must be at least 4 characters",
            },
          })}
        />
        {errors.otp && (
          <p className="text-xs text-red-600">{errors.otp.message}</p>
        )}
      </div>

      {/* New Password Field */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="newPassword">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          autoComplete="new-password"
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          placeholder="Enter new password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.newPassword && (
          <p className="text-xs text-red-600">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
      >
        Reset Password
      </button>
    </form>
  );
}
