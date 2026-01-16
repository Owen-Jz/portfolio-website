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

const BlogPostPage = () => {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          </div>
        </article>
      </main>
      <FooterSection />
    </div>
  );
};

export default BlogPostPage;

