import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import React from "react";
import Image from "next/image";
import ContactSection from "@/app/components/ContactSection";

const WebKitchenBrandPage = () => {
  return (
    <div>
      <NavbarDemo />
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Web Kitchen Brand Design</h1>
          <p className="text-lg ">
            Explore the brand identity, logo, and visual assets created for Web
            Kitchen.
          </p>
        </header>

        {/* Intro section */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p>
            I was commissioned to create a logo for a brand named Web Kitchen
            Studios. The name cleverly combines "web" and "kitchen" to represent
            a creative digital space where ideas are cooked up and brought to
            life. The logo concept merges a kitchen utensil (a knife) with a
            coding symbol ({"</>"}), resulting in a unique and memorable mark
            that stands out in any context the client chooses to use it.
          </p>
          <Image
            src="/projects/web-kitchen/WK1.png"
            alt="Web Kitchen Logo"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        {/* My Process section */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold">My Process</h2>
          <p>
            Before beginning the logo design, I took time to deeply understand
            the client’s vision and goals. I created a moodboard to visually
            communicate ideas and ensure we were aligned from the start. This
            collaborative step helped streamline the design process and
            minimized unnecessary revisions by keeping both the client and
            myself on the same page.
          </p>

          <Image
            src="/projects/web-kitchen/WK2.png"
            alt="Web Kitchen Logo"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        {/* Logo Breakdown section */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold">Logo Breakdown</h2>
          <p>
            The logo design process began with a detailed breakdown of the
            elements that would be included. I started by sketching a basic
            knife shape, which would later be transformed into a more refined
            version.
          </p>

          <Image
            src="/projects/web-kitchen/WK3.png"
            alt="Web Kitchen Logo"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        <Image
          src="/projects/web-kitchen/WK4.png"
          alt="Web Kitchen Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/web-kitchen/WK5.png"
          alt="Web Kitchen Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/web-kitchen/WK6.png"
          alt="Web Kitchen Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/web-kitchen/WK7.png"
          alt="Web Kitchen Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/web-kitchen/WK9.png"
          alt="Web Kitchen Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />
      </div>
      <ContactSection />
    </div>
  );
};

export default WebKitchenBrandPage;
