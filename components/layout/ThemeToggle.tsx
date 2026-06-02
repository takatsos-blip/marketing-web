"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes"; // 👈 Connects directly to our new global theme provider

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevents Next.js layout flashing by waiting until browser mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Elegant skeleton placeholder matching your exact dimensions while loading
    return (
      <div className="w-[84px] h-[42px] rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 animate-pulse" />
    );
  }

  // resolvedTheme safely figures out if "system" preference is evaluating to dark or light
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer text-sm font-medium text-zinc-800 dark:text-zinc-200 flex items-center justify-center min-w-[84px]"
      aria-label="Toggle Theme"
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}