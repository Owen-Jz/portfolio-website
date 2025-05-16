"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { cn } from "../../libs/utils";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import { projectsData } from "../../components/projectinfo";

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-12px)]"
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <Link href={project.link} className="block h-full">
        <div className="border border-gray-600 rounded-2xl overflow-hidden h-full min-h-[400px] bg-dark-800/80 backdrop-blur-sm transition-colors hover:border-gray-500">
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10" />
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.5 },
              }}
            />
            <div className="absolute top-4 left-4 z-20">
              <motion.div
                className="px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-brandRed to-[#d38787]"
                whileHover={{ scale: 1.05 }}
              >
                {project.category}
              </motion.div>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-white transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <motion.div
              className="pt-3 flex items-center space-x-2 text-white cursor-pointer"
              whileHover={{ x: 5 }}
            >
              <span className="font-medium text-sm sm:text-base">
                View Details
              </span>
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
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-dark-900 min-h-screen">
      <NavbarDemo />
      <section ref={ref} className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 space-y-12 sm:space-y-16">
          {/* Heading */}
          <motion.div
            className="text-center"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={headingVariants}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-['Manrope']">
              All Projects
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-['Manrope']">
              Explore my full portfolio of work in brand design, product design,
              and web development.
            </p>
          </motion.div>

          {/* Brand Design Section */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="space-y-6"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white font-['Manrope']">
              Brand Design
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-5 justify-center">
              {projectsData.brandDesign.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Product Design Section */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="space-y-6"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white font-['Manrope']">
              Product Design
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-5 justify-center">
              {projectsData.productDesign.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Web Development Section */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="space-y-6"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white font-['Manrope']">
              Web Development
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-5 justify-center">
              {projectsData.webDevelopment.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
