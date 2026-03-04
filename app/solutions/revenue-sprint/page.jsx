"use client";

import React from "react";
import ProjectPageTemplate from "../../components/ui/ProjectPageTemplate";

const RevenueSprintPage = () => {
  return (
    <ProjectPageTemplate
      title="High-Speed Revenue Sprint"
      subtitle="Identify conversion leaks and optimize your product for maximum ROI in 72 hours."
      category="Mid-Tier Solution"
      metadata={[
        { label: "Duration", value: "3 Days" },
        { label: "Focus", value: "Conversion Fix" },
        { label: "Turnaround", value: "Rapid" },
        { label: "Pricing", value: "From $1,500" }
      ]}
      overviewContent={
        <>
          <p>
            Your current product might look "fine," but if it's slow, friction-heavy, or visually outdated, you're leaking revenue every second.
            The <strong>Revenue Sprint</strong> is a surgical intervention designed to find and fix those leaks immediately.
          </p>
          <p>
            I perform an ROI-focused audit of your entire UI/UX and codebase, identifying exactly where users are dropping off and 
            deploying high-performance patches to improve retention and conversion.
          </p>
        </>
      }
      processContent={
        <ul className="list-disc pl-5 space-y-4">
          <li><strong>Day 1: Forensic Audit</strong> — Technical and visual analysis of your current conversion funnel.</li>
          <li><strong>Day 2: Rapid Execution</strong> — Implementing UI refinements, performance optimizations, and friction reduction.</li>
          <li><strong>Day 3: Deployment & Review</strong> — Pushing updates to production and reviewing impact metrics.</li>
        </ul>
      }
      logoBreakdownContent={
        <div className="space-y-4">
          <p>
            <strong>Impact Areas:</strong> Core Web Vitals (Lighthouse), User Onboarding, Checkout/Signup Flows, Mobile Responsiveness.
          </p>
          <p>
            <strong>Deliverables:</strong> Audit Report, Live Performance Patches, Conversion Optimization Playbook.
          </p>
        </div>
      }
    />
  );
};

export default RevenueSprintPage;
