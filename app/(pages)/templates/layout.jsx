// Server layout providing SEO metadata for the client-rendered templates index.
export const metadata = {
  title: "Next.js Templates",
  description:
    "Premium Next.js, Tailwind CSS and Framer Motion templates built by a full stack design engineer — motion-rich, production-ready sites that don't look like templates.",
  alternates: { canonical: "/templates" },
  openGraph: {
    title: "Next.js Templates",
    description:
      "Premium Next.js, Tailwind CSS and Framer Motion templates built by a full stack design engineer — motion-rich, production-ready sites that don't look like templates.",
    url: "/templates",
    type: "website",
  },
};

export default function TemplatesLayout({ children }) {
  return children;
}
