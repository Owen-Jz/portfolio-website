"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavbarDemo } from "../../components/ui/RevampedNavbar";
import FooterSection from "../../components/FooterSection";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import { cn } from "../../libs/utils";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setMessage("You're subscribed! Check your inbox for a confirmation.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />

      <main className="pt-32 pb-24 relative">
        <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#b02222]/5 to-transparent pointer-events-none" />

        <div className="max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Stay in the loop
            </h1>
            <p className="text-white/50 text-lg">
              Get notified when I publish new blog posts, case studies, and insights.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <GlassCard hoverEffect={false} className="p-8">
              {status === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">You&apos;re in!</h3>
                  <p className="text-gray-400">
                    Thanks for subscribing. You&apos;ll be the first to know when I publish new content.
                  </p>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        placeholder="your@email.com"
                        className={cn(
                          "w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500",
                          "focus:outline-none focus:ring-2 focus:ring-[#b02222] transition-all",
                          status === "error" ? "border-red-500" : "border-gray-700"
                        )}
                        disabled={status === "loading"}
                      />
                      {status === "error" && message && (
                        <p className="mt-2 text-sm text-red-400">{message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={status === "loading"}
                      withMotion={false}
                    >
                      {status === "loading" ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </form>

                  <p className="mt-4 text-center text-xs text-gray-500">
                    No spam, unsubscribe anytime.
                  </p>
                </>
              )}
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-white/30 text-sm">
              Or explore the blog directly
            </p>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 mt-3 text-white/60 hover:text-white transition-colors"
            >
              <span>Browse articles</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}