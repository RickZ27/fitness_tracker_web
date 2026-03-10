"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_LINKS = [
    {
        href: "/admin",
        label: "Dashboard",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        href: "/admin/analytics",
        label: "Analytics",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 3 0v-13A1.5 1.5 0 0 0 15.5 2ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9a1.5 1.5 0 0 0 3 0v-9A1.5 1.5 0 0 0 9.5 6ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5a1.5 1.5 0 0 0 3 0v-5A1.5 1.5 0 0 0 3.5 10Z" />
            </svg>
        ),
    },
    {
        href: "/admin/users",
        label: "Users",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z" />
            </svg>
        ),
    },
    {
        href: "/admin/exercises",
        label: "Exercises",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M6.5 4.5a1 1 0 0 0-1 1v9a1 1 0 0 0 2 0v-9a1 1 0 0 0-1-1ZM13.5 4.5a1 1 0 0 0-1 1v9a1 1 0 0 0 2 0v-9a1 1 0 0 0-1-1Z" />
                <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h11A1.5 1.5 0 0 1 17 7.5v5A1.5 1.5 0 0 1 15.5 14h-11A1.5 1.5 0 0 1 3 12.5v-5Z" />
            </svg>
        ),
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === "/admin" ? pathname === href : pathname?.startsWith(href);

    return (
        <aside
            className="fixed md:static top-0 left-0 h-screen w-56 z-40 flex flex-col overflow-y-auto"
            style={{
                background: "#070a0d",
                borderRight: "1px solid rgba(255,255,255,0.07)",
                fontFamily: "'Barlow Condensed', sans-serif",
            }}
        >
            {/* Logo area */}
            <div
                className="flex items-center gap-3 px-5 h-14 shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
                <div
                    className="flex items-center justify-center w-7 h-7 rounded-sm font-black text-xs"
                    style={{
                        background: "linear-gradient(135deg, #ff9f57, #ffd657)",
                        color: "#040406",
                    }}
                >
                    FT
                </div>
                <span
                    className="font-bold tracking-widest uppercase text-xs"
                    style={{ color: "rgba(240,240,242,0.5)", letterSpacing: "0.16em" }}
                >
                    Fitness Tracker
                </span>
            </div>

            {/* Section label */}
            <div className="px-5 pt-6 pb-2">
                <span
                    className="text-xs font-black tracking-widest uppercase"
                    style={{ color: "rgba(240,240,242,0.2)", letterSpacing: "0.2em" }}
                >
                    Navigation
                </span>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 px-3 flex-1">
                {ADMIN_LINKS.map((link) => {
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-bold tracking-wide transition-all"
                            style={{
                                letterSpacing: "0.08em",
                                background: active ? "rgba(255,159,87,0.10)" : "transparent",
                                color: active ? "#ff9f57" : "rgba(240,240,242,0.45)",
                                borderLeft: active ? "2px solid #ff9f57" : "2px solid transparent",
                            }}
                        >
                            <span style={{ opacity: active ? 1 : 0.5 }}>{link.icon}</span>
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom: version badge */}
            <div
                className="px-5 py-4 shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
                <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "rgba(240,240,242,0.15)", fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                    Admin v1.0
                </span>
            </div>
        </aside>
    );
}