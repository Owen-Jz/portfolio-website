"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Newspaper,
  Rocket,
  ArrowUpRight,
  Mail,
  Instagram,
  Share2,
  Check,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 *  CONFIG — edit these in one place.
 * ------------------------------------------------------------------ */
const PROFILE_IMG = "/profile.jpg";
const PAGE_URL = "https://www.owendigitals.work/links";
const FLUXBOARD_URL = "https://fluxboard.site";
const TELEGRAM_URL = "https://t.me/+VycsWJR5DR1jOTM0";

// Socials shown in the bottom row. Leave a value empty ("") to hide that icon.
const SOCIALS = {
  instagram: "https://instagram.com/owen_thecreator",
  x: "https://x.com/owendigitals",
  email: "mailto:official@owendigitals.work",
};

/* ------------------------------------------------------------------ *
 *  Custom brand glyphs (lucide has no Telegram / X-logo)
 * ------------------------------------------------------------------ */
const TelegramGlyph = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212-.07-.062-.174-.041-.249-.024-.106.024-1.793 1.139-5.061 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const XGlyph = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ------------------------------------------------------------------ *
 *  Link data
 * ------------------------------------------------------------------ */
const LINKS = [
  {
    key: "portfolio",
    title: "Portfolio",
    subtitle: "Selected work, case studies & services",
    href: "/",
    accent: "#b02222",
    Icon: Briefcase,
    tag: "Start here",
    featured: true,
  },
  {
    key: "blog",
    title: "The Blog",
    subtitle: "Essays on design, dev, business & growth",
    href: "/blog",
    accent: "#E0852F",
    Icon: Newspaper,
    tag: "Fresh reads",
  },
  {
    key: "community",
    title: "AI Builders Community",
    subtitle: "Join the room where we build — free on Telegram",
    href: TELEGRAM_URL,
    accent: "#2AABEE",
    Icon: TelegramGlyph,
    tag: "Live",
    external: true,
  },
  {
    key: "fluxboard",
    title: "Fluxboard",
    subtitle: "The app I'm building right now",
    href: FLUXBOARD_URL,
    accent: "#16B981",
    Icon: Rocket,
    tag: "Beta",
    external: true,
  },
];

/* ------------------------------------------------------------------ *
 *  Link card
 * ------------------------------------------------------------------ */
