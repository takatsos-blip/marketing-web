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
      const userDisplayName = (user.displayName || "").toLowerCase();

      const isMonde = userDisplayName.includes("monde");
      const isTakatso = userDisplayName.includes("takatso");

      if (isMonde || isTakatso) {
        alert(`Welcome back, Admin! Accessing full workspace...`);
        router.push("/dashboard"); 
      } else {
        alert(`Google account verified. Logging you in automatically with Guest privileges.`);
        router.push("/dashboard/assistant");
      }

    } catch (err: any) {
      console.error("Authentication error details:", err);
      setError("Failed to authenticate with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Uses your native background color, ensuring it scales with light/dark theme perfectly
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      
      {/* This card container now dynamically detects light/dark modes:
        - Light Mode: White background with a soft, clean border
        - Dark Mode: Uses your custom 'glass' style or standard dark slate background
      */}
      <div className="glass max-w-md w-full bg-white dark:bg-[#131926] border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl flex flex-col gap-6 shadow-xl text-center">
        
        {/* Header Segment */}
        <div>
          <h2 className="text-2xl font-black mb-2 text-zinc-900 dark:text-white">
            System Verification
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Accessing Marketing Ops Secure Node
          </p>
        </div>

        {/* Informative description text */}
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed px-2">
          Click below to log in with Google. If your profile name matches authorized parameters, you will unlock full write permissions. Otherwise, you will automatically transition into a secure Guest view.
        </p>

        {/* Error messaging block */}
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium bg-red-500/10 py-2 px-3 rounded-xl border border-red-200 dark:border-red-900/50">
            {error}
          </p>
        )}

        {/* Main Google Login Button:
          Using your global primary brand color (#525CEB) so it pops perfectly 
          on both light and dark screen versions!
        */}
        <button 
          onClick={handleGoogleLogin}
          disabled={isLoading}
          type="button" 
          className="w-full bg-[#525CEB] hover:bg-[#434cc2] text-white font-semibold py-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#525CEB]/20 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
        >
          {isLoading ? (
            <span>Verifying Credentials...</span>
          ) : (
            <>
              {/* Inline SVG Vector for Google Icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.71 0 3.275.614 4.5 1.725l2.435-2.435C17.714 1.814 15.14 1 12.24 1c-5.52 0-10 4.48-10 10s4.48 10 10 10c5.77 0 9.61-4.06 9.61-9.79 0-.66-.06-1.29-.175-1.925H12.24z"/>
              </svg>
              <span>Authenticate with Google</span>
            </>
          )}
        </button>

        <div className="text-[10px] tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
          Secured by Firebase Network Protocol
        </div>

      </div>
    </div>
  );
}