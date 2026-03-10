import Link from "next/link";

const STATS = [
    { value: "10K+", label: "Active Users" },
    { value: "2M+", label: "Workouts Logged" },
    { value: "98%", label: "Goal Success Rate" },
    { value: "50+", label: "Exercise Types" },
];

const FEATURES = [
    {
        icon: "⚡",
        title: "Smart Goal Tracking",
        desc: "Set weight, body fat, or custom goals. Track every step. Get notified when you hit milestones.",
    },
    {
        icon: "🏋️",
        title: "Workout Plans",
        desc: "Build day-by-day plans with exercises, sets, reps, and rest times. Share publicly or keep private.",
    },
    {
        icon: "📊",
        title: "Body Metrics",
        desc: "Log weight, body fat, waist, hips, chest over time. Visualize your transformation with analytics.",
    },
    {
        icon: "🔥",
        title: "Analytics Dashboard",
        desc: "Deep insights into your progress. Trends, averages, completion rates — all in one place.",
    },
    {
        icon: "🌐",
        title: "Community Plans",
        desc: "Browse workout plans shared by other members. Get inspired. Find what works.",
    },
    {
        icon: "🔒",
        title: "Secure & Private",
        desc: "JWT auth, refresh tokens, and role-based access. Your data stays yours.",
    },
];

const STEPS = [
    { num: "01", title: "Create an Account", desc: "Sign up in seconds. No credit card required." },
    { num: "02", title: "Set Your Goals", desc: "Define what you're working towards. Weight loss, muscle gain, consistency." },
    { num: "03", title: "Log Your Progress", desc: "Track workouts and body metrics as you go." },
    { num: "04", title: "Crush Your Goals", desc: "Watch the analytics roll in. Celebrate every win." },
];

