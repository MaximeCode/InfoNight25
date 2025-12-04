"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/icons/Icons";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      {/* Floating Elements (The "Village") */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] text-nird-green opacity-20"
        >
          <Icons.Shield className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-[10%] text-nird-gold opacity-20"
        >
          <Icons.Gear className="w-32 h-32" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-[20%] text-nird-neon opacity-10"
        >
          <Icons.Spark className="w-16 h-16" />
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 max-w-4xl mx-auto space-y-8"
      >
        <div className="inline-block mb-4">
          <span className="px-4 py-2 rounded-full bg-nird-green/10 text-nird-green border border-nird-green/50 text-sm font-mono uppercase tracking-widest animate-pulse">
            Nuit de l'Info 2025
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-nird-green via-nird-light to-nird-neon drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
          VILLAGE RÉSISTANT
        </h1>

        <p className="text-xl md:text-2xl text-nird-light/80 max-w-2xl mx-auto font-light">
          Face à l'empire des Big Tech, un petit village d'irréductibles résiste encore et toujours.
          <br />
          <span className="text-nird-gold font-bold mt-2 block">
            Quel est ton niveau de résistance ?
          </span>
        </p>

        <div className="pt-8">
          <Link href="/test">
            <Button variant="start" size="lg" className="text-2xl">
              Lancer le Test
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Characters / Roles Preview */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-nird-dark to-transparent flex items-end justify-center gap-8 pb-8"
      >
        {["🐧", "🛡️", "🔧", "🌿"].map((emoji, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10, scale: 1.2 }}
            className="text-4xl cursor-pointer filter drop-shadow-lg"
          >
            {emoji}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
