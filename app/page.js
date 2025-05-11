// app/page.jsx (or wherever your main page is)
"use client"; // Required if using client-side hooks like useInView directly or indirectly

import React from "react";
import { HeroSection } from "./components/HeroSection";
import AboutMe from "./components/AboutMe"; // Assuming default export
import ProjectSection from "./components/ProjectSection"; // Assuming default export
import ExperienceSection from "./components/ExperienceSection"; // Assuming default export
import { TestimonialsSection } from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection"; // Assuming default export
import FooterSection from "./components/FooterSection"; // Assuming default export
import { NavbarDemo } from "./components/ui/ResizableNavbar";
import AnimatedSection from "./components/AnimatedSection"; // Import the wrapper

const HomePage = () => {
  // Define sections with their IDs for potential navigation and keys
  const sections = [
    { id: "hero", Component: HeroSection },
    { id: "about", Component: AboutMe },
    { id: "projects", Component: ProjectSection },
    { id: "experience", Component: ExperienceSection },
    { id: "testimonials", Component: TestimonialsSection },
    { id: "contact", Component: ContactSection },
  ];

  return (
    // Using a dark theme background for better visibility of blur
    <div className="min-h-screen text-white flex flex-col">
      <NavbarDemo />

      {/* Main content area that allows Navbar to be fixed/sticky if needed */}
      <main className="flex-grow">
        {/*
          The `flex flex-col gap-4` was removed from the root
          as section spacing is better handled by padding within sections
          or margins between AnimatedSection wrappers.
        */}
        {sections.map(({ id, Component }) => (
          <AnimatedSection
            key={id}
            id={id} // For anchor links from Navbar
            // Add common responsive padding to sections.
            // Adjust these values as needed for your design.
            // Example: py-16 md:py-24 for vertical padding.
            // Horizontal padding is often handled by a max-width container inside the section.
            className="py-12 md:py-20 lg:py-24"
            threshold={0.15} // Adjust threshold for when animation triggers
          >
            {/*
              Each section component should ideally have its own max-width container
              e.g., <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">...content...</div>
              If not, you might add it here or within AnimatedSection.
              For this example, I'll assume sections handle their own inner container.
            */}
            <Component />
          </AnimatedSection>
        ))}
      </main>

      {/* Footer is typically outside the main scroll-animated sections */}
      <FooterSection />
    </div>
  );
};

export default HomePage; // Renamed to HomePage for clarity