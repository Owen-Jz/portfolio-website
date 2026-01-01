"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import GlassCard from "../../components/ui/GlassCard";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight, ChevronRight, Tag } from "lucide-react";

// Filter Tab Component
const FilterTab = ({ active, setActive, category, label }) => {
  const isActive = active === category;
  return (
    <button
      onClick={() => setActive(category)}
      className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive 
          ? "text-white bg-white/10 border border-[#b02222]/50 shadow-[0_0_15px_rgba(176,34,34,0.3)]" 
          : "text-white/40 hover:text-white hover:bg-white/5 border border-transparent"
      }`}
    >
      {label}
    </button>
  );
};

// Featured Hero Post Component
const FeaturedPostHero = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full mb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <Link href={`/blog/${post.slug}`} className="block group">
        <GlassCard className="overflow-hidden min-h-[500px] relative">
            {/* Background Image as absolute layer to span full card */}
            <div className="absolute inset-0 z-0">
               <div 
                 className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                 style={{ backgroundImage: `url(${post.image})` }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
               <div className="absolute inset-0 bg-[#0a0a0a]/40 z-10" />
            </div>

            <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 h-[500px]">
                <div className="max-w-4xl space-y-6">
                    <div className="flex items-center gap-4">
                       <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#b02222] text-white uppercase tracking-wider shadow-lg shadow-red-900/20">
                          {post.category}
                       </span>
                       <div className="flex items-center gap-2 text-white/60 text-sm font-mono">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                       </div>
                    </div>
    
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-manrope text-white leading-tight group-hover:text-white/90 transition-colors">
                      {post.title}
                    </h2>
    
                    <p className="text-lg text-white/70 max-w-2xl line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
    
                    <div className="pt-4">
                       <div className="inline-flex items-center gap-2 text-white font-medium group/btn">
                          <span className="border-b border-[#b02222] pb-0.5">Read Featured Article</span>
                          <ArrowUpRight className="w-5 h-5 text-[#b02222] transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                       </div>
                    </div>
                </div>
            </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
};

// Regular Blog Card Component
const BlogCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full group">
        <GlassCard className="h-full flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                
                <div className="absolute top-4 left-4 z-10">
                   <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-black/60 backdrop-blur-md border border-white/10 text-white uppercase tracking-wider">
                      {post.category}
                   </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs font-mono text-white/40 mb-4">
                   <span>{post.date}</span>
                   <span className="w-1 h-1 bg-white/10 rounded-full" />
                   <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold font-manrope text-white mb-3 group-hover:text-[#b02222] transition-colors leading-tight line-clamp-2">
                   {post.title}
                </h3>

                <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                   {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors pt-4 border-t border-white/5">
                   <span>Read Article</span>
                   <ChevronRight className="w-4 h-4 text-[#b02222] group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
};

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/blog");
        const result = await response.json();

        if (result.success && result.data) {
          setBlogPosts(result.data);
          if (result.data.length > 0) {
            setFeaturedPost(result.data[0]);
            setFilteredPosts(result.data.slice(1));
          }
        } else {
          setError("Failed to load blog posts");
        }
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (!blogPosts.length) return;
    
    // Always exclude featured post from the grid
    const postsToFilter = blogPosts.filter(p => p !== featuredPost);

    if (activeFilter === "All") {
      setFilteredPosts(postsToFilter);
    } else {
      setFilteredPosts(postsToFilter.filter((post) => post.category === activeFilter));
    }
  }, [activeFilter, blogPosts, featuredPost]);

  const categories = ["All", "Personal Life", "Business", "Design"];

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-manrope selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />
      
      <main className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10">
           
           {/* Loading / Error States */}
           {loading && (
             <div className="flex justify-center py-20">
                <div className="flex items-center gap-2 text-white/50 animate-pulse">
                   <div className="w-2 h-2 rounded-full bg-[#b02222]" />
                   Loading articles...
                </div>
             </div>
           )}

           {!loading && !error && (
             <>
               {/* Featured Post - Now the Hero */}
               {featuredPost && <FeaturedPostHero post={featuredPost} />}

               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Filter Tabs */}
                  <div className="flex flex-wrap justify-center gap-2 mb-12">
                     {categories.map((cat) => (
                        <FilterTab 
                           key={cat}
                           category={cat}
                           label={cat}
                           active={activeFilter}
                           setActive={setActiveFilter}
                        />
                     ))}
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post, idx) => (
                           <BlogCard key={post.id || idx} post={post} index={idx} />
                        ))}
                     </AnimatePresence>
                  </div>

                  {filteredPosts.length === 0 && (
                     <div className="text-center py-20 text-white/30 italic">
                        No articles found in this category.
                     </div>
                  )}
               </div>
             </>
           )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default BlogPage;
