"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import FooterSection from "@/app/components/FooterSection";
import ContactSection from "@/app/components/ContactSection";
import GlassCard from "@/app/components/ui/GlassCard";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft, ExternalLink, Github, User, Clock, Wrench, Landmark, ArrowLeftRight,
    ShieldCheck, RefreshCw, Link2, Undo2, Sparkles, Fingerprint, Type, X, ZoomIn, ZoomOut,
} from "lucide-react";

const ACCENT = "#1E9E67"; // PaidUp's emerald, lifted to read on the dark canvas
const GOLD = "#E8C888";
const DIR = "/projects/paidup-case-study";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const metaItems = [
    { label: "My Role", value: "Solo Full-Stack Engineer & Product Designer", icon: User },
    { label: "Context", value: "Nomba × DevCareer Hackathon 2026 (Cresio Labs)", icon: Clock },
    { label: "Stack", value: "Next.js 14, TypeScript, MongoDB, Nomba API", icon: Wrench },
];

const steps = [
    {
        n: "01",
        title: "Provision",
        body: "An invoice is created and PaidUp mints a dedicated Nomba virtual account that belongs to that invoice alone.",
        icon: Landmark,
    },
    {
        n: "02",
        title: "Customer pays",
        body: "They transfer to that account number from any Nigerian bank app — no portal, no login, no reference to type.",
        icon: ArrowLeftRight,
    },
    {
        n: "03",
        title: "Webhook",
        body: "Nomba fires payment_success. The signature is verified, the event deduped, and the money matched on its virtual-account reference.",
        icon: ShieldCheck,
    },
    {
        n: "04",
        title: "Reconcile",
        body: "The engine marks the invoice paid, partial, overpaid or unmatched — live, with a refundable surplus where one exists.",
        icon: RefreshCw,
    },
];

const engineering = [
    {
        title: "Webhook authenticity",
        body: "HMAC-SHA256 over Nomba's nine-field colon-joined string — not an HMAC of the raw body. The implementation reproduces the documented test vector exactly, compares in constant time, rejects events older than ±5 minutes, and fails closed in production rather than silently accepting unsigned money.",
        icon: Fingerprint,
    },
    {
        title: "A ledger that cannot double-credit",
        body: "Every money mutation — invoice, feed event, dedupe claim, audit entry — commits all-or-nothing in one MongoDB transaction. Replays collide with a unique index on the transaction id, so a webhook retry racing itself can never credit twice.",
        icon: Link2,
    },
    {
        title: "Never trusting the webhook alone",
        body: "A reconciliation backstop requeries the credits Nomba actually recorded and re-runs them through the same dedupe-and-reconcile path. It is idempotent and safe to run at any time, so a webhook that never arrived repairs itself instead of quietly losing money.",
        icon: RefreshCw,
    },
    {
        title: "Reversals as first-class events",
        body: "A payment reversal un-reconciles: the clawed-back amount is subtracted and the status re-derived from what is actually left. Reversing an already-reversed payment is a no-op, so the ledger survives duplicate clawbacks.",
        icon: Undo2,
    },
    {
        title: "Tamper-evident audit trail",
        body: "Each money event chains a SHA-256 hash over the entry before it. Verifying the chain re-checks every link back to genesis — the difference between an audit log and an audit log you can prove was not edited.",
        icon: ShieldCheck,
    },
    {
        title: "Multi-tenant auth, fail-closed",
        body: "Self-serve signup with scrypt password hashing, stateless HMAC-signed session cookies that are revocable via a token version, middleware that denies by default, and tenant isolation enforced server-side on every route — the webhook being the one exception, because it authenticates with its own HMAC.",
        icon: Fingerprint,
    },
];

const gallery = [
    { src: "01-landing-hero", label: "Landing — the thesis in one line", w: 2000, h: 1250 },
    { src: "02-landing-problem", label: "The problem: “Payment, no invoice ref”", w: 2000, h: 1250 },
    { src: "03-landing-how", label: "How money finds its invoice — four steps", w: 2000, h: 1250 },
    { src: "05-live-feed", label: "Live collections — money landing and reconciling itself", w: 2000, h: 1250 },
    { src: "06-invoices", label: "Invoice workspace — per-invoice virtual accounts, flags, statuses", w: 2000, h: 1250 },
    { src: "07-withdraw", label: "Payouts to any Nigerian bank, with a write-ahead reserve", w: 2000, h: 1250 },
    { src: "08-reports-ledger", label: "Printable, audit-grade ledger report", w: 2000, h: 1250 },
];

const mobileShots = [
    { src: "09-mobile-landing", label: "Landing on mobile", w: 860, h: 1864 },
    { src: "10-mobile-invoices", label: "Invoice workspace on mobile", w: 860, h: 1864 },
];

