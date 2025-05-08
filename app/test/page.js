import React from "react";
import { ThreeDMarqueeDemoSecond } from "./Sample";
import { HeroParallaxDemo } from "./HeroParralaxDemo";
import Navbar from "../components/navbar";
import AboutMe from "../components/AboutMe";
import ProjectSection from "./ProjectSection";
import ExperienceSection from "./ExperienceSection";
import { TestimonialsSection } from "./TestimonialsSection";
import ContactSection from "./ContactSection";
import FooterSection from "./FooterSection";
const page = () => {
  return (
    <div>
      <Navbar />
      <HeroParallaxDemo />
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
