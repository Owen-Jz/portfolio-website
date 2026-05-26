"use client";

import React from "react";
import { Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";

const formatCount = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

const BlogEngagement = ({
  views = 0,
  likes = 0,
  isLiked = false,
  onLike,
  variant = "compact",
}) => {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3 text-xs text-white/40">
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          {formatCount(views)}
        </span>
        <span className="flex items-center gap-1">
          <Heart
            className={`w-3.5 h-3.5 ${isLiked ? "fill-[#b02222] text-[#b02222]" : ""}`}
          />
          {formatCount(likes)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-white/50">
        <Eye className="w-4 h-4" />
        <span>{formatCount(views)} views</span>
      </div>
      <motion.button
        onClick={onLike}
        whileTap={{ scale: 0.9 }}
        className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border transition-all ${
          isLiked
            ? "bg-[#b02222]/20 border-[#b02222]/40 text-[#b02222]"
            : "bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
        }`}
      >
        <motion.div
          animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={`w-4 h-4 ${isLiked ? "fill-[#b02222] text-[#b02222]" : ""}`}
          />
        </motion.div>
        <span>{formatCount(likes)}</span>
      </motion.button>
    </div>
  );
};

export default BlogEngagement;
