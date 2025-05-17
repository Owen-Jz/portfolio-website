import { Manrope } from "next/font/google";
import "../../globals.css";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import SocialSidebar from "../../components/SocialSidebar";
import FooterSection from "../../components/FooterSection";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata = {
  title: "Owen Digitals - Contact",
  description:
    "Modern UI/UX, full-stack Next.js development, and digital branding — all in one portfolio by Owen.",
  robots: "index, follow",
  metadataBase: new URL("https://www.owendigitals.work/contact"),
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Owen Digitals - Contact",
    description:
      "UI/UX design and development by Owen. Explore projects that I've worked on.",
    url: "https://www.owendigitals.work/contact",
    siteName: "Owen Digitals",
    type: "website",
  },
};
export default function ContactLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-manrope">
        <NavbarDemo />
        {children}
        <SocialSidebar />
        <FooterSection />
      </body>
    </html>
  );
}
