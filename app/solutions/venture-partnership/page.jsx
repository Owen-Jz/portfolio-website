"use client";

import React from "react";
import ProjectPageTemplate from "../../components/ui/ProjectPageTemplate";

const VenturePartnershipPage = () => {
  return (
    <ProjectPageTemplate
      title="Venture Engineering Partnership"
      subtitle="The Zero-to-One Product Engine for Founders and Startups."
      category="High-Ticket Solution"
      metadata={[
        { label: "Duration", value: "4-6 Weeks" },
        { label: "Focus", value: "Launch & Scale" },
        { label: "Target", value: "Founders" },
        { label: "Pricing", value: "From $5,000" }
      ]}
      overviewContent={
        <>
          <p>
            Most founders have a vision but lack the technical bridge to turn that vision into a high-performance market asset. 
            The <strong>Venture Engineering Partnership</strong> is an end-to-end immersion where I act as your Interim CTO and Design Lead.
          </p>
          <p>
            We don't just build a website; we architect a scalable business unit. This includes custom database logic, 
            high-conversion user flows, and an elite brand identity that commands immediate authority in your industry.
          </p>
        </>
      }
      processContent={
        <ul className="list-disc pl-5 space-y-4">
          <li><strong>Phase 1: Strategic Blueprinting</strong> — Deep dive into your business model, competitors, and revenue goals.</li>
          <li><strong>Phase 2: Product Architecture</strong> — Designing a custom design system in Figma and mapping the full-stack engine.</li>
          <li><strong>Phase 3: High-Performance Build</strong> — Deploying a scalable Next.js + Supabase/MongoDB infrastructure.</li>
          <li><strong>Phase 4: Launch & Optimization</strong> — Deployment to production with a 30-day performance monitoring period.</li>
        </ul>
      }
      logoBreakdownContent={
        <div className="space-y-4">
          <p>
            <strong>Core Technologies:</strong> Next.js (App Router), Tailwind CSS 4, Framer Motion, Supabase, PostgreSQL.
          </p>
          <p>
            <strong>Deliverables:</strong> Full Design System, Custom Web Application, API Integrations, SEO Optimization, 1-month Technical Support.
          </p>
        </div>
      }
    />
  );
};

export default VenturePartnershipPage;
