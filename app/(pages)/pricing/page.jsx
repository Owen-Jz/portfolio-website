"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import FooterSection from "@/app/components/FooterSection";
import SocialSidebar from "@/app/components/SocialSidebar";
import { cn } from "@/app/libs/utils";

const PricingPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const packages = [
    {
      name: "Essential Package",
      price: "₦80,000",
      priceUsd: "$45",
      description: "Perfect for startups or personal brands.",
      features: [
        "Brand consultation",
        "Logo design (2 revisions)",
        "Color palette",
        "Font selection",
        "Basic brand guideline (how to use your brand)",
      ],
      sampleLink: "/projects/web-kitchen",
      popular: false,
    },
    {
      name: "Premium Package",
      price: "₦150,000",
      priceUsd: "$98",
      description: "Great for small businesses ready to grow.",
      features: [
        "Strategy session to understand your brand",
        "Logo design (5 revisions)",
        "Full brand guideline",
        "Business card design",
        "Stationery design (Letter Head, Envelope)",
      ],
      sampleLink: "/projects/jedidah",
      popular: true,
    },
    {
      name: "Ultimate Package",
      price: "₦250,000",
      priceUsd: "$163",
      description: "For serious brands that want to stand out.",
      features: [
        "Full brand audit and review",
        "Brand positioning and strategy",
        "Logo design (with several variations, styles and revisions)",
        "Full brand guideline",
        "Business card and stationery design",
        "Social media kit (profile images, covers, post templates)",
      ],
      sampleLink: "/projects/organstation",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col w-full max-w-full overflow-x-hidden bg-[#0a0a0a]">
      <NavbarDemo />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Header Section */}
            <motion.div
              className="text-center mb-12 md:mb-16"
              variants={itemVariants}
            >
              <motion.p
                className="text-[#b02222] text-lg sm:text-xl md:text-2xl font-bold font-['Manrope'] uppercase tracking-wider mb-4"
                variants={itemVariants}
              >
                Brand Identity Packages
              </motion.p>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Manrope'] leading-tight mb-6"
                variants={itemVariants}
              >
                Pricing & Packages
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-300 font-['Manrope'] max-w-3xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Your brand identity is the visual language of your business—how
                people recognize and remember you. It includes your logo, colors,
                fonts, and overall style. A strong brand identity builds trust,
                sets you apart from competitors, and makes your business look
                professional and consistent across all platforms.
              </motion.p>
            </motion.div>

            {/* Packages Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16"
              variants={containerVariants}
            >
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  variants={itemVariants}
                  className={cn(
                    "relative rounded-3xl p-6 md:p-8 border transition-all duration-300",
                    pkg.popular
                      ? "border-[#b02222] bg-gradient-to-br from-[#b02222]/10 to-transparent shadow-lg shadow-[#b02222]/20"
                      : "border-gray-600 bg-gray-800/30 backdrop-blur-sm hover:border-[#b02222]/50"
                  )}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#b02222] to-[#d38787] text-white text-sm font-bold px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col h-full">
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-['Manrope'] mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base mb-6 font-['Manrope']">
                      {pkg.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-4xl md:text-5xl font-bold text-white font-['Manrope']">
                        {pkg.price}
                      </span>
                      <span className="text-gray-400 text-lg ml-2 font-['Manrope']">
                        ~ {pkg.priceUsd}
                      </span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {pkg.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-gray-300 text-sm md:text-base font-['Manrope']"
                        >
                          <svg
                            className="w-5 h-5 text-[#b02222] mr-3 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={pkg.sampleLink}>
                      <motion.button
                        className={cn(
                          "w-full py-3 rounded-xl font-semibold font-['Manrope'] transition-all duration-300",
                          pkg.popular
                            ? "bg-gradient-to-r from-[#b02222] to-[#d38787] text-white hover:shadow-lg hover:shadow-[#b02222]/50"
                            : "bg-gray-700/50 text-white border border-gray-600 hover:border-[#b02222] hover:bg-gray-700"
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Sample Project
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Terms & Conditions */}
            <motion.div
              className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-12 border border-gray-600 mb-12"
              variants={itemVariants}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white font-['Manrope'] mb-6">
                Terms & Conditions
              </h2>
              <ul className="space-y-4 text-gray-300 font-['Manrope']">
                <li className="flex items-start">
                  <span className="text-[#b02222] mr-3 mt-1">•</span>
                  <span>
                    A <strong className="text-white">70% upfront payment</strong>{" "}
                    is required to begin any project.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#b02222] mr-3 mt-1">•</span>
                  <span>
                    Remaining <strong className="text-white">30%</strong> is due
                    upon project completion before final files are delivered.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#b02222] mr-3 mt-1">•</span>
                  <span>
                    Turnaround time varies based on the package and timely
                    feedback.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#b02222] mr-3 mt-1">•</span>
                  <span>
                    Revisions are limited to 2 rounds per design item. Additional
                    revisions attract extra charges.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#b02222] mr-3 mt-1">•</span>
                  <span>
                    All payments are <strong className="text-white">non-refundable</strong> once the design process has
                    started.
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Payment Details */}
            <motion.div
              className="bg-gradient-to-br from-[#b02222]/20 to-transparent rounded-3xl p-6 md:p-8 lg:p-12 border border-[#b02222]/30"
              variants={itemVariants}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white font-['Manrope'] mb-6">
                Payment Details
              </h2>
              <div className="space-y-4 text-gray-300 font-['Manrope']">
                <div>
                  <span className="text-[#b02222] font-semibold">Bank:</span>{" "}
                  <span className="text-white">Access Bank</span>
                </div>
                <div>
                  <span className="text-[#b02222] font-semibold">
                    Account Number:
                  </span>{" "}
                  <span className="text-white font-mono text-lg">
                    0824064604
                  </span>
                </div>
                <div>
                  <span className="text-[#b02222] font-semibold">
                    Account Name:
                  </span>{" "}
                  <span className="text-white">Oghenebrume Egbagba Owen</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="text-center mt-12"
              variants={itemVariants}
            >
              <Link href="/contact">
                <motion.button
                  className="bg-gradient-to-r from-[#b02222] to-[#d38787] text-white px-8 py-4 rounded-xl font-semibold text-lg font-['Manrope'] hover:shadow-lg hover:shadow-[#b02222]/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Today
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <FooterSection />
      <SocialSidebar />
    </div>
  );
};

export default PricingPage;

