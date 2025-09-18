import React from "react";
import { motion } from "framer-motion";

// Futuristic cybersecurity-themed animated background
// - Animated cyberpunk gradient (blue -> green -> purple)
// - Optional subtle noise overlay
// - Floating neon particles using Framer Motion

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function CyberBackground({
  particleCount = 36,
  colors = ["#00d4ff", "#00ff88", "#7f00ff"],
  withNoise = true,
  className = "",
}) {
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const size = rand(2, 4); // px
    const startX = rand(0, 100);
    const startY = rand(0, 100);
    const endX = Math.min(100, Math.max(0, startX + rand(-20, 20)));
    const endY = Math.min(100, Math.max(0, startY + rand(-20, 20)));
    const color = colors[Math.floor(rand(0, colors.length))];
    const dur = rand(12, 28);
    const delay = rand(0, 8);
    const blur = rand(1, 3);
    const opacity = rand(0.4, 0.9);
    return (
      <motion.span
        key={i}
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          left: `${startX}%`,
          top: `${startY}%`,
          backgroundColor: color,
          filter: `blur(${blur}px)`,
          boxShadow: `0 0 ${8 + blur * 2}px ${color}`,
          opacity,
        }}
        animate={{ left: `${endX}%`, top: `${endY}%`, opacity: [opacity, opacity * 0.6, opacity] }}
        transition={{ duration: dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay }}
      />
    );
  });

  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Animated cyberpunk gradient layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(1200px 600px at 10% 10%, #00d4ff22, transparent 60%),
                      radial-gradient(1000px 800px at 90% 20%, #00ff8822, transparent 60%),
                      radial-gradient(900px 700px at 50% 80%, #7f00ff22, transparent 60%),
                      linear-gradient(135deg, #0d0d0d, #000000)`
        }}
        animate={{
          backgroundPosition: [
            "0% 0%, 100% 0%, 50% 100%, 0% 0%",
            "20% 10%, 80% 10%, 40% 90%, 0% 0%",
            "0% 0%, 100% 0%, 50% 100%, 0% 0%",
          ],
          backgroundSize: [
            "120% 120%, 120% 120%, 120% 120%, 100% 100%",
            "140% 140%, 140% 140%, 140% 140%, 100% 100%",
            "120% 120%, 120% 120%, 120% 120%, 100% 100%",
          ],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating neon particles */}
      <div className="absolute inset-0">{particles}</div>

      {/* Subtle noise texture overlay */}
      {withNoise && (
        <div className="absolute inset-0 noise-overlay opacity-[0.06] mix-blend-overlay" />
      )}
    </div>
  );
}
