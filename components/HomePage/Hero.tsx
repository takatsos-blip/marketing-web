"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    /* Main relative wrapper tracking full layout width */
    <div className="relative w-full">
      
      {/* 
        Full-Page Multi-Curve Energy Mesh:
        - Uses h-[1200px] to ensure the energy trails run completely down through the page.
        - Multiple overlapping paths clone your exact fuzzy glow settings to mimic pomelli_photoshoot_image_9_16_0615.png.
      */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-screen h-[1200px] pointer-events-none z-0 overflow-visible">
        <svg 
          className="w-full h-full min-w-[1200px]" 
          viewBox="0 0 1440 1200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Path 1: Your original sweeping line under button and up through logo */}
          <path 
            d="M -100 450 C 350 440, 240 270, 550 290 C 850 310, 1000 250, 1550 680" 
            stroke="url(#unboxed-roygbv-gradient)" 
            strokeWidth="45" 
            strokeLinecap="round"
            filter="url(#fuzzy-glow)"
            className="mix-blend-multiply dark:mix-blend-lighten opacity-70 dark:opacity-55"
          />

          {/* Path 2: Higher intersecting wave swooping down into the empty right side */}
          <path 
            d="M 100 150 C 500 200, 300 550, 800 420 C 1100 320, 1200 600, 1600 950" 
            stroke="url(#unboxed-roygbv-gradient)" 
            strokeWidth="35" 
            strokeLinecap="round"
            filter="url(#fuzzy-glow)"
            className="mix-blend-multiply dark:mix-blend-lighten opacity-50 dark:opacity-40"
          />

          {/* Path 3: A deep base loop climbing up from the lower screen space */}
          <path 
            d="M -50 820 C 400 700, 700 950, 950 600 C 1150 350, 1300 200, 1500 150" 
            stroke="url(#unboxed-roygbv-gradient)" 
            strokeWidth="40" 
            strokeLinecap="round"
            filter="url(#fuzzy-glow)"
            className="mix-blend-multiply dark:mix-blend-lighten opacity-45 dark:opacity-35"
          />

          <defs>
            {/* Soft, textured airbrush glow filter styling */}
            <filter id="fuzzy-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="40" result="blur" />
            </filter>

            {/* Premium, theme-fluid abstract brand spectrum path palette */}
            <linearGradient id="unboxed-roygbv-gradient" x1="0" y1="200" x2="1440" y2="1000" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef4444" />    {/* Red */}
              <stop offset="15%" stopColor="#f97316" />   {/* Orange */}
              <stop offset="30%" stopColor="#eab308" />   {/* Yellow */}
              <stop offset="48%" stopColor="#22c55e" />   {/* Green */}
              <stop offset="68%" stopColor="#3b82f6" />   {/* Blue */}
              <stop offset="85%" stopColor="#6366f1" />   {/* Indigo */}
              <stop offset="100%" stopColor="#a855f7" />  {/* Purple */}
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Your Exact Original Code Layout Content untouched */}
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
          <div className="flex items-center justify-start h-16 sm:h-24 bg-white/90 dark:bg-zinc-900/40 px-6 py-3 rounded-2xl backdrop-blur-md border border-zinc-500/10 shadow-sm w-full max-w-sm mb-2 md:mb-3">
            <img 
              src="https://www.em.co.za/landmark-img/Global/logo/logo1.png" 
              alt="ElectroMechanica Logo" 
              className="h-full w-auto object-contain"
            />
          </div>
          
        </div>

        {/* Adaptive description text utilizing global theme variables */}
        <p className="text-xl text-[var(--text-muted)] max-w-xl font-normal leading-relaxed mb-10">
           Your AI Marketing Assistant for all things events and training.
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
    </div>
  );
}