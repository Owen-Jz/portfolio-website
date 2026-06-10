"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../libs/gsap";
import { WordReveal } from "./gsap/ScrollFX";

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
      "Working with Owen was an amazing experience! He was a true team player throughout our brand project bringing creativity, collaboration, and a strong work ethic. His positive attitude and commitment made a real impact. I'd gladly work with him again!",
    name: "Nnene Bright-Victor",
    role: "CEO, NenysTouchs",
    picture: "/profiles/nnene.png",
    nationality: "/flags/Nigeria.png",
  },
  {
    quote:
      "Fantastic job on Carb's brand identity — the visuals are stunning and clearly communicate our vision. Highly recommended!",
    name: "Victor Aghaji",
    role: "CEO, Carb",
    picture: "/profiles/carb.png",
    nationality: "/flags/Nigeria.png",
  },
];

// Long quotes step down in size so every card keeps its editorial proportions
const quoteSize = (quote) => {
  if (quote.length > 300) return "text-[15px] md:text-base leading-relaxed";
  if (quote.length > 160) return "text-lg md:text-xl leading-relaxed";
  return "text-xl md:text-[26px] leading-snug";
};

const Stars = () => (
  <div className="flex gap-1 text-[#f5a623] text-sm tracking-wide" aria-label="5 star rating">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>★</span>
    ))}
  </div>
);

