"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schema";
import { handleLogin } from "@/lib/actions/auth-action";

export default function LoginForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
    });
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const submit = async (values: LoginData) => {
        setError(null);
        startTransition(async () => {
            try {
                const response = await handleLogin(values);
                if (!response.success) throw new Error(response.message);
                if (response.data?.role === "admin") return router.replace("/admin");
                if (response.data?.role === "user") return router.replace("/user/dashboard");
                return router.replace("/");
            } catch (err: Error | any) {
                setError(err.message || "Login failed");
            }
        });
    };

    return (
        <div
            className="min-h-screen flex"
            style={{
                background: "#040406",
                fontFamily: "'Barlow', sans-serif",
            }}
        >
            {/* ── LEFT: Image Panel ─────────────────────────────────────────── */}
            <div
                className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #071a0e 0%, #040406 60%)",
                }}
            >
                {/* Grid bg */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(163,255,87,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(163,255,87,0.04) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Glow */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        width: "600px",
                        height: "600px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(163,255,87,0.10) 0%, transparent 70%)",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />

                {/* Logo */}
                <div className="relative flex items-center gap-3">
                    <div
                        className="flex items-center justify-center w-9 h-9 rounded-sm font-black text-sm"
                        style={{
                            background: "linear-gradient(135deg, #a3ff57, #57ffd8)",
                            color: "#040406",
                            fontFamily: "'Barlow Condensed', sans-serif",
                        }}
                    >
                        FT
                    </div>
                    <span
                        className="font-bold tracking-widest uppercase text-sm text-white"
                        style={{ letterSpacing: "0.18em", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        Fitness-Tracker
                    </span>
                </div>

                {/* Center content */}
                <div className="relative flex flex-col gap-8">
                    {/* Big headline */}
                    <h2
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(3rem, 5vw, 5.5rem)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            lineHeight: 0.92,
                            color: "#f0f0f2",
                        }}
                    >
                        Welcome
                        <br />
                        <span style={{ color: "#a3ff57" }}>Back.</span>
                    </h2>

                    <p className="max-w-xs text-sm leading-relaxed" style={{ color: "rgba(240,240,242,0.45)" }}>
                        Your progress is waiting. Log in to pick up right where you left off.
                    </p>

                    
                </div>

                {/* Testimonial */}
                <div
                    className="relative p-6 rounded-sm"
                    style={{
                        background: "rgba(163,255,87,0.05)",
                        border: "1px solid rgba(163,255,87,0.12)",
                    }}
                >
                    <div className="w-6 h-px mb-4" style={{ background: "#a3ff57" }} />
                    <p className="text-sm leading-relaxed italic" style={{ color: "rgba(240,240,242,0.6)" }}>
                        &quot;FitnessTracker completely changed how I approach training. Seeing my metrics improve
                        week by week keeps me motivated like nothing else.&quot;
                    </p>
                    <p className="mt-4 text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(240,240,242,0.25)" }}>
                        — Alex M., 6 months streak
                    </p>
                </div>
            </div>

            {/* ── RIGHT: Form Panel ─────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12">

                {/* Mobile logo */}
                <div className="lg:hidden flex items-center gap-3 mb-10">
                    <div
                        className="flex items-center justify-center w-8 h-8 rounded-sm font-black text-xs"
                        style={{
                            background: "linear-gradient(135deg, #a3ff57, #57ffd8)",
                            color: "#040406",
                            fontFamily: "'Barlow Condensed', sans-serif",
                        }}
                    >
                        FT
                    </div>
                    <span
                        className="font-bold tracking-widest uppercase text-sm text-white"
                        style={{ letterSpacing: "0.16em", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        Fitness-Tracker
                    </span>
                </div>

                <div className="w-full max-w-sm mx-auto lg:mx-0">

                    {/* Heading */}
                    <div className="mb-8">
                        <p
                            className="text-xs font-black tracking-widest uppercase mb-3"
                            style={{ color: "#a3ff57", letterSpacing: "0.22em", fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            — Sign In
                        </p>
                        <h1
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: "2.8rem",
                                fontWeight: 900,
                                textTransform: "uppercase",
                                lineHeight: 0.95,
                                color: "#f0f0f2",
                            }}
                        >
                            Log In to
                            <br />
                            <span style={{ color: "#a3ff57" }}>Your Account</span>
                        </h1>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">

                        {error && (
                            <div
                                className="px-4 py-3 rounded-sm text-sm"
                                style={{
                                    background: "rgba(255,60,60,0.08)",
                                    border: "1px solid rgba(255,60,60,0.2)",
                                    color: "#ff6b6b",
                                }}
                            >
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                className="text-xs font-black tracking-widest uppercase"
                                style={{ color: "rgba(240,240,242,0.5)", letterSpacing: "0.14em", fontFamily: "'Barlow Condensed', sans-serif" }}
                                htmlFor="email"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                {...register("email")}
                                className="h-11 w-full px-4 text-sm outline-none rounded-sm transition-all"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: errors.email
                                        ? "1px solid rgba(255,60,60,0.5)"
                                        : "1px solid rgba(255,255,255,0.10)",
                                    color: "#f0f0f2",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(163,255,87,0.5)";
                                    e.currentTarget.style.background = "rgba(163,255,87,0.04)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = errors.email
                                        ? "rgba(255,60,60,0.5)"
                                        : "rgba(255,255,255,0.10)";
                                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                }}
                            />
                            {errors.email?.message && (
                                <p className="text-xs" style={{ color: "#ff6b6b" }}>{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <label
                                    className="text-xs font-black tracking-widest uppercase"
                                    style={{ color: "rgba(240,240,242,0.5)", letterSpacing: "0.14em", fontFamily: "'Barlow Condensed', sans-serif" }}
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <Link
                                    href="/forget-password"
                                    className="text-xs font-semibold tracking-wider"
                                    style={{ color: "#a3ff57", letterSpacing: "0.08em" }}
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                {...register("password")}
                                className="h-11 w-full px-4 text-sm outline-none rounded-sm transition-all"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: errors.password
                                        ? "1px solid rgba(255,60,60,0.5)"
                                        : "1px solid rgba(255,255,255,0.10)",
                                    color: "#f0f0f2",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(163,255,87,0.5)";
                                    e.currentTarget.style.background = "rgba(163,255,87,0.04)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = errors.password
                                        ? "rgba(255,60,60,0.5)"
                                        : "rgba(255,255,255,0.10)";
                                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                }}
                            />
                            {errors.password?.message && (
                                <p className="text-xs" style={{ color: "#ff6b6b" }}>{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting || pending}
                            className="h-11 w-full font-black text-sm tracking-widest uppercase rounded-sm transition-all mt-1"
                            style={{
                                background: isSubmitting || pending
                                    ? "rgba(163,255,87,0.4)"
                                    : "linear-gradient(135deg, #a3ff57, #57ffd8)",
                                color: "#040406",
                                fontFamily: "'Barlow Condensed', sans-serif",
                                letterSpacing: "0.14em",
                                cursor: isSubmitting || pending ? "not-allowed" : "pointer",
                            }}
                        >
                            {isSubmitting || pending ? "Signing in..." : "Sign In →"}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-1">
                            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                            <span className="text-xs" style={{ color: "rgba(240,240,242,0.25)" }}>or</span>
                            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                        </div>

                        {/* Sign up link */}
                        <p className="text-center text-sm" style={{ color: "rgba(240,240,242,0.4)" }}>
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="font-bold"
                                style={{ color: "#a3ff57" }}
                            >
                                Create one free →
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}