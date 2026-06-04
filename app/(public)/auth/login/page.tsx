"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import BrandingPanel from "@/components/layout/BrandingPanel"; 
import LoginForm from "@/components/LoginForm"; 

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

      document.cookie = `user-role=${userRole}; path=/; max-age=604800; SameSite=Lax;${window.location.protocol === "https:" ? " Secure;" : ""}`;
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
      {/* LEFT SIDE PANEL */}
      <BrandingPanel />

      {/* RIGHT SIDE LOGIN FORM */}
      <LoginForm 
        error={error}
        isLoading={isLoading}
        onGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
}