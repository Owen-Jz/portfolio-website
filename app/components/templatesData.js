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
