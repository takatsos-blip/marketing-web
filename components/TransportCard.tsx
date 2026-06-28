"use client";

import React from "react";

interface TransportCardProps {
  transportFileNames: string[];
  removeTransportFile: (index: number) => void;
  transportApproved: boolean;
  setTransportApproved: (value: boolean) => void;
  handleSendReminder: () => void;
  transportFileRef: React.RefObject<HTMLInputElement | null>;
}

export default function TransportCard({
  transportFileNames,
  removeTransportFile,
  transportApproved,
  setTransportApproved,
  handleSendReminder,
  transportFileRef,
}: TransportCardProps) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 sm:p-6 relative overflow-hidden border-l-[4px] border-l-[var(--warning)] transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-base font-black tracking-wider text-[var(--foreground)] uppercase">TRANSPORT</h3>
          <span className="text-[10px] text-[var(--text-muted)] font-bold tracking-wider uppercase block mt-0.5">
            Booking Ref / Details
          </span>
        </div>
        <span className="text-[var(--text-muted)] text-xl">🚙</span>
      </div>

      {transportFileNames.length > 0 && (
        <div className="mb-3 text-[10px] text-[var(--text-muted)] font-mono max-h-24 overflow-y-auto space-y-1.5 bg-[var(--background)] p-2 rounded-lg border border-[var(--border)]">
          {transportFileNames.map((name, i) => (
            <div key={i} className="flex items-center justify-between gap-2 group">
              <span className="truncate">📎 {name}</span>
              <button
                type="button"
                onClick={() => removeTransportFile(i)}
                className="text-red-500 font-bold hover:text-red-700 font-sans transition-colors cursor-pointer text-xs px-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full mt-4">
        <button
          type="button"
          onClick={() => setTransportApproved(!transportApproved)}
          className={`font-black text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg shrink-0 border transition-colors cursor-pointer ${
            transportApproved
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20"
              : "bg-[var(--destructive-bg)] border-[var(--destructive-border)] text-[var(--destructive)] hover:opacity-80"
          }`}
        >
          {transportApproved ? "APPROVED" : "NOT APPROVED"}
        </button>

        <button
          type="button"
          onClick={handleSendReminder}
          className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg hover:text-[var(--foreground)] transition-colors shrink-0 shadow-sm"
        >
          SEND REMINDER
        </button>

        <button
          type="button"
          onClick={() => transportFileRef.current?.click()}
          className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg hover:text-[var(--foreground)] transition-colors shrink-0 shadow-sm flex items-center gap-1 max-w-[120px] truncate"
        >
          {transportFileNames.length > 0 ? `↑ UPLOAD (${transportFileNames.length})` : "↑ UPLOAD PO"}
        </button>
      </div>
    </div>
  );
}