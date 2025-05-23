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
      "The e-commerce platform redesign was a game-changer, delivering a modern and seamless shopping experience.",
    name: "Torti Ama-Njoku",
    role: "Founder, ShopTrend",
    picture: "/profiles/torti.png",
    nationality: "/flags/Canada.png",
  },
  {
    quote:
      "Owen is a very diverse creative who brings innovation to whatever he does. His personality and approach to problem solving is impeccable. I recommend him for his brilliant and innovative approach.",
    name: "IB Douglas",
    role: "CEO, Probitek",
    picture: "/profiles/ib.png",
    nationality: "/flags/Nigeria.png",
  },
  {
    quote:
      "Working with Owen was a breath of fresh air. He communicated well, was upfront, and most importantly, delivered on time. What I perhaps liked most about working with Owen was how he took us through the entire design process. From conception to completion, we had a say in every step — and in the end, this greatly contributed to the perfect product he delivered. I highly recommend him.",
    name: "Mr Moithuti",
    role: "CEO, Moithuti",
    picture: "/profiles/moithuti.png",
    nationality: "/flags/Botswana.png",
  },
  {
    quote:
      "Working with Owen was an amazing experience! He was a true team player throughout our brand project bringing creativity, collaboration, and a strong work ethic. His positive attitude and commitment made a real impact. I’d gladly work with him again!",
    name: "Nnene Bright-Victor",
    role: "CEO, NenysTouchs",
    picture: "/profiles/nnene.png",
    nationality: "/flags/Nigeria.png",
  },
  {
    quote:
      "Fantastic job on Carb’s brand identity — the visuals are stunning and clearly communicate our vision. Highly recommended!",
    name: "Victor Aghaji",
    role: "CEO, Carb",
    picture: "/profiles/carb.png",
    nationality: "/flags/Nigeria.png",
  },
];
