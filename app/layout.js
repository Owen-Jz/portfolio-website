import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  icons: {
    icon: "/icon.svg",
  },
  robots: "index, follow",
  themeColor: "#0a0a0a",
  metadataBase: new URL("https://www.owendigitals.work"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Owen Digitals | Portfolio",
    description:
      "UI/UX design and development by Owen. Explore projects that I've worked on.",
    url: "https://www.owendigitals.work",
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
      <body className={manrope.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
