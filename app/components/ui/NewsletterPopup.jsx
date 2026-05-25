"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, ArrowRight, Check, X, Zap, BookOpen } from "lucide-react";
import Button from "./Button";
import { cn } from "../../libs/utils";

const POPUP_DISMISSED_KEY = "owen_newsletter_dismissed";
const POPUP_SUBSCRIBED_KEY = "owen_newsletter_subscribed";

const perks = [
  { icon: BookOpen, text: "Deep dives on design & dev" },
  { icon: Zap, text: "Early access to new content" },
];

const NewsletterPopup = ({
  onSubscribe,
  delay = 8000,
  scrollThreshold = 0.25,
  enabled = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enabled || !mounted) return;

    const dismissed = localStorage.getItem(POPUP_DISMISSED_KEY);
    const subscribed = localStorage.getItem(POPUP_SUBSCRIBED_KEY);
    if (dismissed || subscribed) return;

    const delayTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay, enabled, mounted]);

  useEffect(() => {
    if (!enabled || !mounted || isVisible) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = totalHeight > 0 ? scrolled / totalHeight : 0;

      if (scrollPercent >= scrollThreshold) {
        localStorage.setItem(POPUP_DISMISSED_KEY, "1");
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled, isVisible, scrollThreshold, mounted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await onSubscribe(email);
      if (result?.success) {
        handleSubscribeSuccess();
      } else {
        setStatus("error");
        setErrorMessage(result?.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to subscribe. Please try again.");
    }
  };

  const dismiss = () => {
    localStorage.setItem(POPUP_DISMISSED_KEY, "1");
    setIsVisible(false);
  };

  const handleSubscribeSuccess = () => {
    localStorage.setItem(POPUP_SUBSCRIBED_KEY, "1");
    setStatus("success");
    setTimeout(() => dismiss(), 2500);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && dismiss()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md"
          >
            <div className="relative bg-[#0a0a0a] rounded-2xl p-8 border border-white/10 shadow-2xl shadow-black/50">
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>

              {status === "success" ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/20 border border-green-500/30 flex items-center justify-center"
                  >
                    <Check className="w-10 h-10 text-green-400" strokeWidth={2.5} />
                  </motion.div>
                  <motion.h3
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-white mb-3"
                  >
                    Welcome aboard!
                  </motion.h3>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 text-base"
                  >
                    Check your inbox for a welcome email from{" "}
                    <span className="text-white font-medium">official@owendigitals.work</span>
                  </motion.p>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center justify-center gap-2 mb-6"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b02222]/15 border border-[#b02222]/30 text-[#b02222] text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      Free Newsletter
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className="text-center mb-8"
                  >
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                      Design & Dev
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-purple-500">
                        Insights, Weekly
                      </span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      One email, every week. No fluff, just deep dives into design systems,
                      frontend engineering, and building profitable creative businesses.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3 mb-8"
                  >
                    {perks.map((perk, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15 + i * 0.05 }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                          <perk.icon className="w-3.5 h-3.5 text-[#b02222]" />
                        </div>
                        <span className="text-gray-300">{perk.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.form
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    onSubmit={handleSubmit}
                    className="space-y-3"
                  >
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        placeholder="your@email.com"
                        className={cn(
                          "w-full pl-11 pr-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-gray-500 text-sm",
                          "focus:outline-none focus:ring-2 focus:ring-[#b02222]/50 focus:border-[#b02222]/50",
                          "transition-all placeholder:text-sm",
                          status === "error" ? "border-red-500/60 bg-red-500/5" : "border-white/10 hover:border-white/20"
                        )}
                        disabled={status === "loading"}
                      />
                    </div>

                    {status === "error" && errorMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-400 px-1"
                      >
                        {errorMessage}
                      </motion.p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full relative overflow-hidden group"
                      disabled={status === "loading"}
                      withMotion={false}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === "loading" ? (
                          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Subscribe, it&apos;s free
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.form>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="mt-4 text-center text-[11px] text-gray-600"
                  >
                    No spam, ever. Unsubscribe anytime.
                  </motion.p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;