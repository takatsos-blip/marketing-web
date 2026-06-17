"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BrandLogo from "./BrandLogo";

export default function Hero() {
  const router = useRouter();

  return (
    /* Main relative wrapper tracking full layout width */
    <div className="relative w-full">
      
      {/* Clean utility background hook linked to global.css */}
      <div className="bg-energy-mesh" />

      {/* Main Content Layout Container */}
      <section className="flex flex-col items-start pt-32 pb-12 w-full max-w-7xl mx-auto px-6 relative z-10 text-left">
        
        {/* 
         
        */}
        <div className="w-full md:w-auto md:absolute md:top-[calc(3rem+2cm)] md:-right-[2cm] mb-6 md:mb-0">
          <BrandLogo />
        </div>

        {/* Headline Container */}
        <div className="flex flex-col md:flex-row md:items-start mb-6 max-w-5xl w-full">
          {/* Primary Left-Aligned Marketing Header */}
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.12] max-w-3xl">
            The Future of <br />
            Marketing <br />
            is Agentic
          </h1>
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