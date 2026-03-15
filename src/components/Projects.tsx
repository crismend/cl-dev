"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, Globe, AppWindow } from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────────────── */

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo: string;
  badge: string;
  badgeText: string;
  badgeBg: string;
  border: string;
  gradient: string;
  glowInner: string;
  glowOuter: string;
}

interface ProjectGroup {
  category: string;
  Icon: React.ComponentType<{ size: number; className?: string }>;
  projects: Project[];
}

const groups: ProjectGroup[] = [
  {
    category: "Páginas Web",
    Icon: Globe,
    projects: [
      {
        title: "Mujer en Dirección",
        description:
          "Sitio web profesional diseñado para empoderar a mujeres líderes en el ámbito empresarial, con diseño moderno, contenido editorial y captación de clientes.",
        image: "/images/projects/pagina_web_mujeres_en_direccion.png",
        tags: ["Next.js", "TailwindCSS", "Framer Motion", "Vercel"],
        demo: "https://mujerendireccion.com/",
        badge: "Sitio Web",
        badgeText: "text-cyan-400",
        badgeBg: "bg-cyan-500/10 border-cyan-500/30",
        border: "border-cyan-500/20",
        gradient: "from-cyan-500/12 via-cyan-500/4 to-transparent",
        glowInner: "rgba(6, 182, 212, 0.13)",
        glowOuter: "rgba(6, 182, 212, 0.32)",
      },
      {
        title: "Benaia",
        description:
          "Sitio web corporativo con identidad de marca sólida, navegación fluida y secciones orientadas a la conversión de visitantes en clientes potenciales.",
        image: "/images/projects/pagina_web_benaia.png",
        tags: ["React", "TailwindCSS", "Vercel", "Responsive"],
        demo: "https://web-benaia-git-main-crismend.vercel.app/",
        badge: "Corporativo",
        badgeText: "text-indigo-400",
        badgeBg: "bg-indigo-500/10 border-indigo-500/30",
        border: "border-indigo-500/20",
        gradient: "from-indigo-500/12 via-indigo-500/4 to-transparent",
        glowInner: "rgba(99, 102, 241, 0.13)",
        glowOuter: "rgba(99, 102, 241, 0.32)",
      },
      {
        title: "Iglesia IBS",
        description:
          "Plataforma institucional para comunidad religiosa con agenda de eventos, sección de sermones, información de ministerios y formulario de contacto.",
        image: "/images/projects/pagina_web_IBS.png",
        tags: ["Next.js", "TailwindCSS", "SEO", "Vercel"],
        demo: "https://www.iglesia-ibs.com/",
        badge: "Institucional",
        badgeText: "text-emerald-400",
        badgeBg: "bg-emerald-500/10 border-emerald-500/30",
        border: "border-emerald-500/20",
        gradient: "from-emerald-500/12 via-emerald-500/4 to-transparent",
        glowInner: "rgba(16, 185, 129, 0.13)",
        glowOuter: "rgba(16, 185, 129, 0.32)",
      },
    ],
  },
  {
    category: "Aplicaciones Web",
    Icon: AppWindow,
    projects: [
      {
        title: "Gestión de No Conformidades",
        description:
          "Sistema para gestionar no conformidades y acciones correctivas en procesos de calidad, con seguimiento de estados, roles de usuario y reportes en tiempo real.",
        image: "/images/projects/gestion_no_conformidades.png",
        tags: ["React", "Python", "Railway", "TailwindCSS"],
        demo: "https://gestion-nc.vercel.app/",
        badge: "Full Stack",
        badgeText: "text-cyan-400",
        badgeBg: "bg-cyan-500/10 border-cyan-500/30",
        border: "border-cyan-500/20",
        gradient: "from-cyan-500/12 via-cyan-500/4 to-transparent",
        glowInner: "rgba(6, 182, 212, 0.13)",
        glowOuter: "rgba(6, 182, 212, 0.32)",
      },
      {
        title: "Planificador de Gastos",
        description:
          "Herramienta de control y planificación de presupuesto personal. Permite crear categorías, registrar gastos y visualizar el consumo mensual con gráficos interactivos.",
        image: "/images/projects/planificador_gastos.png",
        tags: ["React", "JavaScript", "TailwindCSS", "Vercel"],
        demo: "https://control-presupuesto-gastos.vercel.app/",
        badge: "App Web",
        badgeText: "text-emerald-400",
        badgeBg: "bg-emerald-500/10 border-emerald-500/30",
        border: "border-emerald-500/20",
        gradient: "from-emerald-500/12 via-emerald-500/4 to-transparent",
        glowInner: "rgba(16, 185, 129, 0.13)",
        glowOuter: "rgba(16, 185, 129, 0.32)",
      },
      {
        title: "Control de Gastos",
        description:
          "Aplicación de control de gastos con autenticación de usuarios, registro categorizado de transacciones y panel de resumen mensual con persistencia en la nube.",
        image: "/images/projects/control _de_gastos.png",
        tags: ["React", "Firebase", "TailwindCSS", "Auth"],
        demo: "https://control-de-gastos-4852f.web.app/",
        badge: "Firebase",
        badgeText: "text-indigo-400",
        badgeBg: "bg-indigo-500/10 border-indigo-500/30",
        border: "border-indigo-500/20",
        gradient: "from-indigo-500/12 via-indigo-500/4 to-transparent",
        glowInner: "rgba(99, 102, 241, 0.13)",
        glowOuter: "rgba(99, 102, 241, 0.32)",
      },
      {
        title: "Control de Tiempos de Respuesta",
        description:
          "Sistema de monitoreo de tiempos de respuesta para procesos internos. Registra métricas, genera alertas por incumplimiento y permite visualizar tendencias históricas.",
        image: "/images/projects/control_tiempos_respuesta.png",
        tags: ["React", "Firebase", "JavaScript", "Charts"],
        demo: "https://control-de-tiempos-c3197.web.app/",
        badge: "Monitoreo",
        badgeText: "text-cyan-400",
        badgeBg: "bg-cyan-500/10 border-cyan-500/30",
        border: "border-cyan-500/20",
        gradient: "from-cyan-500/12 via-cyan-500/4 to-transparent",
        glowInner: "rgba(6, 182, 212, 0.13)",
        glowOuter: "rgba(6, 182, 212, 0.32)",
      },
      {
        title: "Lista de Tareas",
        description:
          "Gestión de tareas con autenticación por usuario. Permite crear, completar y eliminar tareas, con sincronización en tiempo real y filtros por estado.",
        image: "/images/projects/lista_tareas.png",
        tags: ["React", "Firebase", "TypeScript", "Auth"],
        demo: "https://lista-de-tareas-9c50d.web.app/",
        badge: "Productividad",
        badgeText: "text-emerald-400",
        badgeBg: "bg-emerald-500/10 border-emerald-500/30",
        border: "border-emerald-500/20",
        gradient: "from-emerald-500/12 via-emerald-500/4 to-transparent",
        glowInner: "rgba(16, 185, 129, 0.13)",
        glowOuter: "rgba(16, 185, 129, 0.32)",
      },
    ],
  },
];

