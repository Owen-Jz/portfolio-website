"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ArrowRight, Zap, Eye, BookOpen } from "lucide-react";

const perks = [
  { icon: Zap,      text: "First to know when a new article drops" },
  { icon: BookOpen, text: "Design, business & build-log deep dives" },
  { icon: Eye,      text: "Behind-the-scenes process breakdowns" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function SubscribeForm() {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else if (data.error === "You're already subscribed!") {
        setStatus("error");
        setMessage("You're already subscribed.");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6 py-16 relative overflow-hidden font-manrope selection:bg-[#b02222] selection:text-white">

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Corner glows */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-[#b02222]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] bg-[#b02222]/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span className="text-[22vw] font-black text-white/[0.012] leading-none tracking-tighter">
          SIGNAL
        </span>
      </div>

      <div className="w-full max-w-5xl relative z-10">

        {/* Logo */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <img
              src="/Logo.svg"
              alt="Owen Digitals"
              width={28}
              height={28}
              className="group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="text-white/50 text-sm font-medium tracking-wide group-hover:text-white/80 transition-colors">
              Owen Digitals
            </span>
          </Link>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center">

          {/* ── Left: Editorial ── */}
          <div>
            {/* Status badge */}
            <motion.div {...fadeUp(0.1)} className="mb-7">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#b02222]/25 bg-[#b02222]/8 text-[#b02222] text-xs font-bold uppercase tracking-[0.18em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b02222] animate-pulse" />
                Newsletter
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.2)}
              className="text-5xl md:text-6xl lg:text-[72px] font-black text-white leading-[1.03] tracking-tight mb-6"
            >
              Stay in<br />
              <span className="text-[#b02222]">the loop.</span>
            </motion.h1>

            {/* Body */}
            <motion.p {...fadeUp(0.3)} className="text-white/45 text-base md:text-lg leading-relaxed mb-10 max-w-[380px]">
              Get notified the moment I publish something new — design breakdowns, business reflections, and build logs from the trenches.
            </motion.p>

            {/* Perks */}
            <div className="space-y-3.5 mb-10">
              {perks.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.4 + i * 0.08)}
                  className="flex items-center gap-3.5"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#b02222]/10 border border-[#b02222]/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#b02222]" />
                  </div>
                  <span className="text-white/55 text-sm">{text}</span>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <motion.div {...fadeUp(0.65)} className="flex items-center gap-4 max-w-[380px]">
              <div className="h-px flex-1 bg-white/6" />
              <span className="text-white/20 text-[10px] uppercase tracking-[0.22em] whitespace-nowrap">
                Free · No spam · Unsubscribe anytime
              </span>
              <div className="h-px flex-1 bg-white/6" />
            </motion.div>
          </div>

          {/* ── Right: Form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Card glow */}
            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-[#b02222]/12 blur-[50px] scale-[0.92]" />

              <div className="relative bg-[#111111]/85 backdrop-blur-2xl border border-white/[0.07] rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                {/* Top line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#b02222]/55 to-transparent" />

                <div className="p-8 md:p-9">
                  <AnimatePresence mode="wait">

                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.4 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -15 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.1 }}
                          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#b02222]/10 border border-[#b02222]/25 mb-6"
                        >
                          <CheckCircle2 className="w-8 h-8 text-[#b02222]" />
                        </motion.div>
                        <motion.h2
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                          className="text-2xl font-bold text-white mb-2"
                        >
                          You&apos;re in!
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 }}
                          className="text-white/45 text-sm leading-relaxed"
                        >
                          Welcome to the loop. Check your inbox for a welcome email.
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Link
                            href="/"
                            className="inline-block mt-8 text-xs text-white/25 hover:text-white/55 transition-colors"
                          >
                            ← Back to site
                          </Link>
                        </motion.div>
                      </motion.div>

                    ) : (
                      <motion.div key="form" initial={{ opacity: 1 }}>
                        {/* Card header */}
                        <div className="mb-7">
                          <p className="text-[#b02222]/70 text-[10px] uppercase tracking-[0.22em] font-semibold mb-1.5">
                            Subscribe
                          </p>
                          <h2 className="text-xl font-bold text-white leading-tight">
                            Join the newsletter
                          </h2>
                          <p className="text-white/35 text-xs mt-1.5 leading-relaxed">
                            Enter your email and you&apos;re done.
                          </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your@email.com"
                            className="w-full bg-white/[0.04] border border-white/[0.07] rounded-2xl py-4 px-5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#b02222]/40 focus:bg-white/[0.06] transition-all duration-300"
                          />

                          <AnimatePresence>
                            {status === "error" && message && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-red-400 text-xs px-1"
                              >
                                {message}
                              </motion.p>
                            )}
                          </AnimatePresence>

                          <motion.button
                            type="submit"
                            disabled={status === "loading"}
                            whileHover={status !== "loading" ? { scale: 1.015 } : {}}
                            whileTap={status !== "loading" ? { scale: 0.985 } : {}}
                            className={`relative w-full overflow-hidden flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold tracking-wide transition-all duration-300 ${
                              status === "loading"
                                ? "bg-[#b02222]/40 cursor-wait text-white/40"
                                : "bg-[#b02222] text-white shadow-[0_6px_28px_rgba(176,34,34,0.45)] hover:shadow-[0_6px_36px_rgba(176,34,34,0.65)] hover:bg-[#c42828]"
                            }`}
                          >
                            {status !== "loading" && (
                              <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                            )}
                            {status === "loading" ? (
                              <><Loader2 className="w-4 h-4 animate-spin" /><span>Subscribing...</span></>
                            ) : (
                              <><span>Subscribe</span><ArrowRight className="w-4 h-4" /></>
                            )}
                          </motion.button>
                        </form>

                        {/* Bottom row */}
                        <div className="mt-6 pt-5 border-t border-white/[0.05] flex items-center justify-between">
                          <p className="text-white/20 text-[11px]">Free forever. No credit card.</p>
                          <Link
                            href="/blog"
                            className="text-white/25 text-[11px] hover:text-white/55 transition-colors"
                          >
                            Browse posts →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
