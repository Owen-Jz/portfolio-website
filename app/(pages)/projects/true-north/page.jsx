"use client";

import React from "react";
import ProjectPageTemplate from "@/app/components/ui/ProjectPageTemplate";

const TrueNorthBrandPage = () => {
  return (
    <ProjectPageTemplate
      title="True North Brand Design"
      subtitle="A vibrant, team-based trivia game celebrating Canadian culture."
      category="Game Identity"
      metadata={[
        { label: "Client", value: "True North" },
        { label: "Industry", value: "Entertainment" },
        { label: "Role", value: "Brand Design" },
      ]}
      overviewContent={
        <p>
            I was tasked with creating the brand identity for True North, a
            vibrant, team-based trivia game that celebrates Canadian culture and
            knowledge. The core philosophy behind True North is simple: learning
            about Canada should be engaging, inclusive, and fun for players of
            all ages. True North offers an interactive experience that
            encourages players to explore history, geography, sports, and more
            while competing to be the first to reach the finish square.
        </p>
      }
      processContent={
        <p>
            To kick off the brand identity design for True North, I began with
            in-depth research into the trivia game market and the client’s
            vision of celebrating Canadian culture and knowledge. I developed a
            moodboard inspired by urban lifestyles, bold typography, and clean,
            minimal layouts — aligning with True North’s modern and accessible
            brand tone.
        </p>
      }
      logoBreakdownContent={
        <p>
            The logo design process started with concept sketches that
            captured the brand’s role as a fun and educational platform. I focused on a clean, modern mark that
            feels approachable yet professional.
        </p>
      }
      galleryImages={[
        { src: "/projects/true-north/TN1.png", alt: "Hero" },
        { src: "/projects/true-north/TN2.png", alt: "Moodboard" },
        { src: "/projects/true-north/TN3.png", alt: "Sketches" },
        { src: "/projects/true-north/TN4.png", alt: "Asset 4" },
        { src: "/projects/true-north/TN5.png", alt: "Asset 5" },
        { src: "/projects/true-north/TN6.png", alt: "Asset 6" },
        { src: "/projects/true-north/TN7.png", alt: "Asset 7" },
        { src: "/projects/true-north/TN8.png", alt: "Asset 8" },
        { src: "/projects/true-north/TN9.png", alt: "Asset 9" },
        { src: "/projects/true-north/TN10.png", alt: "Asset 10" },
        { src: "/projects/true-north/TN11.png", alt: "Asset 11" },
      ]}
    />
  );
};

export default TrueNorthBrandPage;
