import BriefForm from "../../../components/BriefForm";
import { Palette } from "lucide-react";

export const metadata = {
  title: "Branding Brief | Owen Digitals",
  description: "Tell us about your branding project. Help us understand your brand identity and vision.",
};

export default function BrandingBriefPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-[#b02222]/10 rounded-2xl mb-6">
            <Palette className="w-10 h-10 text-[#b02222]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Branding Brief
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Your brand is more than a logo. Tell us about your vision, and we&apos;ll create 
            a powerful brand identity that sets you apart from the competition.
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
