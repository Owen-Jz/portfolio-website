"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import FooterSection from "@/app/components/FooterSection";
import ContactSection from "@/app/components/ContactSection";
import GlassCard from "@/app/components/ui/GlassCard";
import Image from "next/image";
import { ArrowLeft, User, Clock, Wrench, ExternalLink, Users, BarChart3, MousePointer2, TrendingUp, X, ZoomIn, ZoomOut } from "lucide-react";
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
                            className="mt-6 flex flex-wrap gap-4"
                        >
                            <a
                                href="https://www.naijadiasporahub.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B7940] text-white rounded-full font-semibold text-sm hover:bg-[#155d32] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#1B7940]/20"
                            >
                                <span>Launch Live Project</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>

                            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                2.1k+ Active Users
                            </div>
                        </motion.div>
                    </div>

                    {/* Analytics Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-20"
                    >
                        <div className="flex flex-col gap-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Project Impact & Growth</h2>
                                    <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Real-time Analytics • Last 3 Months</p>
                                </div>
                                <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                    <TrendingUp className="w-4 h-4 text-[#1B7940]" />
                                    <span className="text-xs font-medium text-white/60">Traffic spike detected in Jan 2026</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Total Visitors", value: "2,109", sub: "+124% from last month", icon: Users },
                                    { label: "Page Views", value: "16,611", sub: "Avg. 7.8 views/session", icon: BarChart3 },
                                    { label: "Bounce Rate", value: "48%", sub: "12% better than before", icon: MousePointer2 },
                                ].map((stat, idx) => (
                                    <GlassCard key={idx} className="p-6 border-[#1B7940]/10" hoverEffect={true}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-2.5 bg-[#1B7940]/10 rounded-xl">
                                                <stat.icon className="w-5 h-5 text-[#1B7940]" />
                                            </div>
                                            <span className="text-[10px] font-mono p-1 px-2 rounded-md bg-[#1B7940]/10 text-[#1B7940] border border-[#1B7940]/20">
                                                Live Data
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold mb-1 tracking-tight">{stat.value}</h3>
                                            <p className="text-sm text-white/40 font-medium mb-2">{stat.label}</p>
                                            <p className="text-[11px] text-[#1B7940] font-semibold">{stat.sub}</p>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Case Study Slides - Full Width */}
                <div className="mt-12 md:mt-16 max-w-7xl mx-auto space-y-4 md:space-y-6">
                    {caseStudySlides.map((slide, idx) => (
                        <motion.div
                            key={idx}
                            layoutId={`slide-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#151515] cursor-pointer"
                            onClick={() => setSelectedImage({ ...slide, idx })}
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
                                className="text-white p-2 md:p-3 bg-[#1B7940]/80 hover:bg-[#1B7940] rounded-full transition-colors"
                                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); setZoomLevel(1); }}
                            >
                                <X className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>
                        <motion.div
                            layoutId={`slide-${selectedImage.idx}`}
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
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
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

export default NaijaDiasporaHubPage;
