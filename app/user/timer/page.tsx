import TimerWidget from "../_compoents/TimerWidget";

export default function TimerPage() {
    return (
        <div
            className="min-h-screen"
            style={{
                background: "#040406",
                fontFamily: "'Barlow', sans-serif",
            }}
        >
            {/* Header */}
            <div
                className="border-b"
                style={{
                    borderColor: "rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.01)",
                }}
            >
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
                    <p
                        className="text-xs font-black tracking-widest uppercase mb-3"
                        style={{
                            color: "#a3ff57",
                            letterSpacing: "0.22em",
                            fontFamily: "'Barlow Condensed', sans-serif",
                        }}
                    >
                        — Workout Tools
                    </p>
                    <h1
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(2.2rem, 6vw, 4rem)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            lineHeight: 0.95,
                            color: "#f0f0f2",
                        }}
                    >
                        Stopwatch &
                        <br />
                        <span style={{ color: "#a3ff57" }}>Rest Timer</span>
                    </h1>
                    <p
                        className="mt-4 text-sm leading-relaxed max-w-md"
                        style={{ color: "rgba(240,240,242,0.4)" }}
                    >
                        Track your workout duration with the stopwatch and manage rest periods between sets with the countdown timer.
                    </p>
                </div>
            </div>

            {/* Widget */}
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
                <TimerWidget />

                {/* Usage tips */}
                <div
                    className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    {[
                        {
                            icon: "⏱",
                            title: "Stopwatch Tips",
                            tips: [
                                "Press LAP during a set to record each round",
                                "Green lap = fastest, Red lap = slowest",
                                "Timer keeps running in background",
                            ],
                        },
                        {
                            icon: "⏳",
                            title: "Rest Timer Tips",
                            tips: [
                                "Pick a preset or type mm:ss for custom duration",
                                "Ring turns red and shows REST DONE when complete",
                                "Reset and restart between every set",
                            ],
                        },
                    ].map((card) => (
                        <div
                            key={card.title}
                            className="p-5 rounded-sm"
                            style={{
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <h3
                                className="flex items-center gap-2 text-sm font-black tracking-widest uppercase mb-4"
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    letterSpacing: "0.14em",
                                    color: "#f0f0f2",
                                }}
                            >
                                <span>{card.icon}</span> {card.title}
                            </h3>
                            <ul className="flex flex-col gap-2">
                                {card.tips.map((tip) => (
                                    <li
                                        key={tip}
                                        className="flex items-start gap-2 text-sm"
                                        style={{ color: "rgba(240,240,242,0.45)" }}
                                    >
                                        <span
                                            className="mt-0.5 w-1 h-1 rounded-full shrink-0"
                                            style={{ background: "#a3ff57" }}
                                        />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}