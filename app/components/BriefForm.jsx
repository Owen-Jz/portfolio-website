"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import { Loader2, CheckCircle } from "lucide-react";

const briefFields = {
  website: [
    {
      section: "Basic Information",
      fields: [
        { name: "fullName", label: "Full Name *", type: "text", required: true },
        { name: "email", label: "Email Address *", type: "email", required: true },
        { name: "phone", label: "Phone Number *", type: "tel", required: true },
        { name: "companyName", label: "Company/Brand Name *", type: "text", required: true },
        { name: "projectName", label: "Project Name", type: "text" },
      ],
    },
    {
      section: "About Your Business",
      fields: [
        {
          name: "businessDescription",
          label: "Briefly describe your business *",
          type: "textarea",
          required: true,
          placeholder: "What does your business do? Who are your competitors?",
        },
        {
          name: "projectPurpose",
          label: "What is the main purpose of your website? *",
          type: "select",
          required: true,
          options: [
            "Select an option",
            "Showcase brand",
            "Sell products (E-commerce)",
            "Generate leads",
            "Provide information",
            "Other",
          ],
        },
        {
          name: "targetAudience",
          label: "Who is your target audience? *",
          type: "textarea",
          required: true,
          placeholder: "Age, gender, location, interests...",
        },
      ],
    },
    {
      section: "Design Preferences",
      fields: [
        {
          name: "style",
          label: "What overall style do you prefer? *",
          type: "select",
          required: true,
          options: [
            "Select an option",
            "Modern & Minimal",
            "Bold & Colorful",
            "Corporate & Professional",
            "Creative & Playful",
            "Other",
          ],
        },
        {
          name: "websitesLiked",
          label: "List 2-3 websites you like and why *",
          type: "textarea",
          required: true,
          placeholder: "https://example.com - I like their clean design...",
        },
        {
          name: "existingAssets",
          label: "Do you have existing brand colors, logo, or fonts?",
          type: "textarea",
          placeholder: "If yes, please specify (hex codes, font names, etc.)",
        },
        {
          name: "brandGuidelines",
          label: "Do you have brand guidelines we should follow?",
          type: "textarea",
          placeholder: "If not, share any assets you have (logo files, brand colors, typography, imagery style...)",
        },
        {
          name: "creativeFreedom",
          label: "How much creative freedom would you like to give us? *",
          type: "select",
          required: true,
          options: [
            "Select an option",
            "Strict - Follow my guidelines exactly",
            "2",
            "3",
            "4",
            "Feel Free - Be creative!",
          ],
        },
        {
          name: "brandPerception",
          label: "How do you want your brand to be perceived online? *",
          type: "textarea",
          required: true,
          placeholder: "Professional, trustworthy, innovative, playful...",
        },
        {
          name: "animations",
          label: "What kind of interactions/animations do you want?",
          type: "select",
          options: [
            "Select an option",
            "Subtle (fade-ins, hover effects)",
            "Bold (scroll effects, parallax, video backgrounds)",
            "Minimal (clean, almost no animation)",
            "Not sure yet",
          ],
        },
        {
          name: "voicePersonality",
          label: "If your website had a 'voice' or 'personality', how would it sound?",
          type: "select",
          options: [
            "Select an option",
            "Formal & professional",
            "Friendly & casual",
            "Inspirational & motivational",
            "Playful & fun",
            "Other",
          ],
        },
      ],
    },
    {
      section: "Technical Details",
      fields: [
        {
          name: "pagesNeeded",
          label: "What main pages do you need? *",
          type: "textarea",
          required: true,
          placeholder: "Home, About, Services, Contact, Blog...",
        },
        {
          name: "contentReady",
          label: "Do you already have website copy (text) prepared? *",
          type: "select",
          required: true,
          options: [
            "Select an option",
            "Yes",
            "No",
            "Need help",
          ],
        },
        {
          name: "mediaReady",
          label: "Do you have images/photos/videos ready? *",
          type: "select",
          required: true,
          options: [
            "Select an option",
            "Yes",
            "No",
            "Need help",
          ],
        },
        {
          name: "features",
          label: "What features are important to you?",
          type: "textarea",
          placeholder: "Contact form, Online store, Blog, Booking system, Payment integration, Newsletter...",
        },
        {
          name: "domainOwned",
          label: "Do you already own a domain name?",
          type: "select",
          options: ["Yes", "No"],
        },
        {
          name: "domainDetails",
          label: "If Yes, write it",
          type: "text",
          placeholder: "example.com",
        },
      ],
    },
    {
      section: "Project Timeline & Budget",
      fields: [
        {
          name: "timeline",
          label: "What is your estimated timeline? *",
          type: "text",
          required: true,
          placeholder: "e.g., 2 weeks, 1 month, ASAP...",
        },
        {
          name: "budget",
          label: "What is your budget range? *",
          type: "select-with-custom",
          required: true,
          options: [
            "Select an option",
            "Under $1,000",
            "$1,000 - $3,000",
            "$3,000 - $5,000",
            "$5,000 - $10,000",
            "$10,000+",
            "Let's discuss",
            "Other",
          ],
        },
        {
          name: "additionalNotes",
          label: "Any additional notes or questions?",
          type: "textarea",
          placeholder: "Anything else you'd like us to know...",
        },
      ],
    },
  ],
  branding: [
    {
      section: "Basic Information",
      fields: [
        { name: "fullName", label: "Full Name *", type: "text", required: true },
        { name: "email", label: "Email Address *", type: "email", required: true },
        { name: "phone", label: "Phone Number *", type: "tel", required: true },
        { name: "companyName", label: "Company/Brand Name *", type: "text", required: true },
        { name: "projectName", label: "Project Name", type: "text" },
      ],
    },
    {
      section: "About Your Business",
      fields: [
        {
          name: "businessDescription",
          label: "Briefly describe your business *",
          type: "textarea",
          required: true,
          placeholder: "What does your business do? Who are your target customers?",
        },
        {
          name: "targetAudience",
          label: "Who is your target audience? *",
          type: "textarea",
          required: true,
          placeholder: "Age, gender, location, interests, pain points...",
        },
        {
          name: "projectPurpose",
          label: "What are your branding goals? *",
          type: "textarea",
          required: true,
          placeholder: "New brand identity, rebrand, brand refresh...",
        },
      ],
    },
    {
      section: "Brand Identity",
      fields: [
        {
          name: "style",
          label: "What style best represents your brand? *",
          type: "select",
          required: true,
          options: [
            "Select an option",
            "Modern & Minimal",
            "Bold & Colorful",
            "Corporate & Professional",
            "Creative & Playful",
            "Luxury & Premium",
            "Vintage & Retro",
            "Other",
          ],
        },
        {
          name: "brandPerception",
          label: "How do you want your brand to be perceived? *",
          type: "textarea",
          required: true,
          placeholder: "Trustworthy, innovative, fun, premium, approachable...",
        },
        {
          name: "voicePersonality",
          label: "If your brand was a person, what would they be like?",
          type: "textarea",
          placeholder: "Young professional, wise mentor, friendly helper...",
        },
        {
          name: "existingAssets",
          label: "What brand assets do you currently have?",
          type: "textarea",
          placeholder: "Logo, colors, fonts, business cards, social media profiles...",
        },
        {
          name: "brandGuidelines",
          label: "Do you have existing brand guidelines?",
          type: "textarea",
          placeholder: "If yes, please share or describe them",
        },
      ],
    },
    {
      section: "Brand Elements Needed",
      fields: [
        {
          name: "features",
          label: "What brand elements do you need? *",
          type: "textarea",
          required: true,
          placeholder: "Logo, color palette, typography, brand guidelines, business cards, letterhead, social media templates...",
        },
        {
          name: "websitesLiked",
          label: "List 2-3 brands/logos you admire and why *",
          type: "textarea",
          required: true,
          placeholder: "Brand name - Why you like them...",
        },
      ],
    },
    {
      section: "Project Timeline & Budget",
      fields: [
        {
          name: "timeline",
          label: "What is your estimated timeline? *",
          type: "text",
          required: true,
          placeholder: "e.g., 2 weeks, 1 month, ASAP...",
        },
        {
          name: "budget",
          label: "What is your budget range? *",
          type: "select-with-custom",
          required: true,
          options: [
            "Select an option",
            "Under $1,000",
            "$1,000 - $3,000",
            "$3,000 - $5,000",
            "$5,000 - $10,000",
            "$10,000+",
            "Let's discuss",
            "Other",
          ],
        },
        {
          name: "additionalNotes",
          label: "Any additional notes or questions?",
          type: "textarea",
          placeholder: "Anything else you'd like us to know...",
        },
      ],
    },
  ],
  "ui-ux": [
    {
      section: "Basic Information",
      fields: [
        { name: "fullName", label: "Full Name *", type: "text", required: true },
        { name: "email", label: "Email Address *", type: "email", required: true },
        { name: "phone", label: "Phone Number *", type: "tel", required: true },
        { name: "companyName", label: "Company/Brand Name *", type: "text", required: true },
        { name: "projectName", label: "Project/App Name", type: "text" },
      ],
    },
    {
      section: "About Your Product",
      fields: [
        {
          name: "businessDescription",
          label: "Describe your product or application *",
          type: "textarea",
          required: true,
          placeholder: "What does your app do? What problem does it solve?",
        },
        {
          name: "projectPurpose",
          label: "What is the main goal of this UI/UX project? *",
          type: "textarea",
          required: true,
          placeholder: "New design, redesign existing app, create design system...",
        },
        {
          name: "targetAudience",
          label: "Who are your target users? *",
          type: "textarea",
          required: true,
          placeholder: "Age, profession, tech-savviness, pain points...",
        },
      ],
    },
    {
      section: "Design Requirements",
      fields: [
        {
          name: "style",
          label: "What design style do you prefer? *",
          type: "select",
          required: true,
          options: [
            "Select an option",
            "Modern & Minimal",
            "Bold & Colorful",
            "Corporate & Professional",
            "Creative & Playful",
            "Dark Mode Focus",
            "Other",
          ],
        },
        {
          name: "websitesLiked",
          label: "List apps/websites you like and why *",
          type: "textarea",
          required: true,
          placeholder: "App name - What you like about their UX...",
        },
        {
          name: "existingAssets",
          label: "Do you have existing brand guidelines or style preferences?",
          type: "textarea",
          placeholder: "Brand colors, fonts, previous designs...",
        },
        {
          name: "brandPerception",
          label: "How should users feel when using your product? *",
          type: "textarea",
          required: true,
          placeholder: "Confident, relaxed, excited, focused...",
        },
      ],
    },
    {
      section: "Features & Functionality",
      fields: [
        {
          name: "pagesNeeded",
          label: "What are the main screens/pages needed? *",
          type: "textarea",
          required: true,
          placeholder: "Login, Dashboard, Profile, Settings, Home...",
        },
        {
          name: "features",
          label: "Key features to design *",
          type: "textarea",
          required: true,
          placeholder: "User onboarding, payment flow, notifications, search...",
        },
        {
          name: "contentReady",
          label: "Do you have content/copy ready? *",
          type: "select",
          required: true,
          options: [
            "Select an option",
            "Yes",
            "No",
            "Need help",
          ],
        },
        {
          name: "mediaReady",
          label: "Do you have images/icons ready? *",
          type: "select",
          required: true,
          options: [
            "Select an option",
            "Yes",
            "No",
            "Need help",
          ],
        },
        {
          name: "animations",
          label: "What level of interactions/animations?",
          type: "select",
          options: [
            "Select an option",
            "Minimal - Clean transitions",
            "Moderate - Hover states, micro-interactions",
            "Bold - Complex animations, parallax, loading states",
          ],
        },
      ],
    },
    {
      section: "Technical & Deliverables",
      fields: [
        {
          name: "creativeFreedom",
          label: "How much creative freedom?",
          type: "select",
          options: [
            "Strict - Follow guidelines exactly",
            "2",
            "3",
            "4",
            "Feel Free - Be creative!",
          ],
        },
        {
          name: "domainOwned",
          label: "Is this for web, mobile, or both?",
          type: "select",
          options: ["Web Application", "Mobile App (iOS)", "Mobile App (Android)", "Both Web & Mobile", "Not sure yet"],
        },
        {
          name: "brandGuidelines",
          label: "Any technical requirements or constraints?",
          type: "textarea",
          placeholder: "Responsive, accessibility requirements, existing tech stack...",
        },
      ],
    },
    {
      section: "Project Timeline & Budget",
      fields: [
        {
          name: "timeline",
          label: "What is your estimated timeline? *",
          type: "text",
          required: true,
          placeholder: "e.g., 2 weeks, 1 month, ASAP...",
        },
        {
          name: "budget",
          label: "What is your budget range? *",
          type: "select-with-custom",
          required: true,
          options: [
            "Select an option",
            "Under $2,000",
            "$2,000 - $5,000",
            "$5,000 - $10,000",
            "$10,000 - $25,000",
            "$25,000+",
            "Let's discuss",
            "Other",
          ],
        },
        {
          name: "additionalNotes",
          label: "Any additional notes or questions?",
          type: "textarea",
          placeholder: "Anything else you'd like us to know...",
        },
      ],
    },
  ],
};

