"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-nird-dark/50 text-nird-light border border-white/20",
    success: "bg-nird-green/20 text-nird-green border border-nird-green/50",
    warning: "bg-nird-gold/20 text-nird-gold border border-nird-gold/50",
    danger: "bg-red-500/20 text-red-400 border border-red-500/50",
    tech: "bg-nird-neon/10 text-nird-neon border border-nird-neon/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]",
  };

  return (
    <span
      className={twMerge(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-mono uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
