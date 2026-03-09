"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "../../components/ui/GlassCard";
import { Globe, Palette, Smartphone, ArrowRight, Sparkles } from "lucide-react";

const briefTypes = [
  {
    id: "website",
    title: "Website Design",
    description: "Looking to build a new website or redesign your existing one? Tell us about your vision.",
    icon: Globe,
    href: "/briefs/website",
    color: "from-blue-500 to-cyan-500",
    features: [
      "Custom website design",
      "E-commerce solutions",
      "Responsive layouts",
      "SEO optimization",
    ],
  },
  {
    id: "branding",
    title: "Branding",
    description: "Need a complete brand identity or just a refresh? Let's build a brand that stands out.",
    icon: Palette,
    href: "/briefs/branding",
    color: "from-purple-500 to-pink-500",
    features: [
      "Logo design",
      "Brand identity",
      "Brand guidelines",
      "Visual assets",
    ],
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Want to create an exceptional user experience for your app or web application? Let's talk.",
    icon: Smartphone,
    href: "/briefs/ui-ux",
    color: "from-orange-500 to-red-500",
    features: [
      "User interface design",
      "User experience research",
      "Wireframes & prototypes",
      "Design systems",
    ],
  },
];

export default function BriefsPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#b02222]/10 rounded-full text-[#b02222] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Project Briefs
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Start Your Project
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Every great project starts with a clear brief. Choose the type of project 
            you&apos;re working on, and let&apos;s bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {briefTypes.map((brief, index) => (
            <motion.div
              key={brief.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(brief.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link href={brief.href}>
                <GlassCard 
                  className={`h-full p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                    hoveredCard === brief.id ? "border-[#b02222]/50" : ""
                  }`}
                >
                  <div className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${brief.color} mb-6`}>
                    <brief.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {brief.title}
                  </h2>
                  <p className="text-white/60 mb-6">
                    {brief.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {brief.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-white/50 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#b02222]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className={`flex items-center gap-2 text-white font-medium group ${
                    hoveredCard === brief.id ? "text-[#b02222]" : ""
                  }`}>
                    Get Started
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                      hoveredCard === brief.id ? "translate-x-1" : ""
                    }`} />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 text-sm">
            Not sure which one fits?{" "}
            <Link href="/contact" className="text-[#b02222] hover:underline">
              Contact us
            </Link>{" "}
            and we&apos;ll help you figure it out.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
