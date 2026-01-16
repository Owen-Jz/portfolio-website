"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarDemo } from "../../components/ui/RevampedNavbar";
import FooterSection from "../../components/FooterSection";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  Search, 
  ChevronRight, 
  Sparkles,
  Zap,
  Tag
} from "lucide-react";

// --- Components ---

const FilterPill = ({ active, setActive, category, label }) => {
  const isActive = active === category;
  return (
    <button
      onClick={() => setActive(category)}
      className={`relative px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 border ${
        isActive 
          ? "bg-[#b02222] text-white border-[#b02222] shadow-[0_0_20px_rgba(176,34,34,0.4)]" 
          : "bg-white/5 text-white/60 border-white/5 hover:border-white/10 hover:text-white hover:bg-white/10"
      }`}
    >
      {label}
      {isActive && (
        <motion.div
            layoutId="activePill"
            className="absolute inset-0 rounded-2xl bg-white/10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
};

const FeaturedHero = ({ post }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-3xl overflow-hidden group mb-16"
    >
      <Link href={`/blog/${post.slug}`} className="block w-full h-full relative cursor-pointer">
        {/* Image Background with Parallax-like effect on Hover */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 md:p-12 lg:p-16 flex flex-col justify-end items-start z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#b02222] text-white uppercase tracking-wider shadow-lg shadow-red-900/20 flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                Featured Review
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 text-white/80 backdrop-blur-sm border border-white/10">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight group-hover:text-white/90 transition-colors">
              {post.title}
            </h1>

            <p className="text-base md:text-lg text-white/70 max-w-2xl mb-8 line-clamp-2 md:line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-white/60">
               <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                     <Calendar className="w-4 h-4 text-white" />
                  </span>
                  <span>{post.date}</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                     <Clock className="w-4 h-4 text-white" />
                  </span>
                  <span>{post.readTime}</span>
               </div>
               
               <div className="ml-auto md:ml-0 flex items-center gap-2 text-white group/btn bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-[#b02222] hover:border-[#b02222] transition-all">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
               </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

const ModernBlogCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#b02222]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Image Area */}
        <div className="relative aspect-[3/2] overflow-hidden">
           <div 
             className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
             style={{ backgroundImage: `url(${post.image})` }}
           />
           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
           
           <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#0a0a0a]/80 backdrop-blur-md text-white border border-white/10 uppercase tracking-wider">
                {post.category}
              </span>
           </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow">
           <div className="flex items-center gap-2 text-xs font-medium text-[#b02222] mb-3 uppercase tracking-wider">
              <Zap className="w-3 h-3" />
              <span>{post.readTime}</span>
           </div>

           <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-[#b02222] transition-colors line-clamp-2">
             {post.title}
           </h3>

           <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">
             {post.excerpt}
           </p>

           <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                 <Calendar className="w-3.5 h-3.5" />
                 {post.date}
              </span>
              <span className="group-hover:text-white transition-colors flex items-center gap-1">
                 Read <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
           </div>
        </div>
      </Link>
    </motion.div>
  );
};

// --- Main Page ---

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/blog");
        const result = await response.json();

        if (result.success && result.data) {
          setBlogPosts(result.data);
          
          if (result.data.length > 0) {
            // Priority: isFeatured=true -> order=0 -> First in list
            const featured = result.data.find(post => post.isFeatured) || result.data[0];
            setFeaturedPost(featured);
          }
        }
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter Logic
  useEffect(() => {
    if (!blogPosts.length) return;
    
    // Start with all posts EXCEPT the featured one (to avoid duplication)
    let processed = blogPosts.filter(p => p._id !== featuredPost?._id);

    // Apply Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      processed = processed.filter(post => 
        post.title.toLowerCase().includes(lowerQuery) || 
        post.excerpt.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply Category Filter
    if (activeFilter !== "All") {
      processed = processed.filter(post => post.category === activeFilter);
    }

    setFilteredPosts(processed);
  }, [activeFilter, searchQuery, blogPosts, featuredPost]);

  const categories = ["All", "Personal Life", "Business", "Design"];

  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />
      
      <main className="pt-32 pb-24 relative">
        {/* Subtle Background Gradients */}
        <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#b02222]/5 to-transparent pointer-events-none" />
        <div className="fixed top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           
           {/* Header Section */}
           <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                 <motion.h1 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight"
                 >
                   Insights & <span className="text-[#b02222]">Thoughts</span>
                 </motion.h1>
                 <motion.p 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.1 }}
                   className="text-white/50 text-lg max-w-xl"
                 >
                   Exploring the intersection of design, technology, and creative living.
                 </motion.p>
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-auto relative group">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-white/30 group-focus-within:text-[#b02222] transition-colors" />
                 </div>
                 <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-80 bg-[#111] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-[#b02222]/50 focus:ring-1 focus:ring-[#b02222]/50 transition-all shadow-sm"
                 />
              </div>
           </div>

           {loading ? (
             <div className="w-full h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-[#b02222] border-t-transparent rounded-full animate-spin" />
                  <span className="text-white/40 font-mono text-sm animate-pulse">Loading Content...</span>
                </div>
             </div>
           ) : (
             <>
               {/* Featured Hero */}
               {!searchQuery && featuredPost && (
                 <FeaturedHero post={featuredPost} />
               )}

               {/* Filters */}
               <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-white/5">
                  <Tag className="w-4 h-4 text-[#b02222]" />
                  <span className="text-xs font-bold text-white/40 uppercase tracking-widest mr-2">Filter By:</span>
                  {categories.map((cat) => (
                    <FilterPill
                      key={cat}
                      category={cat}
                      label={cat}
                      active={activeFilter}
                      setActive={setActiveFilter}
                    />
                  ))}
               </div>

               {/* Grid */}
               {filteredPosts.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                   <AnimatePresence mode="popLayout">
                     {filteredPosts.map((post, idx) => (
                       <ModernBlogCard key={post._id || idx} post={post} index={idx} />
                     ))}
                   </AnimatePresence>
                 </div>
               ) : (
                 <div className="py-32 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                       <Search className="w-6 h-6 text-white/20" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                    <p className="text-white/40">
                       Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <button 
                       onClick={() => {setSearchQuery(""); setActiveFilter("All")}}
                       className="mt-6 text-[#b02222] text-sm hover:underline"
                    >
                       Clear all filters
                    </button>
                 </div>
               )}
             </>
           )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default BlogPage;
