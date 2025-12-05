"use client";

import { motion } from "framer-motion";

export function CategoryRadar({ scores, theme = "retro", className = "" }) {
  // Normalize scores to ensure they exist and are 0-100 (or close to it based on logic)
  // We assume input scores are raw points. We need to normalize them relative to max possible.
  // For this demo, we'll assume the input 'scores' are already somewhat normalized or we scale them.
  // Actually, let's just use the raw values and scale them for visual impact. 
  // Max score per question is 10. If we have 1 question per category, max is 10.
  // Let's assume we map 0-10 range to 0-100 radius for the chart.
  
const categories = [
  "Obsolescence & Matériel",
  "Sobriété Numérique",
  "Souveraineté & Cloud",
  "Logiciels Libres",
  "Sécurité Numérique",
  "Durabilité & Réemploi"
];


  const maxVal = 100; // Max points per category (percentage)
  const radius = 100;
  const center = 120; // SVG center

  // Helper to get coordinates
  const getCoords = (value, index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    // Cap value at maxVal to prevent overflow
    const r = (Math.min(value, maxVal) / maxVal) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon points
  const points = categories.map((cat, i) => {
    const val = scores[cat] || 0;
    const { x, y } = getCoords(val, i, categories.length);
    return `${x},${y}`;
  }).join(" ");

  // Theme Colors
  const themes = {
    retro: {
      stroke: "#06b6d4", // Cyan
      fill: "rgba(6, 182, 212, 0.3)",
      grid: "rgba(255, 255, 255, 0.1)",
      text: "#eab308", // Yellow
    },
    dark: {
      stroke: "#22c55e", // Green
      fill: "rgba(34, 197, 94, 0.3)",
      grid: "rgba(255, 255, 255, 0.1)",
      text: "#ffffff",
    },
    light: {
      stroke: "#3b82f6", // Blue
      fill: "rgba(59, 130, 246, 0.2)",
      grid: "rgba(0, 0, 0, 0.1)",
      text: "#1f2937", // Dark Grey
    }
  };

  const t = themes[theme] || themes.retro;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg width="240" height="240" viewBox="0 0 240 240" className="overflow-visible">
        {/* Background Grid (Hexagons) */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
          <polygon
            key={i}
            points={categories.map((_, idx) => {
              const { x, y } = getCoords(maxVal * scale, idx, categories.length);
              return `${x},${y}`;
            }).join(" ")}
            fill="none"
            stroke={t.grid}
            strokeWidth="1"
            className="transition-colors duration-300"
          />
        ))}

        {/* Axis Lines */}
        {categories.map((_, i) => {
          const { x, y } = getCoords(maxVal, i, categories.length);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={t.grid}
              strokeWidth="1"
            />
          );
        })}

        {/* Data Polygon */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0, transformOrigin: "center" }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          points={points}
          fill={t.fill}
          stroke={t.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        />

        {/* Labels */}
        {categories.map((cat, i) => {
          // Push labels out a bit further
          const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
          const labelR = radius + 25;
          const x = center + labelR * Math.cos(angle);
          const y = center + labelR * Math.sin(angle);
          
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={t.text}
              fontSize="10"
              fontWeight="bold"
              className="font-mono uppercase tracking-wider"
            >
              {cat}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
