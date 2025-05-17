'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projectsData } from './projectinfo';
import Link from 'next/link';

// Individual Project Card component
const ProjectCard = ({ project, index }) => {
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
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
    hover: {
      y: -5,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.99,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="w-full h-full" // Full width/height within grid cell
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <div className="flex flex-col h-full border border-gray-600 rounded-3xl overflow-hidden min-h-[400px] bg-gray-800/30 backdrop-blur-sm">
        <div className="relative aspect-[4/3] w-full">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent z-10" />
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.4 },
            }}
          />
          <div className="absolute top-4 left-4 z-20">
            <motion.div
              className="px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: project.color }}
              whileHover={{ scale: 1.05 }}
            >
              {project.category}
            </motion.div>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-white/90 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base line-clamp-2 flex-grow">
            {project.description}
          </p>
          <div className="flex flex-row flex-wrap gap-2 pt-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <motion.div
            className="pt-3 flex items-center space-x-2 text-white cursor-pointer"
            whileHover={{ x: 5 }}
          >
            <Link href={project.link} className="flex items-center gap-2">
              <span className="font-medium text-sm sm:text-base">View Project</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
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
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Tab component with animated underline
const Tab = ({ active, setActive, category, label }) => {
  return (
    <motion.button
      className={`relative px-3 py-2 text-base sm:text-lg focus:outline-none ${
        active === category ? 'text-white' : 'text-gray-400'
      }`}
      onClick={() => setActive(category)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
      {active === category && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b02222] to-[#d38787]"
          layoutId="underline"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

// Main Projects Section component
const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('brandDesign');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentProjects, setCurrentProjects] = useState(projectsData[activeTab]);

  useEffect(() => {
    setCurrentProjects(projectsData[activeTab]);
  }, [activeTab]);

  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section ref={ref} className="py-12">
      <div className="mx-auto px-4 sm:px-6 max-w-[1400px]">
        {/* Heading Section */}
        <motion.div
          className="flex flex-col space-y-6 mb-10 text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={headingVariants}
        >

          <h2 className="text-white text-2xl md:text-4xl font-normal font-['Manrope'] leading-tight">
            My Work
          </h2>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          className="flex justify-center mb-10 border-b border-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <Tab
            active={activeTab}
            setActive={setActiveTab}
            category="brandDesign"
            label="Brand Design"
          />
          <Tab
            active={activeTab}
            setActive={setActiveTab}
            category="productDesign"
            label="Product Design"
          />
          <Tab
            active={activeTab}
            setActive={setActiveTab}
            category="webDevelopment"
            label="Web Development"
          />
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:mx-auto sm:max-w-[640px] lg:max-w-full sm:justify-items-center h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {currentProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Projects Button */}
        <Link href="/projects">
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full text-white font-medium flex items-center space-x-2 hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View All Projects</span>
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
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;