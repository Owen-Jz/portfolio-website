# Template Storefront — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the on-site storefront for the Owen Digitals template line — a `/templates` listing, per-product detail pages, and a purchase success page — wired to Polar checkout via a per-product config, so it goes live the moment Polar product links exist.

**Architecture:** Add three App Router routes that reuse existing site components (`NavbarDemo`, `FooterSection`, `GlassCard`, Framer Motion). All product content lives in one data module (`templatesData.js`) so adding template #2 (SaaS landing) later is a data edit, not new code. The Buy button links to each product's `checkoutUrl` (a Polar hosted-checkout link Owen pastes in); when absent, it degrades to a "Notify me" contact CTA so the page is always shippable.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind v4, framer-motion, lucide-react. No test runner exists in this repo, so each task is verified with `npm run build` + `npm run lint` and a visual check in the dev server (matching how the rest of this site is validated).

**Out of scope for Phase 1 (needs Owen's external accounts / separate repo):** extracting the lite template into its own repo, the live demo Vercel deploy, creating the Polar product + payout setup, Paystack NGN checkout. These are tracked in the spec (`docs/superpowers/specs/2026-06-08-template-product-line-design.md`) phases 1-cont/2/3.

---

## File Structure

- `app/components/templatesData.js` — **Create.** Single source of truth for the template line. Exports `templatesData` (array of product objects) and a `getTemplateBySlug(slug)` helper. One responsibility: product content.
- `app/(pages)/templates/page.jsx` — **Create.** The line listing page (`/templates`). Hero + grid of product cards. Mirrors the structure of `app/(pages)/projects/page.jsx`.
- `app/(pages)/templates/[slug]/page.jsx` — **Create.** Product detail: gallery, "what's included," tech, pricing, FAQ, license, Buy button. Reuses `GlassCard`.
- `app/(pages)/templates/[slug]/success/page.jsx` — **Create.** Post-purchase confirmation + next steps (check email / GitHub invite).
- `app/components/ui/ResizableNavbar.jsx` — **Modify.** Add a "Templates" nav item (only if a nav items array exists there; otherwise skip and rely on footer link).
- `app/components/FooterSection.jsx` — **Modify.** Add a "Templates" link.

Design tokens to match existing pages: page bg `#0a0a0a`, accent gradient `from-[#b02222] to-[#d38787]`, `font-manrope`, glass surfaces via `GlassCard`, blurred radial background blobs, `react-intersection-observer` + framer-motion entrance animations.

---

### Task 1: Template data module

**Files:**
- Create: `app/components/templatesData.js`

- [ ] **Step 1: Create the data module with the portfolio product and a "coming soon" landing product**

```js
// app/components/templatesData.js
// Single source of truth for the template product line.
// Add a new template by appending an object here — no page code changes needed.

export const templatesData = [
  {
    slug: "portfolio",
    name: "Owen Portfolio Template",
    tagline: "The template behind this site.",
    description:
      "A premium designer/developer portfolio + blog in Next.js, Tailwind and Framer Motion. Distinctive, motion-rich, and production-ready — the kind of site people assume you paid an agency for.",
    status: "available", // "available" | "coming-soon"
    priceUsd: 49,
    priceLabel: "$49",
    compareAtLabel: "$79", // shown struck-through as an intro deal; null to hide
    // Owen pastes the Polar hosted-checkout link here. Until then, Buy degrades to a contact CTA.
    checkoutUrl: "",
    demoUrl: "", // live demo deploy, e.g. https://portfolio-template.owendigitals.work
    repoNote: "Delivered as a private GitHub repo invite + zip download.",
    cover: "/profile2.jpg", // placeholder until dedicated cover art exists
    gallery: ["/profile2.jpg"],
    tech: ["Next.js 15", "Tailwind CSS v4", "Framer Motion", "MDX Blog"],
    features: [
      "Fully responsive, mobile-perfect layout",
      "Config-driven content via a single site.config file",
      "MDX-powered blog with reading progress + share rail",
      "Framer Motion page + scroll animations throughout",
      "Projects / case-study system",
      "Contact + newsletter sections",
      "One-click deploy to Vercel",
      "README + setup & customization docs",
    ],
    includes: [
      "Complete Next.js source code",
      "Free updates via the repo",
      "Single license: unlimited personal + client projects",
    ],
    faq: [
      {
        q: "Do I need to know how to code?",
        a: "Basic familiarity helps. Content is driven by a single config file, and the README walks you through setup and deploying to Vercel.",
      },
      {
        q: "How is it delivered?",
        a: "After purchase you're invited to a private GitHub repository and also get a zip download, plus a license key.",
      },
      {
        q: "What does the license allow?",
        a: "One purchase covers unlimited personal and client projects. You may not resell or redistribute the template itself.",
      },
      {
        q: "Are updates included?",
        a: "Yes — improvements are pushed to the repo and you pull them for free.",
      },
      {
        q: "Can I get a refund?",
        a: "Because it's a digital product delivered instantly, sales are final once repo access is granted.",
      },
    ],
  },
  {
    slug: "saas-landing",
    name: "SaaS Landing Template",
    tagline: "Launch-ready marketing page for founders.",
    description:
      "A conversion-focused landing page — hero, features, pricing, testimonials, CTA and footer — engineered to look like Vercel or Stripe built it. Coming soon.",
    status: "coming-soon",
    priceUsd: 59,
    priceLabel: "$59",
    compareAtLabel: null,
    checkoutUrl: "",
    demoUrl: "",
    repoNote: "Delivered as a private GitHub repo invite + zip download.",
    cover: "/profile2.jpg",
    gallery: [],
    tech: ["Next.js 15", "Tailwind CSS v4", "Framer Motion"],
    features: [
      "High-conversion hero + feature sections",
      "Pricing table + testimonials",
      "Fully responsive",
    ],
    includes: [],
    faq: [],
  },
];

export function getTemplateBySlug(slug) {
  return templatesData.find((t) => t.slug === slug) || null;
}

export const availableTemplates = () =>
  templatesData.filter((t) => t.status === "available");
```

- [ ] **Step 2: Verify it imports cleanly**

Run: `node --input-type=module -e "import('./app/components/templatesData.js').then(m => console.log(m.templatesData.length, m.getTemplateBySlug('portfolio')?.name))"`
Expected: prints `2 Owen Portfolio Template`

- [ ] **Step 3: Commit**

```bash
git add app/components/templatesData.js
git commit -m "feat(templates): add template line data module"
```

---

### Task 2: Templates listing page (`/templates`)

**Files:**
- Create: `app/(pages)/templates/page.jsx`

- [ ] **Step 1: Create the listing page**

Mirror `app/(pages)/projects/page.jsx` structure (NavbarDemo, blurred blobs, `max-w-7xl`, motion hero, GlassCard grid). Render a card per `templatesData` item. Each card links to `/templates/[slug]`. "coming-soon" items show a badge and are not clickable to checkout.

```jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import GlassCard from "../../components/ui/GlassCard";
import { templatesData } from "../../components/templatesData";
import { Sparkles, ArrowUpRight, Check } from "lucide-react";

const TemplateCard = ({ tpl, index }) => {
  const isAvailable = tpl.status === "available";
  const card = (
    <GlassCard className="flex flex-col h-full group">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${tpl.cover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 text-xs font-mono font-medium tracking-wider text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10 uppercase">
            {isAvailable ? tpl.priceLabel : "Coming soon"}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-white font-manrope mb-2 group-hover:text-[#b02222] transition-colors">
          {tpl.name}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-4">
          {tpl.tagline}
        </p>
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {tpl.tech.map((t, i) => (
            <span key={i} className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded-md border border-white/5 font-mono uppercase">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-white text-sm font-medium group-hover:underline decoration-[#b02222] underline-offset-4">
            {isAvailable ? "View template" : "Notify me"}
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#b02222] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </GlassCard>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <Link href={`/templates/${tpl.slug}`} className="block h-full">
        {card}
      </Link>
    </motion.div>
  );
};

const TemplatesPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          <div className="text-center max-w-4xl mx-auto space-y-6 pt-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-[#b02222]" />
                <span className="text-sm font-manrope text-white/80">Templates</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-manrope leading-tight text-white">
                Templates that don't <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-[#d38787]">
                  look like templates.
                </span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 font-manrope max-w-2xl mx-auto leading-relaxed"
            >
              Premium Next.js, Tailwind and Framer Motion templates — built by a design engineer so your site doesn't look like everyone else's.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templatesData.map((tpl, idx) => (
              <TemplateCard key={tpl.slug} tpl={tpl} index={idx} />
            ))}
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default TemplatesPage;
```

- [ ] **Step 2: Verify build + visual**

Run: `npm run build`
Expected: build succeeds, route `/templates` listed in output.
Then `npm run dev`, open `http://localhost:3000/templates`, confirm hero + 2 cards render, cards match site styling, "coming soon" card shows the badge.

- [ ] **Step 3: Commit**

```bash
git add "app/(pages)/templates/page.jsx"
git commit -m "feat(templates): add /templates listing page"
```

---

### Task 3: Reusable Buy button (Polar checkout link with graceful fallback)

**Files:**
- Create: `app/components/ui/BuyButton.jsx`

- [ ] **Step 1: Create the BuyButton component**

```jsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Bell } from "lucide-react";

/**
 * Renders the primary purchase CTA for a template.
 * - If the template has a Polar checkoutUrl, links out to Polar checkout.
 * - If not (or coming-soon), degrades to a "Notify me" contact CTA so the
 *   page is always shippable before the Polar product exists.
 */
export default function BuyButton({ tpl, className = "" }) {
  const isAvailable = tpl.status === "available";
  const hasCheckout = isAvailable && tpl.checkoutUrl && tpl.checkoutUrl.length > 0;

  const base =
    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg font-manrope transition-all duration-300";

  if (hasCheckout) {
    return (
      <motion.a
        href={tpl.checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`${base} bg-gradient-to-r from-[#b02222] to-[#d38787] text-white hover:shadow-lg hover:shadow-[#b02222]/50 ${className}`}
      >
        <ShoppingCart className="w-5 h-5" />
        Buy now — {tpl.priceLabel}
      </motion.a>
    );
  }

  // Fallback: route interested buyers to contact with the template prefilled.
  return (
    <Link href={`/contact?interest=${tpl.slug}`} className={className}>
      <motion.span
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`${base} bg-white/5 text-white border border-white/15 hover:border-[#b02222]`}
      >
        <Bell className="w-5 h-5 text-[#b02222]" />
        {isAvailable ? "Notify me when it's ready" : "Notify me on launch"}
      </motion.span>
    </Link>
  );
}
```

- [ ] **Step 2: Verify it imports cleanly (build will cover usage in Task 4)**

Run: `npm run lint`
Expected: no errors for `app/components/ui/BuyButton.jsx`.

- [ ] **Step 3: Commit**

```bash
git add app/components/ui/BuyButton.jsx
git commit -m "feat(templates): add BuyButton with Polar checkout + contact fallback"
```

---

### Task 4: Product detail page (`/templates/[slug]`)

**Files:**
- Create: `app/(pages)/templates/[slug]/page.jsx`

- [ ] **Step 1: Create the detail page**

Client component. Reads the slug from `useParams()`, looks up the product via `getTemplateBySlug`, and renders 404-style fallback if missing. Sections: hero (name, tagline, price, BuyButton, demo link), feature list, what's included, tech badges, FAQ, license note.

```jsx
"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { NavbarDemo } from "../../../components/ui/ResizableNavbar";
import FooterSection from "../../../components/FooterSection";
import GlassCard from "../../../components/ui/GlassCard";
import BuyButton from "../../../components/ui/BuyButton";
import { getTemplateBySlug } from "../../../components/templatesData";
import { Check, ExternalLink, ArrowLeft } from "lucide-react";

