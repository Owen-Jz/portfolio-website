"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { NavbarDemo } from "../../../components/ui/ResizableNavbar";
import FooterSection from "../../../components/FooterSection";
import Link from "next/link";
import { getPostBySlug } from "../blogData";

const BlogPostPage = () => {
  const params = useParams();
  const router = useRouter();
  const post = getPostBySlug(params.slug);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!post) {
      router.push("/blog");
    }
  }, [post, router]);

  if (!post) {
    return null;
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
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden border-b border-gray-600">
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#b02222]/20 to-transparent z-10" />

            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
            />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 max-w-[1400px] mx-auto">
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
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-[#b02222] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-semibold
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-6 prose-h3:mb-3
                prose-ul:text-gray-300 prose-ol:text-gray-300
                prose-li:text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Back to Blog Link */}
            <motion.div
              className="mt-12 pt-8 border-t border-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link href="/blog">
                <motion.button
                  className="btn-primary font-semibold flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
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
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </article>
      </main>
      <FooterSection />
    </div>
  );
};

export default BlogPostPage;

