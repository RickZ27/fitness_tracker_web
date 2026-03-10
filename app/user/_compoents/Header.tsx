"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { handleLogout } from '@/lib/actions/auth-action';
import { useTransition } from 'react';

const NAV_LINKS = [
    { href: '/user/dashboard', label: 'Dashboard' },
    { href: '/user/goals',     label: 'Goals' },
    { href: '/user/workout',   label: 'Workouts' },
    { href: '/user/analytics', label: 'Analytics' },
    { href: '/user/profile',   label: 'Profile' },
    { href: "/user/timer", label: "Timer" }

];

export default function Header() {
    const pathname = usePathname();
    const [pending, setTransition] = useTransition();

    const logout = () => {
        setTransition(async () => {
            await handleLogout();
        });
    };

    return (
        <header className="border-b border-black/10 dark:border-white/10 bg-background sticky top-0 z-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/user/dashboard" className="font-bold text-base shrink-0">
                        FitTracker
                    </Link>

                    {/* Nav */}
                    <nav className="hidden sm:flex items-center gap-1">
                        {NAV_LINKS.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                    pathname.startsWith(href)
                                        ? 'bg-foreground/10 text-foreground'
                                        : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Logout */}
                    <button
                        onClick={logout}
                        disabled={pending}
                        className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors disabled:opacity-60 shrink-0"
                    >
                        {pending ? 'Logging out...' : 'Logout'}
                    </button>
                </div>

                {/* Mobile nav */}
                <div className="flex sm:hidden overflow-x-auto gap-1 pb-2">
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium shrink-0 transition-colors ${
                                pathname.startsWith(href)
                                    ? 'bg-foreground/10 text-foreground'
                                    : 'text-foreground/60 hover:text-foreground'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
