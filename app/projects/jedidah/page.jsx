import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import React from "react";
import Image from "next/image";

const JedidahBrandPage = () => {
  return (
    <div>
      <NavbarDemo />
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Jedidah Brand Design</h1>
          <p className="text-lg">
            Explore the brand identity logo and visual assets created for
            Jedidah
          </p>
        </header>

        {/* Intro section */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p>
            I was tasked with developing the brand identity for Jedidah a
            streetwear brand with the tagline "Where comfort meets style". At
            Jedidah we believe that style should never come at the expense of
            comfort. The brand offers a curated collection of streetwear
            essentials that seamlessly blend fashion-forward designs with utmost
            comfort. Our hoodies and graphic-designed shirts are meticulously
            crafted to provide a perfect fit and showcase the latest trends.
            Whether you're exploring the city streets or hanging out with
            friends our quality sneakers and streetwear accessories will elevate
            your look to the next level. We prioritize delivering an exceptional
            shopping experience ensuring that your orders arrive in a timely
            manner. With Jedidah you can embrace your personal style while
            enjoying the comfort you deserve. Step into the world of Jedidah and
            redefine your street style
          </p>
          <Image
            src="/projects/jedidah/JD1.gif"
            alt="Jedidah Logo"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        {/* My Process section */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold">My Process</h2>
          <p>
            Before starting the design for Jedidah’s brand identity I conducted
            in-depth research into the streetwear market and the client’s vision
            for blending comfort with style. I created a moodboard featuring
            urban aesthetics bold typography and minimalist designs to align
            with Jedidah’s ethos. This collaborative step ensured that both the
            client and I were on the same page streamlining the design process
            and minimizing revisions
          </p>
          <Image
            src="/projects/jedidah/JD2.png"
            alt="Jedidah Moodboard"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        {/* Logo Breakdown section */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold">Logo Breakdown</h2>
          <p>
            The logo design process for Jedidah began with sketching concepts
            that reflected the brand’s streetwear vibe. I focused on creating a
            bold modern design that incorporated elements of urban culture while
            maintaining simplicity for versatility across hoodies shirts and
            accessories
          </p>
          <Image
            src="/projects/jedidah/JD3.png"
            alt="Jedidah Logo Sketch"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        <Image
          src="/projects/jedidah/JD4.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/jedidah/JD5.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/jedidah/JD6.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/jedidah/JD7.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/jedidah/JD8.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/jedidah/JD9.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />
        <Image
        src="/projects/jedidah/JD10.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />
        <Image
        src="/projects/jedidah/JD11.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />
        <Image
        src="/projects/jedidah/JD12.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />
      </div>
    </div>
  );
};

export default JedidahBrandPage;
