"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, Download, Smartphone, Monitor, Code2, Rocket } from "lucide-react";
import Button from "./ui/Button";
import { useGSAP } from "@gsap/react";
import { gsap } from "../libs/gsap";

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
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const cueRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  // GSAP scroll parallax: background zooms/drifts while content falls away
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Headline cascade — every character rises out of its mask
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".hero-char",
          { yPercent: 130, rotate: 6 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.035,
            delay: 0.15,
          }
        );
      });

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const scrub = {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          };
          gsap.to(bgRef.current, {
            yPercent: 18,
            scale: 1.15,
            ease: "none",
            scrollTrigger: scrub,
          });
          gsap.to(contentRef.current, {
            yPercent: -14,
            opacity: 0.25,
            ease: "none",
            scrollTrigger: { ...scrub },
          });
          gsap.to(cueRef.current, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "20% top",
              scrub: true,
            },
          });
        }
      );
    },
    { scope: containerRef }
  );

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
        ref={bgRef}
        className="absolute inset-0 z-[0] will-change-transform"
        style={{
          backgroundImage: "url('/hero3.jpeg')",
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


      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center will-change-transform">
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

        {/* Main Title - GSAP character cascade out of overflow masks */}
        <div className="mb-6 relative overflow-visible">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2 leading-[1.1]">
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
              {["Hello,", "I", "am"].map((word) => (
                <span
                  key={word}
                  className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
                >
                  <span className="inline-block whitespace-nowrap">
                    {word.split("").map((ch, ci) => (
                      <span
                        key={ci}
                        className="hero-char inline-block will-change-transform"
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
              <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
                <span className="hero-char inline-block will-change-transform">
                  {/* Shimmering Text Gradient */}
                  <span className="text-transparent bg-clip-text bg-[linear-gradient(110deg,#ffffff,45%,#b02222,55%,#ffffff)] bg-[length:250%_100%] animate-text-shimmer">
                    Owen
                  </span>
                </span>
              </span>
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

      {/* Scroll cue — pulse traveling down a hairline */}
      <div
        ref={cueRef}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-3"
      >
        <span className="text-white/30 text-[10px] font-mono uppercase tracking-[0.35em]">
          Scroll
        </span>
        <span className="block w-px h-12 bg-white/10 relative overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#b02222] to-transparent animate-scroll-cue" />
        </span>
      </div>

      {/* Decorative Gradient at bottom to blend with next section */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-[5]" />
    </div>
  );
}
