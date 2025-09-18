import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Futuristic motherboard-like animated background
// - Dark base, neon green/blue circuit traces with pulsing glow
// - Blinking nodes (data packets)
// - Sized to full viewport behind content

const GREEN = "#00ff88";
const BLUE = "#00d4ff";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function CircuitBackground({
  className = "",
  density = 28, // number of blinking nodes
}) {
  const nodes = useMemo(() => (
    Array.from({ length: density }).map((_, i) => ({
      x: rand(4, 96),
      y: rand(4, 96),
      size: rand(2, 4),
      delay: rand(0, 6),
      dur: rand(1.4, 3.2),
      color: Math.random() > 0.5 ? GREEN : BLUE,
    }))
  ), [density]);

  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(1000px 600px at 10% 10%, #00d4ff15, transparent 60%), radial-gradient(1000px 600px at 90% 20%, #00ff8815, transparent 60%), linear-gradient(135deg, #0d0d0d, #000000)" }} />

      {/* SVG Circuit Layer */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Main traces (blue) */}
        {["M5 10 H40 V30 H70 V10 H95", "M5 50 H30 V80 H60 V50 H95", "M5 90 H45 V70 H85 V90 H95"].map((d, i) => (
          <motion.path
            key={`b-${i}`}
            d={d}
            fill="none"
            stroke={BLUE}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 3px ${BLUE}) drop-shadow(0 0 6px ${BLUE})` }}
            initial={{ pathLength: 0, opacity: 0.7 }}
            animate={{ pathLength: [0, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Secondary traces (green) */}
        {["M10 20 V40 H35 V60 H55 V40 H80 V20", "M10 60 H25 V75 H50 V60 H75 V40 H90"].map((d, i) => (
          <motion.path
            key={`g-${i}`}
            d={d}
            fill="none"
            stroke={GREEN}
            strokeWidth="0.45"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 2px ${GREEN}) drop-shadow(0 0 5px ${GREEN})` }}
            initial={{ pathLength: 0, opacity: 0.65 }}
            animate={{ pathLength: [0, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Junction pads */}
        {[{ x: 40, y: 30 }, { x: 70, y: 30 }, { x: 30, y: 80 }, { x: 60, y: 80 }, { x: 45, y: 70 }, { x: 85, y: 70 }].map((p, i) => (
          <g key={`pad-${i}`}>
            <circle cx={p.x} cy={p.y} r="1.2" fill="#0b0b0b" stroke="#1a1a1a" strokeWidth="0.2" />
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="0.9"
              fill={i % 2 ? BLUE : GREEN}
              style={{ filter: `drop-shadow(0 0 3px ${i % 2 ? BLUE : GREEN})` }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        ))}
      </svg>

      {/* Blinking nodes (random) */}
      <div className="absolute inset-0">
        {nodes.map((n, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              width: n.size,
              height: n.size,
              backgroundColor: n.color,
              filter: `blur(0.6px)`,
              boxShadow: `0 0 8px ${n.color}, 0 0 16px ${n.color}99`,
            }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: n.dur, repeat: Infinity, ease: "easeInOut", delay: n.delay }}
          />
        ))}
      </div>
    </div>
  );
}
