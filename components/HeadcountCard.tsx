"use client";

import React from "react";

interface HeadcountCardProps {
  internalStaff: string;
  setInternalStaff: (value: string) => void;
  externalGuests: string;
  setExternalGuests: (value: string) => void;
  totalHeadcount: number;
  loading: boolean;
}

export default function HeadcountCard({
  internalStaff,
  setInternalStaff,
  externalGuests,
  setExternalGuests,
  totalHeadcount,
  loading,
}: HeadcountCardProps) {
  return (
    <div className="bg-[var(--background)] border border-[var(--border)] rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 space-y-6 w-full lg:min-h-[720px] flex flex-col justify-between transition-colors">
      <div className="space-y-6 w-full">
        <div className="flex justify-between items-center text-[var(--text-muted)] text-[11px] font-black uppercase tracking-widest">
          <span>👥 HEADCOUNT</span>
          <span className="bg-[var(--background-variant)] text-[var(--text-muted)] border border-[var(--border)] text-[10px] font-bold px-3 py-1 rounded-full">
            Total: {totalHeadcount}
          </span>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 sm:p-5 flex justify-between items-center group w-full transition-colors">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">INTERNAL STAFF</span>
          <input 
            type="number"
            value={internalStaff}
            onChange={(e) => setInternalStaff(e.target.value)}
            className="bg-transparent text-right text-xl font-black font-mono text-[var(--foreground)] outline-none w-16"
          />
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 sm:p-5 flex justify-between items-center group w-full transition-colors">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">EXTERNAL GUESTS</span>
          <input 
            type="number"
            value={externalGuests}
            onChange={(e) => setExternalGuests(e.target.value)}
            className="bg-transparent text-right text-xl font-black font-mono text-[var(--foreground)] outline-none w-16"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-[var(--border)] w-full space-y-3">
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 font-black text-xs uppercase tracking-widest p-4 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-40"
        >
          {loading ? "SAVING CONFIGURATION..." : "💾 SAVE CONFIGURATION"}
        </button>
        <p className="text-[10px] text-[var(--text-muted)] text-center font-medium">
          Submitting syncs options across core layout tables.
        </p>
      </div>
    </div>
  );
}