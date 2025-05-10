"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";

export function TestimonialsSection() {
  return (
    <div className="py-16 bg-transparent flex flex-col items-center justify-center">
      <div className="text-center mb-8 max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-[#b02222] text-xl md:text-2xl font-bold font-['Manrope'] uppercase leading-7">
          Testimonials
        </p>
        <h2 className="text-white text-3xl md:text-5xl font-normal font-['Manrope'] leading-tight">
          What My Clients Think About Me
        </h2>
      </div>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
        pauseOnHover={true}
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Amazing work on our brand identity for the e-hailing company! The visual identity was unique and perfectly captured our vision.",
    name: "John Doe",
    role: "CEO, Carb",
    picture: "/avatars/john-doe.png",
    nationality: "/flags/us.png",
  },
  {
    quote:
      "The UI/UX design for our fintech app was intuitive and user-friendly, focusing on trust and efficiency.",
    name: "Jane Smith",
    role: "CTO, RainShield Global",
    picture: "/avatars/jane-smith.png",
    nationality: "/flags/uk.png",
  },
  {
    quote:
      "Seamless LMS design for Nigerian schools, with a user-centric approach and flawless implementation.",
    name: "Alex Brown",
    role: "Lead Developer, Silicon Delta",
    picture: "/avatars/alex-brown.png",
    nationality: "/flags/ng.png",
  },
  {
    quote:
      "The rebranding for our organic food company was fresh and eco-conscious, elevating our market presence.",
    name: "Emma Wilson",
    role: "Marketing Director, GreenFoods",
    picture: "/avatars/emma-wilson.png",
    nationality: "/flags/ca.png",
  },
  {
    quote:
      "The e-commerce platform redesign was a game-changer, delivering a modern and seamless shopping experience.",
    name: "Michael Chen",
    role: "Founder, ShopTrend",
    picture: "/avatars/michael-chen.png",
    nationality: "/flags/cn.png",
  },
];
