"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const roles = [
  "Fullstack Developer",
  "React & Next.js Specialist",
  "Python · IA · Backend",
  "Soluciones Web a Medida",
];

function SocialLink({
  href,
  icon: Icon,
  label,
  index,
}: {
  href: string;
  icon: React.ComponentType<{ size: number }>;
  label: string;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const isExternal = href.startsWith("http");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.15, y: -4 }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-full blur-lg bg-gradient-to-br from-cyan-500/40 to-emerald-500/20 -z-10"
      />

      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label={label}
        className="relative p-3 rounded-full border border-cyan-500/20 hover:border-cyan-500/50 text-(--foreground)/60 hover:text-cyan-400 transition-all duration-300 backdrop-blur-sm bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 hover:shadow-lg hover:shadow-cyan-500/20 group"
      >
        <motion.div
          animate={{ rotate: isHovered ? 15 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Icon size={20} />
        </motion.div>

        {/* Tooltip on hover */}
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={isHovered ? { opacity: 1, y: -8 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-medium whitespace-nowrap pointer-events-none"
        >
          {label}
        </motion.span>
      </a>
    </motion.div>
  );
}

function CTAButton({
  href,
  children,
  variant = "primary",
  index,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect for primary */}
      {variant === "primary" && (
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.5,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-cyan-500/40 to-emerald-500/30 -z-10"
        />
      )}

      <a
        href={href}
        className={`relative inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 group ${variant === "primary"
            ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-cyan-500/40"
            : "border border-cyan-500/40 hover:border-cyan-500 text-(--foreground) hover:bg-cyan-500/10 backdrop-blur-sm"
          }`}
      >
        <motion.span
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {children}
        </motion.span>
      </a>
    </motion.div>
  );
}

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(role.slice(0, displayText.length + 1));
        if (displayText.length + 1 === role.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(role.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-(--background)">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/15 to-emerald-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-tl from-emerald-500/10 to-cyan-500/10 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto py-24 gap-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotateZ: -10 }}
          animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          whileHover={{ scale: 1.08, rotateZ: 5 }}
          className="relative group"
        >
          {/* Logo glow */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 40px rgba(34, 197, 94, 0.2)",
                "0 0 80px rgba(6, 182, 212, 0.3)",
                "0 0 40px rgba(34, 197, 94, 0.2)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-2xl"
          />

          <Image
            src="/images/logo-original.png"
            alt="CL.Dev Logo"
            width={150}
            height={150}
            className="relative rounded-2xl shadow-xl border border-cyan-500/20"
            priority
          />
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-(--foreground) tracking-tight leading-tight">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            >
              CL
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="text-emerald-400 inline-block mx-1"
            >
              .
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Dev
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle/Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 backdrop-blur-sm"
        >
          <p className="text-sm md:text-base font-mono font-medium" style={{ color: "var(--cyan-text)" }}>
            Soluciones digitales innovadoras
          </p>
        </motion.div>

        {/* Typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="h-12 md:h-14 flex items-center justify-center"
        >
          <div className="relative px-6 py-2 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 backdrop-blur-sm">
            <span className="text-lg md:text-2xl font-mono font-semibold"
              style={{ color: "var(--cyan-text)" }}>
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-cyan-600 dark:text-cyan-400"
              >
                |
              </motion.span>
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base md:text-lg text-(--foreground)/70 max-w-2xl leading-relaxed"
        >
          Con 4+ años de experiencia fullstack, convierto ideas en productos
          digitales que funcionan y escalan. Trabajo con React, Next.js, Python y
          Node.js — y sé cuándo y cómo integrar IA para que tu negocio gane
          tiempo, dinero y ventaja competitiva.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center pt-4"
        >
          <CTAButton href="#projects" variant="primary" index={0}>
            Ver proyectos
          </CTAButton>
          <CTAButton href="#contact" variant="secondary" index={1}>
            Contacto
          </CTAButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex gap-3 pt-6"
        >
          <SocialLink
            href="https://github.com/crismend"
            icon={Github}
            label="GitHub"
            index={0}
          />
          <SocialLink
            href="https://www.linkedin.com/in/cristian-mendoza-dev/"
            icon={Linkedin}
            label="LinkedIn"
            index={1}
          />
          <SocialLink
            href="mailto:cf.devmendoza@email.com"
            icon={Mail}
            label="Email"
            index={2}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative group"
        >
          <motion.div
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 blur-md bg-gradient-to-b from-cyan-500/30 to-transparent rounded-full -z-10"
          />
          <div className="p-3 rounded-full border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 backdrop-blur-sm">
            <ArrowDown size={20} className="text-cyan-400" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
