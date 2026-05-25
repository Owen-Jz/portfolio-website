"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { NavbarDemo } from "../../../components/ui/RevampedNavbar";
import FooterSection from "../../../components/FooterSection";
import Link from "next/link";
import Button from "../../../components/ui/Button";
import GlassCard from "../../../components/ui/GlassCard";
import { cn } from "../../../libs/utils";

const BlogPostPage = () => {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inlineEmail, setInlineEmail] = useState("");
  const [inlineSubscribing, setInlineSubscribing] = useState(false);
  const [inlineMessage, setInlineMessage] = useState(null);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/${params.slug}`);
        const result = await response.json();

        if (result.success && result.data) {
          setPost(result.data);
        } else {
          setError("Post not found");
          setTimeout(() => {
            router.push("/blog");
          }, 2000);
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to load post");
        setTimeout(() => {
          router.push("/blog");
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug, router]);

  const handleInlineSubscribe = async (e) => {
    e.preventDefault();
    setInlineSubscribing(true);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inlineEmail }),
      });
      const result = await res.json();

      setInlineMessage({
        success: result.success,
        text: result.success
          ? "Thanks for subscribing!"
          : result.error || "Failed to subscribe",
      });
      if (result.success) setInlineEmail("");
    } catch {
      setInlineMessage({ success: false, text: "Failed to subscribe" });
    } finally {
      setInlineSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-gray-400 text-lg">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-red-400 text-lg">{error || "Post not found"}</div>
      </div>
    );
  }

  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#b02222]/5 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#b02222]/5 to-transparent rounded-full blur-3xl -z-10" />

      <NavbarDemo />
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <div className="relative w-full">
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden border-b border-gray-600 group">
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#b02222]/20 to-transparent z-20 pointer-events-none" />

            {/* Background Image using Next/Image */}
            <div className="absolute inset-0 z-0">
               {post.image ? (
                 <Image
                   src={
                     post.image.startsWith("http") 
                       ? post.image 
                       : post.image.startsWith("/") 
                         ? post.image 
                         : `/${post.image}`
                   }
                   alt={post.title}
                   fill
                   priority
                   className="object-cover transition-transform duration-1000 group-hover:scale-105"
                 />
               ) : (
                 <div className="w-full h-full bg-[#1a1a1a]" />
               )}
            </div>

            {/* Content */}
            <div className="relative z-30 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 max-w-[1400px] mx-auto">
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-[#b02222] backdrop-blur-sm">
                  {post.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-['Manrope'] leading-tight mb-4"
              >
                {post.title}
              </motion.h1>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300"
              >
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>By {post.author}</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="py-12 md:py-16">
          <div className="mx-auto px-4 sm:px-6 max-w-4xl">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={headingVariants}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Back to Blog Link */}
            <motion.div
              className="mt-12 pt-8 border-t border-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button
                href="/blog"
                variant="primary"
                className="font-semibold flex items-center gap-2"
                withMotion={true}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Back to Blog</span>
              </Button>
            </motion.div>

            {/* Social Sharing and Subscribe Section */}
            <motion.div
              className="mt-12 pt-8 border-t border-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* Share Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Share this post</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://owendigitals.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-all text-sm flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Twitter/X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://owendigitals.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-all text-sm flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Subscribe CTA */}
              <GlassCard hoverEffect={false} className="p-6 bg-gradient-to-r from-[#b02222]/10 to-transparent border-[#b02222]/20">
                <h3 className="text-xl font-bold text-white mb-2">Enjoyed this post?</h3>
                <p className="text-gray-400 mb-4">
                  Subscribe to get notified when I publish new content.
                </p>
                <form onSubmit={handleInlineSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={inlineEmail}
                    onChange={(e) => setInlineEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b02222] text-sm"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={inlineSubscribing}
                    withMotion={false}
                    className="text-sm"
                  >
                    {inlineSubscribing ? "..." : "Subscribe"}
                  </Button>
                </form>
                {inlineMessage && (
                  <p className={`mt-3 text-sm ${inlineMessage.success ? "text-green-400" : "text-red-400"}`}>
                    {inlineMessage.text}
                  </p>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </article>
      </main>
      <FooterSection />
    </div>
  );
};

export default BlogPostPage;

