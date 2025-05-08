"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.4 },
    }),
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-[#161513] pt-16">
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          className="w-40 h-40"
        >
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={160}
            height={160}
            className="rounded-full"
          />
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="text-4xl md:text-5xl font-bold leading-tight"
        >
          <span className="text-[#E0E0E0]">I am </span>
          <span className="text-[#B02222]">Owen</span>
          <span className="text-[#E0E0E0]">
            <br />A{" "}
          </span>
          <span className="text-[#B02222]">Product Designer</span>
          <span className="text-[#E0E0E0]">
            <br />
            and Developer
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#C4C4C4] text-base md:text-lg font-light max-w-xl"
        >
          I am a versatile designer with over six years of experience,
          specializing in UI/UX design and web design. My expertise lies in
          crafting scalable and efficient SaaS-based solutions. Passionate about
          building seamless digital experiences.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-3">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#B02222] text-white text-base font-semibold rounded-full hover:bg-[#8A1B1B] transition-colors duration-300"
            >
              Get In Touch
            </Link>
          </motion.div>
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <Link
              href="/cv"
              className="px-6 py-3 border-2 border-[#E0E0E0] text-[#E0E0E0] text-base font-semibold rounded-full hover:border-[#B02222] hover:text-[#B02222] transition-colors duration-300"
            >
              Download CV
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
