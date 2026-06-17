import React from "react";
import Link from "next/link";

export default function PublicMasterSchedulePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[var(--background-variant)] to-[var(--background)] text-[var(--foreground)] flex flex-col antialiased">
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-1.5">
              📅 Master Schedule
            </h1>
            <p className="text-sm text-[var(--text-muted)] font-normal max-w-2xl leading-relaxed">
              The comprehensive global timeline displaying all active tracks, training workshops, registration deadlines, and configurations.
            </p>
          </div>
          
          {/* Back to Dashboard Navigation */}
          <Link 
            href="/dashboard"
            className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors border border-[var(--border)] px-4 py-2 rounded-xl bg-[var(--card-bg)]/40 backdrop-blur-sm self-start sm:self-center"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Content Section Placeholder */}
        <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-[var(--border)] rounded-2xl bg-[var(--card-bg)]/40 backdrop-blur-sm text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
            Timeline Initialization Pending
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-xs leading-relaxed">
            The consolidated master system schedule is empty. All new registration dates and timelines will sync directly to this feed upon creation.
          </p>
        </div>

      </main>
    </div>
  );
}