"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandX,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandBehance,
  IconBrandWhatsapp
} from "@tabler/icons-react";

const SocialSidebar = () => {
  const socials = [
    {
      name: "Twitter / X",
      url: "https://x.com/owendigitals",
      icon: IconBrandX,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/owen_thecreator",
      icon: IconBrandInstagram,
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@0wen_thecreator",
      icon: IconBrandTiktok,
    },
    {
      name: "Behance",
      url: "https://behance.net/owendigitals",
      icon: IconBrandBehance,
    },
    {
      name: "Whatsapp",
      url: "https://wa.me/2349164713975",
      icon: IconBrandWhatsapp,
    },
  ];

  return (
    <>
      {/* Desktop Vertical Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-[60] flex-col gap-4 items-center"
      >
        <div className="flex flex-col gap-4 p-4 rounded-full bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
          {socials.map((social, idx) => (
            <SocialLink key={idx} social={social} placement="left" index={idx} />
          ))}
        </div>
      </motion.div>

      {/* Mobile Horizontal Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-auto max-w-[90vw]"
      >
        <div className="flex flex-row gap-4 p-4 rounded-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
          {socials.map((social, idx) => (
            <SocialLink key={idx} social={social} placement="top" index={idx} />
          ))}
        </div>
      </motion.div>
    </>
  );
};

const SocialLink = ({ social, placement, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 + (index * 0.1), type: "spring", stiffness: 260, damping: 20 }}
      className="relative flex items-center justify-center p-2 rounded-full transition-all duration-300 hover:bg-white/10 text-white/50 hover:text-[#b02222] hover:scale-110"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <social.icon size={22} stroke={1.5} />

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, [placement === 'left' ? 'x' : 'y']: 10, scale: 0.8 }}
            animate={{ opacity: 1, [placement === 'left' ? 'x' : 'y']: 0, scale: 1 }}
            exit={{ opacity: 0, [placement === 'left' ? 'x' : 'y']: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${placement === 'left'
                ? 'right-full mr-4 top-1/2 -translate-y-1/2'
                : 'bottom-full mb-4 left-1/2 -translate-x-1/2'
              } px-3 py-1.5 text-xs font-semibold text-white bg-[#151515] rounded-lg border border-white/10 whitespace-nowrap pointer-events-none shadow-lg`}
          >
            {social.name}
            {/* Little arrow */}
            <div
              className={`absolute w-2 h-2 bg-[#151515] border-r border-b border-white/10 rotate-45 ${placement === 'left'
                  ? 'top-1/2 -translate-y-1/2 -right-1 border-l-0 border-t-0'
                  : 'bottom-[-5px] left-1/2 -translate-x-1/2 border-l-0 border-t-0'
                }`}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  )
}

export default SocialSidebar;
