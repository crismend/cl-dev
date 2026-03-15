"use client";

import { motion } from "framer-motion";
import { Code as Code2, Rocket, Users } from "lucide-react";
import { useState } from "react";
import { Atom } from "@/components/ui/Atom";

const stats = [
  { value: "4+", label: "Años de experiencia", icon: "⚡" },
  { value: "10+", label: "Proyectos completados", icon: "🎯" },
  { value: "100%", label: "Compromiso", icon: "❤️" },
];

const highlights = [
  {
    icon: Code2,
    title: "Código limpio",
    desc: "Escribo código mantenible, escalable y fácil de entender.",
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "border-cyan-500/20",
    accent: "bg-cyan-500/10 text-cyan-400",
  },
  {
    icon: Rocket,
    title: "Producto primero",
    desc: "Me enfoco en construir cosas que la gente realmente use y valore.",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20",
    accent: "bg-emerald-500/10 text-emerald-400",
  },
  {
    icon: Users,
    title: "Cofundador",
    desc: "Co-fundé CL.Dev con visión de construir soluciones digitales de impacto.",
    color: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/20",
    accent: "bg-blue-500/10 text-blue-400",
  },
];

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.05 }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl blur-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 -z-10"
      />

      <div className="flex flex-col items-center text-center p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 hover:shadow-lg hover:shadow-cyan-500/20">
        <motion.span
          animate={{ scale: isHovered ? 1.4 : 1, rotate: isHovered ? 15 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="text-3xl mb-2"
        >
          {stat.icon}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
        >
          {stat.value}
        </motion.span>
        <span className="text-xs text-(--foreground)/60 mt-2 font-medium">
          {stat.label}
        </span>
      </div>
    </motion.div>
  );
}

function HighlightCard({
  item,
  index,
}: {
  item: (typeof highlights)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ x: 8, y: -4 }}
      className="relative group"
    >
      {/* Animated background glow */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 rounded-2xl blur-lg bg-gradient-to-br ${item.color} -z-10`}
      />

      <div
        className={`relative flex items-start gap-4 p-6 rounded-2xl border ${item.border} bg-gradient-to-br ${item.color} transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-black/8 dark:hover:shadow-white/10 overflow-hidden`}
      >
        {/* Background accent */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.1 : 0,
            x: isHovered ? 40 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${item.accent.split(" ")[1]}, transparent)`,
          }}
        />

        {/* Icon container */}
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 8 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className={`p-3 rounded-xl ${item.accent} shrink-0 shadow-lg`}
        >
          <item.icon size={20} className="relative z-10" />
        </motion.div>

        {/* Content */}
        <div className="flex-1 relative z-10">
          <h4 className="font-bold text-(--foreground) group-hover:text-cyan-400 transition-colors duration-300 text-base mb-1">
            {item.title}
          </h4>
          <p className="text-(--foreground)/60 text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>

        {/* Decorative elements on hover */}
        {isHovered && (
          <>
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: -5 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.1 }}
                className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                style={{
                  background: "currentColor",
                  left: `${30 + i * 40}%`,
                  top: "10%",
                  opacity: 0.4,
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}

export function About() {
  const [selectedTab, setSelectedTab] = useState<"experience" | "passion">(
    "experience",
  );

  return (
    <section
      id="about"
      className="relative py-40 bg-(--background) overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/5 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-32 right-0 w-80 h-80 rounded-full bg-gradient-to-tl from-emerald-500/10 to-cyan-500/5 blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-6 inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20"
          >
            👤 Sobre mí
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-bold text-(--foreground) mt-6 leading-tight">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Quién soy
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-(--foreground)/60 mt-6 max-w-2xl text-lg leading-relaxed"
          >
            Desarrollador fullstack apasionado por crear soluciones innovadoras
            que generen impacto real
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left side: Avatar + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Avatar container */}
            <div className="relative w-full flex justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                className="relative group"
              >
                {/* Animated border */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 60px rgba(34, 197, 94, 0.2)",
                      "0 0 120px rgba(6, 182, 212, 0.3)",
                      "0 0 60px rgba(34, 197, 94, 0.2)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-3xl"
                />

                <div className="relative w-56 h-56 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center overflow-hidden">
                  {/* Animated background gradient */}
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-transparent"
                  />

                  <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-8xl select-none relative z-10"
                  >
                    👨‍💻
                  </motion.span>
                </div>

                {/* Location badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.3 }}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  className="absolute -bottom-3 -right-3 bg-gradient-to-br from-cyan-500 to-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-white/20 backdrop-blur-sm"
                >
                  🇨🇴 → 🇪🇸
                </motion.div>
              </motion.div>
            </div>

            {/* Stats grid */}
            <div className="w-full grid grid-cols-3 gap-3 md:gap-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
            {/* Átomo animado */}
            <Atom />
          </motion.div>

          {/* Right side: Content + Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            {/* Name and title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-(--foreground) mb-2">
                Cristian Mendoza
              </h3>
              <motion.span
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="text-cyan-400 font-mono text-sm font-medium block"
              >
                Cofundador de CL.Dev
              </motion.span>
            </motion.div>

            {/* Description tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex gap-2 mb-2"
            >
              {(["experience", "passion"] as const).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${selectedTab === tab
                      ? "bg-cyan-500/20 text-cyan-500 border border-cyan-500/50"
                      : "bg-(--foreground)/5 text-(--foreground)/60 border border-(--foreground)/10 hover:border-(--foreground)/20"
                    }`}
                >
                  {tab === "experience" ? "Experiencia" : "Pasión"}
                </motion.button>
              ))}
            </motion.div>

            {/* Description content */}
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {selectedTab === "experience" ? (
                <>
                  <p className="text-(--foreground)/70 leading-relaxed">
                    Con más de 4 años construyendo productos digitales, domino
                    el stack completo: <span className="text-cyan-600 dark:text-cyan-400 font-medium">React, Next.js, Python, Node.js, TailwindCSS y Firebase</span>. He entregado más de 10 proyectos —
                    desde webs de alto impacto hasta sistemas de gestión con IA —
                    siempre con código limpio y enfocado en resultados.
                  </p>
                  <p className="text-(--foreground)/70 leading-relaxed">
                    No me limito a ejecutar tickets: analizo el problema, diseño
                    la solución y la entrego lista para escalar. Si tienes un
                    reto digital, tengo la experiencia para resolverlo y el
                    criterio para hacerlo bien.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-(--foreground)/70 leading-relaxed">
                    Lo que más me mueve no es el código en sí — es el impacto
                    que genera. Ver a un cliente conseguir sus primeros clientes
                    gracias a su nueva web, o a un equipo trabajar tres veces
                    más rápido con una herramienta que construí, eso es lo que
                    da sentido a cada línea.
                  </p>
                  <p className="text-(--foreground)/70 leading-relaxed">
                    Aprendo cada semana algo nuevo, no por obligación, sino
                    porque el sector avanza rápido y quiero estar siempre en la
                    frontera. Me gusta ir más allá del encargo: entender el
                    negocio, proponer lo que nadie pidió pero todos necesitaban,
                    y entregar con orgullo.
                  </p>
                </>
              )}
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-3 mt-4"
            >
              {highlights.map((item, i) => (
                <HighlightCard key={item.title} item={item} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom decorative text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-(--foreground)/40 text-sm font-mono">
            Disponible para proyectos en España y Latinoamérica ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}
