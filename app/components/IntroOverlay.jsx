'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["DESIGN", "BUILD", "DEPLOY"];

const IntroOverlay = ({ onComplete }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Determine total time per word
        if (index >= words.length) {
            const timeout = setTimeout(() => {
                onComplete();
            }, 1000); // Wait for the last word to exit fully
            return () => clearTimeout(timeout);
        }

        // Interval to switch words - 1.5s per word
        const interval = setTimeout(() => {
            setIndex((prev) => prev + 1);
        }, 1500);

        return () => clearTimeout(interval);
    }, [index, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] cursor-wait"
        >


            {/* Progress Bar Top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <motion.div
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.5, ease: "linear" }}
                />
            </div>

            <AnimatePresence>
                {index < words.length && (
                    <motion.div
                        key={index}
                        className="absolute z-10 flex items-center justify-center w-full"
                    >
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                                exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
                                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                                className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 tracking-tighter uppercase"
                            >
                                {words[index]}
                            </motion.h1>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative Footer */}
            <div className="absolute bottom-12 flex justify-between w-full px-12 text-xs font-mono text-white/40 uppercase tracking-widest">
                <span>Loading Experience</span>
                <span>{Math.min(((index + 1) / words.length) * 100, 100).toFixed(0)}%</span>
            </div>
        </motion.div>
    );
};

export default IntroOverlay;
