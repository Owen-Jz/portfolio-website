
import { Manrope } from "next/font/google";
import "../../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata = {
  title: "Owen Digitals - Projects",
  description:
    "Explore a curated list of my designs and development projects.",
};

export default function ProjectsLayout({ children }) {
  return (
    <div className={`${manrope.variable} font-manrope`}>
       {children}
    </div>
  );
}
