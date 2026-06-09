"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Check, Linkedin } from "lucide-react";

const formatCount = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

/**
 * StickyShareRail
 * A vertical floating rail that follows the reader down the page on large
 * screens (hidden below xl — mobile keeps the inline engagement bar). Holds
 * the like button, a copy-link share, and native social share links.
 */
const StickyShareRail = ({ likes = 0, isLiked = false, onLike, url, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const iconBtn =
    "w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300";

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3"
    >
      {/* Like */}
      <div className="flex flex-col items-center gap-1.5">
        <motion.button
          onClick={onLike}
          whileTap={{ scale: 0.88 }}
          aria-label={isLiked ? "Unlike this post" : "Like this post"}
          className={`${iconBtn} ${
            isLiked
              ? "bg-[#b02222]/20 border-[#b02222]/50 text-[#b02222]"
              : "bg-white/[0.04] border-white/10 text-white/60 hover:border-white/25 hover:text-white"
          }`}
        >
          <motion.span
            animate={isLiked ? { scale: [1, 1.35, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`w-[18px] h-[18px] ${isLiked ? "fill-[#b02222]" : ""}`} />
          </motion.span>
        </motion.button>
        <span className="text-[11px] font-medium text-white/40 tabular-nums">
          {formatCount(likes)}
        </span>
      </div>

      <span className="w-px h-6 bg-white/10" aria-hidden="true" />

      {/* Copy link */}
      <button
        onClick={handleCopy}
        aria-label="Copy link to this post"
        className={`${iconBtn} ${
          copied
            ? "bg-[#b02222]/20 border-[#b02222]/50 text-[#b02222]"
            : "bg-white/[0.04] border-white/10 text-white/60 hover:border-white/25 hover:text-white"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              <Check className="w-[18px] h-[18px]" />
            </motion.span>
          ) : (
            <motion.span
              key="share"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              <Share2 className="w-[18px] h-[18px]" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={`${iconBtn} bg-white/[0.04] border-white/10 text-white/60 hover:border-white/25 hover:text-white`}
      >
        <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={`${iconBtn} bg-white/[0.04] border-white/10 text-white/60 hover:border-white/25 hover:text-white`}
      >
        <Linkedin className="w-[17px] h-[17px]" />
      </a>
    </motion.aside>
  );
};

export default StickyShareRail;
