"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Linkedin,
  Github,
  Facebook,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "cf.devmendoza@gmail.com",
    href: "mailto:cf.devmendoza@gmail.com",
    colorText: "text-cyan-400",
    colorBg: "bg-cyan-500/10",
    colorBorder: "border-cyan-500/20",
    colorHoverBorder: "hover:border-cyan-500/50",
    colorHoverBg: "hover:bg-cyan-500/8",
    glow: "rgba(6, 182, 212, 0.30)",
  },
  {
    icon: Phone,
    label: "Móvil",
    value: "+34 667 684 470",
    href: "tel:+34667684470",
    colorText: "text-emerald-400",
    colorBg: "bg-emerald-500/10",
    colorBorder: "border-emerald-500/20",
    colorHoverBorder: "hover:border-emerald-500/50",
    colorHoverBg: "hover:bg-emerald-500/8",
    glow: "rgba(16, 185, 129, 0.30)",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+34 667 684 470",
    href: "https://wa.me/34667684470",
    colorText: "text-green-400",
    colorBg: "bg-green-500/10",
    colorBorder: "border-green-500/20",
    colorHoverBorder: "hover:border-green-500/50",
    colorHoverBg: "hover:bg-green-500/8",
    glow: "rgba(34, 197, 94, 0.30)",
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cristian-mendoza-dev/", 
    hoverColor: "hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/8",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/crismend", 
    hoverColor: "hover:text-(--foreground) hover:border-(--foreground)/40 hover:bg-(--foreground)/5",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61584509826306&locale=es_ES",
    hoverColor: "hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/8",
  },
];

/* ─── Contact card ──────────────────────────────────────────────────────── */

function ContactCard({
  card,
  index,
}: {
  card: (typeof contactCards)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { icon: Icon } = card;

  return (
    <motion.a
      href={card.href}
      target={card.href.startsWith("http") ? "_blank" : undefined}
      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        boxShadow: isHovered
          ? `0 16px 40px ${card.glow}55, 0 0 0 1px ${card.glow}50`
          : "0 2px 16px rgba(0,0,0,0.06)",
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.1 },
        x: { duration: 0.5, delay: index * 0.1 },
        y: { type: "spring", stiffness: 300, damping: 20 },
        scale: { type: "spring", stiffness: 300, damping: 20 },
        boxShadow: { duration: 0.35 },
      }}
      className={`group flex items-center gap-4 p-4 rounded-2xl border ${card.colorBorder} ${card.colorHoverBorder} ${card.colorHoverBg} backdrop-blur-sm transition-colors duration-300 cursor-pointer`}
    >
      {/* Icon */}
      <motion.div
        animate={{ rotate: isHovered ? [0, -8, 8, 0] : 0 }}
        transition={{ duration: 0.4 }}
        className={`shrink-0 p-3 rounded-xl ${card.colorBg} ${card.colorText}`}
      >
        <Icon size={20} />
      </motion.div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-mono font-bold tracking-widest uppercase text-(--foreground)/40 mb-0.5">
          {card.label}
        </p>
        <p className={`text-sm font-semibold ${card.colorText} truncate`}>
          {card.value}
        </p>
      </div>

      {/* Arrow */}
      <motion.div
        animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.3 }}
        transition={{ duration: 0.2 }}
        className={`shrink-0 ${card.colorText}`}
      >
        <ArrowRight size={16} />
      </motion.div>
    </motion.a>
  );
}

/* ─── Form field ────────────────────────────────────────────────────────── */

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  textarea,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  const sharedClass = `
    w-full px-4 py-3 rounded-xl
    bg-(--foreground)/5 border transition-all duration-300
    text-(--foreground) placeholder:text-(--foreground)/30
    text-sm outline-none resize-none
    ${focused ? "border-cyan-500/60 bg-cyan-500/5 ring-2 ring-cyan-500/10" : "border-(--foreground)/12 hover:border-(--foreground)/25"}
  `;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono font-bold tracking-widest uppercase text-(--foreground)/50">
        {label}
        {required && <span className="text-cyan-400 ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          rows={5}
          placeholder={placeholder}
          className={sharedClass}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          placeholder={placeholder}
          className={sharedClass}
        />
      )}
    </div>
  );
}

