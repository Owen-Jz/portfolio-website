"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FooterSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Failed to subscribe");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const navigateLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const workLinks = [
    { name: "Templates", href: "/templates" },
    { name: "Website Pricing", href: "/webpricing" },
    { name: "Brand Pricing", href: "/pricing" },
    { name: "Process", href: "/process" },
    { name: "Start a Brief", href: "/briefs" },
  ];

  // NOTE: confirm the LinkedIn / X handles below — GitHub + email are correct.
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/owen-jz",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://x.com/owendigitals",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/owendigitals",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:official@owendigitals.work",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l9 6 9-6m-18 0v8a2 2 0 002 2h14a2 2 0 002-2v-8" />
        </svg>
      ),
    },
  ];

  const FooterColumn = ({ title, links }) => (
    <motion.div variants={itemVariants}>
      <h4 className="text-white text-sm font-semibold font-['Manrope'] uppercase tracking-wider mb-5">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-white/55 hover:text-white text-sm font-['Manrope'] transition-colors duration-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative bg-[#0a0a0a] border-t border-white/10 overflow-hidden">
      {/* Accent hairline + ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b02222]/60 to-transparent" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#b02222]/10 rounded-full blur-[120px]" />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold font-['Manrope'] text-white">
                Owen{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-[#d38787]">
                  Digitals
                </span>
              </span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed font-['Manrope'] max-w-xs mb-6">
              Design engineer crafting distinctive brands and production-grade
              web experiences. Premium templates &amp; bespoke work.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.name}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/55 hover:text-white hover:border-[#b02222] hover:bg-[#b02222]/10 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          <div className="md:col-span-2">
            <FooterColumn title="Navigate" links={navigateLinks} />
          </div>
          <div className="md:col-span-2">
            <FooterColumn title="Work" links={workLinks} />
          </div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-4">
            <h4 className="text-white text-sm font-semibold font-['Manrope'] uppercase tracking-wider mb-5">
              Newsletter
            </h4>
            <p className="text-white/55 text-sm mb-4 font-['Manrope'] leading-relaxed">
              New templates, posts, and behind-the-scenes — straight to your inbox.
            </p>
            {status === "success" ? (
              <p className="text-green-400 text-sm py-3 font-['Manrope']">
                Thanks for subscribing! 🎉
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222]/40 transition-all text-sm font-['Manrope']"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-gradient-to-r from-[#b02222] to-[#d38787] text-white rounded-lg hover:shadow-lg hover:shadow-[#b02222]/40 transition-all disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <span className="text-xs">…</span>
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errorMessage && (
                  <p className="text-red-400 text-xs font-['Manrope']">{errorMessage}</p>
                )}
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/40 text-sm font-['Manrope'] text-center sm:text-left">
            © {year} Owen Digitals. All rights reserved.
          </p>
          <p className="text-white/40 text-sm font-['Manrope'] text-center sm:text-right">
            Designed &amp; built by Owen · Lagos, Nigeria
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
