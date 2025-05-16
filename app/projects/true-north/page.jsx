import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import React from "react";
import Image from "next/image";

const TrueNorthBrandPage = () => {
  return (
    <div>
      <NavbarDemo />
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">True North Brand Design</h1>
          <p className="text-lg text-muted-foreground">
            A showcase of the brand identity, logo, and visual assets crafted
            for True North — a vibrant, team-based trivia game that celebrates
            Canadian culture and knowledge.
          </p>
        </header>

        {/* Intro section */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p>
            I was tasked with creating the brand identity for True North, a
            vibrant, team-based trivia game that celebrates Canadian culture and
            knowledge. The core philosophy behind True North is simple: learning
            about Canada should be engaging, inclusive, and fun for players of
            all ages. True North offers an interactive experience that
            encourages players to explore history, geography, sports, and more
            while competing to be the first to reach the finish square. The
            brand identity I developed for True North reflects this lively and
            welcoming spirit. It combines bold, dynamic visuals with a warm and
            approachable tone, positioning True North as the go-to game for
            connecting people through shared culture and friendly competition.
            At its heart, True North is about discovery, connection, and
            celebrating what makes Canada unique.
          </p>

          <Image
            src="/projects/true-north/TN1.png"
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
            To kick off the brand identity design for True North, I began with
            in-depth research into the trivia game market and the client’s
            vision of celebrating Canadian culture and knowledge. I developed a
            moodboard inspired by urban lifestyles, bold typography, and clean,
            minimal layouts — aligning with True North’s modern and accessible
            brand tone. This early, collaborative step helped establish clear
            creative direction, reduced guesswork, and made the entire design
            process more efficient.
          </p>
          <Image
            src="/projects/true-north/TN2.png"
            alt="Jedidah Moodboard"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        {/* Logo Breakdown section */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold mb-2">Logo Breakdown</h2>
          <p className="text-base text-muted-foreground">
            The logo design for Finddr started with concept sketches that
            captured the brand’s role as a trusted link between users and
            skilled service providers. I focused on a clean, modern mark that
            feels approachable yet professional. The goal was to ensure clarity
            at all sizes and maintain versatility across digital platforms, app
            icons, and branded materials.
          </p>
          <Image
            src="/projects/true-north/TN3.png"
            alt="Jedidah Logo Sketch"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        <Image
          src="/projects/true-north/TN4.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/true-north/TN5.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/true-north/TN6.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/true-north/TN7.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/true-north/TN8.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/true-north/TN9.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/true-north/TN10.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/true-north/TN11.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />
      </div>
    </div>
  );
};

export default TrueNorthBrandPage;
