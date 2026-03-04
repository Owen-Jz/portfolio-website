"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, Download, Smartphone, Monitor, Code2, Rocket } from "lucide-react";
import Button from "./ui/Button";

function Spotlight({ className = "", fill = "white" }) {
  return (
    <svg
      className={`animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter0_f_107_743)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_107_743"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_107_743"
          />
        </filter>
      </defs>
    </svg>
  );
}

const FloatingIcon = ({ icon: Icon, delay, className, parallaxY }) => {
  return (
    <motion.div
      style={{ y: parallaxY }} // Apply scroll parallax
      className={`absolute hidden lg:flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl ${className} z-20`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 1 // Offset floating start to feel organic
          }}
        >
          <Icon className="text-white/70 w-6 h-6" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Magnetic Button Wrapper Component
const MagneticWrapper = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default function HeroSectionRevamped() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (isMobile) return; // Skip on mobile
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Scroll Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const spotlightGradient = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(176, 34, 34, 0.15), transparent 80%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100vh] w-full flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden selection:bg-red-500/30 group/hero"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-[0]"
        style={{
          backgroundImage: "url('/hero2.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      </div>

      {/* Mouse Follower Spotlight - Hidden on mobile */}
      <motion.div
        className="hidden md:block pointer-events-none absolute inset-0 z-[1] opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300"
        style={{ background: spotlightGradient }}
      />

      <Spotlight
        className="hidden md:block -top-40 left-0 md:left-60 md:-top-20 z-[2]"
        fill="rgba(176, 34, 34, 0.4)"
      />

      {/* Pulsing Background Blob - Hidden on mobile */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b02222]/20 rounded-full blur-[120px] pointer-events-none z-[1]"
      />

      {/* Floating Icons with Parallax */}
      <FloatingIcon icon={Monitor} delay={1.2} className="top-1/4 left-[15%] rotate-[-12deg]" parallaxY={y1} />
      <FloatingIcon icon={Code2} delay={1.4} className="bottom-1/4 right-[15%] rotate-[12deg]" parallaxY={y2} />
      <FloatingIcon icon={Smartphone} delay={1.6} className="top-1/3 right-[20%] rotate-[-6deg]" parallaxY={y3} />
      <FloatingIcon icon={Rocket} delay={1.8} className="bottom-1/3 left-[20%] rotate-[6deg]" parallaxY={y4} />


      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.3 : 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-8 hover:bg-white/10 transition-colors cursor-default backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#b02222] animate-pulse" />
          Available for new projects
        </motion.div>

        {/* Main Title - Staggered Animation */}
        <div className="mb-6 relative overflow-visible">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2 leading-[1.1]">
            {/* Mobile Line Break Handling is tricky with split text, keeping simple structure for animation */}
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
              {["Hello,", "I", "am"].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: isMobile ? 0.4 : 0.8,
                    delay: isMobile ? 0 : i * 0.1,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ y: 40, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  duration: isMobile ? 0.4 : 0.8,
                  delay: isMobile ? 0 : 0.3,
                  ease: "backOut"
                }}
                className="inline-block relative"
              >
                {/* Shimmering Text Gradient */}
                <span className="text-transparent bg-clip-text bg-[linear-gradient(110deg,#ffffff,45%,#b02222,55%,#ffffff)] bg-[length:250%_100%] animate-text-shimmer">
                  Owen
                </span>
              </motion.span>
            </div>
          </h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0 : 0.2 }}
          className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          I build high-performance digital products that scale revenue.
          Focused on interaction, motion, and visual excellence.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0 : 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <MagneticWrapper>
            <Button href="/contact" variant="primary" className="h-12 px-6 text-sm md:text-base">
              Start a Project <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </MagneticWrapper>

          <MagneticWrapper>
            <Button href="/cv.pdf" variant="secondary" className="h-12 px-6 text-sm md:text-base bg-transparent border-white/10 hover:bg-white/5">
              Download CV <Download className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </MagneticWrapper>
        </motion.div>
      </div>

      {/* Decorative Gradient at bottom to blend with next section */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-[5]" />
    </div>
  );
}
