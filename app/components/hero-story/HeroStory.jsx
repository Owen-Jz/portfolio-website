"use client";

/**
 * HeroStory — "Blueprint to Reality"
 *
 * You are reading the component you are looking at. This hero pins
 * while you scroll and tells its own making in three chapters:
 *
 *   01 THE IDEA   a night sky of ideas — thin type, live spec labels
 *   02 THE BUILD  the stars condense into the interface wireframe
 *                 while this very file walks you through it
 *   03 THE SHIP   the sky disperses, weight and color arrive, and
 *                 the buttons go live
 *
 * One timeline drives the page and the particles together, so they
 * can never drift apart. The buttons are real from the first frame —
 * the story never gates the action.
 */

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../libs/gsap";
import { getLenis } from "../../libs/lenis";
import { CHAPTERS, EVENTS, PIN_END, bd, chapterAt, KICKERS } from "./chapters.js";
import HeroStage from "./HeroStage.jsx";
import BlueprintLayer from "./BlueprintLayer.jsx";
import BuildLayer from "./BuildLayer.jsx";
import ShipLayer from "./ShipLayer.jsx";
import ChapterRail from "./ChapterRail.jsx";
import HeroStoryMobile from "./HeroStoryMobile.jsx";

const HeroParticles = dynamic(() => import("./HeroParticles.jsx"), {
  ssr: false,
});

const setCursor = (mode) =>
  window.dispatchEvent(new CustomEvent("hero-cursor", { detail: { mode } }));

