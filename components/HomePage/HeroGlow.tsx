import React from "react";

export default function HeroGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      
      {/* 1. Original central radiant light flare (Using your Cyan Accent) */}
      <div 
        className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full mix-blend-screen opacity-[0.15] dark:opacity-[0.08] blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)"
        }}
      />

      {/* 2. NEW: Faint Top-Left Bauhaus Purple (Behind Hero heading text) */}
      <div 
        className="absolute top-[5%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.12] dark:opacity-[0.06] blur-[130px]"
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)"
        }}
      />

      {/* 3. NEW: Soft Middle-Right Bauhaus Purple (Behind the 4 Marketing Cards) */}
      <div 
        className="absolute top-[30%] right-[-10%] w-[700px] h-[500px] rounded-full opacity-[0.10] dark:opacity-[0.05] blur-[140px]"
        style={{
          background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)"
        }}
      />

      {/* 4. NEW: Faint Bottom-Left Bauhaus Purple (Behind Data Pipeline Slider) */}
      <div 
        className="absolute top-[70%] left-[-5%] w-[650px] h-[650px] rounded-full opacity-[0.12] dark:opacity-[0.06] blur-[120px]"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)"
        }}
      />

      {/* Secondary ambient structural grid layer pattern (Kept exactly as you had it) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  );
}