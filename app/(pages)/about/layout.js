import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata = {
  title: "Owen Digitals - About",
  description:
    "Modern UI/UX, full-stack Next.js development, and digital branding — all in one portfolio by Owen.",
  robots: "index, follow",
  metadataBase: new URL("https://www.owendigitals.work/about"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Owen Digitals - About",
    description:
      "UI/UX design and development by Owen. Explore projects that I've worked on.",
    url: "https://www.owendigitals.work/about",
    siteName: "Owen Digitals",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
