"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2, Mail, ArrowRight } from "lucide-react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 relative overflow-hidden font-manrope">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b02222]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center mb-10">
          <img src="/Logo.svg" alt="Owen Digitals" width={32} height={32} />
          <span className="text-white font-bold text-lg tracking-tight">Owen Digitals</span>
        </Link>

        {/* Card */}
        <div className="bg-[#121212]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl shadow-black">
          {/* Top accent line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#b02222] to-transparent opacity-50" />

          <div className="p-8 md:p-10">
            {status === "success" ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#b02222]/10 border border-[#b02222]/20 mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#b02222]" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-3">You&apos;re in!</h1>
                <p className="text-white/60 text-base leading-relaxed">
                  Check your inbox for a welcome email. You&apos;ll hear from me every time I publish something new.
                </p>
                <Link
                  href="/"
                  className="inline-block mt-8 text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  ← Back to site
                </Link>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-5">
                    <Mail className="w-6 h-6 text-[#b02222]" />
                  </div>
                  <h1 className="text-3xl font-bold text-white leading-tight mb-3">
                    Stay in the loop
                  </h1>
                  <p className="text-white/60 text-base leading-relaxed">
                    Get notified when I publish new articles on design, business, and building.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-white placeholder-white/20 focus:outline-none focus:border-[#b02222]/50 focus:bg-black/60 transition-all text-sm"
                    />
                    {status === "error" && message && (
                      <p className="mt-2 text-sm text-red-400">{message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 font-bold tracking-wide transition-all duration-300 ${
                      status === "loading"
                        ? "bg-[#b02222]/50 cursor-wait text-white/50"
                        : "bg-[#b02222] hover:bg-[#c92e2e] text-white shadow-[0_0_20px_rgba(176,34,34,0.3)] hover:shadow-[0_0_30px_rgba(176,34,34,0.5)]"
                    }`}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-5 text-center text-white/25 text-xs">
                  No spam. Unsubscribe any time.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