export default function HeroStory() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const blueprintRef = useRef(null);
  const buildRef = useRef(null);
  const shipRef = useRef(null);
  const cueRef = useRef(null);
  const glState = useRef({ morph1: 0, morph2: 0, accent: 0, scroll: 0 });
  const stRef = useRef(null);
  const [chapter, setChapter] = useState(0);
  const [particlesOn, setParticlesOn] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ---------- Desktop: the full pinned story ----------
      mm.add(
        "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          setParticlesOn(true);

          const root = rootRef.current;
          const stage = stageRef.current;
          const headline = stage.querySelector("[data-hero='headline']");
          const subline = stage.querySelector("[data-hero='subline']");
          const kicker = stage.querySelector("[data-hero='kicker']");
          const ctas = gsap.utils.toArray("[data-hero^='cta-']", stage);
          const primary = stage.querySelector("[data-hero='cta-primary']");

          // ----- Act 0: entrance (time-based, once per session) -----
          const seen = sessionStorage.getItem("introShown");
          const entrance = gsap.timeline({ paused: !!seen });
          entrance
            .from(blueprintRef.current.querySelector(".bp-grid"), {
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
            })
            .from(
              blueprintRef.current.querySelectorAll(".bp-frame"),
              { scale: 0.96, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" },
              "-=0.2"
            )
            .from(
              [headline, subline, kicker, ...ctas],
              { opacity: 0, y: 16, stagger: 0.06, duration: 0.5, ease: "power3.out" },
              "-=0.3"
            )
            .add(() => sessionStorage.setItem("introShown", "true"));
          if (seen) entrance.progress(1);

          // Idle-state life: one spec annotation gently pulses forever so a
          // paused hero is never a freeze-frame (time-based, not scrubbed).
          gsap.to(blueprintRef.current.querySelectorAll(".bp-spec"), {
            opacity: 0.5,
            repeat: -1,
            yoyo: true,
            duration: 1.6,
            ease: "sine.inOut",
            stagger: 0.4,
          });

          // ----- Master scrubbed timeline -----
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: PIN_END,
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
              onUpdate: (self) => setChapter(chapterAt(self.progress)),
              onRefresh: (self) => {
                stRef.current = self;
              },
            },
          });

          // Sky parallax: the starfield tracks overall progress at its own
          // (much slower) pace — background layer vs. foreground story
          tl.to(glState.current, { scroll: 1, duration: 1 }, 0);

          // Kicker copy swaps at chapter boundaries (snap, not fade-drag)
          const swapKicker = (text) => () => {
            kicker.textContent = text;
          };
          tl.call(swapKicker(KICKERS[1]), [], CHAPTERS.build.enter[0]);
          tl.call(swapKicker(KICKERS[2]), [], CHAPTERS.ship.enter[0]);
          // calls fire in both directions; restore on scroll-back
          tl.call(swapKicker(KICKERS[0]), [], CHAPTERS.build.enter[0] - 0.001);
          tl.call(swapKicker(KICKERS[1]), [], CHAPTERS.ship.enter[0] - 0.001);

          // Cursor modes per chapter
          tl.call(() => setCursor("crosshair"), [], 0.001);
          tl.call(() => setCursor("caret"), [], CHAPTERS.build.enter[0]);
          tl.call(() => setCursor("default"), [], CHAPTERS.ship.enter[0]);
          // restore cursor modes when scrolling back up
          tl.call(() => setCursor("crosshair"), [], CHAPTERS.build.enter[0] - 0.001);
          tl.call(() => setCursor("caret"), [], CHAPTERS.ship.enter[0] - 0.001);

          // --- Ch.1 exit: blueprint decorations dissolve
          tl.to(
            blueprintRef.current,
            { opacity: 0, duration: bd(CHAPTERS.idea.exit) },
            CHAPTERS.idea.exit[0]
          );
          tl.to(
            cueRef.current,
            { opacity: 0, duration: bd(CHAPTERS.idea.hold) / 3 },
            CHAPTERS.idea.hold[0]
          );

          // --- Ch.2 enter: build layer in, hairlines draw, particles assemble
          gsap.set(buildRef.current, { opacity: 0 });
          tl.to(
            buildRef.current,
            { opacity: 1, duration: bd(CHAPTERS.build.enter) },
            CHAPTERS.build.enter[0]
          );
          tl.to(
            buildRef.current.querySelectorAll(".hero-draw"),
            {
              strokeDashoffset: 0,
              duration: bd(CHAPTERS.build.enter) + 0.06,
              stagger: 0.015,
              ease: "power1.inOut",
            },
            CHAPTERS.build.enter[0]
          );
          tl.to(
            glState.current,
            { morph1: 1, duration: bd(EVENTS.assemble), ease: "power2.inOut" },
            EVENTS.assemble[0]
          );
          // the two side pins rise as the build begins
          tl.fromTo(
            buildRef.current.querySelectorAll(".build-pin"),
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.02,
              duration: bd(CHAPTERS.build.enter),
              ease: "power1.out",
            },
            CHAPTERS.build.enter[0]
          );
          // type gains working weight through the build
          tl.to(
            [headline, subline],
            { "--wght": 500, duration: bd(CHAPTERS.build.hold) },
            CHAPTERS.build.enter[0]
          );

          // --- Ch.2 exit / Ch.3 enter: THE weight-fill event
          tl.to(
            buildRef.current,
            { opacity: 0, duration: bd(CHAPTERS.build.exit) },
            CHAPTERS.build.exit[0]
          );
          tl.to(
            [headline, subline],
            { "--wght": 800, duration: bd(EVENTS.weightFill), ease: "power3.inOut" },
            EVENTS.weightFill[0]
          );
          tl.to(
            headline,
            { "--wdth": 100, duration: bd(EVENTS.weightFill) },
            EVENTS.weightFill[0]
          );
          tl.to(
            glState.current,
            { morph2: 1, accent: 1, duration: bd(CHAPTERS.ship.enter) },
            CHAPTERS.ship.enter[0]
          );

          // CTAs materialize — style-only; the elements were clickable all along
          tl.to(
            ctas,
            {
              "--cta-border-alpha": 0,
              "--cta-text-alpha": 1,
              duration: bd(CHAPTERS.ship.enter),
            },
            CHAPTERS.ship.enter[0]
          );
          tl.to(
            primary,
            { "--cta-bg-alpha": 1, duration: bd(CHAPTERS.ship.enter) },
            CHAPTERS.ship.enter[0]
          );
          tl.call(
            () => {
              ctas.forEach((el) => (el.style.borderStyle = "solid"));
            },
            [],
            CHAPTERS.ship.enter[0] + bd(CHAPTERS.ship.enter) / 2
          );
          tl.call(
            () => {
              ctas.forEach((el) => (el.style.borderStyle = "dashed"));
            },
            [],
            CHAPTERS.ship.enter[0] + bd(CHAPTERS.ship.enter) / 2 - 0.002
          );

          // Ship decorations flood in
          tl.to(
            shipRef.current.querySelector(".ship-bg"),
            { opacity: 1, duration: bd(CHAPTERS.ship.enter) },
            CHAPTERS.ship.enter[0]
          );
          tl.to(
            shipRef.current.querySelector(".ship-glow"),
            { opacity: 1, duration: bd(CHAPTERS.ship.enter) },
            CHAPTERS.ship.enter[0]
          );
          tl.to(
            shipRef.current.querySelectorAll(".ship-proof"),
            { opacity: 1, stagger: 0.02, duration: bd(CHAPTERS.ship.hold) / 3 },
            CHAPTERS.ship.hold[0]
          );

          // --- Release: stage eases up so the marquee handoff overlaps
          tl.to(
            stage,
            { yPercent: -6, duration: bd(EVENTS.release), ease: "power1.in" },
            EVENTS.release[0]
          );

          return () => {
            setCursor("default");
            setParticlesOn(false);
          };
        }
      );

      // ---------- Reduced motion (any width): static Ch.3 frame ----------
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const stage = stageRef.current;
        gsap.set(stage.querySelectorAll("[data-hero='headline'], [data-hero='subline']"), {
          "--wght": 800,
          "--wdth": 100,
        });
        gsap.set(blueprintRef.current, { opacity: 0 });
        gsap.set(buildRef.current, { opacity: 0 });
        gsap.set(shipRef.current.querySelector(".ship-bg"), { opacity: 1 });
        gsap.set(shipRef.current.querySelectorAll(".ship-proof"), { opacity: 1 });
        const ctas = gsap.utils.toArray("[data-hero^='cta-']", stage);
        ctas.forEach((el) => {
          el.style.borderStyle = "solid";
          el.style.setProperty("--cta-border-alpha", "0");
          el.style.setProperty("--cta-text-alpha", "1");
        });
        stage
          .querySelector("[data-hero='cta-primary']")
          .style.setProperty("--cta-bg-alpha", "1");
        // one annotation stays so the concept still reads (spec §4)
        const kicker = stage.querySelector("[data-hero='kicker']");
        kicker.textContent = KICKERS[2];
      });
    },
    { scope: rootRef }
  );

  const jumpTo = (i) => {
    const st = stRef.current;
    if (!st) return;
    const band = Object.values(CHAPTERS)[i].hold;
    const y = st.start + band[0] * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={rootRef}
      data-hero-root
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
    >
      <ShipLayer ref={shipRef} />
      {particlesOn && (
        <HeroParticles glState={glState} stageRef={stageRef} onFail={() => setParticlesOn(false)} />
      )}
      <BlueprintLayer ref={blueprintRef} stageRef={stageRef} />
      <BuildLayer ref={buildRef} />
      <HeroStage ref={stageRef} />
      <ChapterRail active={chapter} onJump={jumpTo} />
      <HeroStoryMobile stageRef={stageRef} />

      {/* Scroll cue — carried over from the old hero */}
      <div
        ref={cueRef}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:pointer-fine:flex flex-col items-center gap-3"
      >
        <span className="hero-annotation">Scroll</span>
        <span className="block w-px h-12 bg-white/10 relative overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#b02222] to-transparent animate-scroll-cue" />
        </span>
      </div>
    </section>
  );
}
