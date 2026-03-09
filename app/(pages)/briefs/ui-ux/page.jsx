import BriefForm from "../../../components/BriefForm";
import { Smartphone } from "lucide-react";

export const metadata = {
  title: "UI/UX Design Brief | Owen Digitals",
  description: "Tell us about your UI/UX project. Help us create exceptional user experiences.",
};

export default function UIBriefPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-[#b02222]/10 rounded-2xl mb-6">
            <Smartphone className="w-10 h-10 text-[#b02222]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            UI/UX Design Brief
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Great user experiences don&apos;t happen by accident. Tell us about your product, 
            and we&apos;ll design an intuitive experience your users will love.
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
