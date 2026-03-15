"use client";

import { motion } from "framer-motion";

// Calculate points along a rotated ellipse
function getEllipsePoints(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotationDeg: number,
  numPoints: number
): { x: number[]; y: number[] } {
  const theta = (rotationDeg * Math.PI) / 180;
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  const xPoints: number[] = [];
  const yPoints: number[] = [];

  for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * 2 * Math.PI;
    const x = cx + rx * Math.cos(t) * cosTheta - ry * Math.sin(t) * sinTheta;
    const y = cy + rx * Math.cos(t) * sinTheta + ry * Math.sin(t) * cosTheta;
    xPoints.push(x);
    yPoints.push(y);
  }

  return { x: xPoints, y: yPoints };
}

// Pre-calculate orbit paths
const orbit1 = getEllipsePoints(100, 100, 82, 30, -30, 60);
const orbit2 = getEllipsePoints(100, 100, 82, 30, 30, 60);
const orbit3 = getEllipsePoints(100, 100, 82, 30, 90, 60);

export function Atom() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center justify-center py-6"
    >
      <div className="relative w-64 h-64">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 0 20px rgba(6,182,212,0.5))" }}
        >
          <defs>
            <radialGradient id="coreGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#a5f3fc" />
              <stop offset="40%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0e7490" />
            </radialGradient>
            <radialGradient id="electronGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="coreGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Orbits */}
          <ellipse cx="100" cy="100" rx="82" ry="30" fill="none" stroke="#06b6d4" strokeWidth="1.2" strokeOpacity="0.4" transform="rotate(-30, 100, 100)" />
          <ellipse cx="100" cy="100" rx="82" ry="30" fill="none" stroke="#06b6d4" strokeWidth="1.2" strokeOpacity="0.4" transform="rotate(30, 100, 100)" />
          <ellipse cx="100" cy="100" rx="82" ry="30" fill="none" stroke="#06b6d4" strokeWidth="1.2" strokeOpacity="0.4" transform="rotate(90, 100, 100)" />

          {/* Nucleus */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "100px 100px" }}
          >
            <circle cx="100" cy="100" r="18" fill="url(#coreGrad)" filter="url(#coreGlow)" />
            {/* Protons and neutrons cluster effect */}
            <circle cx="94" cy="96" r="6" fill="#0e7490" fillOpacity="0.6" />
            <circle cx="106" cy="97" r="5" fill="#155e75" fillOpacity="0.5" />
            <circle cx="100" cy="106" r="5" fill="#0e7490" fillOpacity="0.5" />
            <circle cx="96" cy="104" r="4" fill="#164e63" fillOpacity="0.4" />
            <circle cx="105" cy="104" r="4" fill="#155e75" fillOpacity="0.4" />
            {/* Highlight */}
            <ellipse cx="93" cy="93" rx="6" ry="4" fill="white" fillOpacity="0.4" />
          </motion.g>

          {/* Electron 1 - orbit -30deg */}
          <motion.circle
            r="7"
            fill="url(#electronGrad)"
            filter="url(#glow)"
            animate={{
              cx: orbit1.x,
              cy: orbit1.y,
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Electron 2 - orbit 30deg (starts at opposite side) */}
          <motion.circle
            r="7"
            fill="url(#electronGrad)"
            filter="url(#glow)"
            animate={{
              cx: [...orbit2.x.slice(30), ...orbit2.x.slice(0, 31)],
              cy: [...orbit2.y.slice(30), ...orbit2.y.slice(0, 31)],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Electron 3 - vertical orbit (starts at different position) */}
          <motion.circle
            r="7"
            fill="url(#electronGrad)"
            filter="url(#glow)"
            animate={{
              cx: [...orbit3.x.slice(15), ...orbit3.x.slice(0, 16)],
              cy: [...orbit3.y.slice(15), ...orbit3.y.slice(0, 16)],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

        </svg>

        {/* Background pulse */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl -z-10"
        />
      </div>
    </motion.div>
  );
}
