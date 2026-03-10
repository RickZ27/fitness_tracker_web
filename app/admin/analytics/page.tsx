"use client";

import { useEffect, useState, useTransition } from "react";
import { handleGetAdminAnalytics } from "@/lib/actions/admin/analytics-action";

// ─── Mini bar chart (pure CSS) ────────────────────────────────────────────────
function BarChart({ data, color = "#a3ff57" }: { data: { label: string; count: number }[]; color?: string }) {
    const max = Math.max(...data.map((d) => d.count), 1);
    return (
        <div className="flex items-end gap-2 h-32 w-full">
            {data.map((d) => {
                const pct = (d.count / max) * 100;
                return (
                    <div key={d.label} className="flex flex-col items-center gap-1 flex-1">
                        <span
                            className="text-xs font-black"
                            style={{ color, fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            {d.count > 0 ? d.count : ""}
                        </span>
                        <div className="w-full rounded-sm relative" style={{ height: "80px", background: "rgba(255,255,255,0.05)" }}>
                            <div
                                className="absolute bottom-0 left-0 right-0 rounded-sm transition-all duration-700"
                                style={{
                                    height: `${pct}%`,
                                    background: pct > 0
                                        ? `linear-gradient(to top, ${color}, ${color}88)`
                                        : "transparent",
                                    minHeight: d.count > 0 ? "4px" : "0",
                                }}
                            />
                        </div>
                        <span
                            className="text-xs"
                            style={{ color: "rgba(240,240,242,0.35)", fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            {d.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent = "#a3ff57" }: { label: string; value: string | number; sub?: string; accent?: string }) {
    return (
        <div
            className="p-5 rounded-sm flex flex-col gap-2"
            style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
            }}
        >
            <span
                className="text-xs font-black tracking-widest uppercase"
                style={{ color: "rgba(240,240,242,0.35)", letterSpacing: "0.14em", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
                {label}
            </span>
            <span
                style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "2.6rem",
                    fontWeight: 900,
                    lineHeight: 1,
                    color: accent,
                }}
            >
                {value}
            </span>
            {sub && (
                <span className="text-xs" style={{ color: "rgba(240,240,242,0.3)" }}>{sub}</span>
            )}
        </div>
    );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div
            className="rounded-sm overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
            <div
                className="px-5 py-3 border-b flex items-center gap-3"
                style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
            >
                <span
                    className="text-xs font-black tracking-widest uppercase"
                    style={{ color: "#a3ff57", letterSpacing: "0.16em", fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                    {title}
                </span>
            </div>
            <div className="p-5">{children}</div>
        </div>
    );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div
            className={`rounded-sm animate-pulse ${className}`}
            style={{ background: "rgba(255,255,255,0.06)" }}
        />
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminAnalyticsPage() {
    const [data, setData] = useState<Record<string, any> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [pending, startTransition] = useTransition();

    const load = () => {
        startTransition(async () => {
            const res = await handleGetAdminAnalytics();
            if (res.success) setData(res.data);
            else setError(res.message);
        });
    };

    useEffect(() => { load(); }, []);

    const overview = data?.overview;
    const userChart: { label: string; count: number }[] = data?.userRegistrations || [];
    const workoutChart: { label: string; count: number }[] = data?.workoutsCreated || [];
    const goalStats = data?.goalStats;
    const popular: { name: string; count: number }[] = data?.popularExercises || [];
    const recentUsers: Record<string, any>[] = data?.recentUsers || [];

    return (
        <div
            className="min-h-screen"
            style={{ background: "#040406", fontFamily: "'Barlow', sans-serif", color: "#f0f0f2" }}
        >
            {/* Header */}
            <div
                className="border-b px-6 py-8"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
                <p
                    className="text-xs font-black tracking-widest uppercase mb-2"
                    style={{ color: "#a3ff57", letterSpacing: "0.22em", fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                    — Admin Panel
                </p>
                <div className="flex items-center justify-between">
                    <h1
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(1.8rem, 4vw, 3rem)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            lineHeight: 1,
                            color: "#f0f0f2",
                        }}
                    >
                        Site Analytics
                    </h1>
                    <button
                        onClick={load}
                        disabled={pending}
                        className="px-4 h-9 text-xs font-black tracking-widest uppercase rounded-sm transition-all"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            letterSpacing: "0.12em",
                            background: "rgba(163,255,87,0.08)",
                            border: "1px solid rgba(163,255,87,0.2)",
                            color: pending ? "rgba(163,255,87,0.3)" : "#a3ff57",
                            cursor: pending ? "not-allowed" : "pointer",
                        }}
                    >
                        {pending ? "Loading..." : "↻ Refresh"}
                    </button>
                </div>
            </div>

            <div className="px-6 py-8 flex flex-col gap-8 max-w-6xl">

                {error && (
                    <div
                        className="px-4 py-3 rounded-sm text-sm"
                        style={{ background: "rgba(255,60,60,0.08)", border: "1px solid rgba(255,60,60,0.2)", color: "#ff6b6b" }}
                    >
                        {error}
                    </div>
                )}

                {/* ── Overview stats ── */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {pending || !overview ? (
                        Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28" />)
                    ) : (
                        <>
                            <StatCard label="Total Users" value={overview.totalUsers} sub={`${overview.adminCount} admin`} />
                            <StatCard label="Active / Week" value={overview.activeThisWeek} accent="#57ffd8" />
                            <StatCard label="Workout Plans" value={overview.totalWorkouts} accent="#ffd657" />
                            <StatCard label="Goals Set" value={overview.totalGoals} accent="#ff9f57" />
                            <StatCard label="Metrics Logged" value={overview.totalMetrics} accent="#c57fff" />
                            <StatCard
                                label="Goal Rate"
                                value={`${goalStats?.completionRate ?? 0}%`}
                                sub={`${goalStats?.completed ?? 0} completed`}
                                accent="#a3ff57"
                            />
                        </>
                    )}
                </div>

                {/* ── Charts row ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Section title="New Users — Last 6 Months">
                        {pending || !data ? (
                            <Skeleton className="h-40" />
                        ) : (
                            <BarChart data={userChart} color="#a3ff57" />
                        )}
                    </Section>

                    <Section title="Workout Plans — Last 6 Months">
                        {pending || !data ? (
                            <Skeleton className="h-40" />
                        ) : (
                            <BarChart data={workoutChart} color="#57ffd8" />
                        )}
                    </Section>
                </div>

                {/* ── Goal breakdown + Popular exercises ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Goal breakdown */}
                    <Section title="Goal Status Breakdown">
                        {pending || !goalStats ? (
                            <Skeleton className="h-32" />
                        ) : (
                            <div className="flex flex-col gap-3">
                                {(goalStats.breakdown as { _id: string; count: number }[]).map((g) => {
                                    const pct = goalStats.total > 0 ? (g.count / goalStats.total) * 100 : 0;
                                    const color = g._id === "completed" ? "#a3ff57" : g._id === "in-progress" ? "#57ffd8" : "rgba(240,240,242,0.3)";
                                    return (
                                        <div key={g._id} className="flex flex-col gap-1">
                                            <div className="flex items-center justify-between text-xs">
                                                <span
                                                    className="font-black tracking-widest uppercase"
                                                    style={{ color, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.12em" }}
                                                >
                                                    {g._id}
                                                </span>
                                                <span style={{ color: "rgba(240,240,242,0.4)" }}>
                                                    {g.count} ({Math.round(pct)}%)
                                                </span>
                                            </div>
                                            <div className="w-full h-2 rounded-sm" style={{ background: "rgba(255,255,255,0.06)" }}>
                                                <div
                                                    className="h-full rounded-sm transition-all duration-700"
                                                    style={{ width: `${pct}%`, background: color }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                                {goalStats.breakdown.length === 0 && (
                                    <p className="text-sm" style={{ color: "rgba(240,240,242,0.3)" }}>No goals data yet.</p>
                                )}
                            </div>
                        )}
                    </Section>

                    {/* Popular exercises */}
                    <Section title="Top 5 Exercises">
                        {pending || !data ? (
                            <Skeleton className="h-32" />
                        ) : popular.length === 0 ? (
                            <p className="text-sm" style={{ color: "rgba(240,240,242,0.3)" }}>No workout data yet.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {popular.map((ex, i) => {
                                    const maxCount = popular[0]?.count || 1;
                                    const pct = (ex.count / maxCount) * 100;
                                    return (
                                        <div key={ex.name || i} className="flex items-center gap-3">
                                            <span
                                                className="w-5 text-xs font-black text-right shrink-0"
                                                style={{ color: "rgba(240,240,242,0.25)", fontFamily: "'Barlow Condensed', sans-serif" }}
                                            >
                                                #{i + 1}
                                            </span>
                                            <div className="flex-1 flex flex-col gap-1">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span style={{ color: "#f0f0f2" }}>{ex.name || "Unknown"}</span>
                                                    <span style={{ color: "rgba(240,240,242,0.4)" }}>{ex.count}×</span>
                                                </div>
                                                <div className="w-full h-1.5 rounded-sm" style={{ background: "rgba(255,255,255,0.06)" }}>
                                                    <div
                                                        className="h-full rounded-sm"
                                                        style={{
                                                            width: `${pct}%`,
                                                            background: i === 0 ? "#a3ff57" : "rgba(163,255,87,0.4)",
                                                            transition: "width 0.7s ease",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Section>
                </div>

                {/* ── Recent users ── */}
                <Section title="Recently Joined Users">
                    {pending || !data ? (
                        <Skeleton className="h-40" />
                    ) : recentUsers.length === 0 ? (
                        <p className="text-sm" style={{ color: "rgba(240,240,242,0.3)" }}>No users yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                                        {["Name", "Username", "Email", "Role", "Joined"].map((h) => (
                                            <th
                                                key={h}
                                                className="pb-3 text-left text-xs font-black tracking-widest uppercase"
                                                style={{
                                                    color: "rgba(240,240,242,0.3)",
                                                    letterSpacing: "0.14em",
                                                    fontFamily: "'Barlow Condensed', sans-serif",
                                                }}
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentUsers.map((u) => (
                                        <tr
                                            key={u._id}
                                            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                                        >
                                            <td className="py-3" style={{ color: "#f0f0f2" }}>{u.fullName}</td>
                                            <td className="py-3" style={{ color: "rgba(240,240,242,0.5)" }}>@{u.username}</td>
                                            <td className="py-3" style={{ color: "rgba(240,240,242,0.5)" }}>{u.email}</td>
                                            <td className="py-3">
                                                <span
                                                    className="px-2 py-0.5 rounded-sm text-xs font-black tracking-widest uppercase"
                                                    style={{
                                                        fontFamily: "'Barlow Condensed', sans-serif",
                                                        background: u.role === "admin" ? "rgba(255,157,87,0.12)" : "rgba(163,255,87,0.08)",
                                                        color: u.role === "admin" ? "#ff9f57" : "#a3ff57",
                                                        border: `1px solid ${u.role === "admin" ? "rgba(255,157,87,0.2)" : "rgba(163,255,87,0.15)"}`,
                                                    }}
                                                >
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="py-3 text-xs" style={{ color: "rgba(240,240,242,0.4)" }}>
                                                {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Section>
            </div>
        </div>
    );
}