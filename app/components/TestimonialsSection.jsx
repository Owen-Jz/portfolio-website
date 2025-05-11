"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";

export function TestimonialsSection() {
  return (
    <div className="py-16 bg-transparent flex flex-col items-center justify-center w-full">
      <div className="text-center mb-8 w-full max-w-7xl mx-auto px-4 sm:px-6">
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
      "Owen is a very diverse creative who brings innovation to whatever he does. His personality and approach to problem solving is impeccable. I recommend him for his brilliant and innovative approach.",
    name: "IB Douglas",
    role: "CEO, Probitech",
    picture: "/avatars/john-doe.png",
    nationality: "/flags/Nigeria.png",
  },
  {
    quote:
      "Fantastic job on Carb’s brand identity — the visuals are stunning and clearly communicate our vision. Highly recommended!",
    name: "Victor Aghaji",
    role: "CEO, Carb",
    picture: "/avatars/jane-smith.png",
    nationality: "/flags/Nigeria.png",
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
