"use client";

import React from "react";

interface BookingCardProps {
  title: string;
  icon: string;
  borderColorClass: string; // e.g., 'border-l-[var(--warning)]' or 'border-l-[var(--primary)]'
  focusColorClass: string;   // e.g., 'focus:border-[var(--warning)]' or 'focus:border-[var(--primary)]'
  reference: string;
  setReference: (val: string) => void;
  status: string;
  setStatus: (val: string | ((prev: string) => string)) => void;
  showDetails: boolean;
  setShowDetails: (val: boolean) => void;
  onSendReminder: () => void;
}

export default function BookingCard({
  title,
  icon,
  borderColorClass,
  focusColorClass,
  reference,
  setReference,
  status,
  setStatus,
  showDetails,
  setShowDetails,
  onSendReminder,
}: BookingCardProps) {
  return (
    <div className={`bg-[var(--background-variant)] border border-[var(--card-border)] rounded-2xl p-5 border-l-2 ${borderColorClass}`}>
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-sm font-bold tracking-wide">{title}</h3>
        <span className="text-base">{icon}</span>
      </div>
      <input 
        type="text" 
        placeholder="Booking Ref / Details" 
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        className={`w-full bg-transparent text-xs text-[var(--text-muted)] border-b border-[var(--border)] py-1 mb-4 focus:outline-none text-[var(--foreground)] ${focusColorClass}`}
      />
      <div className="grid grid-cols-3 gap-2 text-[9px] font-bold tracking-wider text-center">
        <button 
          type="button"
          onClick={() => setStatus(prev => prev === "NOT APPROVED" ? "APPROVED" : "NOT APPROVED")}
          className={`py-2.5 rounded-lg font-bold select-none border transition-all ${
            status === "APPROVED" 
              ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-800" 
              : "bg-[var(--destructive-bg)] text-[var(--destructive)] border-[var(--destructive-border)]"
          }`}
        >
          {status}
        </button>
        
        <button 
          type="button" 
          onClick={onSendReminder}
          className="bg-[var(--background)] border border-[var(--border)] py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[var(--disabled)] transition-colors text-[var(--foreground)]"
        >
          SEND REMINDER
        </button>

        <button 
          type="button" 
          onClick={() => setShowDetails(!showDetails)}
          className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] py-2.5 rounded-lg hover:bg-[var(--disabled)] transition-colors"
        >
          {showDetails ? "HIDE DETAILS" : "+ ADD DETAILS"}
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-col gap-1.5 transition-all">
          <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Upload PO Document</span>
          <input 
            type="file" 
            className="w-full text-xs text-[var(--text-muted)] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[9px] file:font-bold file:bg-[var(--background)] file:text-[var(--foreground)] file:hover:bg-[var(--disabled)] cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}