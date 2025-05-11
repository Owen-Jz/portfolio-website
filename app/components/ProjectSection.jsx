"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projectsData } from "./projectinfo";

// Project data - replace with your actual projects
// const projectsData = {
//   brandDesign: [
//     {
//       id: 1,
//       title: "Organ Station Brand Identity",
//       category: "Brand Design",
//       image: "projects/organstation.png",
//       color: "#F8804F",
//       description:
//         "A Branding project for a new startup in the health industry",
//       tags: ["Branding", "Visual Identity", "Logo Design"],
//     },
//     {
//       id: 2,
//       title: "Organic Food Company Rebrand",
//       category: "Brand Design",
//       image: "product2.png",
//       color: "#22b0b0",
//       description: "Fresh, eco-conscious rebrand for organic food provider.",
//       tags: ["Rebrand", "Packaging", "Strategy"],
//     },
//     {
//       id: 3,
//       title: "Tech Startup Brand Package",
//       category: "Brand Design",
//       image: "product3.png",
//       color: "#b022b0",
//       description: "Modern, scalable brand system for emerging tech company.",
//       tags: ["Tech Branding", "Visual System", "Brand Guidelines"],
//     },
//   ],
//   productDesign: [
//     {
//       id: 4,
//       title: "Mobile Banking App Design",
//       category: "Product Design",
//       image: "product4.png",
//       color: "#22b022",
//       description: "User-friendly interface for next-gen banking application.",
//       tags: ["UI/UX", "Mobile Design", "Fintech"],
//     },
//     {
//       id: 5,
//       title: "Smart Home Control System",
//       category: "Product Design",
//       image: "product5.png",
//       color: "#b07022",
//       description: "Intuitive dashboard for managing connected home devices.",
//       tags: ["Dashboard", "IoT", "User Interface"],
//     },
//     {
//       id: 6,
//       title: "Fitness Tracking Wearable UX",
//       category: "Product Design",
//       image: "product6.png",
//       color: "#2270b0",
//       description: "Seamless experience for health and fitness monitoring.",
//       tags: ["Wearable Tech", "UX Design", "Health Tech"],
//     },
//   ],
//   webDevelopment: [
//     {
//       id: 7,
//       title: "E-commerce Platform Redesign",
//       category: "Web Development",
//       image: "product1.png",
//       color: "#b0b022",
//       description: "Full-stack development for modern shopping experience.",
//       tags: ["Next.js", "E-commerce", "Full Stack"],
//     },
//     {
//       id: 8,
//       title: "Educational Platform",
//       category: "Web Development",
//       image: "product2.png",
//       color: "#5022b0",
//       description: "Interactive learning environment with advanced features.",
//       tags: ["React", "EdTech", "Interactive"],
//     },
//     {
//       id: 9,
//       title: "Real Estate Listing Portal",
//       category: "Web Development",
//       image: "product3.png",
//       color: "#b05022",
//       description: "Property search and management system with 3D tours.",
//       tags: ["Three.js", "Tailwind", "Property Tech"],
//     },
//   ],
// };

// Individual Project Card component
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
      className="w-full md:w-[calc(33.333%-16px)]"
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <div className="border border-gray-600 rounded-3xl overflow-hidden h-full min-h-[450px] bg-gray-800/30 backdrop-blur-sm">
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent z-10" />
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.5 },
            }}
          />
          <div className="absolute top-6 left-6 z-20">
            <motion.div
              className="px-4 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: project.color }}
              whileHover={{ scale: 1.05 }}
            >
              {project.category}
            </motion.div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-300">{project.description}</p>
          <div className="flex flex-row gap-2 pt-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <motion.div
            className="pt-4 flex items-center space-x-2 text-white group cursor-pointer"
            whileHover={{ x: 5 }}
          >
            <span className="font-medium">View Project</span>
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
      className={`relative px-4 py-2 text-xl focus:outline-none ${
        active === category ? "text-white" : "text-gray-400"
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
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

// Main Projects Section component
const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("brandDesign");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // For "Shuffle" animation effect when changing tabs
  const [currentProjects, setCurrentProjects] = useState(
    projectsData[activeTab]
  );
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentProjects(projectsData[activeTab]);
      setIsAnimating(false);
    }, 500);
  }, [activeTab]);

  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section ref={ref} className="py-16">
      <div className="mx-auto px-4 sm:px-6 max-w-[1400px]">
        {/* Heading Section */}
        <motion.div
          className="flex flex-col space-y-6 mb-12 text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headingVariants}
        >
          <p className="text-[#b02222] text-xl md:text-2xl font-bold font-['Manrope'] uppercase leading-7">
            My Projects
          </p>
          <h2 className="text-white text-3xl md:text-5xl font-normal font-['Manrope'] leading-tight">
            My Best Work
          </h2>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          className="flex justify-center mb-12 border-b border-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
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
            className="flex flex-col lg:flex-row gap-3 justify-center"
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
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full text-white font-medium flex items-center space-x-2 hover:shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 20px 25px -5px rgba(176, 34, 34, 0.3), 0 8px 10px -6px rgba(176, 34, 34, 0.2)",
            }}
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
      </div>
    </section>
  );
};

export default ProjectsSection;
