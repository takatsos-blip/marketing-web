"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userEmail = (user.email || "").toLowerCase();

      const isMonde = userEmail.includes("monde");
      const isTakatso = userEmail.includes("takatso");
      const userRole = (isMonde || isTakatso) ? "admin" : "guest";

      // Session transmission payload via global browser parameters
      document.cookie = `user-role=${userRole}; path=/; max-age=86400; SameSite=Lax;${window.location.protocol === "https:" ? " Secure;" : ""}`;

      window.location.href = "/dashboard";

    } catch (err: any) {
      console.error("Authentication error details:", err);
      setError("Failed to authenticate with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[var(--background)]">
      
      {/* LEFT BRANDING PANEL */}
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

      {/* RIGHT LOGIN PANEL */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 md:px-16 lg:px-24">
        <div className="w-full max-w-sm flex flex-col gap-8">
          
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-8">
              Welcome Back!
            </h2>
          </div>

          {error && (
            <div className="text-xs text-[var(--destructive)] font-medium bg-[var(--destructive-bg)] py-3 px-4 rounded-md border border-[var(--destructive-border)]">
              {error}
            </div>
          )}

          {/* Form Inputs (Visual Match to image layout) */}
          <div className="flex flex-col gap-6">
            <div className="w-full border-b border-[var(--border)] pb-2">
              <input 
                type="email" 
                placeholder="email@example.co.za" 
                disabled
                className="w-full bg-transparent text-[var(--foreground)] placeholder-[var(--text-disabled)] outline-none text-sm cursor-not-allowed font-medium"
              />
            </div>

            <div className="w-full border-b border-[var(--border)] pb-2">
              <input 
                type="password" 
                placeholder="Password" 
                disabled
                className="w-full bg-transparent text-[var(--text-disabled)] placeholder-[var(--text-disabled)] outline-none text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* Core Action Button */}
          <div className="flex flex-col gap-4 mt-2">
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              type="button" 
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium py-3 rounded-md transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99] text-sm"
            >
              {isLoading ? (
                <span>Connecting securely...</span>
              ) : (
                <span>Login Now with Google Account</span>
              )}
            </button>
          </div>

          {/* Helper Option */}
          <div className="text-center text-sm text-[var(--text-muted)]">
            Forgot password <span className="underline text-[var(--foreground)] font-medium cursor-pointer">Click here</span>
          </div>

          {/* Mobile View Copyight backup */}
          <div className="block md:hidden text-center text-xs text-[var(--text-disabled)] mt-8">
          All rights reserved.
          </div>

        </div>
      </div>

    </div>
  );
}