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
      <div className="w-[84px] h-[42px] rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] animate-pulse" />
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
      className="p-2.5 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--border)] border border-[var(--card-border)] transition-colors cursor-pointer text-sm font-medium text-[var(--foreground)] flex items-center justify-center min-w-[84px]"
      aria-label="Toggle Theme"
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}