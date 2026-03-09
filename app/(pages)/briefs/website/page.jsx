import BriefForm from "../../../components/BriefForm";
import { Globe } from "lucide-react";

export const metadata = {
  title: "Website Design Brief | Owen Digitals",
  description: "Tell us about your website project. Help us understand your goals, audience, and design preferences.",
};

export default function WebsiteBriefPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-[#b02222]/10 rounded-2xl mb-6">
            <Globe className="w-10 h-10 text-[#b02222]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Website Design Brief
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Every great website starts with a clear vision. Tell us about your project, 
            and we&apos;ll craft a website that reflects your brand and delivers results.
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
