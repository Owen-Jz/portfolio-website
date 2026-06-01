"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Check, Link as LinkIcon } from "lucide-react";

/**
 * ShareButton
 * - On devices that support the Web Share API (most mobile browsers), taps open
 *   the native share sheet.
 * - Everywhere else, it copies the post URL to the clipboard with visual feedback.
 *
 * Props:
 *   url   - absolute URL to share
 *   title - post title (used as share text)
 */
const ShareButton = ({ url, title }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Prefer the native share sheet when available (mobile/PWA).
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url,
        });
        return;
      } catch (err) {
        // User cancelled the share sheet, or it failed — fall back to copy.
        if (err?.name === "AbortError") return;
      }
    }

    // Fallback: copy the link to the clipboard.
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Legacy fallback for non-secure contexts.
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // As a last resort, open the URL so the user can copy it manually.
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleShare}
      whileTap={{ scale: 0.96 }}
      aria-label="Share this post"
      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border transition-all ${
        copied
          ? "bg-[#b02222]/20 border-[#b02222]/40 text-[#b02222]"
          : "bg-[#b02222] border-[#b02222] text-white hover:bg-[#901a1a] hover:border-[#901a1a]"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Link copied
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ShareButton;
