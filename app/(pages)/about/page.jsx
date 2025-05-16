"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../../libs/utils"; // Assuming this path is correct
import { NavbarDemo } from "../../components/ui/ResizableNavbar"; // Assuming this path is correct
import FooterSection from "../../components/FooterSection";
import ContactSection from "../../components/ContactSection";
export default function AboutSectionRefined() {
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
    },
    {
      title: "Open-Source Contributor",
      description:
        "Contributed to multiple open-source React libraries, enhancing functionality for thousands of developers worldwide.",
    },
    {
      title: "Award-Winning Portfolio",
      description:
        "Received the 2024 Web Design Excellence Award for creating a visually stunning and highly functional portfolio.",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay },
    }),
  };

  return (
    <div>
      <section className="py-20 text-white">
        {" "}
        {/* Added bg-gray-900 for contrast if needed */}
        <NavbarDemo />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {" "}
          {/* Increased space-y */}
          {/* Hero Introduction */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Manrope'] leading-tight">
              Hi, I'm Owen. <br className="hidden md:block" />I Craft Digital
              Experiences That Connect.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-['Manrope']">
              A designer and developer passionate about building intuitive,
              impactful, and beautiful solutions that users love and businesses
              value.
            </p>
          </motion.div>
          {/* My Story & Approach */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center"
          >
            <div className="md:col-span-2 flex justify-center md:justify-start">
              <Image
                src="/profile2.jpg" // Replace with your actual image
                alt="Owen - Designer & Developer"
                width={300} // Slightly larger
                height={300}
                className="rounded-full border-4 border-brandRed object-cover shadow-xl"
                placeholder="blur"
                blurDataURL="/placeholders/profile-blur.jpg" // Replace
              />
            </div>
            <div className="md:col-span-3">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 font-['Manrope']">
                My Journey: From Pixels to Code
              </h2>
              <p className="text-base md:text-lg text-gray-300 font-['Manrope'] space-y-4">
                <span>
                  My path into the digital world began with a fascination for
                  design—how aesthetics and usability can shape perception and
                  interaction. This led me to master tools like Figma and Adobe
                  XD, honing my eye for detail and user-centric interfaces.
                </span>
                <span>
                  But I didn't stop at the visuals. Curious about bringing these
                  designs to life, I delved into development, embracing the
                  power of React, Next.js, and modern web technologies. Today,
                  with over five years of experience, I bridge the gap between
                  creative vision and technical execution, delivering
                  comprehensive solutions from concept to deployment.
                </span>
              </p>
            </div>
          </motion.div>
          {/* My Philosophy: Design & Development */}
          {/* <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="bg-gray-800 rounded-xl p-8 md:p-12 border border-gray-700 shadow-lg"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 text-center font-['Manrope']">
            How I Work: My Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <Image
                src="/placeholders/design-showcase.jpg" // Replace
                alt="UI/UX Design Showcase"
                width={500}
                height={350}
                className="rounded-lg border border-gray-600 mb-6 object-cover w-full shadow-md"
                placeholder="blur"
                blurDataURL="/placeholders/design-showcase-blur.jpg" // Replace
              />
              <h3 className="text-2xl font-semibold text-brandRed mb-3 font-['Manrope']">
                User-First Design
              </h3>
              <p className="text-base text-gray-300 font-['Manrope']">
                I believe great design is invisible. It guides users
                effortlessly. My process is rooted in empathy, research, and
                iteration, ensuring every interface is intuitive, accessible,
                and aligned with your brand's voice.
              </p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <Image
                src="/placeholders/dev-project.jpg" // Replace
                alt="Development Project Snippet"
                width={500}
                height={350}
                className="rounded-lg border border-gray-600 mb-6 object-cover w-full shadow-md"
                placeholder="blur"
                blurDataURL="/placeholders/dev-project-blur.jpg" // Replace
              />
              <h3 className="text-2xl font-semibold text-brandRed mb-3 font-['Manrope']">
                Scalable Development
              </h3>
              <p className="text-base text-gray-300 font-['Manrope']">
                Clean, maintainable code is paramount. I leverage modern
                frameworks and best practices to build responsive, performant,
                and scalable web applications that stand the test of time and
                adapt to future needs.
              </p>
            </div>
          </div>
        </motion.div> */}
          {/* Skills Toolkit */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="bg-dark-900 rounded-xl p-8 md:p-12 border border-dark-600 shadow-lg"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 text-center font-['Manrope']">
              My Toolkit
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {skills.map((skill, idx) => (
                <span
                  key={`skill-${idx}`}
                  className={cn(
                    "px-5 py-2.5 text-sm font-medium rounded-full border border-dark-600 font-['Manrope'] transition-all duration-300 ease-in-out",
                    "hover:shadow-lg hover:scale-105",
                    skill === "UI/UX Design" ||
                      skill === "React" ||
                      skill === "Next.js"
                      ? "bg-brandRed text-white hover:bg-brandRed-dark"
                      : "bg-dark-800 text-dark-text-primary hover:bg-dark-700 hover:border-dark-500"
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
          {/* Achievements */}
          {/* CTA */}
          <ContactSection />
        </div>
      </section>
      <FooterSection />
    </div>
  );
}
