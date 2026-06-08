"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getUpcomingDeadlines, DeadlineItem } from "@/lib/firebaseUtils";

export default function AdminDashboardPage() {
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      const data = await getUpcomingDeadlines();
      setDeadlines(data);
      setLoading(false);
    }
    loadDashboardData();
  }, []);

  return (
    /* STABILIZED: Mapped to background layout tokens */
    <div className="min-h-screen w-full bg-gradient-to-b from-[var(--background-variant)] to-[var(--background)] text-[var(--foreground)] flex flex-col antialiased">
      
      {/* HEADER */}
      {/* STABILIZED: Changed border-border/60 to use system border variable and background variables */}
      <header className="w-full border-b border-[var(--border)] bg-[var(--card-bg)]/40 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* STABILIZED: Replaced hardcoded neutral-200/700 gradients with system contrast elements */}
          <div className="w-8 h-8 rounded-lg bg-[var(--foreground)] flex items-center justify-center text-[var(--background)] font-black text-sm shadow-sm ring-1 ring-white/10">
            M
          </div>
          <span className="font-semibold tracking-tight text-sm bg-gradient-to-r from-[var(--foreground)] to-[var(--text-muted)] bg-clip-text text-transparent">
            Marketing Operation Hub
          </span>
        </div>
        
        {/* STABILIZED: Shifted text-muted-foreground and hover states to design system parameters */}
        <Link
          href="/"
          className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] border border-[var(--border)] px-3.5 py-1.5 rounded-lg bg-[var(--card-bg)]/60 hover:bg-[var(--background-variant)] transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow"
        >
          Return to Homepage
        </Link>
      </header>

      {/* MAIN CONTENT CANVAS */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
        
        <div className="relative pb-2">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] bg-gradient-to-r from-[var(--foreground)] to-[var(--text-muted)] bg-clip-text mb-1.5">
            Admin Dashboard
          </h1>
          <p className="text-sm text-[var(--text-muted)] font-normal max-w-2xl leading-relaxed">
            Welcome back.
          </p>
        </div>

        {/* 1. Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card: Trainings */}
          {/* STABILIZED: Changed background, borders, and hover highlights to match global theme tokens */}
          <div className="group relative p-6 rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--card-bg)] to-[var(--background-variant)] flex flex-col justify-between items-start gap-6 hover:border-[var(--border-hover)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
            <div className="w-full">
              {/* STABILIZED: Removed bg-muted utilities for semantic tokens */}
              <div className="w-10 h-10 rounded-xl bg-[var(--background-variant)] border border-[var(--border)] text-base flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                🎓
              </div>
              <h3 className="text-base font-semibold text-[var(--foreground)] tracking-tight mb-1">Trainings</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">Launch a new education course or dynamic workshop.</p>
            </div>
            <Link
              href="/dashboard/create-training"
              
              className="w-full md:w-auto text-center text-xs font-medium bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl hover:bg-[var(--primary-hover)] focus:ring-4 focus:ring-[var(--primary-focus)] transition-all duration-200 shadow-sm tracking-wide group-hover:translate-x-0.5"
            >
              Create Training
            </Link>
          </div>

          {/* Card: Events */}
          <div className="group relative p-6 rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--card-bg)] to-[var(--background-variant)] flex flex-col justify-between items-start gap-6 hover:border-[var(--border-hover)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
            <div className="w-full">
              <div className="w-10 h-10 rounded-xl bg-[var(--background-variant)] border border-[var(--border)] text-base flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                🗓️
              </div>
              <h3 className="text-base font-semibold text-[var(--foreground)] tracking-tight mb-1">Events</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">Schedule a new community summit or conference.</p>
            </div>
            <Link
              href="/dashboard/create-event"
              className="w-full md:w-auto text-center text-xs font-medium bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl hover:bg-[var(--primary-hover)] focus:ring-4 focus:ring-[var(--primary-focus)] transition-all duration-200 shadow-sm tracking-wide group-hover:translate-x-0.5"
            >
              Create Event
            </Link>
          </div>

        </div>

        {/* 2. Live Upcoming Deadlines Section */}
        <div className="border border-[var(--border)] rounded-2xl bg-[var(--card-bg)]/60 backdrop-blur-sm overflow-hidden shadow-sm">
          <div className="px-6 py-4.5 border-b border-[var(--border)] bg-[var(--background-variant)] flex justify-between items-center">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--warning)] animate-pulse" />
              Upcoming Deadlines
              <span className="text-[11px] font-normal normal-case opacity-60 ml-1">(Next 14 Days)</span>
            </h3>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-xs text-[var(--text-muted)] font-medium py-8 animate-pulse flex items-center justify-center gap-2.5">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking system dates...
              </div>
            ) : deadlines.length === 0 ? (
              /* STABILIZED: Replaced bg-muted templates with global variant background variables */
              <div className="text-xs text-[var(--text-muted)] py-10 text-center bg-[var(--background-variant)] rounded-xl border border-dashed border-[var(--border)]">
                No schedules ending within the next 2 weeks.
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]/40 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                {deadlines.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-4 text-xs first:pt-0 last:pb-0 hover:bg-[var(--background-variant)] px-2 -mx-2 rounded-lg transition-colors duration-150">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wider border shrink-0 ${
                        item.type === 'Training'
                          ? 'bg-[var(--primary-focus)] text-[var(--primary)] border-[var(--primary-focus)]'
                          : 'bg-[var(--card-bg)] text-[var(--foreground)] border-[var(--border)]'
                      }`}>
                        {item.type}
                      </span>
                      <span className="font-medium text-[var(--foreground)] truncate max-w-[180px] sm:max-w-md">{item.title}</span>
                    </div>
                    <span className="font-mono text-[11px] font-medium text-[var(--destructive)] bg-[var(--destructive-bg)] border border-[var(--destructive-border)] px-2.5 py-0.5 rounded-md shadow-2xs shrink-0">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}