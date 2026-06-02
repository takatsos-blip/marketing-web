"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getUpcomingDeadlines, DeadlineItem } from "@/lib/firebaseUtils";

export default function AdminDashboardPage() {
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Read live data from Firebase when the page loads
  useEffect(() => {
    async function loadDashboardData() {
      const data = await getUpcomingDeadlines();
      setDeadlines(data);
      setLoading(false);
    }
    loadDashboardData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] p-6 text-center text-[var(--foreground)]">
      {/* Main Container matching your original glass styling */}
      <div className="max-w-2xl w-full glass bg-[var(--card-bg)] p-8 rounded-3xl border border-[var(--card-border)] shadow-xl">
        
        <span className="text-xs font-bold text-[var(--success)] uppercase tracking-widest">
          Secure Core Node
        </span>
        
        <h1 className="text-3xl font-black mt-2 mb-2 text-[var(--foreground)]">
          Admin Dashboard
        </h1>
        
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Welcome back, Master Controller. You have full write permissions across all campaign and production pipelines.
        </p>

        {/* 1. Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
          <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--background-variant)] flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold mb-1">Trainings</h3>
              <p className="text-[11px] text-[var(--text-disabled)] mb-3">Launch a new education course or dynamic workshop.</p>
            </div>
            <Link 
              href="/dashboard/create-training" 
              className="text-center text-xs font-semibold bg-[var(--primary)] text-[var(--background)] px-4 py-2.5 rounded-xl hover:bg-[var(--primary-hover)] transition-colors"
            >
              Create Training
            </Link>
          </div>

          <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--background-variant)] flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold mb-1">Events</h3>
              <p className="text-[11px] text-[var(--text-disabled)] mb-3">Schedule a new community summit or conference.</p>
            </div>
            <Link 
              href="/dashboard/create-event" 
              className="text-center text-xs font-semibold bg-[var(--primary)] text-[var(--background)] px-4 py-2.5 rounded-xl hover:bg-[var(--primary-hover)] transition-colors"
            >
              Create Event
            </Link>
          </div>
        </div>

        {/* 2. Live Upcoming Deadlines Section */}
        <div className="mb-8 border border-[var(--border)] rounded-2xl p-4 bg-[var(--background-variant)] text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-1.5">
            ⏳ Upcoming Deadlines <span className="text-[10px] font-normal normal-case text-[var(--text-disabled)]">(Next 14 Days)</span>
          </h3>

          {loading ? (
            <p className="text-xs text-[var(--text-disabled)] italic py-2 animate-pulse">Checking system dates...</p>
          ) : deadlines.length === 0 ? (
            <p className="text-xs text-[var(--text-disabled)] italic py-2 text-center">
              No schedules ending within the next 2 weeks.
            </p>
          ) : (
            <div className="divide-y divide-[var(--border)] max-h-48 overflow-y-auto pr-1">
              {deadlines.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 text-xs first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${
                      item.type === 'Training' 
                        ? 'bg-[var(--primary-focus)] text-[var(--primary)]' 
                        : 'bg-[var(--success-bg)] text-[var(--success)] border border-[var(--success-border)]'
                    }`}>
                      {item.type}
                    </span>
                    <span className="font-medium text-[var(--foreground)] truncate max-w-[180px] sm:max-w-[260px]">{item.title}</span>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-[var(--destructive)] bg-[var(--destructive-bg)] border border-[var(--destructive-border)] px-1.5 py-0.5 rounded">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Return Button from original code */}
        <Link 
          href="/"
          className="inline-block text-xs font-semibold bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded-xl hover:bg-[var(--primary-hover)] transition-colors w-full sm:w-auto"
        >
          Return to Website
        </Link>
      </div>
    </div>
  );
}