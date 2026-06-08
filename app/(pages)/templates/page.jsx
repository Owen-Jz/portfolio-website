"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import GlassCard from "../../components/ui/GlassCard";
import { templatesData } from "../../components/templatesData";
import { Sparkles, ArrowUpRight } from "lucide-react";

const TemplateCard = ({ tpl, index }) => {
  const isAvailable = tpl.status === "available";
  const card = (
    <GlassCard className="flex flex-col h-full group">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${tpl.cover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 text-xs font-mono font-medium tracking-wider text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10 uppercase">
            {isAvailable ? tpl.priceLabel : "Coming soon"}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-white font-manrope mb-2 group-hover:text-[#b02222] transition-colors">
          {tpl.name}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-4">
          {tpl.tagline}
        </p>
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {tpl.tech.map((t, i) => (
            <span
              key={i}
              className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded-md border border-white/5 font-mono uppercase"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-white text-sm font-medium group-hover:underline decoration-[#b02222] underline-offset-4">
            {isAvailable ? "View template" : "Notify me"}
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#b02222] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </GlassCard>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <Link href={`/templates/${tpl.slug}`} className="block h-full">
        {card}
      </Link>
    </motion.div>
  );
};

const TemplatesPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          <div className="text-center max-w-4xl mx-auto space-y-6 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-[#b02222]" />
                <span className="text-sm font-manrope text-white/80">Templates</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-manrope leading-tight text-white">
                Templates that don&apos;t <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-[#d38787]">
                  look like templates.
                </span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 font-manrope max-w-2xl mx-auto leading-relaxed"
            >
              Premium Next.js, Tailwind and Framer Motion templates — built by a
              design engineer so your site doesn&apos;t look like everyone
              else&apos;s.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templatesData.map((tpl, idx) => (
              <TemplateCard key={tpl.slug} tpl={tpl} index={idx} />
            ))}
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default TemplatesPage;
