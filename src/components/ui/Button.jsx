"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  ...props
}) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-nird-dark disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-nird-gold text-nird-dark hover:bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(146,64,14,1)] active:translate-y-1 active:shadow-none border-2 border-nird-brown",
    secondary:
      "bg-nird-green text-nird-dark hover:bg-emerald-400 shadow-[4px_4px_0px_0px_rgba(6,78,59,1)] active:translate-y-1 active:shadow-none border-2 border-emerald-900",
    outline:
      "bg-transparent text-nird-neon border-2 border-nird-neon hover:bg-nird-neon/10 shadow-[0px_0px_10px_rgba(6,182,212,0.5)] hover:shadow-[0px_0px_20px_rgba(6,182,212,0.8)]",
    ghost: "bg-transparent text-nird-light hover:bg-white/10",
    start:
      "bg-gradient-to-r from-nird-gold to-orange-500 text-white text-xl py-4 px-8 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-105 hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] border-4 border-white/20 animate-pulse-slow",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 rounded-md",
    md: "text-sm px-5 py-2.5 rounded-lg",
    lg: "text-base px-8 py-4 rounded-xl",
    icon: "p-2 rounded-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: variant === "start" ? 1.05 : 1.02 }}
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