const proof = [
    { figure: "147", label: "unit tests over the reconcile, HMAC and ledger core" },
    { figure: "1:1", label: "virtual account minted per invoice — the reference is the account" },
    { figure: "₦100", label: "real surplus refund settled on production rails" },
    { figure: "0", label: "invoices matched by hand" },
];

const SectionTitle = ({ icon: Icon, children, tint = ACCENT }) => (
    <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <Icon className="w-6 h-6 shrink-0" style={{ color: tint }} />
        {children}
    </h2>
);

const PaidUpPage = () => {
    const [selected, setSelected] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    const handleZoomIn = (e) => {
        e.stopPropagation();
        setZoomLevel((prev) => Math.min(prev + 0.5, 4));
    };

    const handleZoomOut = (e) => {
        e.stopPropagation();
        setZoomLevel((prev) => Math.max(prev - 0.5, 1));
    };

    const closeLightbox = () => {
        setSelected(null);
        setZoomLevel(1);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-manrope">
            <NavbarDemo />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Ambient wash — emerald money accent over the dark canvas */}
                <div
                    className="hidden md:block fixed top-0 left-1/4 w-[520px] h-[520px] rounded-full blur-[120px] pointer-events-none"
                    style={{ backgroundColor: `${ACCENT}1A` }}
                />
                <div
                    className="hidden md:block fixed bottom-0 right-1/4 w-[560px] h-[560px] rounded-full blur-[130px] pointer-events-none"
                    style={{ backgroundColor: `${GOLD}0D` }}
                />

                <div className="max-w-5xl mx-auto relative z-10">

                    {/* Back */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
                        <Link href="/projects" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            <span className="text-sm font-mono uppercase tracking-wider">Back to Projects</span>
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <div className="mb-12">
                        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                            <motion.div
                                variants={fadeInUp}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border"
                                style={{ backgroundColor: `${ACCENT}20`, borderColor: `${ACCENT}4D` }}
                            >
                                <span className="text-xs font-mono uppercase tracking-wider" style={{ color: ACCENT }}>
                                    Fintech Engineering Case Study
                                </span>
                            </motion.div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight overflow-hidden">
                                {["Every", "transfer,", "on", "the", "right", "invoice."].map((word, i) => (
                                    <motion.span
                                        key={i}
                                        className="inline-block mr-3"
                                        style={i >= 4 ? { color: ACCENT } : undefined}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, delay: i * 0.08, ease: [0.2, 0.65, 0.3, 0.9] }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>

                            <motion.p variants={fadeInUp} className="text-xl text-white/60 max-w-2xl leading-relaxed mb-10">
                                PaidUp gives every invoice its own bank account, so a Nigerian SME never
                                matches a transfer by hand again. Built on Nomba virtual accounts, running
                                in production, proven with real money.
                            </motion.p>

                            {/* Meta grid */}
                            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                {metaItems.map((item, idx) => (
                                    <GlassCard key={idx} className="p-5" hoverEffect={false}>
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: `${ACCENT}26` }}>
                                                <item.icon className="w-4 h-4" style={{ color: ACCENT }} />
                                            </div>
                                            <div>
                                                <span className="block text-xs text-white/40 font-mono uppercase tracking-wider mb-1">{item.label}</span>
                                                <span className="block text-white font-medium text-sm leading-snug">{item.value}</span>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </motion.div>

                            {/* Links */}
                            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
                                <a
                                    href="https://paidup.site"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                                    style={{ backgroundColor: ACCENT, boxShadow: `0 10px 30px -10px ${ACCENT}66` }}
                                >
                                    <span>Launch the live app</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>

                                <a
                                    href="https://github.com/Owen-Jz/paidup-app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/25 transition-all"
                                >
                                    <Github className="w-4 h-4" />
                                    <span>Read the source</span>
                                </a>

                                <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
                                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
                                    Live on production Nomba rails
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Cover */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#151515] mb-20 cursor-zoom-in"
                        onClick={() => setSelected({ src: `${DIR}/01-landing-hero.webp`, label: "PaidUp landing page" })}
                    >
                        <div className="relative aspect-[16/10] w-full">
                            <Image
                                src={`${DIR}/cover.webp`}
                                alt="The PaidUp landing page: Every transfer, on the right invoice."
                                fill
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                className="object-cover object-top"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* The problem */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-20"
                    >
                        <SectionTitle icon={ArrowLeftRight}>The problem</SectionTitle>
                        <p className="text-lg text-white/70 leading-relaxed max-w-4xl mb-8">
                            Nigerian SMEs get paid by bank transfer, and a bank transfer arrives with a
                            narration the customer types themselves — or does not. The business ends up
                            with a statement full of credits and no way to tell which invoice each one
                            settles. So someone sits down at midnight with a spreadsheet and matches
                            them by hand, every night, forever.
                        </p>
                        <div className="border-l-2 pl-6 py-2 max-w-3xl" style={{ borderColor: `${GOLD}80` }}>
                            <p className="text-xl md:text-2xl text-white/85 font-medium leading-snug">
                                &ldquo;Payment, no invoice ref&rdquo;
                            </p>
                            <p className="text-sm text-white/40 mt-2 font-mono">
                                — the narration on a real transfer, and the whole reason this exists
                            </p>
                        </div>
                    </motion.section>

                    {/* The thesis */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-20"
                    >
                        <GlassCard className="p-8 md:p-12" hoverEffect={false}>
                            <span className="block text-xs text-white/40 font-mono uppercase tracking-wider mb-4">The insight</span>
                            <p className="text-2xl md:text-4xl font-bold leading-tight">
                                Stop asking the customer for a reference.{" "}
                                <span style={{ color: ACCENT }}>The account number is the reference.</span>
                            </p>
                            <p className="text-white/60 mt-6 leading-relaxed max-w-3xl">
                                Every invoice gets its own virtual account. The customer just sends money
                                to a number — the thing they already know how to do — and the destination
                                itself carries the identity of the invoice. Matching stops being a guess
                                and becomes a lookup.
                            </p>
                        </GlassCard>
                    </motion.section>

                    {/* How it works */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mb-20"
                    >
                        <SectionTitle icon={RefreshCw}>How money finds its invoice</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {steps.map((step) => (
                                <motion.div key={step.n} variants={fadeInUp}>
                                    <GlassCard className="p-8 h-full">
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="p-3 rounded-xl border border-white/10 bg-white/5">
                                                <step.icon className="w-5 h-5" style={{ color: ACCENT }} />
                                            </div>
                                            <span className="font-mono text-sm" style={{ color: GOLD }}>{step.n}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                        <p className="text-white/60 leading-relaxed text-sm">{step.body}</p>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Engineering */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mb-20"
                    >
                        <SectionTitle icon={ShieldCheck}>Treating money as a correctness problem</SectionTitle>
                        <p className="text-lg text-white/70 leading-relaxed max-w-4xl mb-10">
                            A reconciliation engine is only worth as much as its worst failure mode. The
                            interesting work here was not the happy path — it was making sure a replayed
                            webhook, a dropped event, a clawback or a forged signature could not corrupt
                            the ledger.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {engineering.map((item, idx) => (
                                <motion.div key={idx} variants={fadeInUp}>
                                    <GlassCard className="p-8 h-full">
                                        <div className="mb-5 p-3 w-fit rounded-xl border border-white/10 bg-white/5">
                                            <item.icon className="w-5 h-5" style={{ color: ACCENT }} />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                                        <p className="text-white/60 leading-relaxed text-sm">{item.body}</p>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* AI layer */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-20"
                    >
                        <GlassCard className="p-8 md:p-12" hoverEffect={false}>
                            <SectionTitle icon={Sparkles} tint={GOLD}>AI that is never in the money path</SectionTitle>
                            <p className="text-white/70 leading-relaxed mb-6 max-w-3xl">
                                Three features lean on a language model: a resolver that suggests which
                                invoice an unmatched transfer belongs to, plain-English recommended
                                actions for each anomaly flag, and a written brief over the whole ledger.
                                Each one is grounded — the model only ever sees computed figures and can
                                only pick a real, still-open invoice — so it cannot invent money, and it
                                only ever suggests. A human still confirms.
                            </p>
                            <p className="text-white/70 leading-relaxed max-w-3xl">
                                The part I care about is the seam. The AI client returns{" "}
                                <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-sm" style={{ color: GOLD }}>null</code>{" "}
                                on a missing key, an HTTP error, a bad status, an eight-second timeout or
                                unparseable output — and every caller falls back to its deterministic
                                engine. A rate-limited API key degrades the product; it never breaks it.
                                Because that seam is injectable, the fallbacks are unit-tested offline
                                with no network and no key at all.
                            </p>
                        </GlassCard>
                    </motion.section>

                    {/* Proof */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mb-20"
                    >
                        <SectionTitle icon={Landmark}>Proven with real money</SectionTitle>
                        <p className="text-lg text-white/70 leading-relaxed max-w-4xl mb-10">
                            Sandbox virtual accounts are not reachable from real banks, so the only honest
                            test was production. On 4 July 2026 I sent real bank transfers from a live
                            OPay account into minted Nomba virtual accounts, watched the signed webhooks
                            arrive and reconcile as paid, partial and overpaid, and settled a real ₦100
                            surplus refund back out over Nomba&rsquo;s transfer rails. The sub-account
                            balance tied out to the naira.
                        </p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {proof.map((item, idx) => (
                                <motion.div key={idx} variants={fadeInUp}>
                                    <GlassCard className="p-6 h-full" hoverEffect={false}>
                                        <span className="block text-3xl md:text-4xl font-bold mb-2" style={{ color: ACCENT }}>
                                            {item.figure}
                                        </span>
                                        <span className="block text-white/50 text-sm leading-snug">{item.label}</span>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Design */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-20"
                    >
                        <SectionTitle icon={Type} tint={GOLD}>Designing against the dashboard default</SectionTitle>
                        <p className="text-lg text-white/70 leading-relaxed max-w-4xl mb-6">
                            Fintech dashboards all look the same: dark chrome, neon chart, cold. PaidUp
                            goes the other way. The visual system is called{" "}
                            <span className="text-white font-semibold">&ldquo;The Ledger&rdquo;</span> —
                            editorial financial print, warm paper and cream, ink black, with emerald
                            reserved almost entirely for money that has actually landed.
                        </p>
                        <p className="text-lg text-white/70 leading-relaxed max-w-4xl">
                            Fraunces sets the display type, Hanken Grotesk carries the body, and every
                            figure on screen is set in JetBrains Mono so amounts and account numbers align
                            down the column and stay scannable. It reads like something a business would
                            trust with its books rather than a crypto terminal.
                        </p>
                    </motion.section>

                </div>

                {/* Gallery */}
                <div className="mt-24 max-w-7xl mx-auto">
                    <div className="text-center mb-14 px-4">
                        <h2 className="text-3xl font-bold mb-4">Walkthrough</h2>
                        <p className="text-white/50">Captured from the live production app. Tap any frame to enlarge.</p>
                    </div>

                    <div className="space-y-10 md:space-y-16">
                        {gallery.map((item, idx) => (
                            <motion.figure
                                key={item.src}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="space-y-3"
                            >
                                <div
                                    className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#151515] cursor-zoom-in"
                                    onClick={() => setSelected({ src: `${DIR}/${item.src}.webp`, label: item.label })}
                                >
                                    <Image
                                        src={`${DIR}/${item.src}.webp`}
                                        alt={item.label}
                                        width={item.w}
                                        height={item.h}
                                        sizes="(max-width: 1280px) 100vw, 1280px"
                                        className="w-full h-auto"
                                        loading={idx === 0 ? "eager" : "lazy"}
                                    />
                                </div>
                                <figcaption className="text-sm text-white/40 font-mono px-1">{item.label}</figcaption>
                            </motion.figure>
                        ))}
                    </div>

                    {/* Mobile */}
                    <div className="mt-16 md:mt-24">
                        <h3 className="text-xl font-semibold mb-8 text-center text-white/80">
                            The same engine, on the phone it actually gets used on
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                            {mobileShots.map((item) => (
                                <motion.figure
                                    key={item.src}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6 }}
                                    className="space-y-3"
                                >
                                    <div
                                        className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#151515] cursor-zoom-in"
                                        onClick={() => setSelected({ src: `${DIR}/${item.src}.webp`, label: item.label })}
                                    >
                                        <Image
                                            src={`${DIR}/${item.src}.webp`}
                                            alt={item.label}
                                            width={item.w}
                                            height={item.h}
                                            sizes="(max-width: 640px) 100vw, 400px"
                                            className="w-full h-auto"
                                            loading="lazy"
                                        />
                                    </div>
                                    <figcaption className="text-sm text-white/40 font-mono px-1">{item.label}</figcaption>
                                </motion.figure>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-24 max-w-7xl mx-auto">
                    <ContactSection />
                </div>
            </main>

            <FooterSection />

            {/* Lightbox */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 overflow-hidden"
                        onClick={closeLightbox}
                    >
                        <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 md:gap-4 z-[110]">
                            <button
                                className="text-white p-2 md:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleZoomOut}
                                disabled={zoomLevel <= 1}
                                title="Zoom out"
                            >
                                <ZoomOut className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <button
                                className="text-white p-2 md:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleZoomIn}
                                disabled={zoomLevel >= 4}
                                title="Zoom in"
                            >
                                <ZoomIn className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <div className="w-px h-8 bg-white/20 mx-1" />
                            <button
                                className="text-white p-2 md:p-3 rounded-full transition-colors"
                                style={{ backgroundColor: `${ACCENT}CC` }}
                                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                                title="Close"
                            >
                                <X className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>

                        <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            <motion.div
                                animate={{ scale: zoomLevel }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                drag={zoomLevel > 1}
                                dragConstraints={{ top: -500, bottom: 500, left: -500, right: 500 }}
                                dragElastic={0.1}
                                className={`relative w-full h-[85vh] ${zoomLevel > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
                            >
                                <Image src={selected.src} alt={selected.label} fill className="object-contain" quality={100} />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PaidUpPage;
