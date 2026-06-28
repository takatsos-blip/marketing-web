"use client";

import React from "react";

interface SiteLogisticsSectionProps {
  venue: string;
  setVenue: (val: string) => void;
  startTime: string;
  setStartTime: (val: string) => void;
  endTime: string;
  setEndTime: (val: string) => void;
  foodRequired: boolean;
  setFoodRequired: (val: boolean) => void;
  foodVendor: string;
  setFoodVendor: (val: string) => void;
  foodOrderTime: string;
  setFoodOrderTime: (val: string) => void;
}

export default function SiteLogisticsSection({
  venue,
  setVenue,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  foodRequired,
  setFoodRequired,
  foodVendor,
  setFoodVendor,
  foodOrderTime,
  setFoodOrderTime,
}: SiteLogisticsSectionProps) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[32px] p-8 flex flex-col gap-6 backdrop-blur-md">
      <div className="flex items-center gap-2 text-[var(--text-muted)] text-[11px] font-bold tracking-widest uppercase">
        <span className="text-sm">📍</span> SITE LOGISTICS
      </div>
      
      <div className="flex flex-col gap-4 mt-2">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Venue" 
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full bg-[var(--background-variant)] border border-[var(--border)] rounded-2xl p-4 text-sm focus:outline-none focus:border-[var(--primary)] hover:border-[var(--border-hover)] placeholder:text-[var(--text-disabled)] text-[var(--foreground)] transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative flex items-center bg-[var(--background-variant)] border border-[var(--border)] rounded-2xl px-4 py-3.5">
            <input 
              type="text" 
              placeholder="--:-- --" 
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none placeholder:text-[var(--text-disabled)] text-[var(--foreground)]"
            />
            <span className="text-[var(--text-muted)] text-xs">🕒</span>
          </div>
          <div className="relative flex items-center bg-[var(--background-variant)] border border-[var(--border)] rounded-2xl px-4 py-3.5">
            <input 
              type="text" 
              placeholder="--:-- --" 
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none placeholder:text-[var(--text-disabled)] text-[var(--foreground)]"
            />
            <span className="text-[var(--text-muted)] text-xs">🕒</span>
          </div>
        </div>

        {/* Food Sub-Section Card */}
        <div className="bg-[var(--background-variant)] border border-[var(--card-border)] rounded-2xl p-5 mt-2 border-l-2 border-l-[var(--primary)]">
          <label className="flex items-center justify-between cursor-pointer group/food">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold tracking-wide">Catering / Food Logistics</span>
              <span className="text-[10px] text-[var(--text-muted)]">Is food required for this training?</span>
            </div>
            <input 
              type="checkbox" 
              checked={foodRequired} 
              onChange={(e) => setFoodRequired(e.target.checked)} 
              className="w-4 h-4 rounded [accent-color:var(--primary)] cursor-pointer"
            />
          </label>

          {foodRequired && (
            <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-col gap-3 transition-all">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Restaurant Name" 
                  value={foodVendor}
                  onChange={(e) => setFoodVendor(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-3 text-xs focus:outline-none focus:border-[var(--primary)] placeholder:text-[var(--text-disabled)] text-[var(--foreground)]"
                />
              </div>
              <div className="relative flex items-center bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2.5">
                <input 
                  type="text" 
                  placeholder="Order date" 
                  value={foodOrderTime}
                  onChange={(e) => setFoodOrderTime(e.target.value)}
                  className="w-full bg-transparent text-xs focus:outline-none placeholder:text-[var(--text-disabled)] text-[var(--foreground)]"
                />
                <span className="text-[var(--text-muted)] text-xs ml-1">🍱</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}