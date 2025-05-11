"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { cn } from "../libs/utils";
import { NavbarDemo } from "../components/ui/ResizableNavbar";
import FooterSection from "../components/FooterSection";
// Project data from ProjectsSection
const projectsData = {
  brandDesign: [
    {
      id: 1,
      title: "Premium Fashion Brand Identity",
      category: "Brand Design",
      image: "/placeholders/product1.png",
      description: "Complete visual identity for luxury fashion brand.",
      tags: ["Branding", "Visual Identity", "Logo Design"],
    },
    {
      id: 2,
      title: "Organic Food Company Rebrand",
      category: "Brand Design",
      image: "/placeholders/product2.png",
      description: "Fresh, eco-conscious rebrand for organic food provider.",
      tags: ["Rebrand", "Packaging", "Strategy"],
    },
    {
      id: 3,
      title: "Tech Startup Brand Package",
      category: "Brand Design",
      image: "/placeholders/product3.png",
      description: "Modern, scalable brand system for emerging tech company.",
      tags: ["Tech Branding", "Visual System", "Brand Guidelines"],
    },
  ],
  productDesign: [
    {
      id: 4,
      title: "Mobile Banking App Design",
      category: "Product Design",
      image: "/placeholders/product4.png",
      description: "User-friendly interface for next-gen banking application.",
      tags: ["UI/UX", "Mobile Design", "Fintech"],
    },
    {
      id: 5,
      title: "Smart Home Control System",
      category: "Product Design",
      image: "/placeholders/product5.png",
      description: "Intuitive dashboard for managing connected home devices.",
      tags: ["Dashboard", "IoT", "User Interface"],
    },
    {
      id: 6,
      title: "Fitness Tracking Wearable UX",
      category: "Product Design",
      image: "/placeholders/product6.png",
      description: "Seamless experience for health and fitness monitoring.",
      tags: ["Wearable Tech", "UX Design", "Health Tech"],
    },
  ],
  webDevelopment: [
    {
      id: 7,
      title: "E-commerce Platform Redesign",
      category: "Web Development",
      image: "/placeholders/product1.png",
      description: "Full-stack development for modern shopping experience.",
      tags: ["Next.js", "E-commerce", "Full Stack"],
    },
    {
      id: 8,
      title: "Educational Platform",
      category: "Web Development",
      image: "/placeholders/product2.png",
      description: "Interactive learning environment with advanced features.",
      tags: ["React", "EdTech", "Interactive"],
    },
    {
      id: 9,
      title: "Real Estate Listing Portal",
      category: "Web Development",
      image: "/placeholders/product3.png",
      description: "Property search and management system with 3D tours.",
      tags: ["Three.js", "Tailwind", "Property Tech"],
    },
  ],
};

// Reused ProjectCard component
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
      className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)]"
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <div className="border border-gray-600 rounded-3xl overflow-hidden h-full min-h-[450px]  backdrop-blur-sm">
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
              className="px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-brandRed to-[#d38787]"
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
          <div className="flex flex-wrap gap-2 pt-2">
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
            <span className="font-medium">View Details</span>
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
    <div>
      <section ref={ref} className=" py-20 min-h-screen">
        <NavbarDemo />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Heading */}
          <motion.div
            className="text-center"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={headingVariants}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Manrope']">
              All Projects
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-['Manrope']">
              Explore my full portfolio of work in brand design, product design,
              and web development.
            </p>
          </motion.div>

          {/* Brand Design Section */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white font-['Manrope']">
              Brand Design
            </h2>
            <div className="flex flex-row gap-8 justify-center">
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
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white font-['Manrope']">
              Product Design
            </h2>
            <div className="flex flex-row gap-8 justify-center">
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
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white font-['Manrope']">
              Web Development
            </h2>
            <div className="flex flex-row gap-8 justify-center">
              {projectsData.webDevelopment.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="text-center"
          ></motion.div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
};

export default ProjectsPage;
