"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, FilePlus, LogOut, Terminal, FileText } from "lucide-react";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Don't apply auth check to login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router, isLoginPage]);

  // If it's the login page, just render children without auth check
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-2 border-[#b02222] border-t-transparent rounded-full animate-spin" />
             <div className="text-white/40 font-mono text-sm tracking-widest animate-pulse">
                INITIALIZING PROTOCOLS...
             </div>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#050505] font-manrope selection:bg-[#b02222] selection:text-white relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#b02222]/5 rounded-full blur-[120px]" />
         <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
                 backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                 backgroundSize: "40px 40px"
             }}
        />
      </div>

      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="flex items-center gap-2 group">
                <div className="p-2 bg-[#b02222]/10 rounded-lg border border-[#b02222]/20 group-hover:border-[#b02222]/50 transition-colors">
                    <Terminal className="w-5 h-5 text-[#b02222]" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Nexus<span className="text-[#b02222]">Admin</span>
                </span>
              </Link>

              <nav className="hidden md:flex gap-1">
                <Link
                  href="/admin"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      pathname === '/admin' 
                      ? "bg-white/10 text-white" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/posts/new"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                       pathname === '/admin/posts/new'
                       ? "bg-white/10 text-white" 
                       : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FilePlus className="w-4 h-4" />
                  New Entry
                </Link>
                <Link
                  href="/admin/briefs"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                       pathname === '/admin/briefs'
                       ? "bg-white/10 text-white" 
                       : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Briefs
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-xs text-[#b02222] font-mono tracking-wider">ADMINISTRATOR</span>
                  <span className="text-sm text-gray-400">{session.user.email}</span>
              </div>
              
              <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />

              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="group flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-white border border-red-500/20 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-300"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Terminate Session</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>
    </div>
  );
}
