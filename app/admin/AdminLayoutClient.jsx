"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, FilePlus, LogOut, FileText, Users, Menu, X } from "lucide-react";
import { cn } from "../libs/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts/new", label: "New Post", icon: FilePlus, exact: true },
  { href: "/admin/briefs", label: "Briefs", icon: FileText, exact: false },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users, exact: false },
];

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Don't apply auth check to login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router, isLoginPage]);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // If it's the login page, just render children without auth check
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-manrope">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-white/15 border-t-[#b02222] rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="min-h-screen bg-[#050505] font-manrope text-white selection:bg-[#b02222] selection:text-white relative">
      {/* Subtle background ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[25%] w-[480px] h-[480px] bg-[#b02222]/[0.04] rounded-full blur-[140px]" />
      </div>

      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              {/* Wordmark */}
              <Link href="/admin" className="flex items-center gap-2.5 group shrink-0">
                <span className="text-lg font-bold tracking-tight text-white">
                  Owen <span className="text-[#b02222]">Digitals</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium tracking-wide text-white/40 uppercase">
                  Admin
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors",
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* Admin identity */}
              <div className="hidden lg:flex flex-col items-end leading-tight">
                <span className="text-[11px] text-white/40">Signed in as</span>
                <span className="text-sm text-white/70 font-mono">{session.user.email}</span>
              </div>

              <div className="hidden lg:block h-8 w-px bg-white/10" />

              {/* Sign out */}
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="group hidden md:flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-white/60 hover:text-white border border-white/10 rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/50"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/50"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0a0a0a]/95 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors",
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}

              <div className="my-2 h-px bg-white/5" />

              <div className="px-3.5 py-1">
                <span className="block text-[11px] text-white/40">Signed in as</span>
                <span className="block text-sm text-white/70 font-mono truncate">
                  {session.user.email}
                </span>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>
    </div>
  );
}
