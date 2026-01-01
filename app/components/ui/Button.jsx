"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../../libs/utils";

/**
 * Button component based on hero section button styles
 * Supports primary and secondary variants with optional Link and motion wrappers
 */
export const Button = ({
  children,
  variant = "primary",
  href,
  className,
  onClick,
  disabled = false,
  type = "button",
  withMotion = false,
  motionProps = {},
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-2.5 text-sm font-light rounded-sm transition-all duration-300";
  
  const variantStyles = {
    primary: "bg-[#b02222] text-white hover:bg-[#d38787] hover:px-8",
    secondary: "border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white hover:px-8",
  };

  const buttonClasses = cn(
    baseStyles,
    variantStyles[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  // If href is provided, render a Next.js Link (which renders an <a> tag)
  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  // Otherwise, render a standard button
  const ButtonElement = withMotion ? motion.button : "button";

  const defaultMotionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.98 },
    ...motionProps,
  };

  return (
    <ButtonElement
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...(withMotion ? defaultMotionProps : {})}
      {...props}
    >
      {children}
    </ButtonElement>
  );
};

export default Button;
