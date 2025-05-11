"use client";

import React from "react";
import { HeroSection } from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import ProjectSection from "./components/ProjectSection";
import ExperienceSection from "./components/ExperienceSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import { NavbarDemo } from "./components/ui/ResizableNavbar";
import AnimatedSection from "./components/AnimatedSection";

const HomePage = () => {
  const sections = [
    { id: "hero", Component: HeroSection },
    { id: "about", Component: AboutMe },
    { id: "projects", Component: ProjectSection },
    { id: "experience", Component: ExperienceSection },
    { id: "testimonials", Component: TestimonialsSection },
    { id: "contact", Component: ContactSection },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col w-full max-w-full overflow-x-hidden">
      <NavbarDemo />
      <main className="flex-grow w-full max-w-full">
        {sections.map(({ id, Component }) => (
          <AnimatedSection
            key={id}
            id={id}
            className="py-10 md:py-20 lg:py-24 w-full max-w-full px-0"
            threshold={0.15}
          >
            <Component />
          </AnimatedSection>
        ))}
      </main>
      <FooterSection />
    </div>
  );
};

export default HomePage;
