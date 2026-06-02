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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] p-6 text-center text-[var(--foreground)]">
      {/* Centered Glass Card matching your dashboard layout perfectly */}
      <div className="max-w-md w-full glass bg-[var(--card-bg)] p-8 rounded-3xl border border-[var(--card-border)] shadow-xl text-left">
        
        <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest block text-center">
          Secure Core Node // 01
        </span>
        
        <h1 className="text-3xl font-black mt-2 mb-2 text-[var(--foreground)] text-center">
          Create Training
        </h1>
        
        <p className="text-sm text-[var(--text-muted)] mb-6 text-center">
          Initialize a new dynamic skill acquisition program and deploy it to the live pipeline.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Training Course Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., AI Marketing Strategy Masterclass"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-3.5 rounded-xl border border-[var(--border)] bg-[var(--background-variant)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Target Deadline Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-xs p-3.5 rounded-xl border border-[var(--border)] bg-[var(--background-variant)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full text-xs font-semibold bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] px-6 py-3 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? "Deploying Configuration..." : "Publish Training"}
            </button>
            
            <Link
              href="/dashboard"
              className="w-full text-center text-xs font-semibold bg-transparent text-[var(--text-muted)] hover:text-[var(--text-disabled)] py-2 transition-colors"
            >
              Cancel and Return
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}