"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(ms: number) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    if (h > 0) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

function formatCountdown(ms: number) {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const PRESETS = [15, 30, 45, 60, 90, 120, 180, 300];

// ─── Stopwatch Tab ─────────────────────────────────────────────────────────────
function Stopwatch() {
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState<{ lap: number; split: number; total: number }[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startRef = useRef<number>(0);
    const baseRef = useRef<number>(0);
    const lastLapRef = useRef<number>(0);

    const start = () => {
        startRef.current = Date.now();
        intervalRef.current = setInterval(() => {
            setElapsed(baseRef.current + Date.now() - startRef.current);
        }, 10);
        setRunning(true);
    };

    const stop = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        baseRef.current = elapsed;
        setRunning(false);
    };

    const reset = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setElapsed(0);
        setRunning(false);
        setLaps([]);
        baseRef.current = 0;
        lastLapRef.current = 0;
    };

    const lap = () => {
        const split = elapsed - lastLapRef.current;
        lastLapRef.current = elapsed;
        setLaps((prev) => [{ lap: prev.length + 1, split, total: elapsed }, ...prev]);
    };

    useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

    const fastestLap = laps.length > 1 ? Math.min(...laps.map((l) => l.split)) : null;
    const slowestLap = laps.length > 1 ? Math.max(...laps.map((l) => l.split)) : null;

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            {/* Display */}
            <div className="flex flex-col items-center gap-2">
                <div
                    style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "clamp(3.5rem, 10vw, 6rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        color: running ? "#a3ff57" : "#f0f0f2",
                        transition: "color 0.3s",
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {formatTime(elapsed)}
                </div>
                {laps.length > 0 && (
                    <div
                        className="text-sm"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            color: "rgba(240,240,242,0.35)",
                            letterSpacing: "0.1em",
                        }}
                    >
                        LAP {laps.length + 1} — {formatTime(elapsed - lastLapRef.current)}
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                {/* Lap / Reset */}
                <button
                    onClick={running ? lap : reset}
                    disabled={elapsed === 0 && !running}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-xs font-black tracking-widest uppercase transition-all"
                    style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: elapsed === 0 && !running ? "rgba(240,240,242,0.2)" : "rgba(240,240,242,0.7)",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        letterSpacing: "0.1em",
                        cursor: elapsed === 0 && !running ? "not-allowed" : "pointer",
                    }}
                >
                    {running ? "LAP" : "RESET"}
                </button>

                {/* Start / Stop */}
                <button
                    onClick={running ? stop : start}
                    className="w-20 h-20 rounded-full flex items-center justify-center text-sm font-black tracking-widest uppercase transition-all"
                    style={{
                        background: running
                            ? "rgba(255,80,80,0.15)"
                            : "linear-gradient(135deg, #a3ff57, #57ffd8)",
                        border: running ? "1px solid rgba(255,80,80,0.3)" : "none",
                        color: running ? "#ff6b6b" : "#040406",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        letterSpacing: "0.1em",
                    }}
                >
                    {running ? "STOP" : "START"}
                </button>

                {/* Placeholder for symmetry */}
                <div className="w-16 h-16" />
            </div>

            {/* Lap list */}
            {laps.length > 0 && (
                <div
                    className="w-full rounded-sm overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                    {/* Header */}
                    <div
                        className="grid grid-cols-3 px-4 py-2 text-xs font-black tracking-widest uppercase"
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            color: "rgba(240,240,242,0.3)",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            letterSpacing: "0.14em",
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                        }}
                    >
                        <span>Lap</span>
                        <span className="text-center">Split</span>
                        <span className="text-right">Total</span>
                    </div>
                    <div className="max-h-52 overflow-y-auto">
                        {laps.map((l) => {
                            const isFastest = fastestLap !== null && l.split === fastestLap;
                            const isSlowest = slowestLap !== null && l.split === slowestLap;
                            return (
                                <div
                                    key={l.lap}
                                    className="grid grid-cols-3 px-4 py-3 text-sm"
                                    style={{
                                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                                        color: isFastest ? "#a3ff57" : isSlowest ? "#ff6b6b" : "rgba(240,240,242,0.7)",
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontVariantNumeric: "tabular-nums",
                                    }}
                                >
                                    <span className="font-bold">
                                        Lap {l.lap}
                                        {isFastest && <span className="ml-2 text-xs opacity-60">▲</span>}
                                        {isSlowest && <span className="ml-2 text-xs opacity-60">▼</span>}
                                    </span>
                                    <span className="text-center">{formatTime(l.split)}</span>
                                    <span className="text-right">{formatTime(l.total)}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Rest Timer Tab ────────────────────────────────────────────────────────────
function RestTimer() {
    const [totalMs, setTotalMs] = useState(60000);
    const [remaining, setRemaining] = useState(60000);
    const [running, setRunning] = useState(false);
    const [done, setDone] = useState(false);
    const [customInput, setCustomInput] = useState("");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const endRef = useRef<number>(0);

    const progress = totalMs > 0 ? (remaining / totalMs) * 100 : 0;
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const selectPreset = (seconds: number) => {
        stop();
        const ms = seconds * 1000;
        setTotalMs(ms);
        setRemaining(ms);
        setDone(false);
    };

    const stop = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setRunning(false);
    }, []);

    const start = () => {
        if (remaining <= 0) return;
        endRef.current = Date.now() + remaining;
        intervalRef.current = setInterval(() => {
            const left = endRef.current - Date.now();
            if (left <= 0) {
                setRemaining(0);
                setRunning(false);
                setDone(true);
                if (intervalRef.current) clearInterval(intervalRef.current);
            } else {
                setRemaining(left);
            }
        }, 100);
        setRunning(true);
        setDone(false);
    };

    const reset = () => {
        stop();
        setRemaining(totalMs);
        setDone(false);
    };

    const applyCustom = () => {
        const parts = customInput.split(":").map(Number);
        let seconds = 0;
        if (parts.length === 2) seconds = parts[0] * 60 + parts[1];
        else if (parts.length === 1) seconds = parts[0];
        if (seconds > 0 && seconds <= 3600) {
            selectPreset(seconds);
            setCustomInput("");
        }
    };

    useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            {/* Preset pills */}
            <div className="flex flex-wrap justify-center gap-2">
                {PRESETS.map((s) => {
                    const isSelected = totalMs === s * 1000;
                    return (
                        <button
                            key={s}
                            onClick={() => selectPreset(s)}
                            className="px-3 h-8 rounded-sm text-xs font-black tracking-widest uppercase transition-all"
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                letterSpacing: "0.12em",
                                background: isSelected ? "linear-gradient(135deg, #a3ff57, #57ffd8)" : "rgba(255,255,255,0.05)",
                                border: isSelected ? "none" : "1px solid rgba(255,255,255,0.08)",
                                color: isSelected ? "#040406" : "rgba(240,240,242,0.5)",
                            }}
                        >
                            {s < 60 ? `${s}s` : `${s / 60}m`}
                        </button>
                    );
                })}
                {/* Custom input */}
                <div className="flex items-center gap-1">
                    <input
                        type="text"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && applyCustom()}
                        placeholder="mm:ss"
                        className="w-20 h-8 px-2 text-xs text-center outline-none rounded-sm"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#f0f0f2",
                            fontFamily: "'Barlow Condensed', sans-serif",
                        }}
                    />
                    <button
                        onClick={applyCustom}
                        className="h-8 px-2 rounded-sm text-xs font-black"
                        style={{
                            background: "rgba(163,255,87,0.12)",
                            border: "1px solid rgba(163,255,87,0.2)",
                            color: "#a3ff57",
                            fontFamily: "'Barlow Condensed', sans-serif",
                        }}
                    >
                        SET
                    </button>
                </div>
            </div>

            {/* SVG Ring + Time */}
            <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
                <svg width="220" height="220" className="absolute" style={{ transform: "rotate(-90deg)" }}>
                    {/* Track */}
                    <circle
                        cx="110" cy="110" r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.07)"
                        strokeWidth="8"
                    />
                    {/* Progress */}
                    <circle
                        cx="110" cy="110" r={radius}
                        fill="none"
                        stroke={done ? "#ff6b6b" : "#a3ff57"}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{ transition: "stroke-dashoffset 0.1s linear, stroke 0.3s" }}
                    />
                </svg>

                <div className="flex flex-col items-center gap-1 z-10">
                    <div
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "3.2rem",
                            fontWeight: 900,
                            lineHeight: 1,
                            color: done ? "#ff6b6b" : running ? "#a3ff57" : "#f0f0f2",
                            transition: "color 0.3s",
                            fontVariantNumeric: "tabular-nums",
                        }}
                    >
                        {formatCountdown(remaining)}
                    </div>
                    {done ? (
                        <span
                            className="text-xs font-black tracking-widest uppercase"
                            style={{ color: "#ff6b6b", letterSpacing: "0.18em", fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            REST DONE!
                        </span>
                    ) : (
                        <span
                            className="text-xs font-semibold tracking-widest uppercase"
                            style={{ color: "rgba(240,240,242,0.3)", letterSpacing: "0.14em", fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            {running ? "REST..." : "READY"}
                        </span>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                <button
                    onClick={reset}
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xs font-black tracking-widest uppercase"
                    style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(240,240,242,0.6)",
                        fontFamily: "'Barlow Condensed', sans-serif",
                    }}
                >
                    RESET
                </button>

                <button
                    onClick={running ? stop : start}
                    disabled={remaining <= 0 && !done}
                    className="w-20 h-20 rounded-full flex items-center justify-center text-sm font-black tracking-widest uppercase transition-all"
                    style={{
                        background: running
                            ? "rgba(255,80,80,0.15)"
                            : done
                            ? "rgba(255,255,255,0.06)"
                            : "linear-gradient(135deg, #a3ff57, #57ffd8)",
                        border: running ? "1px solid rgba(255,80,80,0.3)" : done ? "1px solid rgba(255,255,255,0.12)" : "none",
                        color: running ? "#ff6b6b" : done ? "rgba(240,240,242,0.4)" : "#040406",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        letterSpacing: "0.1em",
                    }}
                >
                    {running ? "PAUSE" : "START"}
                </button>

                <div className="w-14 h-14" />
            </div>
        </div>
    );
}

// ─── Main Widget ───────────────────────────────────────────────────────────────
type Tab = "stopwatch" | "timer";

interface TimerWidgetProps {
    compact?: boolean; // for embedding in workout page
}

export default function TimerWidget({ compact = false }: TimerWidgetProps) {
    const [tab, setTab] = useState<Tab>("stopwatch");

    return (
        <div
            className="w-full rounded-sm overflow-hidden"
            style={{
                background: compact ? "rgba(255,255,255,0.02)" : "#0a0c0f",
                border: "1px solid rgba(255,255,255,0.08)",
                fontFamily: "'Barlow', sans-serif",
            }}
        >
            {/* Tab switcher */}
            <div
                className="flex"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
                {(["stopwatch", "timer"] as Tab[]).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className="flex-1 py-3 text-xs font-black tracking-widest uppercase transition-all"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            letterSpacing: "0.16em",
                            color: tab === t ? "#a3ff57" : "rgba(240,240,242,0.3)",
                            borderBottom: tab === t ? "2px solid #a3ff57" : "2px solid transparent",
                            background: "transparent",
                        }}
                    >
                        {t === "stopwatch" ? "⏱ Stopwatch" : "⏳ Rest Timer"}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className={compact ? "p-4" : "p-8"}>
                {tab === "stopwatch" ? <Stopwatch /> : <RestTimer />}
            </div>
        </div>
    );
}