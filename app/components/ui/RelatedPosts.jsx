"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import BlogEngagement from "./BlogEngagement";

// Normalize image src so Next/Image accepts both relative public paths and absolute URLs.
const resolveImageSrc = (src) => {
  if (!src) return null;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return src;
  return `/${src}`;
};

/**
 * RelatedPosts
 * "Keep reading" grid shown at the end of an article. Prefers posts in the
 * same category, then backfills with the newest posts so the section is
 * always full (up to 3). Renders nothing until at least one match loads.
 */
const RelatedPosts = ({ currentSlug, category }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        // Same-category posts first.
        const res = await fetch(
          `/api/blog?category=${encodeURIComponent(category || "All")}`,
          { cache: "no-store" }
        );
        const result = await res.json();
        let list = (result?.data ?? []).filter((p) => p.slug !== currentSlug);

        // Backfill with the broader feed if the category is thin.
        if (list.length < 3) {
          const resAll = await fetch("/api/blog", { cache: "no-store" });
          const all = await resAll.json();
          const extra = (all?.data ?? []).filter(
            (p) => p.slug !== currentSlug && !list.some((l) => l.slug === p.slug)
          );
          list = [...list, ...extra];
        }

        if (active) setPosts(list.slice(0, 3));
      } catch {
        // Silently degrade — the section just won't render.
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [currentSlug, category]);

  if (!posts.length) return null;

  return (
    <section className="mt-20 pt-12 border-t border-white/10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b02222] mb-2">
            Keep reading
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            More from the journal
          </h2>
        </div>
        <Link
          href="/blog"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
        >
          View all
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group h-full"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="flex flex-col h-full bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#b02222]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                {resolveImageSrc(post.image) ? (
                  <Image
                    src={resolveImageSrc(post.image)}
                    alt={post.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#1a1a1a]" />
                )}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#0a0a0a]/80 backdrop-blur-md text-white border border-white/10 uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-base font-bold text-white mb-3 leading-snug group-hover:text-[#b02222] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <BlogEngagement
                    views={post.views ?? 0}
                    likes={post.likes ?? 0}
                    variant="compact"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
