"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { blogPosts } from "../(pages)/blog/blogData";

// Featured hero post (first post)
const featuredPost = blogPosts[0];

// Other blog posts for the grid (showing first 2 after featured)
const blogPostsForSection = blogPosts.slice(1, 3);

// Featured Hero Post Component
const FeaturedPostHero = ({ post }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full mb-12 md:mb-16"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative group cursor-pointer overflow-hidden rounded-3xl border border-gray-600 bg-gray-800/30 backdrop-blur-sm hover:border-gray-500 transition-all duration-500">
          {/* Background Image with Overlay */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#b02222]/20 to-transparent z-10" />
            
            {/* Animated Background Image */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 1, ease: "easeOut" },
              }}
            />
            
            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16">
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-[#b02222] backdrop-blur-sm">
                  {post.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-['Manrope'] leading-tight mb-4 group-hover:text-[#b02222] transition-colors duration-300"
              >
                {post.title}
              </motion.h2>

              {/* Excerpt */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mb-6 line-clamp-3"
              >
                {post.excerpt}
              </motion.p>

              {/* Meta Info and CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 text-sm md:text-base text-gray-300">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2 text-white group-hover:text-[#b02222] transition-colors duration-300">
                  <span className="font-semibold text-base md:text-lg">Read Article</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </motion.svg>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Regular Blog Card Component
const BlogCard = ({ post, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover="hover"
      className="w-full"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative flex flex-col h-full border border-gray-600 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm transition-all duration-500 hover:border-[#b02222]/50 hover:shadow-2xl hover:shadow-[#b02222]/20 group cursor-pointer">
          {/* Decorative Gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#b02222]/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
              whileHover={{
                scale: 1.15,
                transition: { duration: 0.7, ease: "easeOut" },
              }}
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <motion.span
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#b02222] backdrop-blur-sm shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                {post.category}
              </motion.span>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6 flex flex-col flex-grow space-y-4 z-10">
            {/* Meta Info */}
            <div className="flex items-center gap-3 text-xs md:text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#b02222] transition-colors duration-300 line-clamp-2 leading-tight">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-2 flex-grow">
              {post.excerpt}
            </p>

            {/* Read More */}
            <div className="flex items-center gap-2 text-white group-hover:text-[#b02222] transition-colors duration-300 pt-2">
              <span className="font-semibold text-sm md:text-base">Read More</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section ref={ref} className="py-12 md:py-16 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#b02222]/5 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#b02222]/5 to-transparent rounded-full blur-3xl -z-10" />
      
      <div className="mx-auto px-4 sm:px-6 max-w-[1400px] relative z-10">
        {/* Heading Section */}
        <motion.div
          className="flex flex-col gap-2 mb-8 md:mb-12 text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headingVariants}
        >
          <p className="text-[#b02222] text-sm md:text-base font-bold font-['Manrope'] uppercase tracking-wider">
            Insights & Updates
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-['Manrope'] leading-tight">
            Latest Blog Posts
          </h2>
        </motion.div>

        {/* Featured Hero Post */}
        <FeaturedPostHero post={featuredPost} />

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {blogPostsForSection.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View All Blog Posts Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Link href="/blog">
            <motion.button
              className="btn-primary font-semibold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View All Posts</span>
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;

