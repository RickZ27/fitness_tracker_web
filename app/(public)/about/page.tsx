import Link from "next/link";

const TECH_STACK = [
    { label: "Frontend", items: ["Next.js 15", "TypeScript", "Tailwind CSS", "React Hook Form", "Zod"] },
    { label: "Backend", items: ["Node.js", "Express", "MongoDB", "JWT Auth", "Bcrypt"] },
    { label: "Mobile", items: ["Flutter", "Riverpod", "Dio", "Clean Architecture"] },
    { label: "Testing", items: ["Jest", "Supertest", "50+ Tests", "Unit & Integration"] },
];

const VALUES = [
    {
        icon: "01",
        title: "Performance First",
        desc: "Every query is optimised. Every endpoint is lean. We don't ship slow.",
    },
    {
        icon: "02",
        title: "Privacy by Design",
        desc: "Your fitness data belongs to you. We use JWT with refresh token rotation and role-based access.",
    },
    {
        icon: "03",
        title: "Clean Architecture",
        desc: "Types → DTOs → Models → Repositories → Services → Controllers. No shortcuts.",
    },
    {
        icon: "04",
        title: "Built to Scale",
        desc: "MongoDB aggregation pipelines, paginated APIs, and a modular codebase ready to grow.",
    },
];

export default function AboutPage() {
    return (
        <div
            style={{
                background: "#040406",
                color: "#f0f0f2",
                fontFamily: "'Barlow', sans-serif",
                minHeight: "100vh",
            }}
        >
            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section
                className="relative"
                style={{
                    background: "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(87,255,216,0.10) 0%, transparent 70%)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                {/* Grid bg */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(87,255,216,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(87,255,216,0.03) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
                    <p
                        className="text-xs font-black tracking-widest uppercase mb-6"
                        style={{ color: "#57ffd8", letterSpacing: "0.22em", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        — Our Story
                    </p>
                    <h1
                        className="mb-8"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(3rem, 9vw, 8rem)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            lineHeight: 0.92,
                        }}
                    >
                        <span style={{ color: "#f0f0f2" }}>About</span>
                        <br />
                        <span
                            style={{
                                WebkitTextStroke: "2px #57ffd8",
                                color: "transparent",
                            }}
                        >
                            FitTracker
                        </span>
                    </h1>
                    <p
                        className="max-w-2xl text-base leading-relaxed"
                        style={{ color: "rgba(240,240,242,0.5)", fontWeight: 300 }}
                    >
                        FitTracker is a full-stack fitness management platform built as an academic
                        project at Coventry University. It combines a Flutter mobile app, a Next.js
                        web frontend, and a Node.js / MongoDB backend, all following clean architecture
                        principles from the ground up.
                    </p>
                </div>
            </section>

            {/* ── MISSION ───────────────────────────────────────────────────── */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p
                            className="text-xs font-black tracking-widest uppercase mb-5"
                            style={{ color: "#a3ff57", letterSpacing: "0.22em", fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            — Mission
                        </p>
                        <h2
                            className="mb-6"
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: "clamp(2rem, 5vw, 4rem)",
                                fontWeight: 900,
                                textTransform: "uppercase",
                                lineHeight: 0.95,
                                color: "#f0f0f2",
                            }}
                        >
                            Make fitness
                            <br />
                            <span style={{ color: "#a3ff57" }}>measurable</span>
                        </h2>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(240,240,242,0.5)" }}>
                            Most people quit their fitness goals because they can&apos;t see progress. FitTracker
                            makes progress visible — every log, every metric, every completed workout adds
                            up into a picture of transformation.
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,242,0.5)" }}>
                            We built this to solve a real problem: there was no single platform that combined
                            goal tracking, body metrics, workout planning, and analytics in a clean, fast,
                            privacy-respecting package.
                        </p>
                    </div>

                    {/* Quote block */}
                    <div
                        className="p-10 rounded-sm"
                        style={{
                            background: "rgba(163,255,87,0.05)",
                            border: "1px solid rgba(163,255,87,0.12)",
                        }}
                    >
                        <div className="w-8 h-1 mb-6" style={{ background: "#a3ff57" }} />
                        <blockquote
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                lineHeight: 1.2,
                                color: "#f0f0f2",
                            }}
                        >
                            &quot;You can&apos;t improve what you don&apos;t measure. FitTracker makes sure you
                            measure everything.&quot;
                        </blockquote>
                        <p className="mt-6 text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(240,240,242,0.3)" }}>
                            — FitTracker Team
                        </p>
                    </div>
                </div>
            </section>

            {/* ── VALUES ────────────────────────────────────────────────────── */}
            <section
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    background: "#070a0d",
                }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <p
                        className="text-xs font-black tracking-widest uppercase mb-5"
                        style={{ color: "#57ffd8", letterSpacing: "0.22em", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        — What We Stand For
                    </p>
                    <h2
                        className="mb-16"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(2rem, 5vw, 4rem)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            lineHeight: 0.95,
                            color: "#f0f0f2",
                        }}
                    >
                        Our Core
                        <br />
                        <span style={{ color: "#57ffd8" }}>Principles</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
                        {VALUES.map((v) => (
                            <div
                                key={v.title}
                                className="p-8 flex flex-col gap-4"
                                style={{ background: "#070a0d" }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontSize: "3.5rem",
                                        fontWeight: 900,
                                        lineHeight: 1,
                                        WebkitTextStroke: "1px rgba(87,255,216,0.3)",
                                        color: "transparent",
                                    }}
                                >
                                    {v.icon}
                                </span>
                                <h3
                                    className="font-bold text-xl"
                                    style={{
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                        color: "#f0f0f2",
                                    }}
                                >
                                    {v.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,242,0.45)" }}>
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TECH STACK ────────────────────────────────────────────────── */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <p
                    className="text-xs font-black tracking-widest uppercase mb-5"
                    style={{ color: "#a3ff57", letterSpacing: "0.22em", fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                    — Under the Hood
                </p>
                <h2
                    className="mb-16"
                    style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "clamp(2rem, 5vw, 4rem)",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        lineHeight: 0.95,
                        color: "#f0f0f2",
                    }}
                >
                    The Tech
                    <br />
                    <span style={{ color: "#a3ff57" }}>Stack</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TECH_STACK.map((group) => (
                        <div
                            key={group.label}
                            className="p-6 rounded-sm flex flex-col gap-4"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                            }}
                        >
                            <h3
                                className="text-xs font-black tracking-widest uppercase"
                                style={{
                                    color: "#a3ff57",
                                    letterSpacing: "0.18em",
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                }}
                            >
                                {group.label}
                            </h3>
                            <div className="flex flex-col gap-2">
                                {group.items.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm"
                                        style={{ color: "rgba(240,240,242,0.65)" }}
                                    >
                                        <span
                                            className="w-1 h-1 rounded-full shrink-0"
                                            style={{ background: "#a3ff57" }}
                                        />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ───────────────────────────────────────────────────────── */}
            <section
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    background: "#070a0d",
                }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h2
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                                fontWeight: 900,
                                textTransform: "uppercase",
                                lineHeight: 0.95,
                                color: "#f0f0f2",
                            }}
                        >
                            Ready to start
                            <br />
                            <span style={{ color: "#a3ff57" }}>your journey?</span>
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-3 shrink-0">
                        <Link
                            href="/register"
                            className="inline-flex items-center px-8 h-12 font-black text-sm tracking-widest uppercase rounded-sm"
                            style={{
                                background: "linear-gradient(135deg, #a3ff57, #57ffd8)",
                                color: "#040406",
                                fontFamily: "'Barlow Condensed', sans-serif",
                                letterSpacing: "0.12em",
                            }}
                        >
                            Get Started →
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center px-8 h-12 font-bold text-sm tracking-widest uppercase rounded-sm"
                            style={{
                                border: "1px solid rgba(255,255,255,0.12)",
                                color: "rgba(240,240,242,0.6)",
                                fontFamily: "'Barlow Condensed', sans-serif",
                                letterSpacing: "0.12em",
                            }}
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}