import React from "react";

export default function BrandingPanel() {
  return (
    <div className="hidden md:flex md:w-[60%] bg-[var(--primary)] p-16 flex-col justify-between text-white relative">
      {/* BRAND LOGO AREA */}
      <div className="z-10 flex flex-col gap-3">
        {/* EM Graphic Icon */}
        <svg 
          className="w-24 h-auto fill-current text-white" 
          viewBox="0 0 110 50" 
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div> 
      
      {/* Main Header */}
      <div className="z-10 flex items-center justify-center my-auto">
        <h1 className="text-4xl lg:text-5xl font-normal tracking-tight text-white flex items-center gap-3">
          Hello Chaos Coordinator! <span className="animate-bounce">👋</span>
        </h1>
      </div>

      {/* Footer */}
      <div className="text-sm opacity-60 z-10 font-light">
        All rights reserved.
      </div>
    </div>
  );
}