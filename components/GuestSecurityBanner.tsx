// components/GuestSecurityBanner.tsx
import React from "react";
import Link from "next/link";

export default function GuestSecurityBanner() {
  return (
    <div className="w-full bg-[var(--warning-bg)] border border-[var(--warning-border)] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h4 className="text-sm font-bold text-[var(--warning)]">
          ⚠️ Secure Guest Mode Active
        </h4>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          You are viewing a read-only node of the Event & Campaign Assistant. Action updates are restricted.
        </p>
      </div>
      <Link 
        href="/auth/login" 
        className="text-xs font-semibold bg-[var(--background-variant)] hover:bg-[var(--card-bg)] border border-[var(--border)] px-4 py-2 rounded-xl text-center transition-colors"
      >
        Switch Account
      </Link>
    </div>
  );
}