"use client";

import React from "react";

interface SlipItem {
  fileName: string;
  category: string;
  amount: string;
  comment: string;
}

interface TripExpensesProps {
  slips: SlipItem[];
  removeSlip: (index: number) => void;
  updateSlipField: (index: number, field: keyof SlipItem, value: string) => void;
  expenseSlipRef: React.RefObject<HTMLInputElement | null>;
}

export default function TripExpenses({
  slips,
  removeSlip,
  updateSlipField,
  expenseSlipRef,
}: TripExpensesProps) {
  return (
    <div className="bg-[var(--background)] border border-[var(--border)] rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 space-y-6 w-full lg:min-h-[720px] transition-colors">
      <div className="flex justify-between items-center text-[var(--text-muted)] text-[11px] font-black uppercase tracking-widest">
        <span>💸 TRIP EXPENSES</span>
        <button type="button" className="text-[var(--text-muted)] hover:text-[var(--foreground)] text-[10px] font-bold tracking-wider transition-colors">
          + ADD EXPENSE
        </button>
      </div>

      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 sm:p-6 space-y-5 w-full">
        
        <div className="flex items-center justify-end w-full">
          <button 
            type="button"
            onClick={() => expenseSlipRef.current?.click()}
            className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg hover:text-[var(--foreground)] transition-colors shrink-0 shadow-sm flex items-center gap-1 cursor-pointer"
          >
            {slips.length > 0 ? `↑ UPLOAD (${slips.length})` : "↑ UPLOAD PO"}
          </button>
        </div>

        {slips.length > 0 ? (
          <div className="space-y-6 pt-2 max-h-[520px] overflow-y-auto pr-1">
            {slips.map((slip, i) => (
              <div key={i} className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-4 space-y-4 relative">
                
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] border-b border-[var(--border)] pb-2">
                  <span className="truncate max-w-[85%] font-bold">📎 {slip.fileName}</span>
                  <button
                    type="button"
                    onClick={() => removeSlip(i)}
                    className="text-red-500 font-bold hover:text-red-700 font-sans transition-colors cursor-pointer text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">CATEGORY</label>
                    <input 
                      type="text"
                      placeholder="Petrol / Snacks"
                      value={slip.category}
                      onChange={(e) => updateSlipField(i, "category", e.target.value)}
                      className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-2 text-xs font-bold text-[var(--foreground)] placeholder-[var(--text-muted)]/50 outline-none focus:border-[var(--border-hover)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">AMOUNT</label>
                    <input 
                      type="text"
                      placeholder="0.00"
                      value={slip.amount}
                      onChange={(e) => updateSlipField(i, "amount", e.target.value)}
                      className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-2 text-xs font-bold text-[var(--success)] placeholder-[var(--success)]/40 outline-none focus:border-[var(--border-hover)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">COMMENT / NOTE</label>
                  <input
                    type="text"
                    placeholder="What was this specific expense for?"
                    value={slip.comment}
                    onChange={(e) => updateSlipField(i, "comment", e.target.value)}
                    className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-2 text-xs font-medium text-[var(--foreground)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--border-hover)] transition-colors"
                  />
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-[var(--border)] rounded-xl text-xs text-[var(--text-muted)] font-medium">
            No slips uploaded yet. Click upload above to begin adding individual expenses.
          </div>
        )}

      </div>
    </div>
  );
}