export default function TemplateDetailPage() {
  const params = useParams();
  const tpl = getTemplateBySlug(params.slug);

  if (!tpl) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        <NavbarDemo />
        <main className="flex-grow flex flex-col items-center justify-center gap-6 px-4 text-center">
          <h1 className="text-3xl font-bold font-manrope">Template not found</h1>
          <Link href="/templates" className="text-[#b02222] hover:text-[#d38787] inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to templates
          </Link>
        </main>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Link href="/templates" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" /> All templates
          </Link>

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <GlassCard className="p-2">
                <div className="aspect-[16/10] rounded-[18px] overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${tpl.cover})` }} />
              </GlassCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-6">
              {tpl.status !== "available" && (
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-wider text-white/70 font-mono">
                  Coming soon
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight">{tpl.name}</h1>
              <p className="text-lg text-white/60 leading-relaxed font-manrope">{tpl.description}</p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold font-manrope">{tpl.priceLabel}</span>
                {tpl.compareAtLabel && (
                  <span className="text-white/40 line-through text-xl mb-1">{tpl.compareAtLabel}</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <BuyButton tpl={tpl} />
                {tpl.demoUrl && (
                  <a href={tpl.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white border border-white/15 px-6 py-4 rounded-xl hover:border-[#b02222] transition-colors font-manrope">
                    Live demo <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className="text-white/40 text-sm">{tpl.repoNote}</p>
            </motion.div>
          </div>

          {/* Features + Includes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold font-manrope mb-6 pl-4 border-l-4 border-[#b02222]">What's inside</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tpl.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-white/70">
                    <Check className="w-5 h-5 text-[#b02222] mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <GlassCard className="p-8 h-fit">
              <h3 className="text-xl font-bold font-manrope mb-4">You get</h3>
              <ul className="space-y-3">
                {tpl.includes.map((inc, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                    <Check className="w-4 h-4 text-[#b02222] mt-0.5 flex-shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {tpl.tech.map((t, i) => (
                  <span key={i} className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded-md border border-white/5 font-mono uppercase">{t}</span>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* FAQ */}
          {tpl.faq.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold font-manrope mb-8 text-center">Questions</h2>
              <div className="space-y-4">
                {tpl.faq.map((item, i) => (
                  <GlassCard key={i} className="p-6">
                    <h3 className="font-semibold font-manrope mb-2 text-white">{item.q}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.a}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
```

- [ ] **Step 2: Verify build + visual**

Run: `npm run build`
Expected: build succeeds; `/templates/[slug]` route present.
Then in dev, open `http://localhost:3000/templates/portfolio` — hero, price `$49` with `$79` struck-through, "Notify me" fallback button (since checkoutUrl is empty), features, includes, FAQ all render. Open `http://localhost:3000/templates/nope` — "Template not found" fallback renders.

- [ ] **Step 3: Commit**

```bash
git add "app/(pages)/templates/[slug]/page.jsx"
git commit -m "feat(templates): add product detail page"
```

---

### Task 5: Purchase success page (`/templates/[slug]/success`)

**Files:**
- Create: `app/(pages)/templates/[slug]/success/page.jsx`

- [ ] **Step 1: Create the success page**

Shown after Polar checkout (Polar's product success-redirect will point here). Reassures the buyer and tells them what happens next.

```jsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { NavbarDemo } from "../../../../components/ui/ResizableNavbar";
import FooterSection from "../../../../components/FooterSection";
import GlassCard from "../../../../components/ui/GlassCard";
import { getTemplateBySlug } from "../../../../components/templatesData";
import { CheckCircle, Github, Mail, ArrowLeft } from "lucide-react";

export default function TemplateSuccessPage() {
  const params = useParams();
  const tpl = getTemplateBySlug(params.slug);
  const name = tpl ? tpl.name : "your template";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b02222] selection:text-white flex flex-col">
      <NavbarDemo />
      <main className="flex-grow pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <CheckCircle className="w-16 h-16 text-[#b02222] mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold font-manrope mb-4">Thank you for your purchase!</h1>
            <p className="text-white/60 font-manrope mb-10">
              You now own <span className="text-white font-semibold">{name}</span>. Here's what happens next.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-10">
            <GlassCard className="p-6">
              <Mail className="w-6 h-6 text-[#b02222] mb-3" />
              <h3 className="font-semibold font-manrope mb-2">Check your email</h3>
              <p className="text-white/60 text-sm">Your receipt, license key, and download link are on the way from Polar.</p>
            </GlassCard>
            <GlassCard className="p-6">
              <Github className="w-6 h-6 text-[#b02222] mb-3" />
              <h3 className="font-semibold font-manrope mb-2">GitHub access</h3>
              <p className="text-white/60 text-sm">If you provided a GitHub handle, you'll get a private repo invite. Otherwise use the zip download.</p>
            </GlassCard>
          </div>
          <Link href="/templates" className="text-[#b02222] hover:text-[#d38787] inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to templates
          </Link>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
```

- [ ] **Step 2: Verify build + visual**

Run: `npm run build`
Expected: build succeeds; `/templates/[slug]/success` route present.
Then open `http://localhost:3000/templates/portfolio/success` — checkmark, thank-you, two next-step cards, back link.

- [ ] **Step 3: Commit**

```bash
git add "app/(pages)/templates/[slug]/success/page.jsx"
git commit -m "feat(templates): add purchase success page"
```

---

### Task 6: Surface the storefront in nav + footer

**Files:**
- Modify: `app/components/FooterSection.jsx`
- Modify: `app/components/ui/ResizableNavbar.jsx` (only if it has a nav-items array)

- [ ] **Step 1: Inspect both files for an existing links array**

Read `app/components/FooterSection.jsx` and `app/components/ui/ResizableNavbar.jsx`. Find where nav/footer links are defined (look for an array of `{ name, link }` or `<Link>` lists).

- [ ] **Step 2: Add a "Templates" link**

In the footer's primary links list, add an entry pointing to `/templates` (label "Templates"). In `ResizableNavbar`, if a `navItems` array exists, add `{ name: "Templates", link: "/templates" }` in a sensible position (after "Projects"/"Work"). Match the exact object shape already used. If no array exists (hardcoded JSX), add a `<Link href="/templates">Templates</Link>` matching sibling markup.

- [ ] **Step 3: Verify build + visual**

Run: `npm run build`
Expected: success. In dev, confirm "Templates" appears in nav and/or footer and routes to `/templates`.

- [ ] **Step 4: Commit**

```bash
git add app/components/FooterSection.jsx app/components/ui/ResizableNavbar.jsx
git commit -m "feat(templates): link storefront from nav and footer"
```

---

### Task 7: Final full-build verification

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: compiles with no errors; routes `/templates`, `/templates/[slug]`, `/templates/[slug]/success` all present.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no new errors in the created files.

- [ ] **Step 3: Manual smoke pass (dev server)**

- `/templates` → hero + 2 cards, styling matches site
- `/templates/portfolio` → full detail, `$49`/`$79`, "Notify me" fallback CTA
- `/templates/portfolio/success` → confirmation
- `/templates/saas-landing` → "coming soon" treatment
- nav/footer "Templates" link works

---

## Go-Live Checklist (Owen, outside the codebase)

Once the above is merged, the storefront is live with a contact-fallback CTA. To turn on real sales:

1. Create a Polar account; add the **Owen Portfolio Template** product (price $49).
2. Configure delivery: GitHub repo benefit (private repo) + file (zip) + license key.
3. Set Polar's success redirect to `https://owendigitals.work/templates/portfolio/success`.
4. Connect payout (Stripe Connect Express → Nigerian bank).
5. Paste the Polar hosted-checkout link into `templatesData.js` → `portfolio.checkoutUrl`, and the live demo URL into `demoUrl`. Commit. Sales are now live.

## Self-Review Notes

- **Spec coverage:** Storefront routes (spec §7 unit 3) ✓; Polar checkout linkage + graceful fallback (§7 unit 4) ✓; pricing incl. intro/compare-at (§9) ✓; license/delivery copy (§9, §11) ✓; coming-soon roadmap for SaaS landing (§5) ✓. Template extraction, demo deploy, Polar account, Paystack are explicitly deferred (spec phases) and captured in the Go-Live checklist.
- **No unit tests:** intentional — repo has no test runner; verification is build/lint + visual, matching existing practice.
- **Type/name consistency:** `getTemplateBySlug`, `templatesData`, and product field names (`checkoutUrl`, `priceLabel`, `compareAtLabel`, `status`, `demoUrl`, `repoNote`, `features`, `includes`, `faq`) are used identically across Tasks 1–5.
