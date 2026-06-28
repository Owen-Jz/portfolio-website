import BriefForm from "../../../components/BriefForm";
import { Globe, ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export const metadata = {
  title: "Website Design Brief",
  description: "Tell us about your website project. Help us understand your goals, audience, and design preferences.",
  alternates: { canonical: "/briefs/website" },
};

export default function WebsiteBriefPage() {
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
            <Globe className="w-10 h-10 text-[#b02222]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Build Something{" "}
            <span className="text-[#b02222]">Extraordinary</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg mb-8">
            Your website isn't just a digital presence—it's your 24/7 sales rep,
            brand ambassador, and the first impression that converts visitors into loyal customers.
          </p>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#b02222]" />
                <h3 className="text-white font-semibold">Conversion-Focused</h3>
              </div>
              <p className="text-white/60 text-sm">
                Every pixel optimized to turn visitors into customers
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-[#b02222]" />
                <h3 className="text-white font-semibold">ROI-Driven</h3>
              </div>
              <p className="text-white/60 text-sm">
                Designs that pay for themselves through increased revenue
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <ArrowRight className="w-5 h-5 text-[#b02222]" />
                <h3 className="text-white font-semibold">Growth-Ready</h3>
              </div>
              <p className="text-white/60 text-sm">
                Scalable architecture that grows with your business
              </p>
            </div>
          </div>

          <p className="text-white/50 text-sm">
            Fill out this brief and let's bring your vision to life. I'll get back to you within 24-48 hours.
          </p>
        </div>

        <BriefForm
          type="website"
          title="Website Design Brief"
          description="Tell us about your website project"
        />
      </div>
    </main>
  );
}
