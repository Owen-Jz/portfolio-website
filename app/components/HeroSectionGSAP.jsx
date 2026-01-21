"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Code, Sparkles, TrendingUp } from "lucide-react";
import Button from "./ui/Button";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const roles = [
  { text: "Designer", icon: Palette },
  { text: "Developer", icon: Code },
  { text: "Entertainer", icon: Sparkles },
  { text: "Brand Specialist", icon: TrendingUp },
];

const FlipText = () => {
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const Role = roles[index];
  const Icon = Role.icon;

  return (
    <div className="h-8 w-full relative flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={Role.text}
          initial={{ rotateX: 90, opacity: 0, y: 20 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: -90, opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute flex items-center gap-2"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Icon size={18} className="text-[#b02222]" />
          <span>{Role.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function HeroSectionGSAP() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set title to be visible immediately, but slightly offset for animation
      gsap.set(titleRef.current, {
        opacity: 1,
        y: 15,
      });

      // Set initial states for other elements
      gsap.set([subtitleRef.current, descriptionRef.current, ctaRef.current], {
        opacity: 0,
        y: 20,
      });

      gsap.set(backgroundRef.current, {
        scale: 1.05,
        opacity: 0,
      });

      // Create timeline for minimalistic load animations
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Fade in background smoothly
      tl.to(backgroundRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
      });

      // Animate title - subtle movement (already visible)
      tl.to(
        titleRef.current,
        {
          y: 0,
          duration: 0.8,
          ease: "power1.out",
        },
        "-=0.6"
      );

      // Animate subtitle - gentle fade
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power1.out",
        },
        "-=0.5"
      );

      // Animate description - smooth fade
      tl.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power1.out",
        },
        "-=0.4"
      );

      // Animate CTA buttons - subtle stagger
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power1.out",
        },
        "-=0.3"
      );

      // Subtle parallax on scroll (background only, no text opacity change)
      gsap.to(backgroundRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: 50,
        scale: 1.05,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Image with Overlay */}
      <div
        ref={backgroundRef}
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero2.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#0a0a0a]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Subtitle - Minimalistic */}
        <div
          ref={subtitleRef}
          className="text-sm md:text-base text-gray-400 font-light mb-3 tracking-wider uppercase"
          style={{
            fontFamily: "'Manrope', sans-serif",
            letterSpacing: "0.1em",
          }}
        >
          <FlipText />
        </div>

        {/* Main Title - Minimalistic */}
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300,
            letterSpacing: "-0.02em",
          }}
        >
          Hello, I am <span className="font-medium text-white">Owen</span>
        </h1>

        {/* Description - Minimalistic */}
        <p
          ref={descriptionRef}
          className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          I create beautiful designs and bring them to life with clean, modern
          code.
        </p>

        {/* CTA Buttons - Minimalistic */}
        <div
          ref={ctaRef}
          className="flex flex-row items-center justify-center gap-4"
        >
          <Button href="/contact" variant="primary">
            Get in Touch
          </Button>

          <Button href="/cv.pdf" variant="secondary">
            Download CV
          </Button>
        </div>
      </div>
    </div>
  );
}
