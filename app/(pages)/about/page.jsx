"use client";

import React from "react";
import { motion } from "framer-motion";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import ContactSection from "../../components/ContactSection";
import GlassCard from "../../components/ui/GlassCard";
import { Trophy, Users, Star, Sparkles, Code2, Palette, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const skills = [
    "UI/UX Design",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Figma",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "Adobe XD",
    "Web Development",
    "Responsive Design",
  ];

  const achievements = [
    {
      title: "Redesigned E-Commerce Platform",
      description:
        "Led the UI/UX redesign for a major e-commerce platform, increasing user engagement by 35% and boosting conversion rates.",
      icon: <Users className="w-6 h-6 text-[#b02222]" />,
    },
    {
      title: "Open-Source Contributor",
      description:
        "Contributed to multiple open-source React libraries, enhancing functionality for thousands of developers worldwide.",
      icon: <Code2 className="w-6 h-6 text-[#b02222]" />,
    },
    {
      title: "Award-Winning Portfolio",
      description:
        "Received the 2024 Web Design Excellence Award for creating a visually stunning and highly functional portfolio.",
      icon: <Trophy className="w-6 h-6 text-[#b02222]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-24">
          
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-[#b02222]" />
                <span className="text-sm font-manrope text-white/80">More About Me</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-manrope leading-tight">
                Crafting Digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-[#d38787]">
                  Masterpieces
                </span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 font-manrope max-w-2xl mx-auto leading-relaxed"
            >
              A designer and developer passionate about building intuitive, 
              impactful, and beautiful solutions that users love.
            </motion.p>
          </div>

          {/* Journey Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 h-full">
               <GlassCard className="h-full min-h-[400px] p-2 group">
                 <div className="w-full h-full rounded-[20px] overflow-hidden relative">
                    <img 
                      src="/profile2.jpg" 
                      alt="Owen" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                    <div className="absolute bottom-6 left-6">
                       <h3 className="text-2xl font-bold font-manrope">Owen Digitals</h3>
                       <p className="text-white/60 font-mono text-sm">Design Engineer</p>
                    </div>
                 </div>
               </GlassCard>
            </div>
            
            <div className="lg:col-span-7 flex flex-col gap-8">
              <GlassCard className="p-8 md:p-10 flex-1">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                       <Palette className="w-6 h-6 text-[#b02222]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-manrope">From Pixels to Code</h2>
                 </div>
                 
                 <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed font-manrope">
                   <p>
                     My path into the digital world began with a fascination for design—how aesthetics and usability can shape perception and interaction. This led me to master tools like Figma and Adobe XD, honing my eye for detail.
                   </p>
                   <p>
                     But I didn't stop at the visuals. Curious about bringing these designs to life, I delved into development, embracing the power of React, Next.js, and modern web technologies. Today, I bridge the gap between creative vision and technical execution.
                   </p>
                 </div>
              </GlassCard>

              {/* Quick Stats Grid can go here if needed, or just more content */}
            </div>
          </div>

          {/* Achievements Section */}
          <div>
             <motion.h2 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="text-3xl md:text-4xl font-bold font-manrope mb-10 pl-4 border-l-4 border-[#b02222]"
             >
               Key Achievements
             </motion.h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((item, idx) => (
                  <GlassCard key={idx} className="p-8" hoverEffect={true}>
                     <div className="w-12 h-12 rounded-full bg-[#b02222]/10 flex items-center justify-center mb-6 border border-[#b02222]/20">
                        {item.icon}
                     </div>
                     <h3 className="text-xl font-bold font-manrope mb-3">{item.title}</h3>
                     <p className="text-white/60 leading-relaxed text-sm">
                       {item.description}
                     </p>
                  </GlassCard>
                ))}
             </div>
          </div>

          {/* Process Teaser Section */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold font-manrope mb-8 pl-4 border-l-4 border-[#b02222]"
            >
              My Process
            </motion.h2>

            <GlassCard className="p-8">
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { num: 1, name: "Discovery" },
                  { num: 2, name: "Strategy" },
                  { num: 3, name: "Design" },
                  { num: 4, name: "Prototype" },
                  { num: 5, name: "Handoff" },
                  { num: 6, name: "Launch & Iterate" },
                ].map((phase, idx) => (
                  <motion.div
                    key={phase.num}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:border-[#b02222]/40 hover:text-white transition-colors cursor-default font-manrope text-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#b02222]/20 text-[#b02222] flex items-center justify-center text-xs font-bold">
                      {phase.num}
                    </span>
                    {phase.name}
                  </motion.div>
                ))}
              </div>

              <a
                href="/process"
                className="inline-flex items-center gap-2 text-[#b02222] hover:text-[#d38787] font-manrope font-medium transition-colors group"
              >
                View Full Process
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </GlassCard>
          </div>

          {/* Skills Section */}
          <GlassCard className="p-8 md:p-12 text-center">
             <div className="max-w-3xl mx-auto">
               <div className="flex justify-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-xl shadow-lg shadow-[#b02222]/20">
                     <Code2 className="w-6 h-6 text-white" />
                  </div>
               </div>
               <h2 className="text-3xl font-bold font-manrope mb-4">Technical Arsenal</h2>
               <p className="text-white/60 mb-10 max-w-xl mx-auto">
                 The tools and technologies I use to bring ideas to life, constantly updated and refined.
               </p>
               
               <div className="flex flex-wrap justify-center gap-3">
                 {skills.map((skill, idx) => (
                   <motion.div
                     key={idx}
                     whileHover={{ scale: 1.05, y: -2 }}
                     className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#b02222] hover:text-white hover:border-[#b02222] transition-all duration-300 font-medium font-manrope cursor-default text-sm"
                   >
                     {skill}
                   </motion.div>
                 ))}
               </div>
             </div>
          </GlassCard>

          {/* CTA Section */}
          <div className="pb-20">
             <ContactSection />
          </div>

        </div>
      </main>
      
      <FooterSection />
    </div>
  );
}
