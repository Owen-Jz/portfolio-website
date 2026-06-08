"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { NavbarDemo } from "../../../components/ui/ResizableNavbar";
import FooterSection from "../../../components/FooterSection";
import GlassCard from "../../../components/ui/GlassCard";
import BuyButton from "../../../components/ui/BuyButton";
import { getTemplateBySlug } from "../../../components/templatesData";
import { Check, ExternalLink, ArrowLeft } from "lucide-react";

export default function TemplateDetailPage() {
  const params = useParams();
  const tpl = getTemplateBySlug(params.slug);

  if (!tpl) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        <NavbarDemo />
        <main className="flex-grow flex flex-col items-center justify-center gap-6 px-4 text-center pt-32 pb-20">
          <h1 className="text-3xl font-bold font-manrope">Template not found</h1>
          <Link
            href="/templates"
            className="text-[#b02222] hover:text-[#d38787] inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to templates
          </Link>
        </main>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> All templates
          </Link>

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-2">
                <div
                  className="aspect-[16/10] rounded-[18px] overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url(${tpl.cover})` }}
                />
              </GlassCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {tpl.status !== "available" && (
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-wider text-white/70 font-mono">
                  Coming soon
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold font-manrope leading-tight">
                {tpl.name}
              </h1>
              <p className="text-lg text-white/60 leading-relaxed font-manrope">
                {tpl.description}
              </p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold font-manrope">
                  {tpl.priceLabel}
                </span>
                {tpl.compareAtLabel && (
                  <span className="text-white/40 line-through text-xl mb-1">
                    {tpl.compareAtLabel}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <BuyButton tpl={tpl} />
                {tpl.demoUrl && (
                  <a
                    href={tpl.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white border border-white/15 px-6 py-4 rounded-xl hover:border-[#b02222] transition-colors font-manrope"
                  >
                    Live demo <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className="text-white/40 text-sm">{tpl.repoNote}</p>
            </motion.div>
          </div>

          {/* Features + Includes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold font-manrope mb-6 pl-4 border-l-4 border-[#b02222]">
                What&apos;s inside
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tpl.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-white/70">
                    <Check className="w-5 h-5 text-[#b02222] mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <GlassCard className="p-8 h-fit">
              <h3 className="text-xl font-bold font-manrope mb-4">You get</h3>
              <ul className="space-y-3">
                {tpl.includes.map((inc, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-white/70 text-sm"
                  >
                    <Check className="w-4 h-4 text-[#b02222] mt-0.5 flex-shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {tpl.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded-md border border-white/5 font-mono uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* FAQ */}
          {tpl.faq.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold font-manrope mb-8 text-center">
                Questions
              </h2>
              <div className="space-y-4">
                {tpl.faq.map((item, i) => (
                  <GlassCard key={i} className="p-6">
                    <h3 className="font-semibold font-manrope mb-2 text-white">
                      {item.q}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
