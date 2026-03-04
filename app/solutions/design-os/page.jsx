"use client";

import React from "react";
import ProjectPageTemplate from "../../components/ui/ProjectPageTemplate";

const DesignOSPage = () => {
  return (
    <ProjectPageTemplate
      title="The Design Engineer's OS"
      subtitle="The ultimate Figma-to-Code starter kit for modern SaaS builders."
      category="Scalable Product"
      metadata={[
        { label: "Access", value: "Lifetime" },
        { label: "Stack", value: "Next.js / Tailwind" },
        { label: "Updates", value: "Free" },
        { label: "Pricing", value: "$499" }
      ]}
      overviewContent={
        <>
          <p>
            Stop wasting weeks setting up project foundations. <strong>The Design Engineer's OS</strong> is my private library 
            of pre-built, high-performance components and architectural logic used to build elite-tier ventures.
          </p>
          <p>
            This isn't just a UI kit; it's a productivity system. It includes a robust Figma file mirrored perfectly in 
            Next.js code, allowing you to bridge the gap from design to deployment in record time.
          </p>
        </>
      }
      processContent={
        <ul className="list-disc pl-5 space-y-4">
          <li><strong>The Component Library</strong> — 50+ hand-crafted, accessible React components with Tailwind 4.</li>
          <li><strong>The Bridging Logic</strong> — My custom workflow for automating the design-to-code loop.</li>
          <li><strong>Production Ready</strong> — Pre-configured with SEO, Analytics, and Framer Motion animations.</li>
        </ul>
      }
      logoBreakdownContent={
        <div className="space-y-4">
          <p>
            <strong>What's Inside:</strong> Figma Master File, Next.js Starter Repo, Deployment Guide, Custom Animation Presets.
          </p>
          <p>
            <strong>Benefit:</strong> Saves roughly 120+ hours of development time per project.
          </p>
        </div>
      }
    />
  );
};

export default DesignOSPage;
