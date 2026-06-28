import BriefForm from "../../../components/BriefForm";
import { Smartphone, ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export const metadata = {
  title: "UI/UX Design Brief",
  description: "Tell us about your UI/UX project. Help us create exceptional user experiences.",
  alternates: { canonical: "/briefs/ui-ux" },
};

export default function UIBriefPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/Logo.svg"
              alt="Owen Digitals"
              width={40}
              height={40}
              className="transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold text-white group-hover:text-[#b02222] transition-colors">
              Owen Digitals
            </span>
          </a>
        </div>

        {/* Hero Section with Marketing Content */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-[#b02222]/10 rounded-2xl mb-6">
            <Smartphone className="w-10 h-10 text-[#b02222]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Design Experiences That{" "}
            <span className="text-[#b02222]">Delight Users</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg mb-8">
            Every swipe, tap, and click shapes your user's perception of your product.
            Let's craft an experience that's intuitive, beautiful, and drives results.
          </p>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#b02222]" />
                <h3 className="text-white font-semibold">User-Centered</h3>
              </div>
              <p className="text-white/60 text-sm">
                Designs built around real user needs and behaviors
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-[#b02222]" />
                <h3 className="text-white font-semibold">Intuitive Flow</h3>
              </div>
              <p className="text-white/60 text-sm">
                Seamless journeys that guide users to their goals
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <ArrowRight className="w-5 h-5 text-[#b02222]" />
                <h3 className="text-white font-semibold">Conversion Optimized</h3>
              </div>
              <p className="text-white/60 text-sm">
                Every interaction designed to drive measurable results
              </p>
            </div>
          </div>

          <p className="text-white/50 text-sm">
            Tell us about your product and let's create something users will love. I'll get back to you within 24-48 hours.
          </p>
        </div>

        <BriefForm
          type="ui-ux"
          title="UI/UX Design Brief"
          description="Tell us about your UI/UX project"
        />
      </div>
    </main>
  );
}
