"use client";

import React from "react";
import ComparisonSlider from "@/components/layout/ComparisonSlider";

export default function Features() {
  // Array updated to match your exact mockup copywriting and structure (4 columns)
  const tools = [
    {
      topic: "SOCIAL & EMAIL",
      title: "AI Production Calendar",
      desc: "Your intelligent social and email companion. Automatically manage production schedules, social posts, and email deadlines with AI-driven precision.",
    },
    {
      topic: "REQUESTS & TICKETS",
      title: "Marketing Ops Central",
      desc: "Centralize, prioritize, and track every incoming marketing request and ticket. Turn chaos into a streamlined, high-velocity workflow.",
    },
    {
      topic: "CAMPAIGN PLANNING",
      title: "Event & Campaign Assistant",
      desc: "An AI-powered checklist and planning partner that ensures no detail is missed for your next big event or multi-channel campaign.",
    },
    {
      topic: "PRODUCT LAUNCHES",
      title: "Launch Pipeline Tracker",
      desc: "Get total visibility into your product launch pipeline. Track priorities, see actionable items, and receive automated weekly updates.",
    },
  ];

  return (
    <section id="features-grid" className="py-24 max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center px-6">
      
      {/* Centralized Section Header from your mockup */}
      <div className="text-center max-w-3xl mb-16">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-5">
          AI-Powered Marketing Intelligence
        </h2>
        <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
          Meet your new AI teammates. These tools are designed to handle the complexity of modern marketing operations so you can focus on creativity.
        </p>
      </div>

      {/* Grid Layout - 4 columns mapping perfectly to your mockup design layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full mb-20">
        {tools.map((tool, idx) => (
          <div 
            key={idx}
            className="p-8 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--primary)]/40 transition-all flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              {/* Blue dot indicator badge from mockup */}
              <div className="w-10 h-10 rounded-full border border-[var(--card-border)] bg-[var(--background)] flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-[#525CEB]" />
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--foreground)] bg-[var(--background)] border border-[var(--card-border)] px-3 py-1 rounded-full">
                {tool.topic}
              </span>
            </div>
            
            <h3 className="text-xl font-bold">{tool.title}</h3>
            <p className="text-base text-[var(--text-muted)] leading-relaxed font-normal">{tool.desc}</p>
          </div>
        ))}
      </div>

      {/* Comparison Slider Segment Wrapper */}
      <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full text-center border-t border-[var(--card-border)] pt-12">
        <h3 className="text-xl font-bold">Data Pipeline Transformation</h3>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Slide to visualize how Cognition organizes fragmented records into actionable intelligence assets.
        </p>
        <ComparisonSlider />
      </div>
    </section>
  );
}