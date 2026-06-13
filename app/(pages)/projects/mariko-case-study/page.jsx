"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import FooterSection from "@/app/components/FooterSection";
import ContactSection from "@/app/components/ContactSection";
import GlassCard from "@/app/components/ui/GlassCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, Layers, Target, Palette, Type, Sliders, Package, TrendingUp, User, Globe, ExternalLink, X, ZoomIn, ZoomOut, ShoppingBag, CheckCircle } from "lucide-react";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const processStages = [
    {
        number: "01",
        title: "Discovery",
        description: "Deep sessions to understand not just visual preferences, but the person behind the brand. Who is she building for? What should someone feel when they encounter the brand for the first time? What does \"luxury\" actually mean in her context?",
        icon: Target
    },
    {
        number: "02",
        title: "Strategy & Positioning",
        description: "Clarifying the brand's place in the market. Target audience definition. Competitive landscape framing. Defining the single most important message the brand needs to communicate — and the single most important action you want a visitor to take.",
        icon: Sliders
    },
    {
        number: "03",
        title: "Identity Design",
        description: "Logo mark, wordmark, color palette, typography system, and supporting visual language. Multiple concept directions. Iterative refinement through structured feedback loops. Nothing moves to the next stage until the current stage is locked.",
        icon: Palette
    },
    {
        number: "04",
        title: "Application & Extension",
        description: "The brand identity applied across real touchpoints — the storefront, product presentation, social content templates, and operational materials. Testing every element at scale: from a 90×90 favicon to a full-bleed hero banner.",
        icon: Layers
    },
    {
        number: "05",
        title: "Delivery & Handoff",
        description: "Complete brand guidelines document. All source files. Ongoing support for implementation. Mariko can hand this identity to any designer or developer and the brand stays consistent.",
        icon: Package
    }
];

const deliverables = [
    {
        title: "Logo Mark",
        description: "Custom letterform treatment balancing editorial elegance with modern minimalism. Luxury doesn't shout — it whispers. The mark works at every size: profile picture, product tag, hero banner.",
        icon: Sparkles
    },
    {
        title: "Color Palette",
        description: "Warm ivory. Deep charcoal. Signature champagne gold. Colors selected for their ability to translate across Instagram content, product photography, and live e-commerce — maintaining premium feel across every medium.",
        icon: Palette
    },
    {
        title: "Typography",
        description: "A refined serif display face for headlines and brand moments. Paired with a clean geometric sans for functional UI text — product names, descriptions, navigation, checkout flows.",
        icon: Type
    },
    {
        title: "Visual Language",
        description: "The supporting graphic system: spacing rules, image treatment guidelines, photography direction, iconography standards. A living visual language any content creator or developer can apply consistently.",
        icon: Layers
    }
];

const outcomes = [
    "Fully realized brand identity and digital storefront",
    "Clear conversion path from Instagram audience to paying customers",
    "Brand identity ready to scale — from posts to packaging to full e-commerce",
    "Infrastructure in place for every interested follower to become a buyer"
];

const MarikoCaseStudyPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    const handleZoomIn = (e) => {
        e.stopPropagation();
        setZoomLevel((prev) => Math.min(prev + 0.5, 4));
    };

    const handleZoomOut = (e) => {
        e.stopPropagation();
        setZoomLevel((prev) => Math.max(prev - 0.5, 1));
    };

    const slideCount = 12;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#C9A96E] selection:text-white font-manrope">
            <NavbarDemo />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Elements */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.08, 0.15, 0.08],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="hidden md:block fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#C9A96E]/20 rounded-full blur-[120px] pointer-events-none"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.04, 0.12, 0.04],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="hidden md:block fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#E8D5B7]/10 rounded-full blur-[120px] pointer-events-none"
                />

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
                    <div className="mb-12">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/30 mb-6">
                                <span className="text-xs font-mono text-[#C9A96E] uppercase tracking-wider">Brand Identity Case Study</span>
                            </motion.div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight overflow-hidden">
                                {["Mariko", "Luxury", "Fashion", "Brand"].map((word, i) => (
                                    <motion.span
                                        key={i}
                                        className="inline-block mr-3"
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: i * 0.1,
                                            ease: [0.2, 0.65, 0.3, 0.9],
                                        }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-xl text-white/60 max-w-2xl leading-relaxed mb-8"
                            >
                                A complete luxury fashion brand identity and e-commerce storefront — giving a San Francisco entrepreneur the conversion path her Instagram audience was waiting for.
                            </motion.p>

                            {/* Tags */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap gap-3"
                            >
                                {["Brand Identity", "E-Commerce", "Luxury Fashion", "Cresio Labs"].map((tag) => (
                                    <span key={tag} className="text-xs text-[#C9A96E] bg-[#C9A96E]/10 px-3 py-1 rounded-full border border-[#C9A96E]/20 font-mono uppercase tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Client Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <GlassCard className="p-8 border-[#C9A96E]/20" hoverEffect={false}>
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold mb-3 text-[#C9A96E] font-mono uppercase tracking-wider">The Client</h2>
                                    <p className="text-lg text-white/80 leading-relaxed">
                                        <span className="text-white font-semibold">Mariko.</span> San Francisco. Luxury fashion. A growing Instagram audience generating real interest and real demand — with no storefront to convert either.
                                    </p>
                                    <p className="text-lg text-white/60 leading-relaxed mt-4">
                                        She had products. She had aesthetic authority. She had followers who wanted to buy. What she didn't have was a place to send them.
                                    </p>
                                </div>
                                <div className="flex-shrink-0 flex flex-col gap-3">
                                    <div className="px-4 py-3 bg-[#C9A96E]/10 rounded-xl border border-[#C9A96E]/20">
                                        <p className="text-xs text-[#C9A96E]/60 font-mono uppercase tracking-wider mb-1">Location</p>
                                        <p className="text-white font-medium">San Francisco, CA</p>
                                    </div>
                                    <div className="px-4 py-3 bg-[#C9A96E]/10 rounded-xl border border-[#C9A96E]/20">
                                        <p className="text-xs text-[#C9A96E]/60 font-mono uppercase tracking-wider mb-1">Industry</p>
                                        <p className="text-white font-medium">Luxury Fashion / E-Commerce</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Problem Statement */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-20"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Target className="w-6 h-6 text-[#C9A96E]" />
                            The Problem
                        </h2>
                        <GlassCard className="p-10 border-[#C9A96E]/20" hoverEffect={false}>
                            <p className="text-lg text-white/70 leading-relaxed">
                                Social content that generates demand but produces zero transactions. Every product feature post ends in a dead end. Every interested DM becomes a manual negotiation instead of a checkout.
                            </p>
                            <p className="text-lg text-white/70 leading-relaxed mt-6">
                                The core issue wasn't marketing. It wasn't product quality. It was <span className="text-[#C9A96E] font-semibold">infrastructure</span> — there was no digital home where discovery turned into revenue.
                            </p>
                        </GlassCard>
                    </motion.section>

                    {/* Process Section */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mb-20"
                    >
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Sliders className="w-6 h-6 text-[#C9A96E]" />
                            The Process — Owen's 5-Stage Methodology
                        </h2>
                        <div className="space-y-6">
                            {processStages.map((stage, idx) => (
                                <motion.div key={idx} variants={fadeInUp}>
                                    <GlassCard className="p-8 h-full border-white/5 hover:border-[#C9A96E]/30 transition-colors" hoverEffect={true}>
                                        <div className="flex gap-6">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center">
                                                    <stage.icon className="w-5 h-5 text-[#C9A96E]" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-xs font-mono text-[#C9A96E]/60">{stage.number}</span>
                                                    <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                                                </div>
                                                <p className="text-white/60 leading-relaxed text-sm">
                                                    {stage.description}
                                                </p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Deliverables */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mb-20"
                    >
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Package className="w-6 h-6 text-[#C9A96E]" />
                            The Deliverable — Brand Identity
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {deliverables.map((item, idx) => (
                                <motion.div key={idx} variants={fadeInUp}>
                                    <GlassCard className="p-8 h-full border-white/5 hover:border-[#C9A96E]/30 transition-colors" hoverEffect={true}>
                                        <div className="flex flex-col h-full">
                                            <div className="mb-5 p-3 bg-[#C9A96E]/10 w-fit rounded-xl border border-[#C9A96E]/20">
                                                <item.icon className="w-5 h-5 text-[#C9A96E]" />
                                            </div>
                                            <h3 className="text-lg font-semibold mb-3 text-white">{item.title}</h3>
                                            <p className="text-white/60 leading-relaxed text-sm">
                                                {item.description}
                                            </p>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Outcomes */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-20"
                    >
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-[#C9A96E]" />
                            The Outcome
                        </h2>
                        <GlassCard className="p-10 border-[#C9A96E]/20" hoverEffect={false}>
                            <p className="text-lg text-white/70 leading-relaxed mb-8">
                                A fully realized brand identity and digital storefront that finally gives Mariko a conversion path from her audience.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {outcomes.map((outcome, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                                        <span className="text-white/70 text-sm leading-relaxed">{outcome}</span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.section>

                </div>

                {/* Case Study Slides */}
                <div className="mt-12 md:mt-32 max-w-7xl mx-auto space-y-4 md:space-y-32">
                    <div className="text-center mb-12 md:mb-24 px-4">
                        <h2 className="text-3xl font-bold mb-4">Brand Identity Walkthrough</h2>
                        <p className="text-white/60">A detailed look at the visual system and e-commerce storefront.</p>
                    </div>

                    {Array.from({ length: slideCount }, (_, i) => i + 1).map((num) => (
                        <motion.div
                            key={num}
                            layoutId={`slide-${num}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#151515] cursor-pointer"
                            onClick={() => setSelectedImage(`/projects/mariko-case-study/${num}.png`)}
                        >
                            <Image
                                src={`/projects/mariko-case-study/${num}.png`}
                                alt={`Mariko Brand Identity Slide ${num}`}
                                width={1920}
                                height={1080}
                                className="w-full h-auto object-cover"
                                quality={95}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-20 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <GlassCard className="p-12 text-center border-[#C9A96E]/20" hoverEffect={false}>
                            <ShoppingBag className="w-12 h-12 text-[#C9A96E] mx-auto mb-6" />
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Have an audience with no conversion path?</h2>
                            <p className="text-white/60 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                                If you have a product, an audience, and no place to send them — that's a problem I know how to solve. Let's talk.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A96E] text-[#0a0a0a] rounded-full font-semibold text-base hover:bg-[#E8D5B7] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#C9A96E]/20"
                            >
                                <span>Start a Project</span>
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        </GlassCard>
                    </motion.div>

                    <div className="mt-12">
                        <ContactSection />
                    </div>
                </div>

            </main>
            <FooterSection />

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 overflow-hidden"
                        onClick={() => { setSelectedImage(null); setZoomLevel(1); }}
                    >
                        <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 md:gap-4 z-[110]">
                            <button
                                className="text-white p-2 md:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleZoomOut}
                                disabled={zoomLevel <= 1}
                                title="Zoom Out"
                            >
                                <ZoomOut className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <button
                                className="text-white p-2 md:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleZoomIn}
                                disabled={zoomLevel >= 4}
                                title="Zoom In"
                            >
                                <ZoomIn className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <div className="w-[1px] h-8 bg-white/20 mx-1"></div>
                            <button
                                className="text-white p-2 md:p-3 bg-[#C9A96E]/80 hover:bg-[#C9A96E] rounded-full transition-colors"
                                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); setZoomLevel(1); }}
                            >
                                <X className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>
                        <motion.div
                            layoutId={`slide-${selectedImage.split('/').pop().replace('.png', '')}`}
                            className="relative w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                animate={{ scale: zoomLevel }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                drag={zoomLevel > 1}
                                dragConstraints={{ top: -500, bottom: 500, left: -500, right: 500 }}
                                dragElastic={0.1}
                                className={`relative w-full h-[85vh] ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                            >
                                <Image
                                    src={selectedImage}
                                    alt="Zoomed Slide"
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MarikoCaseStudyPage;