function BriefForm({ type, title, description, icon: Icon }) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fields = briefFields[type] || briefFields.website;

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const dataToSubmit = { ...formData, type };
      
      if (dataToSubmit.budget === "Other" && dataToSubmit.budgetCustom) {
        dataToSubmit.budget = dataToSubmit.budgetCustom;
        delete dataToSubmit.budgetCustom;
      }

      const response = await fetch("/api/briefs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to submit brief");
      }

      setIsSuccess(true);
      setFormData({});
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          Your brief has been submitted successfully. I'll review it and get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-3 bg-[#b02222] text-white rounded-xl hover:bg-[#991d1d] transition-colors"
        >
          Submit Another Brief
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {fields.map((section, sectionIndex) => (
        <motion.div
          key={section.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
            {section.section}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.fields.map((field) => (
              <div
                key={field.name}
                className={field.type === "textarea" ? "md:col-span-2" : ""}
              >
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {field.label}
                  {field.required && <span className="text-[#b02222] ml-1">*</span>}
                </label>
                {field.type === "select" ? (
                  <select
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222] transition-all"
                  >
                    <option value="" className="bg-gray-800">Select an option</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt} className="bg-gray-800">
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "select-with-custom" ? (
                  <>
                    <select
                      value={formData[field.name] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleChange(field.name, value);
                        if (value !== "Other") {
                          handleChange(`${field.name}Custom`, "");
                        }
                      }}
                      required={field.required && !formData[`${field.name}Custom`]}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222] transition-all"
                    >
                      <option value="" className="bg-gray-800">Select an option</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt} className="bg-gray-800">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {formData[field.name] === "Other" && (
                      <input
                        type="text"
                        value={formData[`${field.name}Custom`] || ""}
                        onChange={(e) => handleChange(`${field.name}Custom`, e.target.value)}
                        required={field.required}
                        placeholder="Enter your budget range"
                        className="w-full px-4 py-3 mt-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222] transition-all"
                      />
                    )}
                  </>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222] transition-all resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222] transition-all"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {error && (
        <p className="text-red-400 text-center bg-red-400/10 py-3 rounded-lg">{error}</p>
      )}

      <div className="text-center pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-10 py-4 bg-[#b02222] text-white font-semibold rounded-xl hover:bg-[#991d1d] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Brief"
          )}
        </button>
      </div>
    </form>
  );
}

export default BriefForm;
