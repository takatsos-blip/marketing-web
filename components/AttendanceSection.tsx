"use client";

import React from "react";

interface AttendanceSectionProps {
  internalStaff: number;
  setInternalStaff: (val: number) => void;
  externalGuests: number;
  setExternalGuests: (val: number) => void;
}

export default function AttendanceSection({
  internalStaff,
  setInternalStaff,
  externalGuests,
  setExternalGuests,
}: AttendanceSectionProps) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[32px] p-8 flex flex-col gap-6 backdrop-blur-md">
      <div className="flex items-center gap-2 text-[var(--text-muted)] text-[11px] font-bold tracking-widest uppercase">
        <span className="text-sm">👥</span> ATTENDANCE
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {/* Internal Staff counter */}
        <div className="flex items-center justify-between bg-[var(--background-variant)] border border-[var(--border)] rounded-2xl p-5">
          <span className="text-[11px] font-black tracking-wider text-[var(--foreground)] opacity-90">
            INTERNAL STAFF
          </span>
          <input
            type="number"
            value={internalStaff}
            onChange={(e) => setInternalStaff(Number(e.target.value))}
            className="w-16 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl py-2 text-center text-sm font-bold focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        {/* External Guests counter */}
        <div className="flex items-center justify-between bg-[var(--background-variant)] border border-[var(--border)] rounded-2xl p-5">
          <span className="text-[11px] font-black tracking-wider text-[var(--foreground)] opacity-90">
            EXTERNAL GUESTS
          </span>
          <input
            type="number"
            value={externalGuests}
            onChange={(e) => setExternalGuests(Number(e.target.value))}
            className="w-16 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl py-2 text-center text-sm font-bold focus:outline-none focus:border-[var(--primary)]"
          />
        </div>
      </div>
    </div>
  );
}