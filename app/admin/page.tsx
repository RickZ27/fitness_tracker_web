"use client";

import Link from "next/link";
const QUICK_LINKS = [
    {
        href: "/admin/analytics",
        icon: "📊",
        title: "Site Analytics",
        desc: "User registrations, workout stats, goal completion rates and more.",
        accent: "#a3ff57",
    },
    {
        href: "/admin/users",
        icon: "👥",
        title: "Manage Users",
        desc: "View, update, or delete user accounts. Promote users to admin.",
        accent: "#57ffd8",
    },
    {
        href: "/admin/exercises",
        icon: "🏋️",
        title: "Exercise Library",
        desc: "Create and manage the global exercise database used in workout plans.",
        accent: "#ffd657",
    },
];

const FEATURE_OVERVIEW = [
    { label: "JWT Auth", desc: "Access + refresh token rotation with secure cookie storage" },
    { label: "Role-Based Access", desc: "Admin and user roles enforced on every protected route" },
    { label: "Body Metrics", desc: "Users log weight, body fat, waist, hips, chest over time" },
    { label: "Goal Tracking", desc: "Goals auto-sync progress when metrics are logged" },
    { label: "Workout Plans", desc: "Day-by-day plans with exercises, sets, reps, and rest times" },
    { label: "Analytics", desc: "MongoDB aggregation pipelines for deep progress insights" },
    { label: "Exercise Library", desc: "Admin-managed global exercise database" },
    { label: "Password Reset", desc: "Email-based reset flow with expiring tokens" },
];

const STACK = [
    { label: "Frontend", value: "Next.js 15 · TypeScript · Tailwind" },
    { label: "Backend", value: "Node.js · Express · MongoDB" },
    { label: "Auth", value: "JWT · Bcrypt · Refresh Tokens" },
    { label: "Validation", value: "Zod · react-hook-form" },
    { label: "Testing", value: "Jest · Supertest · 50+ tests" },
    { label: "Architecture", value: "Layered: Repo → Service → Controller" },
];