const TestimonialPanel = ({ item, index }) => (
  <article className="ts-panel relative flex-shrink-0 w-full md:w-[560px] lg:w-[620px] md:will-change-transform">
    <div className="relative h-full md:h-[460px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-[#141414] to-[#0c0c0c] p-8 md:p-10 flex flex-col transition-colors duration-500 hover:border-[#b02222]/30">
      {/* Ambient red wash */}
      <div className="absolute -left-16 -top-16 w-[240px] h-[240px] bg-[#b02222]/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Ghost index */}
      <span
        aria-hidden="true"
        className="absolute -top-3 right-6 text-[110px] font-black font-manrope leading-none text-white/[0.04] select-none pointer-events-none"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="w-11 h-11 rounded-xl border border-[#b02222]/30 bg-[#b02222]/10 flex items-center justify-center">
          <span className="text-[#b02222] text-3xl font-serif leading-none translate-y-1.5 select-none">
            &ldquo;
          </span>
        </div>
        <Stars />
      </div>

      <p
        className={`ts-quote relative z-10 text-white/85 font-manrope font-medium tracking-[-0.01em] flex-1 ${quoteSize(
          item.quote
        )}`}
      >
        {item.quote}
      </p>

      <footer className="relative z-10 flex items-center gap-4 border-t border-white/[0.06] pt-6 mt-8">
        <div className="relative flex-shrink-0">
          <img
            src={item.picture}
            alt={item.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-[#b02222]/40 ring-offset-2 ring-offset-[#0e0e0e]"
            loading="lazy"
          />
          <div className="absolute -bottom-1 -right-1 bg-[#151515] rounded-full p-0.5 border border-white/10">
            <img
              src={item.nationality}
              alt=""
              className="w-5 h-3.5 object-cover rounded-[2px]"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold font-manrope text-base">{item.name}</h4>
          <p className="text-white/45 text-sm font-manrope">{item.role}</p>
        </div>
        <div className="ml-auto hidden md:block h-px w-12 bg-gradient-to-r from-[#b02222] to-transparent" />
      </footer>
    </div>
  </article>
);

const CtaPanel = () => (
  <article className="ts-panel relative flex-shrink-0 w-full md:w-[480px] md:will-change-transform">
    <Link href="/contact" data-cursor="view" className="block h-full group">
      <div className="relative h-full md:h-[460px] overflow-hidden rounded-[28px] border border-[#b02222]/25 bg-gradient-to-br from-[#b02222]/[0.12] to-[#0c0c0c] p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:border-[#b02222]/50 hover:shadow-[0_0_60px_rgba(176,34,34,0.15)]">
        <div className="absolute right-[-60px] bottom-[-60px] w-[260px] h-[260px] bg-[#b02222]/15 rounded-full blur-[100px] pointer-events-none" />

        <p className="relative z-10 text-[#b02222] text-xs font-bold font-manrope uppercase tracking-[0.25em]">
          Next chapter
        </p>

        <div className="relative z-10">
          <h3 className="text-white text-3xl md:text-4xl font-bold font-manrope leading-tight mb-8">
            Your project
            <br />
            could be the
            <br />
            <span className="text-[#b02222]">next story.</span>
          </h3>
          <div className="inline-flex items-center gap-3 text-white font-semibold font-manrope">
            <span className="border-b border-[#b02222]/60 pb-1 group-hover:border-[#b02222] transition-colors">
              Start a project
            </span>
            <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  </article>
);

export function TestimonialsSection() {
  const sectionRef = useRef(null);
  const trackWrapRef = useRef(null);
  const trackRef = useRef(null);
  const ghostRef = useRef(null);
  const counterRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub the track horizontally
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const getDistance = () =>
            Math.max(0, track.scrollWidth - document.documentElement.clientWidth);

          const tween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${getDistance()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const idx = Math.min(
                  testimonials.length,
                  1 + Math.round(self.progress * (testimonials.length - 1))
                );
                if (counterRef.current) {
                  counterRef.current.textContent = String(idx).padStart(2, "0");
                }
                if (progressRef.current) {
                  progressRef.current.style.transform = `scaleX(${self.progress})`;
                }
              },
            },
          });

          // Ghost word drifts slower than the track — depth layer
          gsap.to(ghostRef.current, {
            x: () => -getDistance() * 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${getDistance()}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          // Center-focus: each card sharpens as it crosses the viewport,
          // and its quote drifts at its own rate for inner parallax
          gsap.utils.toArray(".ts-panel", sectionRef.current).forEach((panel) => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left 95%",
                  end: "right 5%",
                  scrub: true,
                },
              })
              .fromTo(
                panel,
                { scale: 0.94, opacity: 0.5 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "none" }
              )
              .to(panel, { scale: 0.94, opacity: 0.5, duration: 0.5, ease: "none" });

            const quote = panel.querySelector(".ts-quote");
            if (quote) {
              gsap.fromTo(
                quote,
                { xPercent: 3 },
                {
                  xPercent: -3,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: tween,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  },
                }
              );
            }
          });
        }
      );

      // Desktop + reduced motion: no pin, fall back to native horizontal scroll
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: reduce)",
        () => {
          gsap.set(trackWrapRef.current, { overflowX: "auto" });
        }
      );

      // Mobile: vertical stack with a simple staggered rise per card
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils.toArray(".ts-panel", sectionRef.current).forEach((panel) => {
            gsap.from(panel, {
              y: 40,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-[#0a0a0a] overflow-hidden"
    >
      <div className="relative md:h-screen flex flex-col justify-center py-20 md:py-0">
        {/* Oversized outlined ghost word — depth layer behind the cards */}
        <div
          ref={ghostRef}
          aria-hidden="true"
          className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[4vw] whitespace-nowrap font-manrope font-black leading-none select-none pointer-events-none text-[24vw] tracking-tighter will-change-transform"
          style={{
            WebkitTextStroke: "1.5px rgba(255,255,255,0.05)",
            color: "transparent",
          }}
        >
          CLIENT STORIES
        </div>

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#b02222]/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Header row */}
        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12 flex items-end justify-between gap-8 mb-10 md:mb-14">
          <div>
            <p className="text-[#b02222] text-sm md:text-base font-bold font-manrope uppercase tracking-[0.25em] mb-3">
              Testimonials
            </p>
            <WordReveal
              text="What My Clients Say"
              as="h2"
              className="text-white text-3xl md:text-5xl lg:text-6xl font-bold font-manrope leading-tight tracking-tight"
            />
          </div>

          {/* Counter + progress — desktop only */}
          <div className="hidden md:flex flex-col items-end gap-3 pb-2">
            <div className="flex items-baseline gap-1 font-manrope">
              <span
                ref={counterRef}
                className="text-white text-4xl font-bold tabular-nums"
              >
                01
              </span>
              <span className="text-white/30 text-lg tabular-nums">
                / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
            <div className="w-44 h-px bg-white/10 overflow-hidden">
              <div
                ref={progressRef}
                className="h-full w-full bg-[#b02222] origin-left will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <span className="text-white/25 text-[11px] font-mono uppercase tracking-[0.2em]">
              Scroll to explore
            </span>
          </div>
        </div>

        {/* Horizontal track (vertical stack on mobile) */}
        <div ref={trackWrapRef} className="relative z-10 no-scrollbar">
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row gap-6 md:gap-10 md:w-max px-4 sm:px-6 lg:px-12 md:pr-[14vw] md:will-change-transform"
          >
            {testimonials.map((item, index) => (
              <TestimonialPanel key={item.name} item={item} index={index} />
            ))}
            <CtaPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
