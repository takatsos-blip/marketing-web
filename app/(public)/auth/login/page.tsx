"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please complete all fields to authenticate.");
      return;
    }
    // Session state routing bypass
    router.push("/dashboard");
  };

  const handleGuestLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="glass max-w-md w-full p-8 rounded-3xl flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-1 text-gradient">System Verification</h2>
          <p className="text-sm text-zinc-400">Accessing Event & Campaign Assistant node.</p>
        </div>

        <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider font-semibold text-zinc-400">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-950/20 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-foreground"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider font-semibold text-zinc-400">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-950/20 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-foreground"
            />
          </div>

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

          <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-colors mt-2 cursor-pointer shadow-lg shadow-primary/20">
            Authenticate Profile
          </button>
        </form>

        <div className="relative flex py-2 items-center text-xs uppercase tracking-widest text-zinc-500">
          <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
          <span className="flex-shrink mx-4">or enter as</span>
          <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
        </div>

        <button onClick={handleGuestLogin} type="button" className="w-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 font-medium py-3 rounded-xl transition-colors cursor-pointer text-foreground">
          🔑 Continue as Guest (Read-Only)
        </button>
      </div>
    </div>
  );
}