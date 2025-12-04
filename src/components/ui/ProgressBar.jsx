"use client";

import { motion } from "framer-motion";

export function ProgressBar({ value, max = 100, className }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full h-6 bg-nird-dark/50 rounded-full border-2 border-white/10 relative overflow-hidden ${className}`}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_95%,#fff_95%)] bg-[length:20px_100%]" />
      
      {/* Fill */}
      <motion.div
        className="h-full bg-gradient-to-r from-nird-green via-emerald-400 to-nird-neon relative"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
      >
        {/* Sparks/Glow */}
        <div className="absolute top-0 right-0 h-full w-2 bg-white/80 blur-[2px] shadow-[0_0_10px_#fff]" />
        
        {/* Animated texture inside bar */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-move-stripes" />
      </motion.div>
    </div>
  );
}