/* ─── Floating particle ─────────────────────────────────────────────────── */

function Particle({ index }: { index: number }) {
  const palette = [
    "rgba(6, 182, 212, 0.55)",
    "rgba(16, 185, 129, 0.5)",
    "rgba(99, 102, 241, 0.5)",
  ];
  const size = 2 + (index % 3);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${(index * 7.43) % 100}%`,
        top: `${(index * 11.87) % 100}%`,
        background: palette[index % 3],
      }}
      animate={{
        y: [0, -(20 + (index % 3) * 8), 0],
        x: [0, index % 2 === 0 ? 10 : -10, 0],
        opacity: [0.15, 0.65, 0.15],
        scale: [0.7, 1.4, 0.7],
      }}
      transition={{
        duration: 6 + ((index * 1.7) % 10),
        delay: (index * 0.38) % 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Project card ──────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rawRotX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rawRotY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useSpring(rawRotX, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(rawRotY, { stiffness: 180, damping: 24 });

  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, ${project.glowInner}, transparent 65%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 56, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ perspective: "1200px" }}
      className="group h-full"
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.03 }}
        animate={{
          boxShadow: isHovered
            ? `0 28px 60px ${project.glowOuter}55, 0 0 0 1.5px ${project.glowOuter}60`
            : "0 4px 24px rgba(0,0,0,0.08)",
        }}
        transition={{
          scale: { type: "spring", stiffness: 250, damping: 20 },
          boxShadow: { duration: 0.4 },
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className={`relative rounded-3xl border ${project.border} overflow-hidden h-full flex flex-col`}
      >
        {/* ── Image preview ── */}
        <div className="relative h-48 overflow-hidden shrink-0">
          <Image
            src={project.image}
            alt={`Preview de ${project.title}`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient fade bottom → blends image into card */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, var(--background), transparent)",
            }}
          />
          {/* Badge overlaid on image top-right */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs font-bold font-mono tracking-wide px-3 py-1.5 rounded-full border backdrop-blur-md ${project.badgeBg} ${project.badgeText}`}
            >
              {project.badge}
            </span>
          </div>
        </div>

        {/* Static gradient background (content area) */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${project.gradient}`}
        />

        {/* Cursor-reactive inner glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: glowBg }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />

        {/* ── Card content ── */}
        <div className="relative z-10 px-6 pb-6 pt-3 flex flex-col gap-3 flex-1">
          {/* Title */}
          <h3 className="text-lg font-bold text-(--foreground) group-hover:text-cyan-400 transition-colors duration-300 leading-snug">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-(--foreground)/60 text-sm leading-relaxed flex-1 line-clamp-3">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-lg bg-(--foreground)/5 border border-(--foreground)/10 text-(--foreground)/55 font-mono transition-colors duration-200 group-hover:border-(--foreground)/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-(--foreground)/10 to-transparent" />

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver código fuente en GitHub"
                className="flex items-center gap-2 text-sm font-medium text-(--foreground)/50 hover:text-cyan-400 transition-colors duration-200"
              >
                <Github size={16} />
                <span>Código</span>
              </a>
            )}

            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-cyan-500/30 dark:hover:shadow-cyan-500/20 transition-all duration-300 ${
                project.github ? "ml-auto" : ""
              }`}
            >
              <span>Ver demo</span>
              <motion.span
                animate={isHovered ? { x: [0, 3, 0] } : {}}
                transition={{ repeat: Infinity, duration: 1.3 }}
              >
                <ExternalLink size={14} />
              </motion.span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Category section ──────────────────────────────────────────────────── */