export default function AdminDashboardPage() {
    return (
        <div
            className="min-h-screen"
            style={{ background: "#040406", fontFamily: "'Barlow', sans-serif", color: "#f0f0f2" }}
        >
            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <div
                className="relative border-b px-6 py-12 overflow-hidden"
                style={{
                    borderColor: "rgba(255,255,255,0.06)",
                    background: "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(255,159,87,0.07) 0%, transparent 70%)",
                }}
            >
                {/* Grid */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,159,87,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,159,87,0.03) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
                <div className="relative max-w-6xl">
                    <p
                        className="text-xs font-black tracking-widest uppercase mb-3"
                        style={{ color: "#ff9f57", letterSpacing: "0.22em", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        — Admin Panel
                    </p>
                    <h1
                        className="mb-4"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(2.5rem, 6vw, 5rem)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            lineHeight: 0.92,
                        }}
                    >
                        Welcome to the
                        <br />
                        <span style={{ color: "#ff9f57" }}>Dashboard</span>
                    </h1>
                    <p className="max-w-xl text-sm leading-relaxed" style={{ color: "rgba(240,240,242,0.45)" }}>
                        This is the control center for <strong style={{ color: "rgba(240,240,242,0.7)" }}>Fitness Tracker</strong>.
                        Manage users, maintain the exercise library, and monitor platform analytics — all from here.
                    </p>
                </div>
            </div>

            <div className="px-6 py-10 max-w-6xl flex flex-col gap-10">

                {/* ── Quick access cards ─────────────────────────────────────── */}
                <div>
                    <p
                        className="text-xs font-black tracking-widest uppercase mb-5"
                        style={{ color: "rgba(240,240,242,0.25)", letterSpacing: "0.2em", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        — Quick Access
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {QUICK_LINKS.map((card) => (
                            <Link
                                key={card.href}
                                href={card.href}
                                className="group p-6 rounded-sm flex flex-col gap-4 transition-all"
                                style={{
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = `${card.accent}30`;
                                    (e.currentTarget as HTMLElement).style.background = `${card.accent}06`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                                }}
                            >
                                <span className="text-3xl">{card.icon}</span>
                                <div className="flex flex-col gap-1.5">
                                    <h3
                                        className="font-bold text-base tracking-wide uppercase"
                                        style={{
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            color: card.accent,
                                            letterSpacing: "0.08em",
                                        }}
                                    >
                                        {card.title}
                                    </h3>
                                    <p className="text-xs leading-relaxed" style={{ color: "rgba(240,240,242,0.45)" }}>
                                        {card.desc}
                                    </p>
                                </div>
                                <span
                                    className="mt-auto text-xs font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ color: card.accent, letterSpacing: "0.14em", fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    Open →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ── Platform features ──────────────────────────────────────── */}
                <div>
                    <p
                        className="text-xs font-black tracking-widest uppercase mb-5"
                        style={{ color: "rgba(240,240,242,0.25)", letterSpacing: "0.2em", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        — Platform Features
                    </p>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                        {FEATURE_OVERVIEW.map((f) => (
                            <div
                                key={f.label}
                                className="p-5 flex flex-col gap-2"
                                style={{ background: "#040406" }}
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-1.5 h-1.5 rounded-full shrink-0"
                                        style={{ background: "#ff9f57" }}
                                    />
                                    <span
                                        className="text-xs font-black tracking-wide uppercase"
                                        style={{
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            color: "#f0f0f2",
                                            letterSpacing: "0.1em",
                                        }}
                                    >
                                        {f.label}
                                    </span>
                                </div>
                                <p className="text-xs leading-relaxed" style={{ color: "rgba(240,240,242,0.38)" }}>
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Tech stack + admin note ────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Stack */}
                    <div
                        className="rounded-sm overflow-hidden"
                        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                        <div
                            className="px-5 py-3 border-b"
                            style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
                        >
                            <span
                                className="text-xs font-black tracking-widest uppercase"
                                style={{ color: "#ff9f57", letterSpacing: "0.16em", fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                Tech Stack
                            </span>
                        </div>
                        <div className="p-5 flex flex-col gap-3">
                            {STACK.map((s) => (
                                <div
                                    key={s.label}
                                    className="flex items-start justify-between gap-4 text-sm"
                                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "0.75rem" }}
                                >
                                    <span
                                        className="text-xs font-black tracking-widest uppercase shrink-0"
                                        style={{
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            color: "rgba(240,240,242,0.3)",
                                            letterSpacing: "0.12em",
                                            minWidth: "80px",
                                        }}
                                    >
                                        {s.label}
                                    </span>
                                    <span className="text-xs text-right" style={{ color: "rgba(240,240,242,0.6)" }}>
                                        {s.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Admin info */}
                    <div className="flex flex-col gap-4">
                        {/* Role note */}
                        <div
                            className="p-5 rounded-sm flex flex-col gap-3"
                            style={{
                                background: "rgba(255,159,87,0.05)",
                                border: "1px solid rgba(255,159,87,0.15)",
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="px-2 py-0.5 text-xs font-black tracking-widest uppercase rounded-sm"
                                    style={{
                                        background: "rgba(255,159,87,0.15)",
                                        color: "#ff9f57",
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        letterSpacing: "0.12em",
                                    }}
                                >
                                    Admin Only
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,242,0.5)" }}>
                                You are logged in as an <strong style={{ color: "#ff9f57" }}>admin</strong>.
                                This panel is protected by JWT role-based middleware. Regular users
                                cannot access any <code style={{ color: "#ffd657" }}>/admin/*</code> routes.
                            </p>
                        </div>

                        {/* Architecture note */}
                        <div
                            className="p-5 rounded-sm flex flex-col gap-3 flex-1"
                            style={{
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.07)",
                            }}
                        >
                            <span
                                className="text-xs font-black tracking-widest uppercase"
                                style={{ color: "rgba(240,240,242,0.25)", letterSpacing: "0.16em", fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                Architecture
                            </span>
                            <div className="flex items-center gap-2 flex-wrap text-xs" style={{ color: "rgba(240,240,242,0.4)" }}>
                                {["Types", "DTOs", "Models", "Repositories", "Services", "Controllers", "Routes"].map((layer, i, arr) => (
                                    <span key={layer} className="flex items-center gap-2">
                                        <span
                                            className="px-2 py-1 rounded-sm font-bold"
                                            style={{
                                                background: "rgba(255,255,255,0.05)",
                                                color: "rgba(240,240,242,0.6)",
                                                fontFamily: "'Barlow Condensed', sans-serif",
                                            }}
                                        >
                                            {layer}
                                        </span>
                                        {i < arr.length - 1 && <span style={{ color: "rgba(240,240,242,0.2)" }}>→</span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}