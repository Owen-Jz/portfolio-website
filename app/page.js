import React from "react";
import { HeroSection } from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import ProjectSection from "./components/ProjectSection";
import ExperienceSection from "./components/ExperienceSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import { NavbarDemo } from "./components/ui/ResizableNavbar";
const page = () => {
  return (
    <div>
      <NavbarDemo />
      <HeroSection />
      <AboutMe />
      <ProjectSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default page;
