"use client";

import React from "react";
import Link from "next/link";

export default function GuestAssistantPage() {
  // Sample read-only checklist items to show how the Campaign Assistant functions
  const sampleTasks = [
    { id: 1, task: "Define multi-channel campaign objectives", status: "Completed" },
    { id: 2, task: "Generate AI social copy variants (Twitter/LinkedIn)", status: "Completed" },
    { id: 3, task: "Setup email newsletter automation cadence", status: "In Progress" },
    { id: 4, task: "Finalize creative design assets for launch", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-10 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col gap-8">
        
        {/* Guest Security Notice Banner */}
        <div className="w-full bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400">
              ⚠️ Secure Guest Mode Active
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              You are viewing a read-only node of the Event & Campaign Assistant. Action updates are restricted.
            </p>
          </div>
          <Link 
            href="/auth/login" 
            className="text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-center transition-colors"
          >
            Switch Account
          </Link>
        </div>

        {/* Dashboard Title Header */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-[#525CEB] tracking-wider uppercase">
            CAMPAIGN PLANNING
          </span>
          <h1 className="text-3xl font-black tracking-tight">
            Event & Campaign Assistant
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            An AI-powered checklist partner tracking marketing details across nodes.
          </p>
        </div>

        {/* Mockup Data Content Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Task List Node */}
          <div className="glass md:col-span-2 bg-white dark:bg-[#131926] border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl flex flex-col gap-4 shadow-sm">
            <h3 className="text-lg font-bold">Active Planning Matrix</h3>
            
            <div className="flex flex-col gap-3 mt-2">
              {sampleTasks.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-900/60"
                >
                  <div className="flex items-center gap-3">
                    {/* Read-Only Disabled Checkbox Icon */}
                    <div className="w-5 h-5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center text-[10px] text-zinc-400">
                      🔒
                    </div>
                    <span className="text-sm font-medium opacity-80">{item.task}</span>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    item.status === "Completed" ? "bg-green-500/10 text-green-500" :
                    item.status === "In Progress" ? "bg-blue-500/10 text-blue-500" :
                    "bg-zinc-500/10 text-zinc-400"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Module: Restricted Actions Preview */}
          <div className="glass bg-white dark:bg-[#131926] border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl flex flex-col gap-5 shadow-sm justify-between">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold">AI Companion Engine</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Enter complex criteria models to generate a localized strategic roadmap.
              </p>
              
              <textarea 
                disabled
                placeholder="Ask AI to adjust schedules... (Locked for Guest)" 
                className="w-full h-24 bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs opacity-60 resize-none cursor-not-allowed outline-none"
              />
            </div>

            {/* Locked Submit Action Indicator */}
            <button 
              disabled 
              type="button" 
              className="w-full bg-zinc-300 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-semibold py-3.5 rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>🔒 Engine Interlocked</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}