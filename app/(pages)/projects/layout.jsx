
import { Manrope } from "next/font/google";
import "../../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata = {
  title: "Projects",
  description:
    "A curated portfolio of UI/UX case studies, brand identity work, and full-stack builds — from healthcare branding and streetwear to DeFi trading dashboards.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Owen Digitals",
    description:
      "A curated portfolio of UI/UX case studies, brand identity work, and full-stack builds — from healthcare branding and streetwear to DeFi trading dashboards.",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsLayout({ children }) {
  return (
    <div className={`${manrope.variable} font-manrope`}>
       {children}
    </div>
  );
}
