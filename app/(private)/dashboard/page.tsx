"use client";

import React from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
      <div className="max-w-md w-full glass bg-white dark:bg-[#131926] p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
        <span className="text-xs font-bold text-green-500 uppercase tracking-widest">
          Secure Core Node
        </span>
        <h1 className="text-3xl font-black mt-2 mb-4 text-zinc-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          Welcome back, Master Controller. You have full write permissions across all campaign and production pipelines.
        </p>
        <Link 
          href="/"
          className="inline-block text-xs font-semibold bg-[#525CEB] text-white px-6 py-3 rounded-xl hover:bg-[#434cc2] transition-colors"
        >
          Return to Website
        </Link>
      </div>
    </div>
  );
}