function CategorySection({
  group,
  groupIndex,
}: {
  group: ProjectGroup;
  groupIndex: number;
}) {
  const { Icon } = group;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
    >
      {/* Category header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center gap-2.5">
          <Icon size={16} className="text-cyan-400" />
          <span className="text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase">
            {group.category}
          </span>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: groupIndex * 0.1 + 0.1 }}
          className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 via-emerald-500/20 to-transparent"
          style={{ originX: 0 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: groupIndex * 0.1 + 0.3 }}
          className="w-2 h-2 rounded-full bg-cyan-400"
        />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {group.projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={groupIndex * 10 + i}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────── */

export function Projects() {
  return (
    <section
      id="projects"
      className="relative py-40 bg-(--background) overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 55, 0], y: [0, -45, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-48 -right-48 w-[540px] h-[540px] rounded-full bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-500/8 to-cyan-500/5 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-500/6 to-blue-500/6 blur-3xl"
        />
      </div>

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(6,182,212,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 28 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
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
            💼 Proyectos
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-bold text-(--foreground) mt-6 leading-tight">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Mi Trabajo
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-(--foreground)/60 mt-6 max-w-xl text-lg leading-relaxed"
          >
            Proyectos reales construidos con pasión, código limpio y tecnologías
            modernas.
          </motion.p>
        </motion.div>

        {/* Project categories */}
        <div className="space-y-24">
          {groups.map((group, gi) => (
            <CategorySection key={group.category} group={group} groupIndex={gi} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 flex flex-col items-center gap-5"
        >
          <p className="text-(--foreground)/35 text-sm font-mono">
            ¿Quieres ver más? Visita mi perfil de GitHub
          </p>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-cyan-500/30 hover:border-cyan-500/60 text-(--foreground)/65 hover:text-cyan-400 transition-all duration-300 hover:bg-cyan-500/5 backdrop-blur-sm text-sm font-medium"
          >
            <Github size={18} />
            <span>Ver todos los proyectos</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
