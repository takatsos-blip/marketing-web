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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      
      {/* LEFT BRANDING PANEL */}
      <div className="hidden md:flex md:w-1/2 bg-card border-r border-border p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-gradient-to-br from-primary to-transparent" />
        
        <div className="flex items-center gap-2 z-10">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-sm">
            M
          </div>
          <span className="font-bold tracking-tight text-foreground">Marketing Ops</span>
        </div>

        <div className="max-w-md z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
            Centralize your campaign workspace.
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Access your templates, manage internal operational assets, and review real-time marketing performance metrics all in one place.
          </p>
        </div>

        <div className="text-xs text-muted-foreground opacity-50 z-10">
          © {new Date().getFullYear()} Marketing Ops Platform. All rights reserved.
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm flex flex-col gap-8">
          
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground">
              Sign in to access your dashboard workspace.
            </p>
          </div>

          {error && (
            <div className="text-xs text-destructive font-medium bg-destructive/10 py-3 px-4 rounded-xl border border-destructive/20 animate-in fade-in duration-200">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              type="button" 
              className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium py-3.5 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99]"
            >
              {isLoading ? (
                <span>Signing you in...</span>
              ) : (
                <>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.71 0 3.275.614 4.5 1.725l2.435-2.435C17.714 1.814 15.14 1 12.24 1c-5.52 0-10 4.48-10 10s4.48 10 10 10c5.77 0 9.61-4.06 9.61-9.79 0-.66-.06-1.29-.175-1.925H12.24z"/>
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-center md:text-left text-muted-foreground leading-relaxed">
            Authorized administrators will unlock full editing controls automatically. Guest accounts will receive secure, read-only viewing access.
          </p>

          <div className="block md:hidden text-center text-[10px] tracking-wide text-muted-foreground/50 mt-4">
            © {new Date().getFullYear()} Marketing Ops. All rights reserved.
          </div>

        </div>
      </div>

    </div>
  );
}