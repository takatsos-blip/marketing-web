"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-start pt-32 pb-12 w-full max-w-7xl mx-auto px-6 relative z-10 text-left">
      
      {/* Container aligning the Headline and the Logo Side-by-Side */}
      <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 mb-6 max-w-5xl w-full">
        
        {/* Primary Left-Aligned Marketing Header */}
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.12] max-w-3xl">
          The Future of <br />
          Marketing <br />
          is Agentic
        </h1>

        {/* ElectroMechanica Corporate Brandmark Slot */}
        <div className="flex items-center h-12 sm:h-16 bg-white/90 dark:bg-zinc-900/40 px-4 py-2 rounded-2xl backdrop-blur-md border border-zinc-500/10 shadow-sm max-w-xs mb-2 md:mb-3">
          <img 
            src="https://www.em.co.za/landmark-img/Global/logo/logo1.png" 
            alt="ElectroMechanica Logo" 
            className="h-full w-auto object-contain"
          />
        </div>
        
      </div>

      {/* Adaptive description text utilizing global theme variables */}
      <p className="text-xl text-[var(--text-muted)] max-w-xl font-normal leading-relaxed mb-10">
        Meet Cognition, your new AI marketing assistant. From production calendars to launch pipelines, we've finally automated the heavy lifting.
      </p>

      {/* Action Row containing your brand colored button */}
      <div className="flex flex-col sm:flex-row items-start gap-4 justify-start w-full">
        <button
          onClick={() => router.push("/auth/login")}
          className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] px-10 text-lg font-bold text-white transition-all shadow-xl shadow-[var(--primary)]/20 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}