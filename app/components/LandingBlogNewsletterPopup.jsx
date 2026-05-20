"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import Button from "./ui/Button";
import { cn } from "../libs/utils";

const POPUP_STORAGE_KEY = "landing_blog_popup_dismissed";
const POPUP_SUBSCRIBED_KEY = "landing_blog_subscribed";

const LandingBlogNewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const dismissed = sessionStorage.getItem(POPUP_STORAGE_KEY);
    const subscribed = sessionStorage.getItem(POPUP_SUBSCRIBED_KEY);
    if (dismissed || subscribed) return;

    const blogSection = document.getElementById("blog");
    if (!blogSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When blog section is above the viewport (scrolled past)
        if (entry.boundingClientRect.top < 0 && !isVisible) {
          sessionStorage.setItem(POPUP_STORAGE_KEY, "true");
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(blogSection);

    return () => observer.disconnect();
  }, [isVisible]);

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
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();

      if (result.success) {
        handleSubscribeSuccess();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to subscribe. Please try again.");
    }
  };

  const dismiss = () => {
    sessionStorage.setItem(POPUP_STORAGE_KEY, "true");
    setIsVisible(false);
  };

  const handleSubscribeSuccess = () => {
    sessionStorage.setItem(POPUP_SUBSCRIBED_KEY, "true");
    setStatus("success");
    setTimeout(() => dismiss(), 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && dismiss()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <GlassCard hoverEffect={false} className="p-8 relative">
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Dismiss"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

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
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Don&apos;t miss a post
                    </h2>
                    <p className="text-gray-400">
                      Get the latest blog posts and updates straight to your inbox.
                    </p>
                  </div>

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
                      {status === "error" && errorMessage && (
                        <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingBlogNewsletterPopup;