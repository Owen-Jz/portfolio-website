import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata = {
  title: "Owen Digitals | Portfolio",
  description:
    "Modern UI/UX, full-stack Next.js development, and digital branding — all in one portfolio by Owen.",
  // Icons are automatically handled by app/icon.svg
  openGraph: {
    title: "Owen Digitals | Portfolio",
    description:
      "UI/UX design and development by Owen. Explore projects that I've worked on.",
    url: "https://www.owendigitals.work",
    siteName: "Owen Digitals",
    type: "website",
    images: [
      {
        url: "/Logo.svg",
        width: 800,
        height: 600,
        alt: "Owen Digitals Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Owen Digitals | Portfolio",
    description:
      "Modern UI/UX, full-stack Next.js development, and digital branding — all in one portfolio by Owen.",
    images: ["/Logo.svg"],
  },
  robots: "index, follow",
  themeColor: "#0a0a0a",
  metadataBase: new URL("https://www.owendigitals.work"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={manrope.className}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
