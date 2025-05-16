import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import React from "react";
import Image from "next/image";

const FinddrBrandPage = () => {
  return (
    <div>
      <NavbarDemo />
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Ecommerce Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            This is a dashboard designed for eccomerce platforms. It is a tool
            that helps the admin to manage the website and the orders.
          </p>
        </header>

        {/* Intro section */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p>
            This project was a solo project that I did for a client. I was
            tasked with designing a dashboard for their eccomerce platform.
          </p>
          <Image
            src="/projects/ecommerce/e1.png"
            alt="Jedidah Logo"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        {/* My Process section */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold mb-2">My Process</h2>
          <p className="text-base text-muted-foreground">
            <p>
              To kick off the brand identity and UI design for the eCommerce
              dashboard, I began with thorough research into user behavior,
              platform workflows, and current trends in online retail
              management. The goal was to create a solution that simplified
              complex data while offering a smooth, intuitive experience for
              both store owners and administrators. I developed a moodboard
              centered around clean layouts, modern typography, and structured
              grid systems — ensuring clarity, efficiency, and a sense of
              control. This foundational phase helped shape a design language
              that was both functional and visually balanced, streamlining the
              process and aligning with the client’s vision for a powerful,
              user-centric dashboard.
            </p>
          </p>
        </section>

        {/* Logo Breakdown section */}
        <section className="mb-12 space-y-4">
          <Image
            src="/projects/ecommerce/e2.png"
            alt="Jedidah Logo Sketch"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>
      </div>
    </div>
  );
};

export default FinddrBrandPage;
