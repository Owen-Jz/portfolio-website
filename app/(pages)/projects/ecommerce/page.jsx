"use client";

import React from "react";
import ProjectPageTemplate from "@/app/components/ui/ProjectPageTemplate";

const EcommerceProjectPage = () => {
  return (
    <ProjectPageTemplate
      title="Ecommerce Dashboard"
      subtitle="A powerful tool for admins to manage online retail operations."
      category="Product Design"
      metadata={[
        { label: "Client", value: "Confidential" },
        { label: "Industry", value: "Ecommerce" },
        { label: "Role", value: "UI/UX Design" },
      ]}
      overviewContent={
        <p>
            This project was a solo project that I did for a client. I was
            tasked with designing a dashboard for their eccomerce platform.
            It is a tool that helps the admin to manage the website, inventory, and the orders efficiently.
        </p>
      }
      processContent={
        <p>
              To kick off the brand identity and UI design for the eCommerce
              dashboard, I began with thorough research into user behavior,
              platform workflows, and current trends in online retail
              management. The goal was to create a solution that simplified
              complex data while offering a smooth, intuitive experience for
              both store owners and administrators. I developed a moodboard
              centered around clean layouts, modern typography, and structured
              grid systems.
        </p>
      }
      galleryImages={[
        { src: "/projects/ecommerce/E1.png", alt: "Dashboard 1" },
        { src: "/projects/ecommerce/E2.png", alt: "Dashboard 2" },
      ]}
    />
  );
};

export default EcommerceProjectPage;
