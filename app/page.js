"use client";

import React from "react";
import HeroStory from "./components/hero-story/HeroStory.jsx";
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
import { gsap, ScrollTrigger } from "./libs/gsap";
import { setLenis } from "./libs/lenis";
import CustomCursor from "./components/gsap/CustomCursor";
import MarqueeBand from "./components/gsap/MarqueeBand";
import ScrollProgress from "./components/gsap/ScrollProgress";
import { AnimatePresence } from "framer-motion";
import IntroOverlay from "./components/IntroOverlay";

const HomePage = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [showIntro, setShowIntro] = React.useState(true);

  useEffect(() => {
    // Intro overlay plays once per session (skipped on mobile)
    try {
      const hasShown = sessionStorage.getItem("introShown");
      const isMobileIntro = window.innerWidth < 768;
      if (hasShown || isMobileIntro) {
        setShowIntro(false);
        if (isMobileIntro) sessionStorage.setItem("introShown", "true");
      }
    } catch (e) {
      setShowIntro(false);
    }
    setIsLoaded(true);

    // Only enable smooth scrolling on desktop for better mobile performance
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });
      setLenis(lenis);

      // Keep GSAP ScrollTrigger in lockstep with Lenis smooth scroll
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem("introShown", "true");
    } catch (e) {
      /* session storage unavailable — the hero's 8s failsafe covers this */
    }
    // the hero's Act 0 (starfield + blueprint fade-up) waits for this
    window.dispatchEvent(new CustomEvent("hero-intro-complete"));
  };

  // Testimonials renders outside AnimatedSection: GSAP pins it with
  // position:fixed, which breaks inside a transformed ancestor.
  const preSections = [
    { id: "about", Component: AboutMe },
    { id: "projects", Component: ProjectSection },
    { id: "experience", Component: ExperienceSection },
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

      <ScrollProgress />
      <CustomCursor />

      <NavbarDemo />
      <main className="flex-grow w-full max-w-full">
        {/* Blueprint to Reality scrollytelling story */}
        <HeroStory />

        {/* Editorial marquee — velocity-reactive */}
        <MarqueeBand
          items={[
            "Product Design",
            "Web Development",
            "Brand Identity",
            "Motion & Interaction",
            "Full-Stack Engineering",
          ]}
        />

        {/* Other Sections */}
        {preSections.map(({ id, Component }) => (
          <AnimatedSection
            key={id}
            id={id}
            className="w-full max-w-full px-0"
            threshold={0.15}
          >
            <Component />
          </AnimatedSection>
        ))}

        {/* GSAP-pinned horizontal gallery — must not live under a transformed wrapper */}
        <TestimonialsSection />

        <AnimatedSection id="blog" className="w-full max-w-full px-0" threshold={0.15}>
          <BlogSection />
        </AnimatedSection>

        {/* High-energy red band leading into the contact CTA */}
        <MarqueeBand
          variant="accent"
          items={[
            "Let's Work Together",
            "Available For Projects",
            "Let's Build Legendary",
          ]}
        />

        <AnimatedSection id="contact" className="w-full max-w-full px-0" threshold={0.15}>
          <ContactSection />
        </AnimatedSection>
        <LandingBlogNewsletterPopup />
      </main>
      <FooterSection />
      <SocialSidebar />

      {/* Filmic grain over everything — texture, not tint */}
      <div aria-hidden="true" className="grain-overlay" />
    </div>
  );
};

export default HomePage;
