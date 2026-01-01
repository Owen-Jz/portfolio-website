"use client";

import React from "react";
import { motion } from "framer-motion";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import ContactSection from "../../components/ContactSection";
import GlassCard from "../../components/ui/GlassCard";
import Image from "next/image";
import { ArrowLeft, Layers, PenTool, Lightbulb } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const ProjectPageTemplate = ({
  title,
  subtitle,
  category = "Brand Design",
  overviewContent,
  processContent,
  logoBreakdownContent,
  metadata = [], // [{ label: "Client", value: "Org" }]
  galleryImages = [] // [{ src, alt, fullWidth: boolean }]
}) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b02222] selection:text-white font-manrope">
      <NavbarDemo />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
         {/* Background Elements */}
         <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
         <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

         <div className="max-w-5xl mx-auto relative z-10">
            
            {/* Back Link */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="mb-8"
            >
               <Link href="/projects" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span className="text-sm font-mono uppercase tracking-wider">Back to Projects</span>
               </Link>
            </motion.div>

            {/* Header */}
            <div className="mb-16">
               <motion.div 
                  initial="hidden" 
                  animate="visible" 
                  variants={fadeInUp}
               >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                    <span className="text-xs font-mono text-[#b02222] uppercase tracking-wider">{category}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    {title}
                  </h1>
                  <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
                    {subtitle}
                  </p>
               </motion.div>

               {/* Metadata Grid */}
               {metadata.length > 0 && (
                 <motion.div 
                   initial="hidden"
                   animate="visible"
                   variants={fadeInUp}
                   className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
                 >
                    {metadata.map((item, idx) => (
                       <GlassCard key={idx} className="p-4" hoverEffect={false}>
                          <span className="block text-xs text-white/40 font-mono uppercase tracking-wider mb-1">{item.label}</span>
                          <span className="block text-white font-medium">{item.value}</span>
                       </GlassCard>
                    ))}
                 </motion.div>
               )}
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
               
               {/* Overview */}
               {overviewContent && (
                 <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                 >
                    <div className="flex items-center gap-3 mb-6">
                       <div className="p-2 bg-white/5 rounded-lg text-[#b02222]">
                          <Lightbulb className="w-5 h-5" />
                       </div>
                       <h2 className="text-2xl font-bold">Project Overview</h2>
                    </div>
                    <GlassCard className="p-8 md:p-10 leading-relaxed text-lg text-white/80 space-y-4">
                       {overviewContent}
                    </GlassCard>
                 </motion.section>
               )}

               {/* Process */}
               {processContent && (
                 <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                 >
                    <div className="flex items-center gap-3 mb-6">
                       <div className="p-2 bg-white/5 rounded-lg text-[#b02222]">
                          <Layers className="w-5 h-5" />
                       </div>
                       <h2 className="text-2xl font-bold">The Process</h2>
                    </div>
                    <GlassCard className="p-8 md:p-10 leading-relaxed text-lg text-white/80 space-y-4">
                       {processContent}
                    </GlassCard>
                 </motion.section>
               )}

               {/* Logo/Detail Breakdown */}
               {logoBreakdownContent && (
                 <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                 >
                     <div className="flex items-center gap-3 mb-6">
                       <div className="p-2 bg-white/5 rounded-lg text-[#b02222]">
                          <PenTool className="w-5 h-5" />
                       </div>
                       <h2 className="text-2xl font-bold">Design Breakdown</h2>
                    </div>
                    <GlassCard className="p-8 md:p-10 leading-relaxed text-lg text-white/80 space-y-4">
                       {logoBreakdownContent}
                    </GlassCard>
                 </motion.section>
               )}

            </div>
         </div>

         {/* Gallery - Full Width Container */}
         {galleryImages.length > 0 && (
            <div className="mt-24 max-w-7xl mx-auto space-y-8">
               {galleryImages.map((img, idx) => (
                  <motion.div 
                     key={idx}
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.7 }}
                     className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#151515]"
                  >
                     <Image 
                        src={img.src}
                        alt={img.alt || `Project Image ${idx + 1}`}
                        width={1800}
                        height={1200}
                        className="w-full h-auto object-cover"
                     />
                  </motion.div>
               ))}
            </div>
         )}
         
         <div className="mt-20 max-w-7xl mx-auto">
            <ContactSection />
         </div>

      </main>
      <FooterSection />
    </div>
  );
};

export default ProjectPageTemplate;
