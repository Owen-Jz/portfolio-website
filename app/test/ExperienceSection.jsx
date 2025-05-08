"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExperienceCard = ({
  company,
  period,
  role,
  details,
  isExpanded,
  toggleExpand,
}) => {
  return (
    <motion.div
      className="relative rounded-3xl p-6 w-full max-w-[400px] mx-auto border border-gray-600 hover:border-[#b02222] transition-all duration-300"
      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(176, 34, 34, 0.3)" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full blur-3xl pointer-events-none"
        animate={{ opacity: isExpanded ? 0.8 : 0.4 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src="/Icon.svg"
            alt="Company Logo"
            className="w-8 h-8"
            loading="lazy"
          />
          <h3 className="text-white text-xl md:text-2xl font-semibold font-['Manrope']">
            {company}
          </h3>
        </div>
        <p className="text-[#afafaf] text-base font-['Manrope'] mb-2">
          {period}
        </p>
        <p className="text-white/80 text-base font-['Manrope'] mb-4">{role}</p>

        {/* Collapsible Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="text-[#afafaf] text-base list-disc pl-5 space-y-2">
                {details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View More Button */}
        <motion.button
          className="mt-4 px-6 py-2 bg-gradient-to-r from-[#b02222] to-[#d38787] text-[#151515] rounded-full font-semibold font-['Manrope'] relative overflow-hidden"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 10px rgba(176, 34, 34, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleExpand}
        >
          {isExpanded ? "View Less" : "View More"}
          <motion.span
            className="absolute inset-0 bg-white/30"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 2, opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const experiences = [
    {
      company: "Carb",
      period: "2022 - 2023",
      role: "UI/UX Designer & Brand Identity Developer",
      details: [
        "Developed a unique brand identity for the e-hailing company.",
        "Designed intuitive UI/UX for rider and driver apps.",
        "Focused on functionality, aesthetics, and user satisfaction.",
      ],
    },
    {
      company: "RainShield Global",
      period: "June 2024 – Present",
      role: "UI/UX Designer & Brand Identity Developer",
      details: [
        "Developed a unique brand identity for the fintech company.",
        "Designed an innovative UI/UX experience.",
        "Focused on trust, efficiency, and usability.",
      ],
    },
    {
      company: "Silicon Delta",
      period: "July 2024 – Present",
      role: "UI/UX Designer",
      details: [
        "Designed an LMS for Nigerian schools.",
        "Collaborated with developers for seamless implementation.",
        "Ensured a user-centric and technically feasible design.",
      ],
    },
  ];

  const handleToggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="py-12 ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <motion.h2
          className="text-white text-3xl md:text-5xl font-normal font-['Manrope'] text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Experience
        </motion.h2>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-center">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              company={exp.company}
              period={exp.period}
              role={exp.role}
              details={exp.details}
              isExpanded={expandedCard === index}
              toggleExpand={() => handleToggleExpand(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
