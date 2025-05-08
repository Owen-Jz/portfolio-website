"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Blog", href: "/blog", highlight: true },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
     visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between px-4 py-2 bg-[#222222]/80 backdrop-blur-md rounded-full w-[90%] max-w-5xl mx-auto"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/Logo.svg" alt="Logo" width={32} height={32} />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item, index) => (
          <motion.div
            key={item.name}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <Link
              href={item.href}
              className={`text-sm font-semibold transition-colors duration-300 ${
                item.highlight
                  ? "text-[#B02222] px-3 py-1 bg-[#B02222]/20 rounded-full hover:bg-[#B02222]/30"
                  : "text-[#E0E0E0] hover:text-[#B02222]"
              }`}
            >
              {item.name}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Hire Me Button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="hidden md:block"
      >
        <Link
          href="/hire"
          className="px-6 py-2 bg-[#B02222] text-[#161513] text-sm font-semibold rounded-full hover:bg-[#8A1B1B] transition-colors duration-300"
        >
          Hire Me
        </Link>
      </motion.div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-[#E0E0E0] focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-14 left-0 w-full bg-[#222222]/95 backdrop-blur-md rounded-2xl md:hidden"
        >
          <div className="flex flex-col items-center py-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                className="w-full text-center"
              >
                <Link
                  href={item.href}
                  className={`block py-2 text-sm font-semibold transition-colors duration-300 ${
                    item.highlight
                      ? "text-[#B02222] bg-[#B02222]/20"
                      : "text-[#E0E0E0] hover:text-[#B02222]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <Link
              href="/hire"
              className="mt-4 px-6 py-2 bg-[#B02222] text-[#161513] text-sm font-semibold rounded-full hover:bg-[#8A1B1B] transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Hire Me
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;