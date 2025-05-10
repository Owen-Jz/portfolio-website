"use client";
import React from "react";
import { HeroParallax } from "./ui/HeroParralax";

export function HeroSection() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "/product1.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "/product2.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "/product3.png",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "/product4.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: "/product5.png",
  },
];
