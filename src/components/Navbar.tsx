"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

function NavLink({ label, href }: { label: string; href: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group text-sm font-medium"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <span className="text-(--foreground)/70 group-hover:text-cyan-400 transition-colors duration-200">
        {label}
      </span>

      {/* Bottom line animation */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-400 to-emerald-400 origin-left"
      />

      {/* Glow effect on hover */}
      <motion.span
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute -bottom-3 left-0 h-1 w-full bg-gradient-to-r from-cyan-400/40 to-emerald-400/20 blur-md -z-10"
      />
    </motion.a>
  );
}

function MobileNavLink({
  label,
  href,
  onClose,
}: {
  label: string;
  href: string;
  onClose: () => void;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClose}
      whileHover={{ x: 4 }}
      whileTap={{ x: 2 }}
      className="relative flex items-center gap-2 text-(--foreground)/70 hover:text-cyan-400 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-cyan-500/10 group"
    >
      <motion.span
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />
      <span>{label}</span>
    </motion.a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-(--background)/70 backdrop-blur-xl border-b border-cyan-500/10 shadow-2xl shadow-cyan-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-3 group relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {/* Logo glow on hover */}
            <motion.div
              animate={{
                opacity: 0,
                boxShadow: "0 0 0 0 rgba(6, 182, 212, 0)",
              }}
              whileHover={{
                opacity: 1,
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-lg"
            />

            <Image
              src="/images/logo-original.png"
              alt="CL.Dev"
              width={36}
              height={36}
              className="relative rounded-lg transition-transform duration-300 group-hover:rotate-6 border border-cyan-500/20"
            />

            <span className="font-bold text-lg text-(--foreground) group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-emerald-400 group-hover:bg-clip-text transition-all duration-300">
              CL
              <motion.span
                animate={{ color: ["rgb(34, 197, 94)", "rgb(6, 182, 212)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mx-1"
              >
                .
              </motion.span>
              Dev
            </span>
          </motion.a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} label={link.label} href={link.href} />
            ))}
          </nav>

          {/* Right side: Theme toggle + Mobile menu button */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ThemeToggle />
            </motion.div>

            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2.5 rounded-full border border-cyan-500/20 hover:border-cyan-500/50 text-(--foreground)/60 hover:text-cyan-400 transition-all duration-300 hover:bg-cyan-500/10 backdrop-blur-sm group"
              aria-label="Menu"
            >
              <motion.div
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Gradient line on scroll */}
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
          />
        )}
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden origin-top"
          >
            <div className="mx-4 rounded-2xl bg-(--background)/90 backdrop-blur-xl border border-cyan-500/20 shadow-xl shadow-cyan-500/10 overflow-hidden">
              {/* Gradient background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 pointer-events-none" />

              <nav className="relative flex flex-col px-4 py-4 gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                  >
                    <MobileNavLink
                      label={link.label}
                      href={link.href}
                      onClose={() => setMenuOpen(false)}
                    />
                  </motion.div>
                ))}

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent my-2"
                />

                {/* CTA Button in mobile menu */}
                <motion.a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold text-center transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40"
                >
                  Contacto
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
