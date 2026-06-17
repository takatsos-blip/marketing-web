import React from "react";
import Link from "next/link";

export default function ScheduleBanner() {
  return (
    <div className="border border-[var(--border)] rounded-2xl bg-[var(--card-bg)]/60 backdrop-blur-sm overflow-hidden shadow-sm">
      <div className="px-6 py-4.5 border-b border-[var(--border)] bg-[var(--background-variant)]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
          View All Upcoming Events & Trainings
        </h3>
      </div>

      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-6 px-4 bg-[var(--background-variant)] rounded-xl border border-dashed border-[var(--border)] text-center">
          <p className="text-xs text-[var(--text-muted)] max-w-md sm:text-left sm:mr-auto leading-relaxed">
            Access the complete master schedule containing all pending timelines, registration deadlines, and launch configurations.
          </p>
          
          <div className="w-full sm:w-auto shrink-0">
            <Link
              href="/master-schedule" // ✅ Updated to your public directory path!
              className="inline-block w-full sm:w-auto text-center text-xs font-semibold bg-[var(--primary)] text-white px-6 py-3 rounded-xl hover:bg-[var(--primary-hover)] focus:ring-4 focus:ring-[var(--primary-focus)] transition-all duration-200 shadow-sm tracking-wide whitespace-nowrap"
            >
              View All Trainings & Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}