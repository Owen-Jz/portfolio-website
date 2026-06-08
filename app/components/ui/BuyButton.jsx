"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Bell } from "lucide-react";

/**
 * Renders the primary purchase CTA for a template.
 * - If the template has a Polar checkoutUrl, links out to Polar checkout.
 * - If not (or coming-soon), degrades to a "Notify me" contact CTA so the
 *   page is always shippable before the Polar product exists.
 */
export default function BuyButton({ tpl, className = "" }) {
  const isAvailable = tpl.status === "available";
  const hasCheckout = isAvailable && tpl.checkoutUrl && tpl.checkoutUrl.length > 0;

  const base =
    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg font-manrope transition-all duration-300";

  if (hasCheckout) {
    return (
      <motion.a
        href={tpl.checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`${base} bg-gradient-to-r from-[#b02222] to-[#d38787] text-white hover:shadow-lg hover:shadow-[#b02222]/50 ${className}`}
      >
        <ShoppingCart className="w-5 h-5" />
        Buy now — {tpl.priceLabel}
      </motion.a>
    );
  }

  // Fallback: route interested buyers to contact with the template prefilled.
  return (
    <Link href={`/contact?interest=${tpl.slug}`} className={className}>
      <motion.span
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`${base} bg-white/5 text-white border border-white/15 hover:border-[#b02222]`}
      >
        <Bell className="w-5 h-5 text-[#b02222]" />
        {isAvailable ? "Notify me when it's ready" : "Notify me on launch"}
      </motion.span>
    </Link>
  );
}
