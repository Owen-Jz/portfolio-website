import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import React from "react";
import Image from "next/image";

import SocialSidebar from "@/app/components/SocialSidebar";
import ContactSection from "@/app/components/ContactSection";
// Add more items as needed

// function section_create({ title, children, image }) {
//   return (
//     <section className="mb-12 space-y-4">
//       <h2 className="text-2xl font-semibold">{title}</h2>
//       <p>{children}</p>
//       {image && (
//         <Image
//           src={image}
//           alt={title}
//           width={1200}
//           height={200}
//           className="rounded-2xl mt-10"
//         />
//       )}
//     </section>
//   );
// }

const WebKitchenBrandPage = () => {
  return (
    <div>
      <NavbarDemo />
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">OrganStation Brand Design</h1>
          <div className="flex flex-row  gap-2">
            <p className=" font-semibold bg-gray-700 w-fit p-2 rounded-3xl">
              Client: OrganStation
            </p>
            <p className=" font-semibold bg-gray-700 w-fit p-2 rounded-3xl">
              Industry: Healthcare
            </p>
          </div>
          <p className="text-lg ">
            Explore the brand identity, logo, and visual assets created for
            OrganStation
          </p>
        </header>

        {/* Intro section */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-semibold">Project Overview</h2>
          <p>
            I was contracted by OrganStation, a forward-thinking healthcare
            startup specializing in telemedical services. The company is
            dedicated to delivering accessible and efficient medical
            consultations through digital platforms. My role involved developing
            a cohesive brand identity that reflected OrganStation's mission to
            modernize healthcare and make quality medical care available to
            everyone, anywhere.
          </p>
          <Image
            src="/projects/organstation/OS1.png"
            alt="OrganStation Logo"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        {/* My Process section */}
        <section className="mb-12 space-y-4">
          {/* <h2 className="text-2xl font-semibold">My Process</h2>
          <p>
            Before beginning the logo design, I took time to deeply understand
            the client’s vision and goals. I created a moodboard to visually
            communicate ideas and ensure we were aligned from the start. This
            collaborative step helped streamline the design process and
            minimized unnecessary revisions by keeping both the client and
            myself on the same page.
          </p> */}

          <Image
            src="/projects/organstation/OS2.png"
            alt="OrganStation Logo"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        {/* Logo Breakdown section */}
        <section className="mb-12 space-y-4">
          {/* <h2 className="text-2xl font-semibold">Logo Breakdown</h2>
          <p>
            The logo design process began with a detailed breakdown of the
            elements that would be included. I started by sketching a basic
            knife shape, which would later be transformed into a more refined
            version.
          </p> */}

          <Image
            src="/projects/organstation/OS3.gif"
            alt="OrganStation Logo"
            width={1200}
            height={200}
            className="rounded-2xl mt-10"
          />
        </section>

        <Image
          src="/projects/organstation/OS4.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS5.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS6.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS7.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS8.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS9.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS10.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS11.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS12.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS13.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS14.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS15.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS16.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />

        <Image
          src="/projects/organstation/OS17.png"
          alt="OrganStation Logo"
          width={1200}
          height={200}
          className="rounded-2xl mt-10"
        />
      </div>
      <ContactSection />
      <SocialSidebar />
    </div>
  );
};

export default WebKitchenBrandPage;
