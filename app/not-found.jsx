"use client";

import React from "react";
import { Button } from "./components/ui/Button";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#151515] text-white flex flex-col items-center justify-center relative overflow-hidden font-manrope">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      
      {/* Grid Pattern Overlay (optional, subtle texture) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px"
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
        >
            <h1 className="text-[12rem] md:text-[16rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none">
                404
            </h1>
            <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <span className="text-8xl md:text-9xl font-bold text-[#b02222] mix-blend-overlay">404</span>
            </motion.div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6 -mt-10 md:-mt-16 relative z-20"
        >
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
                Lost in the void?
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-md mx-auto leading-relaxed">
                The page you are looking for doesn't exist or has been moved to another dimension.
            </p>
            
            <div className="pt-4">
                <Button href="/" variant="primary" withMotion={true}>
                    Return to Signal
                </Button>
            </div>
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      <motion.div
        animate={{ 
            y: [-20, 20, -20], 
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-32 h-32 border border-white/5 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ 
            y: [30, -30, 30], 
            rotate: [0, -20, 20, 0], 
            opacity: [0.2, 0.5, 0.2] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-20 w-48 h-48 border border-[#b02222]/10 rounded-full pointer-events-none"
      />
    </div>
  );
}
