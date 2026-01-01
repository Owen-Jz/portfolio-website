"use client";

import React from "react";
import ProjectPageTemplate from "@/app/components/ui/ProjectPageTemplate";

const JedidahBrandPage = () => {
  return (
    <ProjectPageTemplate
      title="Jedidah Brand Design"
      subtitle="Visual identity for a streetwear brand where comfort meets style."
      category="Fashion Branding"
      metadata={[
        { label: "Client", value: "Jedidah" },
        { label: "Industry", value: "Fashion" },
        { label: "Year", value: "2023" },
        { label: "Role", value: "Brand Identity" },
      ]}
      overviewContent={
        <p>
            I was tasked with developing the brand identity for Jedidah, a
            streetwear brand with the tagline "Where comfort meets style". At
            Jedidah we believe that style should never come at the expense of
            comfort. The brand offers a curated collection of streetwear
            essentials that seamlessly blend fashion-forward designs with utmost
            comfort. Our hoodies and graphic-designed shirts are meticulously
            crafted to provide a perfect fit and showcase the latest trends.
        </p>
      }
      processContent={
        <p>
            Before starting the design for Jedidah’s brand identity I conducted
            in-depth research into the streetwear market and the client’s vision
            for blending comfort with style. I created a moodboard featuring
            urban aesthetics bold typography and minimalist designs to align
            with Jedidah’s ethos. This collaborative step ensured that both the
            client and I were on the same page.
        </p>
      }
      logoBreakdownContent={
        <p>
            The logo design process for Jedidah began with sketching concepts
            that reflected the brand’s streetwear vibe. I focused on creating a
            bold modern design that incorporated elements of urban culture while
            maintaining simplicity for versatility across hoodies shirts and
            accessories.
        </p>
      }
      galleryImages={[
        { src: "/projects/jedidah/JD1.gif", alt: "Logo Animation" },
        { src: "/projects/jedidah/JD2.png", alt: "Moodboard" },
        { src: "/projects/jedidah/JD3.png", alt: "Sketches" },
        { src: "/projects/jedidah/JD4.png", alt: "Mockup 1" },
        { src: "/projects/jedidah/JD5.png", alt: "Mockup 2" },
        { src: "/projects/jedidah/JD6.png", alt: "Mockup 3" },
        { src: "/projects/jedidah/JD7.png", alt: "Mockup 4" },
        { src: "/projects/jedidah/JD8.png", alt: "Mockup 5" },
        { src: "/projects/jedidah/JD9.png", alt: "Mockup 6" },
        { src: "/projects/jedidah/JD10.png", alt: "Mockup 7" },
        { src: "/projects/jedidah/JD11.png", alt: "Mockup 8" },
        { src: "/projects/jedidah/JD12.png", alt: "Mockup 9" },
      ]}
    />
  );
};

export default JedidahBrandPage;
