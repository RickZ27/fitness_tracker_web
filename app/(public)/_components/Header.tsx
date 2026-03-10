"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "../../_components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
];

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname?.startsWith(href);

    return (
        <header
            className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10"
            style={{
                background: "rgba(4,4,6,0.92)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                fontFamily: "'Barlow Condensed', sans-serif",
            }}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div
                            className="flex items-center justify-center w-9 h-9 rounded-sm font-black text-sm tracking-widest"
                            style={{
                                background: "linear-gradient(135deg, #a3ff57, #57ffd8)",
                                color: "#040406",
                                fontFamily: "'Barlow Condensed', sans-serif",
                                letterSpacing: "0.05em",
                            }}
                        >
                            FT
                        </div>
                        <span
                            className="text-white font-bold tracking-widest uppercase text-sm hidden sm:block"
                            style={{ letterSpacing: "0.18em" }}
                        >
                            FitTracker
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-sm font-semibold tracking-widest uppercase transition-colors"
                                style={{
                                    color: isActive(link.href) ? "#a3ff57" : "rgba(255,255,255,0.55)",
                                    letterSpacing: "0.14em",
                                }}
                            >
                                {link.label}
                                {isActive(link.href) && (
                                    <span
                                        className="absolute -bottom-1 left-0 w-full h-px"
                                        style={{ background: "#a3ff57" }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <Link
                                    href="/user/dashboard"
                                    className="text-sm font-semibold tracking-wider uppercase px-4 h-9 flex items-center rounded-sm transition-all"
                                    style={{
                                        color: "#a3ff57",
                                        border: "1px solid rgba(163,255,87,0.3)",
                                        letterSpacing: "0.1em",
                                    }}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-xs font-semibold tracking-widest uppercase px-3 h-9 flex items-center rounded-sm transition-all"
                                    style={{
                                        color: "rgba(255,255,255,0.4)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        letterSpacing: "0.1em",
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="text-sm font-semibold tracking-wider uppercase px-4 h-9 flex items-center rounded-sm transition-all"
                                    style={{
                                        color: "rgba(255,255,255,0.6)",
                                        border: "1px solid rgba(255,255,255,0.12)",
                                        letterSpacing: "0.1em",
                                    }}
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-sm font-black tracking-wider uppercase px-4 h-9 flex items-center rounded-sm transition-all"
                                    style={{
                                        background: "linear-gradient(135deg, #a3ff57, #57ffd8)",
                                        color: "#040406",
                                        letterSpacing: "0.1em",
                                    }}
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}


                        {/* Mobile hamburger */}
                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-label="Toggle menu"
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-sm"
                            style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                        >
                            {open ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                                    <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile panel */}
                <div
                    className={"md:hidden overflow-hidden transition-[max-height] duration-300 " + (open ? "max-h-96" : "max-h-0")}
                >
                    <div
                        className="pb-4 pt-3 border-t flex flex-col gap-1"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="px-2 py-2 text-sm font-semibold tracking-widest uppercase rounded-sm"
                                style={{
                                    color: isActive(link.href) ? "#a3ff57" : "rgba(255,255,255,0.55)",
                                    letterSpacing: "0.14em",
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="mt-3 flex gap-2">
                            <Link
                                href="/login"
                                className="flex-1 h-9 flex items-center justify-center text-xs font-semibold tracking-widest uppercase rounded-sm"
                                style={{
                                    color: "rgba(255,255,255,0.6)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                }}
                            >
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                className="flex-1 h-9 flex items-center justify-center text-xs font-black tracking-widest uppercase rounded-sm"
                                style={{
                                    background: "linear-gradient(135deg, #a3ff57, #57ffd8)",
                                    color: "#040406",
                                }}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}