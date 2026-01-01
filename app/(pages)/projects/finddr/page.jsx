"use client";

import React from "react";
import ProjectPageTemplate from "@/app/components/ui/ProjectPageTemplate";

const FinddrBrandPage = () => {
  return (
    <ProjectPageTemplate
      title="Finddr Brand Design"
      subtitle="A showcase of the brand identity, logo, and visual assets crafted for Finddr — connecting users with skilled artisans."
      category="Brand Identity"
      metadata={[
        { label: "Client", value: "Finddr" },
        { label: "Industry", value: "Service" },
        { label: "Year", value: "2024" },
        { label: "Role", value: "Brand Designer" },
      ]}
      overviewContent={
        <p>
          I was tasked with creating the brand identity for Finddr, a
          tech-driven platform built to connect users with skilled service
          providers—anytime, anywhere. The core philosophy behind Finddr is
          simple: access to reliable services should be seamless, transparent,
          and stress-free. Finddr offers a user-first experience that empowers
          individuals to find, evaluate, and book trusted artisans across a
          wide range of categories—from home repairs to personal care—right
          from their mobile devices.
        </p>
      }
      processContent={
        <p>
           To kick off the brand identity design for Finddr, I began with
            in-depth research into the service-based market and the client’s
            vision of connecting reliability with simplicity. I developed a
            moodboard inspired by urban lifestyles, bold typography, and clean,
            minimal layouts — aligning with Finddr’s modern and accessible brand
            tone.
        </p>
      }
      logoBreakdownContent={
        <p>
          The logo design for Finddr started with concept sketches that
          captured the brand’s role as a trusted link between users and
          skilled service providers. I focused on a clean, modern mark that
          feels approachable yet professional. The goal was to ensure clarity
          at all sizes and maintain versatility across digital platforms.
        </p>
      }
      galleryImages={[
        { src: "/projects/finddr/F1.png", alt: "Overview" },
        { src: "/projects/finddr/F2.png", alt: "Process" },
        { src: "/projects/finddr/F3.png", alt: "Sketches" },
        { src: "/projects/finddr/F4.png", alt: "Asset 4" },
        { src: "/projects/finddr/F5.png", alt: "Asset 5" },
        { src: "/projects/finddr/F6.png", alt: "Asset 6" },
        { src: "/projects/finddr/F7.png", alt: "Asset 7" },
        { src: "/projects/finddr/F8.png", alt: "Asset 8" },
      ]}
    />
  );
};

export default FinddrBrandPage;
