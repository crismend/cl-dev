"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full border border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-purple-400" />
      ) : (
        <Moon size={18} className="text-purple-600" />
      )}
    </button>
  );
}