export default function HomePage() {
    return (
        <div
            style={{
                background: "#040406",
                color: "#f0f0f2",
                fontFamily: "'Barlow', sans-serif",
                minHeight: "100vh",
                overflowX: "hidden",
            }}
        >
            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section
                className="relative min-h-screen flex flex-col justify-center"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(163,255,87,0.12) 0%, transparent 70%)",
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

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
                    {/* Tag */}
                    <div className="flex items-center gap-3 mb-8">
                        <span
                            className="inline-block px-3 py-1 text-xs font-black tracking-widest uppercase rounded-sm"
                            style={{
                                background: "rgba(163,255,87,0.12)",
                                color: "#a3ff57",
                                border: "1px solid rgba(163,255,87,0.25)",
                                letterSpacing: "0.18em",
                                fontFamily: "'Barlow Condensed', sans-serif",
                            }}
                        >
                            Your Personal Fitness OS
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="leading-none mb-6"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(3.5rem, 10vw, 9rem)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "-0.01em",
                            lineHeight: 0.9,
                        }}
                    >
                        <span style={{ color: "#f0f0f2" }}>TRACK.</span>
                        <br />
                        <span
                            style={{
                                WebkitTextStroke: "2px #a3ff57",
                                color: "transparent",
                            }}
                        >
                            TRAIN.
                        </span>
                        <br />
                        <span style={{ color: "#a3ff57" }}>TRANSFORM.</span>
                    </h1>

                    <p
                        className="mb-10 max-w-xl"
                        style={{
                            color: "rgba(240,240,242,0.55)",
                            fontSize: "1.1rem",
                            fontWeight: 300,
                            lineHeight: 1.7,
                        }}
                    >
                        FitnessTracker is a full-stack fitness platform built for people serious about
                        results. Set goals, log workouts, track body metrics, and watch your
                        analytics grow — all in one clean dashboard.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-8 h-12 font-black text-sm tracking-widest uppercase rounded-sm transition-all hover:opacity-90"
                            style={{
                                background: "linear-gradient(135deg, #a3ff57, #57ffd8)",
                                color: "#040406",
                                fontFamily: "'Barlow Condensed', sans-serif",
                                letterSpacing: "0.12em",
                            }}
                        >
                            Start Free →
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 px-8 h-12 font-bold text-sm tracking-widest uppercase rounded-sm transition-all"
                            style={{
                                border: "1px solid rgba(255,255,255,0.15)",
                                color: "rgba(240,240,242,0.7)",
                                fontFamily: "'Barlow Condensed', sans-serif",
                                letterSpacing: "0.12em",
                            }}
                        >
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
                    <span className="text-xs tracking-widest uppercase" style={{ letterSpacing: "0.2em" }}>Scroll</span>
                    <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, #a3ff57, transparent)" }} />
                </div>
            </section>

            {/* ── STATS ─────────────────────────────────────────────────────── */}
            <section
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        {STATS.map((stat, i) => (
                            <div
                                key={stat.label}
                                className="py-10 px-6 flex flex-col gap-1"
                                style={{
                                    borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                                        fontWeight: 900,
                                        lineHeight: 1,
                                        background: "linear-gradient(135deg, #a3ff57, #57ffd8)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {stat.value}
                                </span>
                                <span
                                    className="text-xs font-semibold tracking-widest uppercase"
                                    style={{ color: "rgba(240,240,242,0.4)", letterSpacing: "0.16em" }}
                                >
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES ──────────────────────────────────────────────────── */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
                {/* Section header */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <p
                            className="text-xs font-black tracking-widest uppercase mb-4"
                            style={{ color: "#a3ff57", letterSpacing: "0.22em", fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            — Everything You Need
                        </p>
                        <h2
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                                fontWeight: 900,
                                textTransform: "uppercase",
                                lineHeight: 0.95,
                                color: "#f0f0f2",
                            }}
                        >
                            Built for
                            <br />
                            <span style={{ color: "#a3ff57" }}>Serious Athletes</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-sm" style={{ color: "rgba(240,240,242,0.45)", lineHeight: 1.7 }}>
                        Every feature designed with one goal — helping you reach yours, faster.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
                    {FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className="p-8 flex flex-col gap-4 transition-all group"
                            style={{ background: "#040406" }}
                        >
                            <span className="text-3xl">{f.icon}</span>
                            <h3
                                className="font-bold text-lg tracking-wide"
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                    color: "#f0f0f2",
                                }}
                            >
                                {f.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,242,0.45)" }}>
                                {f.desc}
                            </p>
                            <span
                                className="mt-auto text-xs font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ color: "#a3ff57", letterSpacing: "0.16em" }}
                            >
                                Learn more →
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
            <section
                style={{
                    background: "linear-gradient(180deg, #040406 0%, #070a0d 50%, #040406 100%)",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
                    <p
                        className="text-xs font-black tracking-widest uppercase mb-4"
                        style={{ color: "#57ffd8", letterSpacing: "0.22em", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        — How It Works
                    </p>
                    <h2
                        className="mb-20"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(2.5rem, 6vw, 5rem)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            lineHeight: 0.95,
                            color: "#f0f0f2",
                        }}
                    >
                        Four Steps to
                        <br />
                        <span style={{ color: "#57ffd8" }}>Your Best Self</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {STEPS.map((step) => (
                            <div key={step.num} className="flex flex-col gap-4">
                                <span
                                    style={{
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontSize: "4rem",
                                        fontWeight: 900,
                                        lineHeight: 1,
                                        WebkitTextStroke: "1px rgba(87,255,216,0.3)",
                                        color: "transparent",
                                    }}
                                >
                                    {step.num}
                                </span>
                                <div className="w-8 h-px" style={{ background: "#57ffd8" }} />
                                <h3
                                    className="font-bold text-lg"
                                    style={{
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                        color: "#f0f0f2",
                                    }}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,242,0.45)" }}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ───────────────────────────────────────────────────────── */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
                <div
                    className="rounded-sm p-12 md:p-20 relative overflow-hidden text-center flex flex-col items-center gap-6"
                    style={{
                        background: "linear-gradient(135deg, rgba(163,255,87,0.08) 0%, rgba(87,255,216,0.08) 100%)",
                        border: "1px solid rgba(163,255,87,0.15)",
                    }}
                >
                    {/* BG text */}
                    <span
                        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(6rem, 20vw, 18rem)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: "#a3ff57",
                            lineHeight: 1,
                        }}
                    >
                        GO
                    </span>

                    <p
                        className="text-xs font-black tracking-widest uppercase"
                        style={{ color: "#a3ff57", letterSpacing: "0.22em", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        — Free Forever
                    </p>

                    <h2
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(2.5rem, 7vw, 6rem)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            lineHeight: 0.95,
                            color: "#f0f0f2",
                        }}
                    >
                        Ready to
                        <br />
                        <span style={{ color: "#a3ff57" }}>Get Started?</span>
                    </h2>

                    <p className="max-w-md text-sm" style={{ color: "rgba(240,240,242,0.5)", lineHeight: 1.7 }}>
                        Join thousands of people who are already tracking their fitness journey with Fitness-Tracker.
                        No credit card. No nonsense.
                    </p>

                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 px-10 h-13 font-black text-sm tracking-widest uppercase rounded-sm mt-2"
                        style={{
                            background: "linear-gradient(135deg, #a3ff57, #57ffd8)",
                            color: "#040406",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            letterSpacing: "0.14em",
                            fontSize: "1rem",
                            padding: "0 2.5rem",
                            height: "3.25rem",
                        }}
                    >
                        Create Free Account →
                    </Link>
                </div>
            </section>

            {/* ── FOOTER ────────────────────────────────────────────────────── */}
            <footer
                className="border-t"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="flex items-center justify-center w-7 h-7 rounded-sm font-black text-xs"
                            style={{
                                background: "linear-gradient(135deg, #a3ff57, #57ffd8)",
                                color: "#040406",
                                fontFamily: "'Barlow Condensed', sans-serif",
                            }}
                        >
                            FT
                        </div>
                        <span
                            className="text-xs font-semibold tracking-widest uppercase"
                            style={{ color: "rgba(240,240,242,0.3)", letterSpacing: "0.16em" }}
                        >
                            Fitness-Tracker
                        </span>
                    </div>
                    <p className="text-xs" style={{ color: "rgba(240,240,242,0.25)" }}>
                        © 2026 Fitness-Tracker. Built with Next.js & Node.js.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/about" className="text-xs tracking-wider uppercase" style={{ color: "rgba(240,240,242,0.3)" }}>
                            About
                        </Link>
                        <Link href="/login" className="text-xs tracking-wider uppercase" style={{ color: "rgba(240,240,242,0.3)" }}>
                            Login
                        </Link>
                        <Link href="/register" className="text-xs tracking-wider uppercase" style={{ color: "#a3ff57" }}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}