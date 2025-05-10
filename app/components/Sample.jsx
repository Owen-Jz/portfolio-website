"use client";
import { ThreeDMarquee } from "./ui/ThreeDMarquee";

export function ThreeDMarqueeDemoSecond() {
  const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];
  return (
    <div className="relative my-10 flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-none bg-gradient-to-b from-gray-900 to-black">
      <h2 className="relative z-20 mx-auto max-w-5xl text-center text-3xl font-extrabold text-balance text-white drop-shadow-lg md:text-5xl lg:text-7xl">
        This is your life and it's ending one{" "}
        <span className="relative z-20 inline-block rounded-xl bg-blue-600/50 px-5 py-2 text-white underline decoration-sky-400 decoration-[8px] underline-offset-[20px] backdrop-blur-md shadow-lg">
          moment
        </span>{" "}
        at a time.
      </h2>
      <p className="relative z-20 mx-auto max-w-3xl py-10 text-center text-base text-neutral-100 md:text-lg lg:text-xl font-light tracking-wide">
        You are not your job, you're not how much money you have in the bank.
        You are not the car you drive. You're not the contents of your wallet.
      </p>
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-6 pt-6">
        <button className="rounded-lg bg-sky-600 px-8 py-3 text-base font-semibold text-white transition-transform hover:scale-105 hover:bg-sky-700 focus:ring-4 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none shadow-md">
          Join the club
        </button>
        <button className="rounded-lg border border-white/30 bg-white/15 px-8 py-3 text-base font-semibold text-white backdrop-blur-md transition-transform hover:scale-105 hover:bg-white/25 focus:ring-4 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black focus:outline-none shadow-md">
          Read more
        </button>
      </div>
      <div className="absolute inset-0 z-10 h-full w-full bg-black/70 dark:bg-black/50 transition-opacity" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
