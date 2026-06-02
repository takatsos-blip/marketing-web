"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreateTrainingPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return alert("Please fill in all fields.");

    try {
      setLoading(true);
      await addDoc(collection(db, "trainings"), {
        title: title,
        date: date,
        createdAt: new Date().toISOString(),
      });

      alert("Training successfully created!");
      router.push("/dashboard"); 
    } catch (error) {
      console.error("Error creating training:", error);
      alert("Something went wrong saving to the database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center text-zinc-900 dark:text-white">
      {/* Centered Glass Card matching your dashboard layout perfectly */}
      <div className="max-w-md w-full glass bg-white dark:bg-[#131926] p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl text-left">
        
        <span className="text-xs font-bold text-[#525CEB] uppercase tracking-widest block text-center">
          Secure Core Node // 01
        </span>
        
        <h1 className="text-3xl font-black mt-2 mb-2 text-zinc-900 dark:text-white text-center">
          Create Training
        </h1>
        
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 text-center">
          Initialize a new dynamic skill acquisition program and deploy it to the live pipeline.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Training Course Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., AI Marketing Strategy Masterclass"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-900 dark:text-white focus:outline-none focus:border-[#525CEB]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Target Deadline Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-xs p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-900 dark:text-white focus:outline-none focus:border-[#525CEB]"
            />
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full text-xs font-semibold bg-[#525CEB] text-white px-6 py-3 rounded-xl hover:bg-[#434cc2] transition-colors disabled:opacity-50"
            >
              {loading ? "Deploying Configuration..." : "Publish Training"}
            </button>
            
            <Link
              href="/dashboard"
              className="w-full text-center text-xs font-semibold bg-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 py-2 transition-colors"
            >
              Cancel and Return
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}