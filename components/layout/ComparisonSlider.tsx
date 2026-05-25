"use client";

import React, { useState, useRef, useEffect } from "react";

export default function ComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: any) => {
    if (!isDragging) return;
    handleMove(e.touches.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", () => setIsDragging(false));
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", () => setIsDragging(false));
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-72 rounded-3xl overflow-hidden select-none border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl"
    >
      {/* Raw State Container (Always visible in background layout) */}
      <div className="absolute inset-0 bg-zinc-950 flex items-center justify-end p-8 text-right">
        <div className="max-w-xs pr-4">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-red-500/10 text-red-400 px-3 py-1 rounded-full mb-3 border border-red-500/20">
            Raw Campaign Data
          </span>
          <h4 className="text-lg font-bold text-zinc-200 leading-snug">
            Unorganized spreadsheets and fragmented analytics streams.
          </h4>
        </div>
      </div>

      {/* AI Processed State Container (Clipped Overlay layer on left side) */}
      <div 
        className="absolute inset-0 bg-[#525CEB] flex items-center justify-start p-8 text-left overflow-hidden pointer-events-none transition-all duration-75"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        {/* Fixed width matching the parent container boundary ensures layout content stays clean while sliding */}
        <div className="max-w-xs pl-4 text-white">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-white/20 text-white px-3 py-1 rounded-full mb-3 border border-white/30">
            AI Insights Enabled
          </span>
          <h4 className="text-lg font-bold text-white leading-snug">
            Automated predictive targeting and beautiful intelligence tracking.
          </h4>
        </div>
      </div>

      {/* Draggable Selector Handle Line */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize flex items-center justify-center z-30"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className="w-10 h-10 rounded-full bg-white text-zinc-950 shadow-2xl flex items-center justify-center text-sm font-black border border-zinc-200 hover:scale-110 active:scale-95 transition-transform">
          ↔
        </div>
      </div>
    </div>
  );
}