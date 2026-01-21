"use client";

import React from "react";
import { motion } from "framer-motion";
import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import FooterSection from "@/app/components/FooterSection";
import ContactSection from "@/app/components/ContactSection";
import GlassCard from "@/app/components/ui/GlassCard";
import Image from "next/image";
import { ArrowLeft, User, Clock, Wrench, ExternalLink } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Generate all 31 slides
const caseStudySlides = Array.from({ length: 31 }, (_, i) => ({
    src: `/projects/ndh-case-study/Slide ${i + 1}.png`,
    alt: `Naija Diaspora Hub Case Study - Slide ${i + 1}`
}));

const NaijaDiasporaHubPage = () => {
    const metadata = [
        { label: "My Role", value: "Lead Product Designer & Frontend Developer", icon: User },
        { label: "Timeline", value: "12 Weeks (MVP Delivery)", icon: Clock },
        { label: "Tools", value: "Figma, Next.js, Framer", icon: Wrench },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#1B7940] selection:text-white font-manrope">
            <NavbarDemo />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Elements */}
                <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#1B7940]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#1B7940]/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">

                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link href="/projects" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            <span className="text-sm font-mono uppercase tracking-wider">Back to Projects</span>
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <div className="mb-16">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B7940]/20 border border-[#1B7940]/30 mb-6">
                                <span className="text-xs font-mono text-[#1B7940] uppercase tracking-wider">UI/UX Case Study</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Naija Diaspora Hub
                            </h1>
                            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
                                Bridging the Trust Gap for Global Nigerians — A verified digital marketplace connecting the Nigerian Diaspora with trusted local businesses, services, and cultural experiences.
                            </p>
                        </motion.div>

                        {/* Metadata Grid */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            {metadata.map((item, idx) => (
                                <GlassCard key={idx} className="p-5" hoverEffect={false}>
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-[#1B7940]/20 rounded-lg">
                                            <item.icon className="w-4 h-4 text-[#1B7940]" />
                                        </div>
                                        <div>
                                            <span className="block text-xs text-white/40 font-mono uppercase tracking-wider mb-1">{item.label}</span>
                                            <span className="block text-white font-medium text-sm">{item.value}</span>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </motion.div>

                        {/* Live Link */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="mt-6"
                        >
                            <a
                                href="https://naija-diaspora-hub.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B7940] text-white rounded-full font-medium text-sm hover:bg-[#155d32] transition-colors"
                            >
                                <span>View Live Project</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </motion.div>
                    </div>

                </div>

                {/* Case Study Slides - Full Width */}
                <div className="mt-16 max-w-7xl mx-auto space-y-6">
                    {caseStudySlides.map((slide, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#151515]"
                        >
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                width={1920}
                                height={1080}
                                className="w-full h-auto object-cover"
                                priority={idx < 3}
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 max-w-7xl mx-auto">
                    <ContactSection />
                </div>

            </main>
            <FooterSection />
        </div>
    );
};

export default NaijaDiasporaHubPage;
