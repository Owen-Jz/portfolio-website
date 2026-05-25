"use client";

import React from "react";
import { HeroSection } from "./components/HeroSection";
// import HeroSectionGSAP from "./components/HeroSectionGSAP";
import HeroSectionRevamped from "./components/HeroSectionRevamped";
import AboutMe from "./components/AboutMe";
import ProjectSection from "./components/ProjectSection";
import ExperienceSection from "./components/ExperienceSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import LandingBlogNewsletterPopup from "./components/LandingBlogNewsletterPopup";
// import { NavbarDemo } from "./components/ui/ResizableNavbar";
import { NavbarDemo } from "./components/ui/RevampedNavbar";
import AnimatedSection from "./components/AnimatedSection";
import SocialSidebar from "./components/SocialSidebar";
import Lenis from "lenis";
import { useEffect } from "react";

import { AnimatePresence } from "framer-motion";
import IntroOverlay from "./components/IntroOverlay";

const HomePage = () => {
  const [showIntro, setShowIntro] = React.useState(true);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    // Check if we've shown the intro in this session or if on mobile
    try {
      const hasShown = sessionStorage.getItem("introShown");
      const isMobile = window.innerWidth < 768;

      if (hasShown || isMobile) {
        setShowIntro(false);
        if (isMobile) {
          sessionStorage.setItem("introShown", "true");
        }
      }
    } catch (e) {
      console.warn("Session storage not available:", e);
    } finally {
      setIsLoaded(true);
    }

    // Only enable smooth scrolling on desktop for better mobile performance
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });

      let rafId;
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("introShown", "true");
  };

  const sections = [
    // { id: "hero", Component: HeroSection },
    { id: "about", Component: AboutMe },
    { id: "projects", Component: ProjectSection },
    { id: "experience", Component: ExperienceSection },
    { id: "testimonials", Component: TestimonialsSection },
    { id: "blog", Component: BlogSection },
    { id: "contact", Component: ContactSection },
  ];

  // Prevent flash of "true" state by hiding everything until mounted and checked
  if (!isLoaded) {
    return <div className="min-h-screen bg-[#0a0a0a]" />;
  }

  return (
    <div className="min-h-screen text-white flex flex-col w-full max-w-full overflow-x-hidden">
      <AnimatePresence>
        {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <NavbarDemo />
      <main className="flex-grow w-full max-w-full">
        {/* New Revamped Hero Section */}
        <HeroSectionRevamped />

        {/* Other Sections */}
        {sections.map(({ id, Component }) => (
          <AnimatedSection
            key={id}
            id={id}
            className="w-full max-w-full px-0"
            threshold={0.15}
          >
            <Component />
          </AnimatedSection>
        ))}
        <LandingBlogNewsletterPopup />
      </main>
      <FooterSection />
      <SocialSidebar />
    </div>
  );
};

export default HomePage;
