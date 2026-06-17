import React from "react";
import Link from "next/link";

// This defines the structure for our button links
interface CardAction {
  label: string;
  href: string;
}

// This defines what information the card needs to receive
interface DashboardCardProps {
  icon: string;
  title: string;
  description: string;
  actions: CardAction[];
}

export default function DashboardCard({ icon, title, description, actions }: DashboardCardProps) {
  return (
    <div className="group relative p-6 rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--card-bg)] to-[var(--background-variant)] flex flex-col justify-between items-start gap-6 hover:border-[var(--border-hover)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
      <div className="w-full">
        {/* Icon container */}
        <div className="w-10 h-10 rounded-xl bg-[var(--background-variant)] border border-[var(--border)] text-base flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
          {icon}
        </div>
        {/* Title & Description */}
        <h3 className="text-base font-semibold text-[var(--foreground)] tracking-tight mb-1">{title}</h3>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{description}</p>
      </div>
      
      {/* Dynamic Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="w-full sm:flex-1 text-center text-xs font-medium bg-[var(--primary)] text-white px-4 py-2.5 rounded-xl hover:bg-[var(--primary-hover)] focus:ring-4 focus:ring-[var(--primary-focus)] transition-all duration-200 shadow-sm tracking-wide"
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}