"use client";

import React from "react";
import ProjectPageTemplate from "@/app/components/ui/ProjectPageTemplate";

const WebKitchenBrandPage = () => {
  return (
    <ProjectPageTemplate
      title="Web Kitchen Brand Design"
      subtitle="Cooking up creative digital solutions."
      category="Brand Identity"
      metadata={[
        { label: "Client", value: "Web Kitchen" },
        { label: "Industry", value: "Creative Agency" },
        { label: "Role", value: "Logo Design" },
      ]}
      overviewContent={
        <p>
            I was commissioned to create a logo for a brand named Web Kitchen
            Studios. The name cleverly combines "web" and "kitchen" to represent
            a creative digital space where ideas are cooked up and brought to
            life. The logo concept merges a kitchen utensil (a knife) with a
            coding symbol ({"</>"}), resulting in a unique and memorable mark.
        </p>
      }
      processContent={
        <p>
            Before beginning the logo design, I took time to deeply understand
            the client’s vision and goals. I created a moodboard to visually
            communicate ideas and ensure we were aligned from the start. This
            collaborative step helped streamline the design process.
        </p>
      }
      logoBreakdownContent={
        <p>
            The logo design process began with a detailed breakdown of the
            elements that would be included. I started by sketching a basic
            knife shape, which would later be transformed into a more refined
            version combining tech elements.
        </p>
      }
      galleryImages={[
        { src: "/projects/web-kitchen/WK1.png", alt: "Hero" },
        { src: "/projects/web-kitchen/WK2.png", alt: "Moodboard" },
        { src: "/projects/web-kitchen/WK3.png", alt: "Sketches" },
        { src: "/projects/web-kitchen/WK4.png", alt: "Asset 4" },
        { src: "/projects/web-kitchen/WK5.png", alt: "Asset 5" },
        { src: "/projects/web-kitchen/WK6.png", alt: "Asset 6" },
        { src: "/projects/web-kitchen/WK7.png", alt: "Asset 7" },
        { src: "/projects/web-kitchen/WK9.png", alt: "Asset 9" },
      ]}
    />
  );
};

export default WebKitchenBrandPage;
