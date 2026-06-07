// Static server metadata for the /links bio page. Lives in a server component
// (the page itself is "use client") so social crawlers — which don't run JS —
// get a proper title, description, and preview image when this link is shared
// from an Instagram or X bio.
const SITE_URL = "https://www.owendigitals.work";

export const metadata = {
  title: "Owen Digitals — All My Links",
  description:
    "Everything Owen in one place: portfolio, blog, the AI builders community, and Flogsboard — the app in the works.",
  alternates: { canonical: "/links" },
  openGraph: {
    title: "Owen Digitals — All My Links",
    description:
      "Portfolio, blog, AI community, and Flogsboard — every way to connect with Owen Digitals.",
    url: `${SITE_URL}/links`,
    siteName: "Owen Digitals",
    type: "profile",
    locale: "en_US",
    images: [{ url: "/profile.jpg", alt: "Owen Digitals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Owen Digitals — All My Links",
    description:
      "Portfolio, blog, AI community, and Flogsboard — every way to connect with Owen Digitals.",
    images: ["/profile.jpg"],
  },
};

export default function LinksLayout({ children }) {
  return children;
}
