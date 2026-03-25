# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build (runs TypeScript + ESLint checks)
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Stack

- **Next.js** (App Router) · **TypeScript** · **Tailwind CSS v4** · **Framer Motion** · **next-themes**
- Path alias: `@/*` → `./src/*`
- Tailwind v4 uses **CSS-first config** — no `tailwind.config.js`. All customization lives in `src/app/globals.css` via `@import "tailwindcss"` and CSS variables.

## Architecture

Single-page portfolio with one route (`src/app/page.tsx`) that stacks all sections in order: `Navbar → Hero → About → Stack → Projects → Contact` (Contact also renders the footer via a Fragment).

All sections are client components (`"use client"`) due to Framer Motion and interactive state. The only server component is the root layout and page.

```
src/
├── app/
│   ├── layout.tsx        # Root layout, wraps with Providers
│   ├── page.tsx          # Composes all sections
│   ├── providers.tsx     # next-themes ThemeProvider (defaultTheme: "dark", attribute: "class")
│   └── globals.css       # CSS variables, Tailwind import, light-mode overrides
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Stack.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx       # Also exports the <footer> via a Fragment
│   └── ui/
│       ├── Atom.tsx      # Animated SVG atom decoration
│       └── ThemeToggle.tsx
└── public/images/
    ├── logo-original.png
    └── projects/         # Project screenshot PNGs (used in Projects.tsx cards)
```

## Theming System

Dark/light mode uses `next-themes` with `attribute="class"`. The `.dark` class is applied to `<html>`.

**All colors must come from CSS variables**, not hardcoded Tailwind color classes, so they respond to theme changes:
- Use `text-(--foreground)`, `bg-(--background)`, `border-(--foreground)/10`, etc.
- CSS variables are defined in `globals.css` under `:root` (light) and `.dark`

**Light mode color problem:** Tailwind's `text-cyan-400`, `text-emerald-400`, etc. are too light on white backgrounds. `globals.css` overrides them for light mode via `:root:not(.dark) .text-cyan-400 { color: #0891b2; }`. When adding new colored text classes, check if a light-mode override is needed. Currently overridden: `text-cyan-400`, `text-emerald-400`, `text-green-400`, `text-indigo-400`, `text-cyan-500`.

**Gradient text in light mode:** Titles use `from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent`. The gradient CSS variables are also overridden in `globals.css` for light mode so they render with enough contrast.

## Framer Motion Patterns

**Scroll entrance (used in every section header and card):**
```tsx
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
```

**Staggered children** — add `delay: index * 0.1` to the transition.

**3D card tilt** (Projects.tsx) — mouse position → `useMotionValue` → `useTransform` → `useSpring` for smooth `rotateX`/`rotateY`. Cursor-reactive glow uses `useMotionTemplate` to build a reactive `radial-gradient` string.

**Do not use `blur` in Framer Motion `animate` props** — it is not in `TargetAndTransition`. Use Tailwind's `blur-*` classes for static blur, or `filter` via inline style for animated blur.

**Avoid duplicate `transition` props** on the same motion element. Merge per-property transitions into a single `transition` object using keyed syntax: `transition={{ y: { type: "spring" }, opacity: { duration: 0.5 } }}`.

## Contact Form

The form in `Contact.tsx` uses a `mailto:` approach — on submit it constructs a `mailto:cf.devmendoza@gmail.com?subject=...&body=...` URL and calls `window.location.href`. No backend or third-party form service is involved.

## Images

Project preview images live in `public/images/projects/`. One filename has a space: `control _de_gastos.png` — reference it exactly as-is in `src` props; Next.js handles URL encoding automatically.
