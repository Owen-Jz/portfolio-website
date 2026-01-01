"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import { projectsData } from "../../components/projectinfo";
import GlassCard from "../../components/ui/GlassCard";
import { ArrowUpRight, Github, Sparkles, Layers, Box, Code } from "lucide-react";

/**
 * Reusing the exact Card logic but wrapped in our new GlassCard for consistency
 */
const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <GlassCard className="flex flex-col h-full group">
        {/* Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5">
           <div className="absolute inset-0 bg-gray-900 animate-pulse" />
           <motion.div
             className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
             style={{ backgroundImage: `url(${project.image})` }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-60" />
           
           {/* Category Badge */}
           <div className="absolute top-4 left-4">
             <span className="px-3 py-1 text-xs font-mono font-medium tracking-wider text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10 uppercase">
               {project.category}
             </span>
           </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow relative">
           <div className="mb-4">
              <h3 className="text-2xl font-semibold text-white font-manrope mb-2 group-hover:text-[#b02222] transition-colors">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>
           </div>

           {/* Tags */}
           <div className="flex flex-wrap gap-2 mb-6 mt-auto">
             {project.tags.map((tag, i) => (
               <span key={i} className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded-md border border-white/5 font-mono uppercase">
                 {tag}
               </span>
             ))}
           </div>

           {/* Actions */}
           <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <Link href={project.link} className="flex items-center gap-2 group/link">
                 <span className="text-white text-sm font-medium group-hover/link:underline decoration-[#b02222] underline-offset-4">View Case Study</span>
                 <ArrowUpRight className="w-4 h-4 text-[#b02222] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
           </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const SectionHeader = ({ title, description, icon: Icon }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 mt-1">
          <Icon className="w-6 h-6 text-[#b02222]" />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-manrope mb-2">{title}</h2>
          <p className="text-white/50 max-w-xl text-base">{description}</p>
        </div>
      </div>
      <div className="h-px bg-white/10 flex-grow md:ml-8 self-center" />
    </div>
  );
};

const ProjectsPage = () => {
    
  return (
    <div className="min-h-screen bg-[#0a0a0a] selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-24">
            
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto space-y-6 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-[#b02222]" />
                <span className="text-sm font-manrope text-white/80">Selected Works</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-manrope leading-tight text-white">
                Made with Application <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-[#d38787]">
                   and Passion.
                </span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 font-manrope max-w-2xl mx-auto leading-relaxed"
            >
              A curated archive of brand identities, digital products, and web applications I've brought to life.
            </motion.p>
          </div>

          {/* Sections */}
          <div className="space-y-32">
             {/* Branding */}
             <section id="branding">
                <SectionHeader 
                   title="Brand Identity" 
                   description="Crafting visual languages that tell compelling stories." 
                   icon={Layers}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {(projectsData.brandDesign || []).map((project, idx) => (
                      <ProjectCard key={project.id} project={project} index={idx} />
                   ))}
                </div>
             </section>

             {/* Product Design */}
             <section id="product">
                <SectionHeader 
                   title="Product Design" 
                   description="Designing intuitive interfaces for complex problems." 
                   icon={Box}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {(projectsData.productDesign || []).map((project, idx) => (
                      <ProjectCard key={project.id} project={project} index={idx} />
                   ))}
                </div>
             </section>

             {/* Web Development */}
             <section id="development">
                <SectionHeader 
                   title="Development" 
                   description="Building robust, scalable applications with modern tech." 
                   icon={Code}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {(projectsData.webDevelopment || []).map((project, idx) => (
                      <ProjectCard key={project.id} project={project} index={idx} />
                   ))}
                </div>
             </section>
          </div>

        </div>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default ProjectsPage;
