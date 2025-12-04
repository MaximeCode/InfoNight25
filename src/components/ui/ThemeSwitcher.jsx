"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Sun, Moon, Gamepad2 } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "dark", icon: Moon, label: "Dark" },
    { id: "retro", icon: Gamepad2, label: "Retro" },
  ];

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-bg-card backdrop-blur-md p-2 rounded-full border border-color-border shadow-lg">
      {themes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={`relative p-2 rounded-full transition-colors duration-200 ${
            theme === id ? "text-bg-main" : "text-text-muted hover:text-text-main"
          }`}
          title={label}
        >
          {theme === id && (
            <motion.div
              layoutId="activeTheme"
              className="absolute inset-0 bg-color-primary rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          )}
          <span className="relative z-10">
            <Icon size={20} />
          </span>
        </button>
      ))}
    </div>
  );
}
