"use client";

import { motion } from "framer-motion";

export function ResultGauge({ score }) {
  // Calculate rotation based on score (0-100 mapped to -90deg to 90deg)
  const rotation = (score / 100) * 180 - 90;

  const getLabel = (s) => {
    if (s < 25) return "Esclave des Big Tech";
    if (s < 50) return "Résistant en formation";
    if (s < 80) return "Villageois Libre Certifié";
    return "Héros NIRD du Village";
  };

  const getColor = (s) => {
    if (s < 25) return "text-red-500";
    if (s < 50) return "text-nird-gold";
    if (s < 80) return "text-nird-green";
    return "text-nird-neon";
  };

  return (
    <div className="relative w-64 h-32 mx-auto mb-8">
      {/* Gauge Background */}
      <div className="absolute inset-0 w-full h-full bg-nird-dark/50 rounded-t-full border-t-8 border-x-8 border-white/10 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full z-10" />
      </div>

      {/* Needle */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-1 h-28 bg-white origin-bottom rounded-full z-20 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        initial={{ rotate: -90 }}
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.5 }}
        style={{ translateX: "-50%" }}
      />

      {/* Score Text */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-5xl font-black font-mono text-white mb-2"
        >
          {score}%
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className={`text-xl font-bold uppercase ${getColor(score)}`}
        >
          {getLabel(score)}
        </motion.div>
      </div>
    </div>
  );
}
