'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projectsData } from './projectinfo';
import Link from 'next/link';
import Button from './ui/Button';
import { ArrowUpRight, Github } from 'lucide-react';

const GlassCard = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-[#151515]/50 backdrop-blur-xl transition-all duration-500 ${
        hoverEffect
          ? "hover:border-white/20 hover:bg-[#151515]/70 hover:shadow-[0_0_30px_rgba(176,34,34,0.15)] hover:-translate-y-2"
          : ""
      } ${className}`}
    >
      <div className="absolute -left-10 -top-10 w-[150px] h-[150px] bg-[#b02222]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

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
           <div className="absolute inset-0 bg-gray-900 animate-pulse" /> {/* Placeholder */}
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
              
              {/* Optional: Add Github link if available in data, simplified here */}
              <div className="p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer text-white/40 hover:text-white">
                  <Github className="w-4 h-4" />
              </div>
           </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const Tab = ({ active, setActive, category, label }) => {
  const isActive = active === category;
  return (
    <button
      onClick={() => setActive(category)}
      className="relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10"
    >
      {isActive ? (
         <span className="text-white relative z-10">{label}</span>
      ) : (
         <span className="text-white/40 hover:text-white transition-colors relative z-10">{label}</span>
      )}
      
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-white/10 border border-white/10 rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
};

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('brandDesign');
  const [currentProjects, setCurrentProjects] = useState(projectsData['brandDesign'] || []);

  useEffect(() => {
    // Fallback if category doesn't exist
    if (projectsData[activeTab]) {
      setCurrentProjects(projectsData[activeTab]);
    }
  }, [activeTab]);

  return (
<<<<<<< HEAD
    <section ref={ref}>
      <div className="mx-auto px-4 sm:px-6 max-w-[1400px]">
        {/* Heading Section */}
=======
    <section className="py-24 relative overflow-hidden" id="projects">
      {/* Background Elements */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
           <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold font-manrope text-white mb-4">
                Selected Works
              </h2>
              <p className="text-white/50 max-w-md">
                A showcase of my recent projects, spanning brand identity, product design, and web development.
              </p>
           </div>
           
           {/* Tab Navigation */}
           <div className="bg-white/5 p-1.5 rounded-full backdrop-blur-md border border-white/5 flex gap-1">
              <Tab active={activeTab} setActive={setActiveTab} category="brandDesign" label="Branding" />
              <Tab active={activeTab} setActive={setActiveTab} category="productDesign" label="Product" />
              <Tab active={activeTab} setActive={setActiveTab} category="webDevelopment" label="Development" />
           </div>
        </div>

        {/* Grid */}
>>>>>>> df230af (feat: Implement a comprehensive portfolio website with blog, admin panel, project pages, and various UI components.)
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {currentProjects.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer CTA */}
        <div className="mt-20 flex justify-center">
            <Button
               href="/projects"
               variant="secondary"
               className="group"
            >
               <span>View Complete Archive</span>
               <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;