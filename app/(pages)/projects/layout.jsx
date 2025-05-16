import { Manrope } from "next/font/google";
import "/globals.css";
import { NavbarDemo } from "/components/ui/ResizableNavbar";
import SocialSidebar from "/components/SocialSidebar";
import FooterSection from "/components/FooterSection";
import ContactSection from "/components/ContactSection";
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata = {
  title: "Owen Digitals",
  description: "My Portfolio website showcasing projects and skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NavbarDemo />
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
      <SocialSidebar />
      <ContactSection />
      <FooterSection />
    </html>
  );
}
