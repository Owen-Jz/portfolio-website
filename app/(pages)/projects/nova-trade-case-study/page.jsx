"use client";

import React from "react";
import { motion } from "framer-motion";
import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import FooterSection from "@/app/components/FooterSection";
import ContactSection from "@/app/components/ContactSection";
import GlassCard from "@/app/components/ui/GlassCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Zap, Layers, Brain, Coins, User, Globe, TrendingUp } from "lucide-react";

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

const features = [
    {
        title: "Unified Aggregation",
        description: "Consolidates assets from multiple chains (Bitcoin, Ethereum, Solana) into one 'Asset Allocation' view, eliminating the need to check disparate wallets.",
        icon: Layers
    },
    {
        title: "Extreme Speed",
        description: "Built for high-frequency traders, utilizing WebSockets to deliver real-time market data with sub-50ms latency.",
        icon: Zap
    },
    {
        title: "Actionable Intelligence",
        description: "Features an AI Market Pulse that interprets on-chain volume to provide trading signals (bullish/bearish trends) and risk assessments.",
        icon: Brain
    },
    {
        title: "Cost Optimization",
        description: "An intelligent Gas Tracker monitors network fees across Layer 2 solutions (Arbitrum, Optimism) to help users find the cheapest routes.",
        icon: Coins
    }
];

const NovaTradePage = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#8A2BE2] selection:text-white font-manrope">
            <NavbarDemo />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Elements */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#8A2BE2]/20 rounded-full blur-[120px] pointer-events-none"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.05, 0.15, 0.05],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#4A90D9]/10 rounded-full blur-[120px] pointer-events-none"
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
                            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A2BE2]/20 border border-[#8A2BE2]/30 mb-6">
                                <span className="text-xs font-mono text-[#8A2BE2] uppercase tracking-wider">UI/UX Case Study</span>
                            </motion.div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight overflow-hidden">
                                {["Nova", "Decentralized", "Trading", "Dashboard"].map((word, i) => (
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
                                className="text-xl text-white/60 max-w-2xl leading-relaxed"
                            >
                                A high-performance crypto trading dashboard and command center designed to unify the fragmented experience of decentralized finance (DeFi).
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Cover Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#151515] mb-20 group"
                    >
                        <div className="absolute inset-0 bg-[#8A2BE2]/20 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative aspect-video w-full">
                            <Image
                                src="/projects/nova-trade-case-study/cover.png"
                                alt="Nova Trade Dashboard Interface"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-20" />
                        </div>
                    </motion.div>

                    {/* Content Section: What It Is */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-20"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Globe className="w-6 h-6 text-[#8A2BE2]" />
                            What It Is
                        </h2>
                        <p className="text-lg text-white/70 leading-relaxed max-w-4xl">
                            Nova Trade serves as a single interface where traders can monitor the market, manage portfolios across multiple blockchains, and execute trades without switching between different apps or exchanges. It unifies the fragmented experience of DeFi into one cohesive command center.
                        </p>
                    </motion.section>

                    {/* Core Value Proposition Grid */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mb-20"
                    >
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-[#4A90D9]" />
                            Core Value Proposition
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature, idx) => (
                                <motion.div key={idx} variants={fadeInUp}>
                                    <GlassCard className="p-8 h-full" hoverEffect={true}>
                                        <div className="flex flex-col h-full">
                                            <div className="mb-6 p-3 bg-white/5 w-fit rounded-xl border border-white/10">
                                                <feature.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                            <p className="text-white/60 leading-relaxed text-sm">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Target Audience */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-20"
                    >
                        <GlassCard className="p-10 border-[#8A2BE2]/20" hoverEffect={false}>
                            <div className="flex flex-col md:flex-row gap-10 items-center">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                        <User className="w-6 h-6 text-[#8A2BE2]" />
                                        Target Audience
                                    </h2>
                                    <p className="text-lg text-white/70 leading-relaxed">
                                        Designed for <span className="text-white font-semibold">High-Frequency Day Traders</span> who need speed and <span className="text-white font-semibold">Multi-Chain Investors</span> who need a holistic view of their diverse portfolios across the Web and Mobile platforms.
                                    </p>
                                </div>
                                <div className="flex-shrink-0 p-6 bg-[#8A2BE2]/10 rounded-full border border-[#8A2BE2]/20">
                                    <User className="w-16 h-16 text-[#8A2BE2]" />
                                </div>
                            </div>
                        </GlassCard>
                    </motion.section>

                </div>

                {/* Case Study Slides */}
                <div className="mt-32 max-w-7xl mx-auto space-y-32">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl font-bold mb-4">Case Study Walkthrough</h2>
                        <p className="text-white/60">A detailed look at the interface and design system.</p>
                    </div>

                    {Array.from({ length: 25 }, (_, i) => i + 2).map((num) => (
                        <motion.div
                            key={num}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#151515]"
                        >
                            <Image
                                src={`/projects/nova-trade-case-study/${num}.png`}
                                alt={`Nova Trade Case Study Slide ${num}`}
                                width={1920}
                                height={1080}
                                className="w-full h-auto object-cover"
                                quality={95}
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

export default NovaTradePage;
