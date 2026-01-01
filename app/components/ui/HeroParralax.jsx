"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "../../libs/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "./MovingBorder";

export const HeroParallax = ({ products }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  };

  return (
    <div
      ref={ref}
      className="h-[200vh] overflow-hidden antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
    >
      <div className="min-h-screen flex items-center justify-center z-[10]">
        <Header />
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          style={{ y: scrollIndicatorY, opacity: scrollIndicatorOpacity }}
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
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="px-4"
      >
        <motion.div
          style={{ opacity: headingOpacity }}
          className="max-w-7xl mx-auto px-4 mb-8 md:mb-10"
        >
          <div className="flex flex-col gap-2 md:gap-3">
            {/* Subtitle/Lead Text */}
            <p className="text-[#b02222] text-sm md:text-base font-bold font-['Manrope'] uppercase tracking-wider">
              Welcome to my portfolio!
            </p>
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-['Manrope'] leading-tight">
              Featured Projects
            </h2>
            
            {/* Description */}
            <p className="text-gray-300 md:text-gray-200 text-base md:text-lg font-['Manrope'] font-normal leading-relaxed max-w-3xl">
              Here are some of the projects that helped my clients grow their
              business
            </p>
          </div>
        </motion.div>
        {firstRow.length > 0 && (
          <ScrollableRow
            items={firstRow}
                translate={translateX}
                isMobile={isMobile}
            reverseOnDesktop
              />
        )}
        {secondRow.length > 0 && (
          <ScrollableRow
            items={secondRow}
                translate={translateXReverse}
                isMobile={isMobile}
              />
        )}
        {thirdRow.length > 0 && (
          <ScrollableRow
            items={thirdRow}
                translate={translateX}
                isMobile={isMobile}
            reverseOnDesktop
              />
        )}
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 w-full">
      <div className="rounded-3xl p-4 md:p-8 border-amber-50">
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
              <Link href="/contact">
                <Button
                  borderRadius="1.75rem"
                  className="bg-white dark:bg-black/70 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                >
                  Get in Touch
                </Button>
              </Link>
              <Link href="/cv.pdf">
                <div className="h-16 w-40 bg-transparent p-[1px] rounded-full flex items-center justify-center text-white antialiased backdrop-blur-xl hover:bg-red-950 transition-all">
                  Download CV
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({ product, translate, isMobile }) => {
  const transformStyle = isMobile ? {} : { x: translate };

  return (
    <motion.div
      style={transformStyle}
      whileHover={{ y: -10, scale: 1.03 }}
      key={product.title}
      className="group/product h-60 w-60 sm:h-72 sm:w-72 md:h-96 md:w-[30rem] relative shrink-0 mx-2 md:mx-0 snap-center"
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

// Horizontal scroll row with swipe on mobile and subtle arrows on desktop
const ScrollableRow = ({
  items,
  translate,
  isMobile,
  reverseOnDesktop = false,
}) => {
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const singleSetWidthRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  // Create infinite loop by duplicating items
  const duplicatedItems = [...items, ...items, ...items];

  // Calculate single set width for seamless looping
  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const container = containerRef.current;
    
    // Wait for next frame to ensure items are rendered
    const calculateAndSet = () => {
      requestAnimationFrame(() => {
        if (!container.children.length) return;

        // Calculate width of one complete set
        const gap = isMobile ? 16 : 80; // gap-4 = 16px, gap-20 = 80px
        let totalWidth = 0;
        
        for (let i = 0; i < items.length; i++) {
          const child = container.children[i];
          if (child) {
            totalWidth += child.offsetWidth + (i < items.length - 1 ? gap : 0);
          }
        }

        singleSetWidthRef.current = totalWidth;

        // Set initial scroll position to the middle set (second set)
        if (container.scrollLeft === 0 && totalWidth > 0) {
          container.scrollLeft = totalWidth;
        }
      });
    };

    calculateAndSet();

    const handleScroll = () => {
      // Skip handler if manually scrolling or width not calculated
      if (isScrollingRef.current || !singleSetWidthRef.current) return;

      const scrollLeft = container.scrollLeft;
      const clientWidth = container.clientWidth;
      const singleSetWidth = singleSetWidthRef.current;

      // If scrolled past the end of second set (into third set), jump back to second set
      if (scrollLeft >= singleSetWidth * 2 - clientWidth / 2) {
        isScrollingRef.current = true;
        const offset = scrollLeft - singleSetWidth * 2;
        container.scrollLeft = singleSetWidth + offset;
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 100);
      }
      // If scrolled before the start of second set (into first set), jump to second set
      else if (scrollLeft <= singleSetWidth / 2) {
        isScrollingRef.current = true;
        const offset = scrollLeft;
        container.scrollLeft = singleSetWidth + offset;
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 100);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    
    // Recalculate on resize
    const handleResize = () => {
      calculateAndSet();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [items.length, isMobile]);

  const scrollBy = (delta) => {
    const container = containerRef.current;
    if (!container) return;
    
    // Check if container is scrollable
    if (container.scrollWidth <= container.clientWidth) {
      console.warn("Container is not scrollable");
      return;
    }
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set flag to prevent infinite scroll handler from interfering
    isScrollingRef.current = true;
    
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const newScroll = Math.max(0, Math.min(maxScroll, currentScroll + delta));
    
    // Use scrollTo for more reliable scrolling
    container.scrollTo({ left: newScroll, behavior: "smooth" });
    
    // Re-enable scroll handler after scrolling completes
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  };

  const baseRow =
    "flex gap-4 md:gap-20 overflow-x-auto md:overflow-x-auto snap-x snap-mandatory mb-4 md:mb-8";
  const desktopDirection = reverseOnDesktop
    ? "md:flex-row-reverse md:space-x-reverse"
    : "md:flex-row";

  return (
    <div className="relative w-full" style={{ pointerEvents: "auto" }}>
      <div
        ref={containerRef}
        className={cn(baseRow, desktopDirection, "no-scrollbar", "w-full")}
        style={{ 
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth"
        }}
      >
        {duplicatedItems.map((product, index) => (
          <ProductCard
            product={product}
            translate={translate}
            key={`${product.title}-${index}`}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Desktop subtle arrows - swap positions when reverseOnDesktop is true */}
      {reverseOnDesktop ? (
        <>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              scrollBy(400);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 z-[100] cursor-pointer"
            style={{ pointerEvents: "auto" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 pointer-events-none"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              scrollBy(-400);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 z-[100] cursor-pointer"
            style={{ pointerEvents: "auto" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 pointer-events-none"
            >
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              scrollBy(-400);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 z-[100] cursor-pointer"
            style={{ pointerEvents: "auto" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 pointer-events-none"
            >
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              scrollBy(400);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 z-[100] cursor-pointer"
            style={{ pointerEvents: "auto" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 pointer-events-none"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};
