import { Metadata } from "next";

export const metadata = {
  title: "Mariko — Luxury Fashion Brand Identity | Owen Digitals",
  description:
    "A complete luxury fashion brand identity and e-commerce storefront for Mariko, a San Francisco entrepreneur. Designed to convert her Instagram audience into paying customers.",
  openGraph: {
    title: "Mariko — Luxury Fashion Brand Identity | Owen Digitals",
    description:
      "A complete luxury fashion brand identity and e-commerce storefront for Mariko, a San Francisco entrepreneur. A Cresio Labs project.",
    url: "https://www.owendigitals.work/projects/mariko-case-study",
    siteName: "Owen Digitals",
    type: "article",
    locale: "en_US",
    images: [
      {
        url: "/projects/mariko-case-study/cover.png",
        width: 1200,
        height: 630,
        alt: "Mariko luxury fashion brand identity and e-commerce storefront preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mariko — Luxury Fashion Brand Identity | Owen Digitals",
    description:
      "A complete luxury fashion brand identity and e-commerce storefront for Mariko, a San Francisco entrepreneur.",
    images: ["/projects/mariko-case-study/cover.png"],
  },
  alternates: {
    canonical: "/projects/mariko-case-study",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Mariko Luxury Fashion Brand Identity",
  description:
    "Complete luxury fashion brand identity and e-commerce storefront for Mariko, a San Francisco-based entrepreneur. The project delivered logo mark, color palette, typography system, and a Shopify-powered storefront to convert Instagram audience into paying customers.",
  author: {
    "@type": "Person",
    name: "Owen",
    url: "https://www.owendigitals.work",
  },
  datePublished: "2026-06",
  keywords:
    "Brand Identity, E-Commerce, Luxury Fashion, Logo Design, Typography, Color Palette, Shopify, Cresio Labs",
  url: "https://www.owendigitals.work/projects/mariko-case-study",
  image: "https://www.owendigitals.work/projects/mariko-case-study/cover.png",
  publisher: {
    "@type": "Organization",
    name: "Owen Digitals",
    url: "https://www.owendigitals.work",
  },
};

export default function MarikoCaseStudyLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
