"use client";

import React from "react";
// Import our new component (adjust the path if your folder structure is different)
import GuestSecurityBanner from "@/components/GuestSecurityBanner"; 

export default function GuestAssistantPage() {
  const sampleTasks = [
    { id: 1, task: "Define multi-channel campaign objectives", status: "Completed" },
    { id: 2, task: "Generate AI social copy variants (Twitter/LinkedIn)", status: "Completed" },
    { id: 3, task: "Setup email newsletter automation cadence", status: "In Progress" },
    { id: 4, task: "Finalize creative design assets for launch", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6 sm:p-10 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col gap-8">
        
        {/* Clean & Modularized Banner */}
        <GuestSecurityBanner />

        {/* Dashboard Title Header */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-[var(--primary)] tracking-wider uppercase">
            CAMPAIGN PLANNING
          </span>
          <h1 className="text-3xl font-black tracking-tight">
            Event & Campaign Assistant
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            An AI-powered checklist partner tracking marketing details across nodes.
          </p>
        </div>

        {/* Mockup Data Content Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Task List Node */}
          <div className="glass md:col-span-2 bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-3xl flex flex-col gap-4 shadow-sm">
            <h3 className="text-lg font-bold">Active Planning Matrix</h3>
            
            <div className="flex flex-col gap-3 mt-2">
              {sampleTasks.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-4 rounded-xl bg-[var(--background-variant)] border border-[var(--border)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md border border-[var(--border)] bg-[var(--disabled)] flex items-center justify-center text-[10px] text-[var(--text-disabled)]">
                      🔒
                    </div>
                    <span className="text-sm font-medium opacity-80">{item.task}</span>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    item.status === "Completed" ? "bg-[var(--success-bg)] text-[var(--success)] border border-[var(--success-border)]" :
                    item.status === "In Progress" ? "bg-[var(--primary-focus)] text-[var(--primary)]" :
                    "bg-[var(--disabled)] text-[var(--text-muted)]"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Module: Restricted Actions Preview */}
          <div className="glass bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-3xl flex flex-col gap-5 shadow-sm justify-between">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold">AI Companion Engine</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Enter complex criteria models to generate a localized strategic roadmap.
              </p>
              
              <textarea 
                disabled
                placeholder="Ask AI to adjust schedules... (Locked for Guest)" 
                className="w-full h-24 bg-[var(--background-variant)] border border-[var(--border)] rounded-xl p-3 text-xs opacity-60 resize-none cursor-not-allowed outline-none text-[var(--foreground)] placeholder:text-[var(--text-disabled)]"
              />
            </div>

            <button 
              disabled 
              type="button" 
              className="w-full bg-[var(--disabled)] text-[var(--text-disabled)] text-xs font-semibold py-3.5 rounded-xl cursor-not-allowed flex items-center justify-center gap-2 border border-[var(--border)]"
            >
              <span>🔒 Engine Interlocked</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}