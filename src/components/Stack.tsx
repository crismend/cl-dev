"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface StackItem {
  name: string;
  icon: string;
  color: string;
  border: string;
  proficiency?: number;
}

interface StackGroup {
  category: string;
  items: StackItem[];
}

const stack: StackGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "⚛️", color: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/20", proficiency: 95 },
      { name: "Next.js", icon: "▲", color: "from-slate-300/30 to-slate-200/20 dark:from-white/10 dark:to-white/5", border: "border-slate-300/50 dark:border-white/10", proficiency: 90 },
      { name: "TypeScript", icon: "TS", color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/20", proficiency: 88 },
      { name: "JavaScript", icon: "JS", color: "from-yellow-500/20 to-yellow-500/5", border: "border-yellow-500/20", proficiency: 92 },
      { name: "TailwindCSS", icon: "🌊", color: "from-teal-500/20 to-teal-500/5", border: "border-teal-500/20", proficiency: 90 },
      { name: "Bootstrap", icon: "🌊", color: "from-teal-500/20 to-teal-500/5", border: "border-teal-500/20", proficiency: 90 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "🟢", color: "from-green-500/20 to-green-500/5", border: "border-green-500/20", proficiency: 85 },
      { name: "Python", icon: "🐍", color: "from-yellow-400/20 to-yellow-400/5", border: "border-yellow-400/20", proficiency: 82 },
      { name: "MongoDB", icon: "🍃", color: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/20", proficiency: 80 },
      { name: "Firebase", icon: "🔥", color: "from-orange-500/20 to-orange-500/5", border: "border-orange-500/20", proficiency: 78 },
      { name: "Java", icon: "☕", color: "from-red-400/20 to-red-400/5", border: "border-red-400/20", proficiency: 75 },
      { name: "SQL", icon: "🗄️", color: "from-blue-400/20 to-blue-400/5", border: "border-blue-400/20", proficiency: 85 },
    ],
  },
  {
    category: "Herramientas",
    items: [
      { name: "Git", icon: "🌿", color: "from-red-500/20 to-red-500/5", border: "border-red-500/20", proficiency: 90 },
      { name: "GitHub", icon: "🐙", color: "from-slate-500/20 to-slate-500/5", border: "border-slate-500/20", proficiency: 88 },
      { name: "Postman", icon: "📮", color: "from-orange-400/20 to-orange-400/5", border: "border-orange-400/20", proficiency: 85 },
    ],
  },
];

function StackCard({ item, index }: { item: StackItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 rounded-2xl blur-xl bg-gradient-to-br ${item.color} -z-10 group-hover:blur-2xl`}
      />

      {/* Card */}
      <div
        className={`relative flex flex-col gap-3 px-6 py-4 rounded-2xl border bg-gradient-to-br ${item.color} ${item.border}
          transition-all duration-300 backdrop-blur-sm hover:${item.border.split(" ")[1]} cursor-pointer
          hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/5`}
      >
        {/* Icon and Name */}
        <div className="flex items-center gap-3">
          <motion.span
            animate={{ scale: isHovered ? 1.3 : 1, rotate: isHovered ? 12 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="text-2xl leading-none"
          >
            {item.icon}
          </motion.span>
          <span className="text-(--foreground) font-semibold text-sm">{item.name}</span>
        </div>

        {/* Proficiency bar */}
        {item.proficiency && (
          <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mt-1">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.proficiency}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 + 0.2 }}
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
            />
          </div>
        )}

        {/* Floating particles on hover */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: -10 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.1 }}
                className="absolute w-1 h-1 bg-black/30 dark:bg-white/40 rounded-full pointer-events-none"
                style={{
                  left: `${20 + i * 30}%`,
                  bottom: "100%",
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}

function CategorySection({ group, groupIndex }: { group: StackGroup; groupIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: groupIndex * 0.15 }}
    >
      {/* Category header with animated line */}
      <div className="flex items-center gap-4 mb-10 relative">
        <motion.span
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: groupIndex * 0.15 }}
          className="text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase"
        >
          {group.category}
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: groupIndex * 0.15 + 0.1 }}
          className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 via-emerald-500/20 to-transparent"
          style={{ originX: 0 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: groupIndex * 0.15 + 0.2 }}
          className="w-2 h-2 rounded-full bg-cyan-400"
        />
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {group.items.map((item, i) => (
          <StackCard key={item.name} item={item} index={groupIndex * 10 + i} />
        ))}
      </div>
    </motion.div>
  );
}

export function Stack() {
  return (
    <section id="stack" className="relative py-40 bg-(--background) overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 blur-3xl"
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
            delay: 1,
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-500/10 to-cyan-500/5 blur-3xl"
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
            ✨ Tecnologías
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-bold text-(--foreground) mt-6 leading-tight">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Mi Stack Tecnológico
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-(--foreground)/60 mt-6 max-w-xl text-lg leading-relaxed"
          >
            Las herramientas y tecnologías con las que construyo soluciones modernas, escalables y de alta calidad.
          </motion.p>
        </motion.div>

        {/* Stack categories */}
        <div className="space-y-20">
          {stack.map((group, gi) => (
            <CategorySection key={group.category} group={group} groupIndex={gi} />
          ))}
        </div>

        {/* Decorative footer element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-(--foreground)/40 text-sm font-mono">
            Y mucho más en constante aprendizaje...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
