import BriefForm from "../../../components/BriefForm";
import { Palette, ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export const metadata = {
  title: "Branding Brief | Owen Digitals",
  description: "Tell us about your branding project. Help us understand your brand identity and vision.",
};

export default function BrandingBriefPage() {
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
            <Palette className="w-10 h-10 text-[#b02222]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Build a Brand That{" "}
            <span className="text-[#b02222]">Commands Attention</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg mb-8">
            Your brand is your competitive edge. Let's create a memorable identity
            that resonates with your audience and elevates your business above the noise.
          </p>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#b02222]" />
                <h3 className="text-white font-semibold">Memorable Identity</h3>
              </div>
              <p className="text-white/60 text-sm">
                Distinctive visuals that stick in people's minds
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-[#b02222]" />
                <h3 className="text-white font-semibold">Strategic Positioning</h3>
              </div>
              <p className="text-white/60 text-sm">
                Brand strategy that differentiates you from competitors
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <ArrowRight className="w-5 h-5 text-[#b02222]" />
                <h3 className="text-white font-semibold">Consistent Presence</h3>
              </div>
              <p className="text-white/60 text-sm">
                Cohesive branding across all touchpoints
              </p>
            </div>
          </div>

          <p className="text-white/50 text-sm">
            Share your vision and let's create something extraordinary. I'll get back to you within 24-48 hours.
          </p>
        </div>

        <BriefForm
          type="branding"
          title="Branding Brief"
          description="Tell us about your branding project"
        />
      </div>
    </main>
  );
}
