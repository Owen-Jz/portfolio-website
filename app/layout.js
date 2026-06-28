import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const SITE_URL = "https://www.owendigitals.work";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Owen Digitals | Full Stack Design Engineer",
    // Child routes set short titles ("About", "Pricing") and get the brand
    // suffix appended automatically.
    template: "%s | Owen Digitals",
  },
  description:
    "Expert UI/UX design, full-stack Next.js development, and digital branding solutions by Owen. Crafting high-performance, user-centric web experiences.",
  // Icons are automatically handled by app/icon.svg
  openGraph: {
    title: "Owen Digitals | Full Stack Design Engineer",
    description:
      "View the portfolio of Owen Digitals. Specializing in scalable web applications, modern interface design, and distinctive brand identities.",
    url: SITE_URL,
    siteName: "Owen Digitals",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/new_workspace.jpeg",
        width: 1220,
        height: 1280,
        alt: "Owen Digitals — design & development workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Owen Digitals | Full Stack Design Engineer",
    description:
      "View the portfolio of Owen Digitals. Specializing in scalable web applications, modern interface design, and distinctive brand identities.",
    images: ["/new_workspace.jpeg"],
  },
  robots: "index, follow",
  // The homepage is a client component, so its canonical has to live here.
  // This cascades to child routes — every public route MUST override it with
  // its own alternates.canonical (all current ones do; keep it that way when
  // adding pages).
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

// Sitewide structured data: who Owen is and what this site is. Article and
// Product schema live with the blog post and template layouts respectively.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Owen Digitals",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Owen",
      url: SITE_URL,
      jobTitle: "Full Stack Design Engineer",
      description:
        "Full Stack Design Engineer specializing in UI/UX design, Next.js development, and digital branding.",
      knowsAbout: [
        "UI/UX Design",
        "Next.js Development",
        "Full Stack Development",
        "Brand Identity Design",
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
