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
  // Optimized for SEO (approx. 150 chars)
  description:
    "Expert UI/UX design, full-stack Next.js development, and digital branding solutions by Owen. Crafting high-performance, user-centric web experiences.",
  // Icons are automatically handled by app/icon.svg
  openGraph: {
    title: "Owen Digitals | Portfolio",
    // Optimized to encourage clicks on social media
    description:
      "View the portfolio of Owen Digitals. Specializing in scalable web applications, modern interface design, and distinctive brand identities.",
    url: "https://www.owendigitals.work",
    siteName: "Owen Digitals",
    type: "website",
    locale: "en_US", // Good practice to add
  },
  twitter: {
    card: "summary_large_image",
    title: "Owen Digitals | Portfolio",
    description:
      "View the portfolio of Owen Digitals. Specializing in scalable web applications, modern interface design, and distinctive brand identities.",
    creator: "@yourtwitterhandle", // Optional: Add your handle if you have one
  },
  robots: "index, follow",
  metadataBase: new URL("https://www.owendigitals.work"),
  alternates: {
    canonical: "/",
  },
};

/* Note: In Next.js 14+, 'themeColor' and 'viewport' are strictly 
   moved to the distinct 'viewport' export object, though metadata
   will still work in some versions. 
*/
export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Viewport is now handled by the export above, keeping head clean */}
      <body className={manrope.className}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}