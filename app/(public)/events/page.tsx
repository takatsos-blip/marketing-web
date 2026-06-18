"use client";

import React, { useEffect, useState } from "react";
import LinkComponent from "next/link";
import { db } from "@/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

interface SlipItem {
  fileName: string;
  category: string;
  amount: string;
  comment: string;
}

interface EventItem {
  id: string;
  title: string;
  date: string;
  internalStaff: number;
  externalGuests: number;
  approvals: {
    venue: boolean;
    transport: boolean;
  };
  attachments: {
    venue: string[];
    transport: string[];
    slips: SlipItem[];
  };
  createdAt: string;
}

export default function PublicEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference the exact same Firestore collection where your admin panel writes data
    const eventsCollection = collection(db, "events");
    const q = query(eventsCollection, orderBy("createdAt", "desc"));

    // Set up a real-time stream subscription
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedEvents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as EventItem[];

        setEvents(fetchedEvents);
        setLoading(false);
      },
      (error) => {
        console.error("Error streaming dynamic public events registry:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[var(--background-variant)] to-[var(--background)] text-[var(--foreground)] flex flex-col antialiased">
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-1.5">
              🗓️ Events Directory
            </h1>
            <p className="text-sm text-[var(--text-muted)] font-normal max-w-2xl leading-relaxed">
              Browse upcoming community summits, assemblies, conferences, and collaborative meetups.
            </p>
          </div>
          
          {/* Back to Dashboard Navigation */}
          <LinkComponent 
            href="/dashboard"
            className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors border border-[var(--border)] px-4 py-2 rounded-xl bg-[var(--card-bg)]/40 backdrop-blur-sm self-start sm:self-center"
          >
            ← Back to Dashboard
          </LinkComponent>
        </div>

        {/* Content Section - Dynamic Live Firestore Loop */}
        {loading ? (
          <div className="text-center py-20 text-xs font-mono text-[var(--text-muted)] tracking-widest animate-pulse">
            SYNCHRONIZING WITH LIVE EVENTS REGISTRY...
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-[var(--border)] rounded-2xl bg-[var(--card-bg)]/40 backdrop-blur-sm text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
              No Upcoming Events Listed
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-xs leading-relaxed">
              There are no live scheduling instances right now. Check back soon or visit the admin center to build a brand new calendar entry.
            </p>
          </div>
        ) : (
          /* Sleek Public Grid Display */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start">
            {events.map((event) => {
              const totalHeadcount = (event.internalStaff || 0) + (event.externalGuests || 0);
              
              // Safely isolate the expense total reduction out of the JSX template
              const totalExpenses = (event.attachments?.slips || []).reduce(
                (acc, s) => acc + (parseFloat(s.amount) || 0), 
                0
              );

              return (
                <div 
                  key={event.id}
                  className="bg-[var(--card-bg)]/40 backdrop-blur-sm border border-[var(--border)] rounded-2xl p-6 space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-[var(--foreground)] tracking-tight">
                        {event.title || "Untitled Allocation"}
                      </h3>
                      <span className="text-[10px] bg-[var(--background-variant)] border border-[var(--border)] font-mono text-[var(--text-muted)] px-2 py-0.5 rounded">
                        {event.id.slice(0, 5).toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] font-medium font-mono">
                      📅 Date: {event.date ? new Date(event.date).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }) : "Not Slotted"}
                    </p>
                  </div>

                  {/* Operational Summaries for Public View */}
                  <div className="bg-[var(--background)]/60 border border-[var(--border)] rounded-xl p-3 flex justify-between text-left">
                    <div>
                      <span className="block text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-wider">TOTAL EXPENSES</span>
                      <span className="text-sm font-black text-[var(--success)]">
                        R {totalExpenses.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-wider">EXPECTED HEADCOUNT</span>
                      <span className="text-sm font-black text-[var(--foreground)] font-mono">{totalHeadcount} Attendees</span>
                    </div>
                  </div>

                  {/* Tiny Badges for status check */}
                  <div className="flex gap-2 pt-1">
                    <span className={`text-[8px] font-extrabold tracking-wider px-2 py-1 rounded border uppercase R{
                      event.approvals?.venue ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-orange-500/10 border-orange-500/20 text-orange-400"
                    }`}>
                      🏛️ Venue {event.approvals?.venue ? "Ready" : "Pending"}
                    </span>
                    <span className={`text-[8px] font-extrabold tracking-wider px-2 py-1 rounded border uppercase R{
                      event.approvals?.transport ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-orange-500/10 border-orange-500/20 text-orange-400"
                    }`}>
                      🚙 Transport {event.approvals?.transport ? "Ready" : "Pending"}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
}