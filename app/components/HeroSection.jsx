"use client";
import React from "react";
import { HeroParallax } from "./ui/HeroParralax";

export function HeroSection() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Web Kitchen",
    link: "/projects/web-kitchen",
    thumbnail: "/projects/WK1.png",
  },
  {
    title: "Numero",
    link: "https://numero-theta-dusky.vercel.app/",
    thumbnail: "/projects/numero.png",
  },

  {
    title: "True North",
    link: "/projects/true-north",
    thumbnail: "/projects/true-north.png",
  },
  {
    title: "Finddr",
    link: "/projects/finddr",
    thumbnail: "/projects/finddr.png",
  },
  {
    title: "Ecommerce Dashboard",
    link: "/projects/ecommerce",
    thumbnail: "/projects/ecommerce.png",
  },
];