function LinkCard({ link, index, reduceMotion }) {
  const { title, subtitle, href, accent, Icon, tag, featured, external } = link;

  const variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const inner = (
    <motion.div
      variants={variants}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-[#141414]/70 px-4 py-4 backdrop-blur-md transition-colors duration-500 hover:border-white/20 sm:px-5"
      style={{ ["--accent"]: accent }}
    >
      {/* per-card ambient glow that blooms on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: accent }}
      />
      {/* diagonal sheen sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />

      {/* icon tile */}
      <span
        className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-105"
        style={{
          color: accent,
          backgroundColor: `${accent}1f`,
          borderColor: `${accent}33`,
        }}
      >
        <Icon className="h-5 w-5" />
      </span>

      {/* text */}
      <span className="relative z-10 flex min-w-0 flex-1 flex-col">
        <span className="flex items-center gap-2">
          <span className="truncate text-[15px] font-semibold text-white sm:text-base">
            {title}
          </span>
          {tag && (
            <span
              className="hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide sm:inline-block"
              style={{ color: accent, backgroundColor: `${accent}1a` }}
            >
              {tag}
            </span>
          )}
        </span>
        <span className="truncate text-[13px] text-gray-400">{subtitle}</span>
      </span>

      {/* arrow */}
      <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-500 group-hover:border-white/20 group-hover:text-white">
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>

      {featured && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />
      )}
    </motion.div>
  );

  const sharedProps = {
    "aria-label": `${title} — ${subtitle}`,
    className:
      "block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
    style: { ["--tw-ring-color"]: accent },
  };

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...sharedProps}>
      {inner}
    </a>
  ) : (
    <Link href={href} {...sharedProps}>
      {inner}
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 *  Page
 * ------------------------------------------------------------------ */
export default function LinksPage() {
  const reduceMotion = useReducedMotion();
  const spotlightRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Cursor spotlight — write straight to the DOM node to avoid re-renders.
  const handleMouseMove = useCallback((e) => {
    const el = spotlightRef.current;
    if (!el) return;
    el.style.setProperty("--mx", `${e.clientX}px`);
    el.style.setProperty("--my", `${e.clientY}px`);
  }, []);

  const handleShare = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Owen Digitals", url: PAGE_URL });
        return;
      } catch (err) {
        if (err?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(PAGE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", PAGE_URL);
    }
  }, []);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main
      onMouseMove={reduceMotion ? undefined : handleMouseMove}
      className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#0a0a0a] px-5 py-12 sm:py-16"
    >
      {/* ----- atmospheric background ----- */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        {/* base brand glows */}
        <div className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#b02222]/20 blur-[120px]" />
        <div className="absolute -bottom-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#b02222]/10 blur-[120px]" />
        {/* slow aurora */}
        {!reduceMotion && (
          <motion.div
            className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#b02222]/10 blur-[140px]"
            animate={{ x: [-40, 60, -40], y: [-20, 40, -20], scale: [1, 1.15, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {/* faint grid */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundSize: "44px 44px",
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)",
          }}
        />
        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* cursor spotlight */}
      {!reduceMotion && (
        <div
          ref={spotlightRef}
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0px), rgba(176,34,34,0.12), transparent 65%)",
          }}
        />
      )}

      {/* ----- content ----- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-[34rem] flex-col items-center"
      >
        {/* wordmark */}
        <motion.span
          variants={item}
          className="mb-7 text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-500"
        >
          Owen&nbsp;Digitals
        </motion.span>

        {/* avatar with animated conic ring */}
        <motion.div variants={item} className="relative mb-5">
          <div className="relative grid h-28 w-28 place-items-center rounded-full">
            {!reduceMotion && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #b02222, #d38787, #b02222, #7a1717, #b02222)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            )}
            <span className="absolute inset-[3px] rounded-full bg-[#0a0a0a]" />
            <Image
              src={PROFILE_IMG}
              alt="Owen Digitals"
              width={104}
              height={104}
              priority
              className="relative h-[104px] w-[104px] rounded-full object-cover"
            />
            {/* presence dot */}
            <span className="absolute bottom-1 right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#0a0a0a]">
              <span className="relative flex h-3 w-3">
                {!reduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
              </span>
            </span>
          </div>
        </motion.div>

        {/* name + bio */}
        <motion.h1
          variants={item}
          className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          Owen
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-1.5 text-center text-sm text-gray-400"
        >
          Designer &amp; full-stack developer. I build slick, high-performance
          digital products.
        </motion.p>

        {/* availability pill */}
        <motion.div
          variants={item}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Available for new projects
        </motion.div>

        {/* links */}
        <div className="mt-9 flex w-full flex-col gap-3.5">
          {LINKS.map((link, i) => (
            <LinkCard
              key={link.key}
              link={link}
              index={i}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* socials */}
        <motion.div variants={item} className="mt-9 flex items-center gap-3">
          {SOCIALS.instagram && (
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
            >
              <Instagram className="h-[18px] w-[18px]" />
            </a>
          )}
          {SOCIALS.x && (
            <a
              href={SOCIALS.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
            >
              <XGlyph className="h-4 w-4" />
            </a>
          )}
          {SOCIALS.email && (
            <a
              href={SOCIALS.email}
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
            >
              <Mail className="h-[18px] w-[18px]" />
            </a>
          )}
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share this page"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
          >
            {copied ? (
              <Check className="h-[18px] w-[18px] text-emerald-400" />
            ) : (
              <Share2 className="h-[18px] w-[18px]" />
            )}
          </button>
        </motion.div>

        {/* footer */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-1 text-center"
        >
          <Link
            href="/"
            className="text-xs text-gray-500 transition-colors hover:text-[#b02222]"
          >
            owendigitals.work
          </Link>
          <span className="text-[11px] text-gray-600">
            © {new Date().getFullYear()} Owen Digitals
          </span>
        </motion.div>
      </motion.div>
    </main>
  );
}
