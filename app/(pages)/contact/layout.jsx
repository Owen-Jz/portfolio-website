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
  title: "Contact - Owen Digitals",
  description: "Get in touch with Owen Digitals for your next project",
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
