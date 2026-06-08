"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { NavbarDemo } from "../../../../components/ui/ResizableNavbar";
import FooterSection from "../../../../components/FooterSection";
import GlassCard from "../../../../components/ui/GlassCard";
import { getTemplateBySlug } from "../../../../components/templatesData";
import { CheckCircle, Github, Mail, ArrowLeft } from "lucide-react";

export default function TemplateSuccessPage() {
  const params = useParams();
  const tpl = getTemplateBySlug(params.slug);
  const name = tpl ? tpl.name : "your template";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b02222] selection:text-white flex flex-col">
      <NavbarDemo />
      <main className="flex-grow pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="w-16 h-16 text-[#b02222] mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold font-manrope mb-4">
              Thank you for your purchase!
            </h1>
            <p className="text-white/60 font-manrope mb-10">
              You now own{" "}
              <span className="text-white font-semibold">{name}</span>. Here&apos;s
              what happens next.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-10">
            <GlassCard className="p-6">
              <Mail className="w-6 h-6 text-[#b02222] mb-3" />
              <h3 className="font-semibold font-manrope mb-2">
                Check your email
              </h3>
              <p className="text-white/60 text-sm">
                Your receipt, license key, and download link are on the way from
                Polar.
              </p>
            </GlassCard>
            <GlassCard className="p-6">
              <Github className="w-6 h-6 text-[#b02222] mb-3" />
              <h3 className="font-semibold font-manrope mb-2">GitHub access</h3>
              <p className="text-white/60 text-sm">
                If you provided a GitHub handle, you&apos;ll get a private repo
                invite. Otherwise use the zip download.
              </p>
            </GlassCard>
          </div>
          <Link
            href="/templates"
            className="text-[#b02222] hover:text-[#d38787] inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to templates
          </Link>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
