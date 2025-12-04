"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function Card({ children, className, variant = "glass", ...props }) {
  const variants = {
    glass:
      "bg-nird-dark/60 backdrop-blur-xl border border-white/10 shadow-xl text-nird-light rounded-2xl",
    parchment:
      "bg-[#fdf6e3] text-nird-brown border-2 border-nird-brown/20 shadow-[8px_8px_0px_0px_rgba(146,64,14,0.2)] rounded-sm bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]",
    tech: "bg-black/80 border border-nird-neon/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] rounded-xl relative overflow-hidden",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={twMerge("p-6", variants[variant], className)}
      {...props}
    >
      {variant === "tech" && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nird-neon to-transparent opacity-50" />
      )}
      {children}
    </motion.div>
  );
}
