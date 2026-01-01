"use client";

import React from "react";
import ProjectPageTemplate from "@/app/components/ui/ProjectPageTemplate";

const OrganStationPage = () => {
  return (
    <ProjectPageTemplate
      title="OrganStation Brand Identity"
      subtitle="Developing a cohesive brand identity for a forward-thinking telemedical startup."
      category="Brand Identity"
      metadata={[
        { label: "Client", value: "OrganStation" },
        { label: "Industry", value: "Healthcare" },
        { label: "Year", value: "2024" },
        { label: "Service", value: "Branding" },
      ]}
      overviewContent={
        <p>
          I was contracted by OrganStation, a forward-thinking healthcare
          startup specializing in telemedical services. The company is
          dedicated to delivering accessible and efficient medical
          consultations through digital platforms. My role involved developing
          a cohesive brand identity that reflected OrganStation's mission to
          modernize healthcare and make quality medical care available to
          everyone, anywhere.
        </p>
      }
      processContent={
        <p>
          Before beginning the logo design, I took time to deeply understand
          the client’s vision and goals. I created a moodboard to visually
          communicate ideas and ensure we were aligned from the start. This
          collaborative step helped streamline the design process and methodically
          narrowed down the visual direction to one that felt innovative yet trustworthy.
        </p>
      }
      logoBreakdownContent={
        <p>
          The logo design process began with a detailed breakdown of the
          elements that would be included. We focused on symbols of life and connection,
          eventually arriving at a mark that signifies the seamless integration of hope
          and technology.
        </p>
      }
      galleryImages={[
        { src: "/projects/organstation/OS1.png", alt: "OrganStation Logo" },
        { src: "/projects/organstation/OS2.png", alt: "Moodboard" },
        { src: "/projects/organstation/OS3.gif", alt: "Logo Animation" },
        { src: "/projects/organstation/OS4.png", alt: "Brand Asset 1" },
        { src: "/projects/organstation/OS5.png", alt: "Brand Asset 2" },
        { src: "/projects/organstation/OS6.png", alt: "Brand Asset 3" },
        { src: "/projects/organstation/OS7.png", alt: "Brand Asset 4" },
        { src: "/projects/organstation/OS8.png", alt: "Brand Asset 5" },
        { src: "/projects/organstation/OS9.png", alt: "Brand Asset 6" },
        { src: "/projects/organstation/OS10.png", alt: "Brand Asset 7" },
        { src: "/projects/organstation/OS11.png", alt: "Brand Asset 8" },
        { src: "/projects/organstation/OS12.png", alt: "Brand Asset 9" },
        { src: "/projects/organstation/OS13.png", alt: "Brand Asset 10" },
        { src: "/projects/organstation/OS14.png", alt: "Brand Asset 11" },
        { src: "/projects/organstation/OS15.png", alt: "Brand Asset 12" },
        { src: "/projects/organstation/OS16.png", alt: "Brand Asset 13" },
        { src: "/projects/organstation/OS17.png", alt: "Brand Asset 14" },
      ]}
    />
  );
};

export default OrganStationPage;
