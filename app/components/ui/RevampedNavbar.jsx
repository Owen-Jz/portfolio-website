"use client";

import { cn } from "../../libs/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";

export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
        backgroundColor: visible ? "rgba(10, 10, 10, 0.6)" : "transparent",
        borderColor: visible ? "rgba(255, 255, 255, 0.1)" : "transparent",
        backdropFilter: visible ? "blur(12px)" : "none",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "850px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-6 py-3 lg:flex",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-1 lg:flex",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-5 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-white/10"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        width: visible ? "95%" : "100%",
        y: visible ? 10 : 0,
        backgroundColor: visible ? "rgba(10, 10, 10, 0.8)" : "transparent",
        borderColor: visible ? "rgba(255, 255, 255, 0.1)" : "transparent",
        backdropFilter: visible ? "blur(12px)" : "none",
        borderRadius: visible ? "16px" : "0px",
      }}
      style={{
        borderWidth: visible ? "1px" : "0px",
        borderStyle: "solid",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-transparent px-4 py-3 lg:hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          className={cn(
            "w-full overflow-hidden rounded-xl bg-[#111] border border-white/10 shadow-2xl",
            className
          )}
        >
          <div className="flex flex-col p-4 gap-2">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return isOpen ? (
    <IconX className="text-white w-6 h-6" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white w-6 h-6" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1"
    >
      <img src="/Logo.svg" alt="logo" width={32} height={32} />
      <span className="font-bold text-lg text-white font-manrope">
        Owen Digitals
      </span>
    </Link>
  );
};

export function NavbarDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Projects",
      link: "/projects",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-3 relative z-20">
            <Button 
                href="/blog" 
                variant="secondary" 
                className="bg-transparent border-transparent text-white/70 hover:text-white hover:bg-white/5 hover:border-white/10 px-4"
            >
              Blog
            </Button>
            <Button 
                href="/contact" 
                variant="primary"
                className="rounded-full px-6 shadow-[0_0_15px_rgba(176,34,34,0.3)] hover:shadow-[0_0_25px_rgba(176,34,34,0.5)] bg-[#b02222] border-none text-white hover:bg-[#c92828]"
            >
              Hire Me
            </Button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative block p-3 text-lg font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <div className="flex flex-col gap-3">
              <Link
                 href="/blog"
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="block p-3 text-lg font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-center"
              >
                Read Blog
              </Link>
              <Button
                href="/contact"
                variant="primary"
                className="w-full justify-center py-3 text-base rounded-lg bg-[#b02222]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hire Me
              </Button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}