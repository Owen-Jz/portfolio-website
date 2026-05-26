"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Button from "./ui/Button";
import { ArrowUpRight, Calendar, Clock, ChevronRight } from "lucide-react";
import BlogEngagement from "./ui/BlogEngagement";

// GlassCard Component
const GlassCard = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-[#151515]/50 backdrop-blur-xl transition-all duration-500 ${hoverEffect
          ? "hover:border-white/20 hover:bg-[#151515]/70 hover:shadow-[0_0_30px_rgba(176,34,34,0.15)] hover:-translate-y-2"
          : ""
        } ${className}`}
    >
      <div className="absolute -left-10 -top-10 w-[150px] h-[150px] bg-[#b02222]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

// Featured Featured Post
const FeaturedPostHero = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full mb-12"
    >
      <Link href={`/blog/${post.slug}`} className="block group">
        <GlassCard className="min-h-[400px]">
          <div className="grid md:grid-cols-2 gap-0 h-full">
            {/* Image Side */}
            <div className="relative h-[300px] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
              <motion.div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-60" />

              <div className="absolute top-6 left-6">
                <span className="px-3 py-1 text-xs font-mono font-medium tracking-wider text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10 uppercase">
                  Featured
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-xs font-mono text-white/50 mb-6">
                <span className="px-2 py-1 rounded bg-white/5 text-white/70 uppercase tracking-wider">{post.category}</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
                <BlogEngagement views={post.views ?? 0} likes={post.likes ?? 0} variant="compact" />
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-manrope text-white mb-6 group-hover:text-[#b02222] transition-colors leading-tight">
                {post.title}
              </h3>

              <p className="text-white/60 text-base md:text-lg leading-relaxed line-clamp-3 mb-8">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-white font-medium group/link">
                <span>Read Full Article</span>
                <ArrowUpRight className="w-4 h-4 text-[#b02222] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
};

// Standard Blog Card
const BlogCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full cursor-pointer group">
        <GlassCard className="h-full">
          <div className="flex flex-col h-full">
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5">
              <motion.div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 text-[10px] font-mono font-medium tracking-wider text-white bg-black/50 backdrop-blur-md rounded-md border border-white/10 uppercase">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-3 text-xs font-mono text-white/40 mb-3">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <BlogEngagement views={post.views ?? 0} likes={post.likes ?? 0} variant="compact" />
              </div>

              <h3 className="text-xl font-bold font-manrope text-white mb-3 group-hover:text-[#b02222] transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors pt-4 border-t border-white/5">
                <span>Read Article</span>
                <ChevronRight className="w-4 h-4 text-[#b02222] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
};

const BlogSection = () => {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [blogPostsForSection, setBlogPostsForSection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/blog");
        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          // Find the post marked as featured, or use the first one
          const featured = result.data.find(post => post.isFeatured) || result.data[0];
          const otherPosts = result.data.filter(post => post._id !== featured._id);
          
          setFeaturedPost(featured);
          setBlogPostsForSection(otherPosts.slice(0, 2));
        }
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="py-24 bg-[#0a0a0a]" />; // Simple placeholder to avoid layout shift jumpiness or just return null
  }

  if (!featuredPost) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0a0a]" id="blog">
      {/* Background Elements */}
      <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#b02222] text-sm md:text-base font-bold font-manrope uppercase tracking-widest mb-3">
              Insights & Updates
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-manrope text-white mb-6">
              Latest from the Blog
            </h2>
          </motion.div>
        </div>

        {/* Featured Post */}
        <FeaturedPostHero post={featuredPost} />

        {/* Regular Grid */}
        {blogPostsForSection.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {blogPostsForSection.map((post, index) => (
              <BlogCard key={post._id || post.slug} post={post} index={index} />
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="flex justify-center mt-16">
          <Button
            href="/blog"
            variant="secondary"
            className="group"
          >
            <span>View All Articles</span>
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

