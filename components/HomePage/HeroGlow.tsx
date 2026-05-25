import React from "react";

export default function HeroGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Upper central radiant background lighting flare */}
      <div 
        className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full mix-blend-screen opacity-[0.15] dark:opacity-[0.08] blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)"
        }}
      />
      {/* Secondary ambient structural grid layer pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  );
}