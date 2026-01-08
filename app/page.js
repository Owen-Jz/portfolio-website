"use client";

import React from "react";
import { HeroSection } from "./components/HeroSection";
import HeroSectionGSAP from "./components/HeroSectionGSAP";
import AboutMe from "./components/AboutMe";
import ProjectSection from "./components/ProjectSection";
import ExperienceSection from "./components/ExperienceSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import { NavbarDemo } from "./components/ui/ResizableNavbar";
import AnimatedSection from "./components/AnimatedSection";
import SocialSidebar from "./components/SocialSidebar";
import Lenis from "lenis";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
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
  }, []);

  const sections = [
    // { id: "hero", Component: HeroSection },
    { id: "about", Component: AboutMe },
    { id: "projects", Component: ProjectSection },
    { id: "experience", Component: ExperienceSection },
    { id: "testimonials", Component: TestimonialsSection },
    { id: "blog", Component: BlogSection },
    { id: "contact", Component: ContactSection },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col w-full max-w-full overflow-x-hidden">
      <NavbarDemo />
      <main className="flex-grow w-full max-w-full">
        {/* New GSAP Hero Section */}
        <HeroSectionGSAP />

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
      </main>
      <FooterSection />
      <SocialSidebar />
    </div>
  );
};

export default HomePage;
