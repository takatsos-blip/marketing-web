import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="glass max-w-md w-full p-8 rounded-3xl flex flex-col gap-4">
        <h2 className="text-4xl font-black text-gradient">404</h2>
        <h3 className="text-xl font-bold">Node Not Found</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
          The operations node or campaign dashboard you are trying to access does not exist or has been relocated.
        </p>
        <Link 
          href="/" 
          className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-primary hover:bg-primary-hover px-6 text-sm font-medium text-white transition-colors shadow-lg shadow-primary/20 cursor-pointer"
        >
          Return to Hub
        </Link>
      </div>
    </div>
  );
}