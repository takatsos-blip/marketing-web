import React from "react";
import Hero from "@/components/HomePage/Hero";
import Features from "@/components/HomePage/Features";
import HeroGlow from "@/components/HomePage/HeroGlow";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background text-foreground">
      {/* Structural background effects layout layer */}
      <HeroGlow />

      {/* Persistent global interface utilities layout header */}
      <header className="absolute top-0 right-0 z-50 p-6 flex justify-end items-center">
        <ThemeToggle />
      </header>

      <main className="flex-1 flex flex-col px-6 relative z-10">
        {/* Core Hero Component */}
        <Hero />

        {/* Dynamic Marketing Features Grid Section Component */}
        <Features />
      </main>
    </div>
  );
}