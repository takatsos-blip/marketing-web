import React from "react";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="w-full border-b border-[var(--border)] bg-[var(--card-bg)]/40 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[var(--foreground)] flex items-center justify-center text-[var(--background)] font-black text-sm shadow-sm ring-1 ring-white/10">
          M
        </div>
        <span className="font-semibold tracking-tight text-sm bg-gradient-to-r from-[var(--foreground)] to-[var(--text-muted)] bg-clip-text text-transparent">
          Marketing Operation Hub
        </span>
      </div>
      
      <Link
        href="/"
        className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] border border-[var(--border)] px-3.5 py-1.5 rounded-lg bg-[var(--card-bg)]/60 hover:bg-[var(--background-variant)] transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow"
      >
        Return to Homepage
      </Link>
    </header>
  );
}