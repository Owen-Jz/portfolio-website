"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import Button from "./Button";

const formatCount = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

/**
 * End-of-post prompt: an explicit ask to like the post if it helped,
 * followed by the subscribe pitch — one cohesive outro block instead of
 * a silent stats bar. Like state/handler live in the page (shared with
 * the sticky rail); the subscribe form is self-contained.
 */
const PostOutro = ({ likes = 0, isLiked = false, onLike }) => {
  const [burstKey, setBurstKey] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [message, setMessage] = useState(null);

  const handleLikeClick = () => {
    if (!isLiked) setBurstKey((k) => k + 1);
    onLike?.();
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribing(true);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      setMessage({
        success: result.success,
        text: result.success
          ? "You're in — new posts will land in your inbox."
          : result.error || "Failed to subscribe",
      });
      if (result.success) setEmail("");
    } catch {
      setMessage({ success: false, text: "Failed to subscribe" });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="mt-14"
    >
      {/* End-of-post mark */}
      <div className="flex items-center gap-4 mb-10">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/30">
          End of post
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        {/* The ask: was this helpful? */}
        <div className="p-8 md:p-10 text-center border-b border-white/10">
          <h3 className="text-2xl md:text-[1.7rem] font-bold text-white font-['Manrope'] tracking-tight">
            {isLiked ? "Appreciated — thank you!" : "Was this helpful?"}
          </h3>
          <p className="text-white/50 mt-2 max-w-md mx-auto">
            {isLiked
              ? "Likes like yours tell me exactly what to write more of."
              : "Drop a like — it takes a second and tells me what to write more of."}
          </p>

          <div className="relative inline-flex mt-6">
            {/* burst ring + particles on like */}
            <AnimatePresence>
              {burstKey > 0 && isLiked && (
                <motion.span
                  key={burstKey}
                  className="absolute inset-0 rounded-full border-2 border-[#b02222] pointer-events-none"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.9, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            <motion.button
              onClick={handleLikeClick}
              whileTap={{ scale: 0.94 }}
              className={`flex items-center gap-3 px-7 py-3 rounded-full border text-base font-medium transition-all ${
                isLiked
                  ? "bg-[#b02222]/15 border-[#b02222]/50 text-[#b02222]"
                  : "bg-white/5 border-white/15 text-white/80 hover:border-[#b02222]/50 hover:text-white hover:bg-[#b02222]/10"
              }`}
              aria-pressed={isLiked}
            >
              <motion.span
                animate={isLiked ? { scale: [1, 1.35, 1] } : {}}
                transition={{ duration: 0.35 }}
                className="inline-flex"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isLiked ? "fill-[#b02222] text-[#b02222]" : ""
                  }`}
                />
              </motion.span>
              {isLiked ? "Liked" : "Drop a like"}
              <span
                className={`text-sm tabular-nums ${
                  isLiked ? "text-[#b02222]/80" : "text-white/40"
                }`}
              >
                {formatCount(likes)}
              </span>
            </motion.button>
          </div>

          {likes > 0 && !isLiked && (
            <p className="mt-4 text-xs text-white/35">
              Join {formatCount(likes)} {likes === 1 ? "reader" : "readers"} who
              found this useful
            </p>
          )}
        </div>

        {/* The pitch: subscribe */}
        <div className="p-8 md:p-10 bg-gradient-to-r from-[#b02222]/10 to-transparent">
          <h3 className="text-xl font-bold text-white mb-2">
            Never miss a post
          </h3>
          <p className="text-gray-400 mb-4">
            Subscribe and get new posts straight to your inbox. No spam —
            unsubscribe anytime.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b02222] text-sm"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={subscribing}
              withMotion={false}
              className="text-sm"
            >
              {subscribing ? "..." : "Subscribe"}
            </Button>
          </form>
          {message && (
            <p
              className={`mt-3 text-sm ${
                message.success ? "text-green-400" : "text-red-400"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default PostOutro;
