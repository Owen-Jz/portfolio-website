"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import { projectsData } from "../../components/projectinfo";

const ProjectCard = ({ project, index, accentColor }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: {
      y: -8,
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
      className="w-full"
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover="hover"
    >
      <Link href={project.link} className="block h-full group">
        <div className="relative h-full overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900/30 backdrop-blur-sm transition-all duration-500 hover:border-gray-600 hover:shadow-2xl hover:shadow-black/50">
          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.8, ease: "easeOut" },
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            {/* Accent Border on Hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: `inset 0 0 0 2px ${accentColor}40`,
              }}
            />
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-white group-hover:text-gray-100 transition-colors line-clamp-2 flex-1">
                {project.title}
              </h3>
              <motion.div
                className="flex-shrink-0"
                whileHover={{ x: 3, rotate: -45 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
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
              </motion.div>
            </div>
            
            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-800/50 text-gray-300 border border-gray-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectSection = ({ title, description, projects, accentColor, sectionId, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Different background styles for each section
  const sectionStyles = {
    0: "bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800/50", // Brand Design
    1: "bg-gradient-to-br from-gray-800/50 via-gray-900 to-gray-900", // Product Design
    2: "bg-gradient-to-br from-gray-900 to-gray-800/50 via-gray-900", // Web Development
  };

  return (
    <motion.section
      ref={ref}
      id={sectionId}
      className={`relative py-16 md:py-24 ${sectionStyles[index % 3]}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      {/* Section Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      
      {/* Decorative Elements */}
      <div 
        className="absolute top-20 right-10 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: accentColor }}
      />
      <div 
        className="absolute bottom-20 left-10 w-48 h-48 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16"
          variants={headerVariants}
        >
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="h-1 w-16 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span 
              className="text-xs md:text-sm font-semibold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              {title.split(' ')[0]}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Manrope']">
            {title}
          </h2>
          
          {description && (
            <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={sectionVariants}
        >
          {projects.map((project, projectIndex) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={projectIndex}
              accentColor={accentColor}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const ProjectsPage = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const sections = [
    {
      title: "Brand Design",
      description: "Creating memorable visual identities that tell your brand's story and connect with your audience.",
      projects: projectsData.brandDesign,
      accentColor: "#F8804F", // Orange from Organ Station
      sectionId: "brand-design",
    },
    {
      title: "Product Design",
      description: "Designing intuitive and beautiful digital experiences that users love to interact with.",
      projects: projectsData.productDesign,
      accentColor: "#22b022", // Green from Finddr
      sectionId: "product-design",
    },
    {
      title: "Web Development",
      description: "Building modern, performant web applications with cutting-edge technologies.",
      projects: projectsData.webDevelopment,
      accentColor: "#b0b022", // Yellow from Numero
      sectionId: "web-development",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <NavbarDemo />
      
      <main className="relative">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={heroVariants}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-gray-900" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#b02222]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b02222]/5 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={heroVariants}>
              <span className="inline-block px-4 py-2 mb-6 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#b02222] to-[#d38787]">
                Portfolio
              </span>
            </motion.div>

            <motion.h1
              variants={heroVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-['Manrope'] leading-tight"
            >
              All Projects
            </motion.h1>

            <motion.p
              variants={heroVariants}
              className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
            >
              A curated collection of my work across brand design, product design, and web development.
            </motion.p>
          </div>
        </motion.section>

        {/* Project Sections */}
        {sections.map((section, index) => (
          <ProjectSection
            key={section.sectionId}
            title={section.title}
            description={section.description}
            projects={section.projects}
            accentColor={section.accentColor}
            sectionId={section.sectionId}
            index={index}
          />
        ))}
      </main>

      <FooterSection />
    </div>
  );
};

export default ProjectsPage;
