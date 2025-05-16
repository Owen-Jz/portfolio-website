"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "../../libs/utils";
import { ChevronDown } from "lucide-react";
import "../../globals.css";
import { Button } from "./MovingBorder";

export const HeroParallax = ({ products }) => {
  // Responsive handling
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Set up listener for window resizing
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Split products for different rows - handle fewer products gracefully
  const firstRow = products.slice(0, Math.min(5, products.length));
  const secondRow =
    products.length > 5 ? products.slice(5, Math.min(10, products.length)) : [];
  const thirdRow =
    products.length > 10
      ? products.slice(10, Math.min(15, products.length))
      : [];

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Adjust translation values for mobile
  const translateXValue = isMobile ? 300 : 1000;

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, translateXValue]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -translateXValue]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-500, 100]),
    springConfig
  );
  const headingOpacity = useSpring(
    useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
    springConfig
  );

  // Scroll indicator animation
  const scrollIndicatorY = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [0, 20]),
    { stiffness: 100, damping: 30 }
  );

  const scrollIndicatorOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [1, 0]),
    { stiffness: 100, damping: 30 }
  );

  const scrollToContent = () => {
    const targetPosition = window.innerHeight * 0.6;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={ref}
      className="h-[200vh] overflow-hidden antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Header section - centered with flex */}
      <div className="min-h-screen flex items-center justify-center z-[10]">
        <Header />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          style={{
            y: scrollIndicatorY,
            opacity: scrollIndicatorOpacity,
          }}
          onClick={scrollToContent}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-white text-sm mb-2">Scroll Down</span>
            <ChevronDown className="text-white h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Projects section with parallax effect */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="px-4"
      >
        <motion.div
          style={{ opacity: headingOpacity }}
          className="max-w-7xl mx-auto px-4 mb-10"
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white font-['Manrope']">
              Featured Projects
            </h2>
            <p className="text-gray-200 font-['Manrope'] font-normal">
              <span className="font-bold">Welcome to my portfolio! </span>
              here are some of the projects that helped my clients grow their
              business
            </p>
          </div>
        </motion.div>

        {/* First row of projects */}
        {firstRow.length > 0 && (
          <motion.div className="flex overflow-x-auto md:overflow-visible pb-4 md:pb-0 md:flex-row-reverse md:space-x-reverse md:space-x-20 mb-10 md:mb-20">
            {firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        )}

        {/* Second row of projects */}
        {secondRow.length > 0 && (
          <motion.div className="flex overflow-x-auto md:overflow-visible pb-4 md:pb-0 md:flex-row md:space-x-20 mb-10 md:mb-20">
            {secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={product.title}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        )}

        {/* Third row of projects */}
        {thirdRow.length > 0 && (
          <motion.div className="flex overflow-x-auto md:overflow-visible pb-4 md:pb-0 md:flex-row-reverse md:space-x-reverse md:space-x-20">
            {thirdRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 w-full">
      <div className=" rounded-3xl p-4 md:p-8 border-amber-50">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-center gap-6">
          <img
            src="/profile.jpg"
            alt="Owen"
            className="w-32 h-32 md:w-64 md:h-64 rounded-full object-cover border border-gray-600 shadow-md"
          />
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white font-['Manrope']">
              Hey, I'm Owen <br className="hidden sm:block" /> Designer &
              Developer
            </h1>
            <p className="max-w-2xl text-sm md:text-lg mt-2 md:mt-4 text-gray-200 font-['Manrope'] font-normal">
              I'm passionate about creating beautiful designs and bringing them
              to life with clean, modern code. Let's turn ideas into meaningful
              digital experiences together.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 md:mt-6">
              <Link href="mailto:your.email@example.com">
                <Button
                  borderRadius="1.75rem"
                  className="bg-white dark:bg-black/70 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                >
                  Get in Touch
                </Button>
              </Link>
              {/* <Link href="/cv.pdf">
                <Button
                  borderRadius="1.75rem"
                  className="bg-white dark:bg-black/70 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                >
                  Download CV
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({ product, translate, isMobile }) => {
  // Don't apply transform effect on mobile
  const transformStyle = isMobile ? {} : { x: translate };

  return (
    <motion.div
      style={transformStyle}
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      key={product.title}
      className="group/product h-60 w-60 sm:h-72 sm:w-72 md:h-96 md:w-[30rem] relative shrink-0 mx-2 md:mx-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-lg"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-lg"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-base sm:text-lg md:text-xl font-['Manrope'] font-semibold">
        {product.title}
      </h2>
    </motion.div>
  );
};