/* ─── Contact section ───────────────────────────────────────────────────── */

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const subject = encodeURIComponent(
      form.subject || `Contacto desde CL.Dev — ${form.name}`
    );
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\n\nMensaje:\n${form.message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:cf.devmendoza@gmail.com?subject=${subject}&body=${body}`;
      setSending(false);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 800);
  }

  return (
    <>
      {/* ─── Contact section ─── */}
      <section
        id="contact"
        className="relative py-40 bg-(--background) overflow-hidden"
      >
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -50, 0] }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-tl from-emerald-500/10 to-cyan-500/5 blur-3xl"
          />
        </div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.16] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(6,182,212,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-6 inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20"
            >
              💬 Contacto
            </motion.span>

            <h2 className="text-5xl md:text-6xl font-bold text-(--foreground) mt-6 leading-tight">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              >
                Hablemos
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-(--foreground)/60 mt-6 max-w-xl text-lg leading-relaxed"
            >
              ¿Tienes un proyecto en mente o quieres colaborar? Escríbeme y te
              respondo lo antes posible.
            </motion.p>
          </motion.div>

          {/* ── Main grid ── */}
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* LEFT — contact info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Contact cards */}
              <div className="flex flex-col gap-3">
                {contactCards.map((card, i) => (
                  <ContactCard key={card.label} card={card} index={i} />
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-(--foreground)/10 to-transparent" />

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col gap-4"
              >
                <p className="text-xs font-mono font-bold tracking-widest uppercase text-(--foreground)/40">
                  Redes sociales
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, i) => {
                    const { icon: Icon } = social;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target={
                          social.href !== "#" ? "_blank" : undefined
                        }
                        rel={
                          social.href !== "#"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={social.label}
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 rounded-full border border-(--foreground)/15 text-(--foreground)/50 ${social.hoverColor} transition-all duration-300 backdrop-blur-sm`}
                      >
                        <Icon size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Decorative availability badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm"
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"
                />
                <p className="text-sm text-emerald-400 font-medium">
                  Disponible · ¿Tienes un proyecto? Hablemos
                </p>
              </motion.div>
            </motion.div>

            {/* RIGHT — form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              {/* Form card */}
              <div className="relative rounded-3xl border border-cyan-500/15 bg-gradient-to-br from-cyan-500/8 via-transparent to-emerald-500/5 backdrop-blur-sm overflow-hidden">
                {/* Subtle top glow line */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                <div className="p-8 md:p-10">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      /* ── Success state ── */
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center text-center gap-5 py-10"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                          transition={{
                            scale: { type: "spring", stiffness: 260, damping: 20 },
                            rotate: { delay: 0.3, duration: 0.5 },
                          }}
                          className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center"
                        >
                          <CheckCircle2 size={36} className="text-emerald-400" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-(--foreground) mb-2">
                            ¡Mensaje preparado!
                          </h3>
                          <p className="text-(--foreground)/60 text-sm leading-relaxed max-w-sm">
                            Tu cliente de correo se ha abierto con el mensaje
                            listo para enviar. Si no se abrió automáticamente,
                            escríbeme directamente a{" "}
                            <a
                              href="mailto:cf.devmendoza@gmail.com"
                              className="text-cyan-400 hover:underline"
                            >
                              cf.devmendoza@gmail.com
                            </a>
                          </p>
                        </div>
                        <motion.button
                          onClick={() => setSubmitted(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-6 py-2.5 rounded-full border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:bg-cyan-500/10 transition-colors duration-200"
                        >
                          Enviar otro mensaje
                        </motion.button>
                      </motion.div>
                    ) : (
                      /* ── Form ── */
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-5"
                      >
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FormField
                            label="Nombre"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Tu nombre completo"
                          />
                          <FormField
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                          />
                        </div>

                        <FormField
                          label="Asunto"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          placeholder="¿En qué puedo ayudarte?"
                        />

                        <FormField
                          label="Mensaje"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          textarea
                          placeholder="Cuéntame sobre tu proyecto, idea o consulta..."
                        />

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          disabled={sending}
                          whileHover={!sending ? { scale: 1.02, y: -2 } : {}}
                          whileTap={!sending ? { scale: 0.98 } : {}}
                          className="relative mt-2 w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-emerald-500 hover:shadow-xl hover:shadow-cyan-500/25 dark:hover:shadow-cyan-500/15 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
                        >
                          {/* Animated shimmer */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

                          <span className="relative flex items-center justify-center gap-3">
                            {sending ? (
                              <>
                                <motion.span
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                                Preparando mensaje...
                              </>
                            ) : (
                              <>
                                <Send size={18} />
                                Enviar mensaje
                              </>
                            )}
                          </span>
                        </motion.button>

                        <p className="text-center text-xs text-(--foreground)/35 font-mono">
                          Se abrirá tu cliente de correo con el mensaje listo
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative bg-(--background) border-t border-(--foreground)/8">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm font-medium text-(--foreground)/50"
          >
            <span className="font-bold text-(--foreground)/70">CL</span>
            <motion.span
              animate={{ color: ["rgb(34,197,94)", "rgb(6,182,212)", "rgb(34,197,94)"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="font-bold"
            >
              .
            </motion.span>
            <span className="font-bold text-(--foreground)/70">Dev</span>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs text-(--foreground)/40 font-mono text-center"
          >
            © 2025 CL.Dev — Todos los derechos reservados
          </motion.p>

          {/* Back to top */}
          <motion.a
            href="#hero"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -2 }}
            className="text-xs font-mono text-(--foreground)/40 hover:text-cyan-400 transition-colors duration-200"
          >
            ↑ Volver arriba
          </motion.a>
        </div>
      </footer>
    </>
  );
}
