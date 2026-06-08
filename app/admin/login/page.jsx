"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "../../libs/utils";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-manrope text-white selection:bg-[#b02222] selection:text-white">
      {/* Subtle background ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[520px] h-[520px] bg-[#b02222]/[0.06] rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[440px] h-[440px] bg-[#b02222]/[0.03] rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-[400px] relative z-10"
      >
        {/* Wordmark */}
        <div className="text-center mb-8">
          <span className="text-xl font-bold tracking-tight text-white">
            Owen <span className="text-[#b02222]">Digitals</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
          <div className="p-8 md:p-9">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-[28px] leading-tight font-bold text-white tracking-tight">
                Welcome back
              </h1>
              <p className="text-white/40 text-sm mt-1.5">Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      role="alert"
                      className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/70"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className={cn(
                      "absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 pointer-events-none",
                      focusedInput === "email" ? "text-[#b02222]" : "text-white/30"
                    )}
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/25 focus:outline-none focus:border-[#b02222]/50 focus:ring-2 focus:ring-[#b02222]/20 transition-all text-sm font-mono"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/70"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className={cn(
                      "absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 pointer-events-none",
                      focusedInput === "password" ? "text-[#b02222]" : "text-white/30"
                    )}
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/25 focus:outline-none focus:border-[#b02222]/50 focus:ring-2 focus:ring-[#b02222]/20 transition-all text-sm font-mono"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.985 }}
                disabled={loading}
                type="submit"
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b02222]/50",
                  loading
                    ? "bg-[#b02222]/50 cursor-wait text-white/60"
                    : "bg-[#b02222] hover:bg-[#c92e2e] text-white shadow-[0_0_20px_rgba(176,34,34,0.3)]"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in…</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
