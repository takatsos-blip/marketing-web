"use client";

import React from "react";

interface ApprovalButtonGroupProps {
  sectionName: string;
  isExpanded: boolean;
  isApproved: boolean;
  onToggleExpand: () => void;
  onToggleApproval: () => void;
  onSendReminder: (sectionName: string) => void;
}

export default function ApprovalButtonGroup({
  sectionName,
  isExpanded,
  isApproved,
  onToggleExpand,
  onToggleApproval,
  onSendReminder,
}: ApprovalButtonGroupProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full">
      {/* Dynamic Status Badge (Clickable) */}
      <button 
        type="button" 
        onClick={onToggleApproval}
        className={`font-black text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg shrink-0 border transition-colors cursor-pointer ${
          isApproved 
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20" 
            : "bg-[var(--destructive-bg)] border-[var(--destructive-border)] text-[var(--destructive)] hover:opacity-80"
        }`}
      >
        {isApproved ? "APPROVED" : "NOT APPROVED"}
      </button>

      {/* Reminder Trigger */}
      <button 
        type="button" 
        onClick={() => onSendReminder(sectionName)}
        className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg hover:text-[var(--foreground)] transition-colors shrink-0 shadow-sm"
      >
        SEND REMINDER
      </button>

      {/* Expand/Hide Details Toggle */}
      <button 
        type="button"
        onClick={onToggleExpand}
        className="text-[9px] text-[var(--text-muted)] font-bold hover:text-[var(--foreground)] transition-colors ml-auto uppercase tracking-wider"
      >
        {isExpanded ? "- HIDE" : "+ DETAILS"}
      </button>
    </div>
  );
}