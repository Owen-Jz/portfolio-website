import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import React from "react";
import Image from "next/image";

const FinddrBrandPage = () => {
  return (
    <div>
      <NavbarDemo />
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Finddr Brand Design</h1>
          <p className="text-lg text-muted-foreground">
            A showcase of the brand identity, logo, and visual assets crafted
            for Finddr — a service platform that connects users with skilled
            artisans at the tap of a button.
          </p>
        </header>

        {/* Intro section */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p>
            I was tasked with creating the brand identity for Finddr, a
            tech-driven platform built to connect users with skilled service
            providers—anytime, anywhere. The core philosophy behind Finddr is
            simple: access to reliable services should be seamless, transparent,
            and stress-free. Finddr offers a user-first experience that empowers
            individuals to find, evaluate, and book trusted artisans across a
            wide range of categories—from home repairs to personal care—right
            from their mobile devices. Whether you're scheduling an urgent
            plumbing fix, booking a beauty session, or hiring for a home
            project, Finddr’s clean and intuitive interface ensures a smooth
            experience for both clients and service providers. The brand
            identity I developed for Finddr reflects this modern, practical, and
            efficient spirit. It combines bold, energetic visuals with a warm
            and trustworthy tone, positioning Finddr as the go-to platform for
            getting things done—quickly, conveniently, and confidently. At its
            core, Finddr is about empowering users to Find. Connect. Get it
            done. It’s not just about hiring help; it’s about redefining the way
            we access and experience everyday services.
          </p>
          <Image
            src="/projects/finddr/F1.png"
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
            To kick off the brand identity design for Finddr, I began with
            in-depth research into the service-based market and the client’s
            vision of connecting reliability with simplicity. I developed a
            moodboard inspired by urban lifestyles, bold typography, and clean,
            minimal layouts — aligning with Finddr’s modern and accessible brand
            tone. This early, collaborative step helped establish clear creative
            direction, reduced guesswork, and made the entire design process
            more efficient.
          </p>
          <Image
            src="/projects/finddr/F2.png"
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
            src="/projects/finddr/F3.png"
            alt="Jedidah Logo Sketch"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        <Image
          src="/projects/finddr/F4.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/finddr/F5.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/finddr/F6.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/finddr/F7.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/finddr/F8.png"
          alt="Jedidah Branding Asset"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />
      </div>
    </div>
  );
};

export default FinddrBrandPage;
