"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // References for device file explorers
  const venueFileRef = useRef<HTMLInputElement>(null);
  const dateFileRef = useRef<HTMLInputElement>(null);
  const transportFileRef = useRef<HTMLInputElement>(null);

  // Card expansion status
  const [venueExpanded, setVenueExpanded] = useState(false);
  const [dateExpanded, setDateExpanded] = useState(false);
  const [transportExpanded, setTransportExpanded] = useState(false);

  // Attached tracking text
  const [venueFileName, setVenueFileName] = useState<string | null>(null);
  const [dateFileName, setDateFileName] = useState<string | null>(null);
  const [transportFileName, setTransportFileName] = useState<string | null>(null);

  // Fully writeable input field parameters
  const [venueTitle, setVenueTitle] = useState("");
  const [venueDate, setVenueDate] = useState("");
  const [category, setCategory] = useState("Petrol / Snacks");
  const [amount, setAmount] = useState("0.00");
  const [comment, setComment] = useState("");
  const [internalStaff, setInternalStaff] = useState("5");
  const [externalGuests, setExternalGuests] = useState("20");

  // Airtight file parsing to bypass strict TypeScript filelist checks
  const handleVenueFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileItem = e.target.files?.item(0);
    if (fileItem) setVenueFileName(fileItem.name);
  };

  const handleDateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileItem = e.target.files?.item(0);
    if (fileItem) setDateFileName(fileItem.name);
  };

  const handleTransportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileItem = e.target.files?.item(0);
    if (fileItem) setTransportFileName(fileItem.name);
  };

  // Assembles native mail engine draft
  const handleSendReminder = (sectionName: string) => {
    const managerEmail = "manager@company.com"; 
    const subject = encodeURIComponent(`URGENT: NetSuite PO Approval Required - ${sectionName}`);
    const body = encodeURIComponent(
      `Hi,\n\nThis is an automated system reminder from the Enterprise Core Control Node.\n\nPlease review and approve the pending Purchase Order (PO) for "${venueTitle || "Vaal de Grace-Parys"}" on NetSuite as soon as possible.\n\nRegards,\nAdmin System`
    );
    
    window.location.href = `mailto:${managerEmail}?subject=${subject}?body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!venueTitle || !venueDate) {
      alert("Please enter at least a Venue Title and Target Date.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "events"), {
        title: venueTitle,
        date: venueDate,
        category,
        amount,
        comment,
        internalStaff: parseInt(internalStaff) || 0,
        externalGuests: parseInt(externalGuests) || 0,
        attachments: {
          venue: venueFileName,
          dateConfig: dateFileName,
          transport: transportFileName
        },
        createdAt: new Date().toISOString(),
      });

      alert("Configuration parameters synced to live matrix!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Database link failed.");
    } finally {
      setLoading(false);
    }
  };

  const totalHeadcount = (parseInt(internalStaff) || 0) + (parseInt(externalGuests) || 0);

  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 dark:bg-black dark:text-white p-4 sm:p-6 md:p-12 font-sans selection:bg-red-500/30 w-full overflow-x-hidden transition-colors duration-200">
      
      {/* Hidden background system entrypoints for file picking */}
      <input type="file" ref={venueFileRef} className="hidden" onChange={handleVenueFile} />
      <input type="file" ref={dateFileRef} className="hidden" onChange={handleDateFile} />
      <input type="file" ref={transportFileRef} className="hidden" onChange={handleTransportFile} />

      {/* Top Header Controls */}
      <div className="max-w-[1600px] mx-auto mb-6 flex justify-end">
        <Link 
          href="/dashboard" 
          className="text-zinc-400 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-white transition-colors uppercase tracking-widest font-bold text-[11px] flex items-center gap-1"
        >
          ✕ CLOSE CONSOLE
        </Link>
      </div>

      {/* Main Responsive 3-Column Grid Layout */}
      <form onSubmit={handleSubmit} className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-left w-full">
        
        {/* ================= COLUMN 1: PRE-APPROVAL REQUIRED ================= */}
        <div className="bg-white border border-zinc-200/80 dark:bg-[#0b0c0e]/90 dark:border-zinc-900/60 rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 space-y-6 w-full lg:min-h-[720px] transition-colors">
          <div className="text-zinc-400 dark:text-zinc-500 text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
            <span>📌 PRE-APPROVAL REQUIRED</span>
          </div>

          {/* VENUE CARD */}
          <div className="bg-slate-100/70 border border-zinc-200 dark:bg-[#111315] dark:border-zinc-900 rounded-2xl p-4 sm:p-6 relative overflow-hidden border-l-[4px] border-l-blue-500 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-white uppercase">VENUE</h3>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-bold tracking-wider uppercase block mt-0.5">Booking Ref / Details</span>
              </div>
              <span className="text-zinc-400 dark:text-zinc-600 text-xl">🏛️</span>
            </div>
            
            <input
              type="text"
              required
              placeholder="e.g., Vaal de Grace-Parys"
              value={venueTitle}
              onChange={(e) => setVenueTitle(e.target.value)}
              className="w-full bg-transparent text-zinc-800 placeholder-zinc-400 dark:text-zinc-300 dark:placeholder-zinc-700 text-sm font-medium outline-none border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-4 focus:border-blue-500 transition-colors"
            />

            {venueExpanded && (
              <div className="mb-4 p-3 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-zinc-900/80 space-y-2">
                <button 
                  type="button"
                  onClick={() => dateFileRef.current?.click()}
                  className={`w-full text-center border border-dashed border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 text-[11px] font-bold tracking-wider uppercase py-2.5 rounded-lg text-zinc-500 dark:text-zinc-400 transition-colors block truncate px-2`}
                >
                  {venueFileName ? `📎 ${venueFileName}` : "📁 LINK PO DOCUMENT"}
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button type="button" className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-500 font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg shrink-0">
                NOT APPROVED
              </button>
              <button 
                type="button" 
                onClick={() => handleSendReminder("Venue Portfolio")}
                className="bg-white border border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg hover:text-zinc-900 dark:hover:text-white transition-colors shrink-0 shadow-sm dark:shadow-none"
              >
                SEND REMINDER
              </button>
              <button 
                type="button"
                onClick={() => setVenueExpanded(!venueExpanded)}
                className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors ml-auto uppercase tracking-wider"
              >
                {venueExpanded ? "- HIDE" : "+ DETAILS"}
              </button>
            </div>
          </div>

          {/* DATE OF EVENT CARD */}
          <div className="bg-slate-100/70 border border-zinc-200 dark:bg-[#111315] dark:border-zinc-900 rounded-2xl p-4 sm:p-6 relative overflow-hidden border-l-[4px] border-l-purple-500 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-white uppercase">DATE OF EVENT</h3>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-bold tracking-wider uppercase block mt-0.5">Timeline Selector</span>
              </div>
              <span className="text-zinc-400 dark:text-zinc-600 text-xl">📅</span>
            </div>

            <input
              type="date"
              required
              value={venueDate}
              onChange={(e) => setVenueDate(e.target.value)}
              className="w-full bg-transparent text-zinc-800 dark:text-zinc-300 text-sm font-medium outline-none border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-4 focus:border-purple-500 transition-colors dark:color-scheme-dark"
            />

            {dateExpanded && (
              <div className="mb-4 p-3 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-zinc-900/80 space-y-2">
                <button 
                  type="button"
                  onClick={() => dateFileRef.current?.click()}
                  className="w-full text-center border border-dashed border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 text-[11px] font-bold tracking-wider uppercase py-2.5 rounded-lg text-zinc-500 dark:text-zinc-400 transition-colors block truncate px-2"
                >
                  {dateFileName ? `📎 ${dateFileName}` : "📁 LINK PO DOCUMENT"}
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button type="button" className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-500 font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg shrink-0">
                NOT APPROVED
              </button>
              <button 
                type="button"
                onClick={() => handleSendReminder("Event Date Window")}
                className="bg-white border border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg hover:text-zinc-900 dark:hover:text-white transition-colors shrink-0 shadow-sm dark:shadow-none"
              >
                SEND REMINDER
              </button>
              <button 
                type="button"
                onClick={() => setDateExpanded(!dateExpanded)}
                className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors ml-auto uppercase tracking-wider"
              >
                {dateExpanded ? "- HIDE" : "+ DETAILS"}
              </button>
            </div>
          </div>

          {/* TRANSPORT CARD */}
          <div className="bg-slate-100/70 border border-zinc-200 dark:bg-[#111315] dark:border-zinc-900 rounded-2xl p-4 sm:p-6 relative overflow-hidden border-l-[4px] border-l-orange-500 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-white uppercase">TRANSPORT</h3>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-bold tracking-wider uppercase block mt-0.5">Booking Ref / Details</span>
              </div>
              <span className="text-zinc-400 dark:text-zinc-600 text-xl">🚙</span>
            </div>

            {transportExpanded && (
              <div className="mb-4 p-3 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-zinc-900/80 space-y-2">
                <button 
                  type="button"
                  onClick={() => transportFileRef.current?.click()}
                  className="w-full text-center border border-dashed border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 text-[11px] font-bold tracking-wider uppercase py-2.5 rounded-lg text-zinc-500 dark:text-zinc-400 transition-colors block truncate px-2"
                >
                  {transportFileName ? `📎 ${transportFileName}` : "📁 LINK PO DOCUMENT"}
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6">
              <button type="button" className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-500 font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg shrink-0">
                NOT APPROVED
              </button>
              <button 
                type="button"
                onClick={() => handleSendReminder("Transport Deployment Logistics")}
                className="bg-white border border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg hover:text-zinc-900 dark:hover:text-white transition-colors shrink-0 shadow-sm dark:shadow-none"
              >
                SEND REMINDER
              </button>
              <button 
                type="button"
                onClick={() => setTransportExpanded(!transportExpanded)}
                className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors ml-auto uppercase tracking-wider"
              >
                {transportExpanded ? "- HIDE" : "+ DETAILS"}
              </button>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2: TRIP EXPENSES ================= */}
        <div className="bg-white border border-zinc-200/80 dark:bg-[#0b0c0e]/90 dark:border-zinc-900/60 rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 space-y-6 w-full lg:min-h-[720px] transition-colors">
          <div className="flex justify-between items-center text-zinc-400 dark:text-zinc-500 text-[11px] font-black uppercase tracking-widest">
            <span>💸 TRIP EXPENSES</span>
            <button type="button" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-[10px] font-bold tracking-wider transition-colors">
              + ADD EXPENSE
            </button>
          </div>

          <div className="bg-slate-100/70 border border-zinc-200 dark:bg-[#111315] dark:border-zinc-900 rounded-2xl p-4 sm:p-6 space-y-5 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">CATEGORY</label>
                <input 
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-900 rounded-xl p-3 text-xs font-bold text-zinc-700 dark:text-zinc-300 outline-none focus:border-zinc-400 dark:focus:border-zinc-700 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">AMOUNT</label>
                <input 
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-900 rounded-xl p-3 text-xs font-bold text-emerald-600 dark:text-emerald-500 outline-none focus:border-zinc-400 dark:focus:border-zinc-700 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">COMMENT / NOTE</label>
              <textarea 
                placeholder="What was this for?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-900 rounded-xl p-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 placeholder-zinc-300 dark:placeholder-zinc-700 outline-none resize-none focus:border-zinc-400 dark:focus:border-zinc-700 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="bg-white border border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900/60 dark:border-zinc-800/80 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm dark:shadow-none">
                📷 SNAP
              </button>
              <button type="button" className="bg-white border border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900/60 dark:border-zinc-800/80 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm dark:shadow-none">
                📁 UPLOAD
              </button>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full border border-red-200 hover:border-red-400 dark:border-red-900/40 dark:hover:border-red-700/60 bg-transparent text-red-600 dark:text-red-500 font-black text-xs uppercase tracking-widest p-4 rounded-xl transition-all mt-4 disabled:opacity-40"
            >
              {loading ? "LINKING MATRIX..." : "LINK RECEIPT / PUBLISH"}
            </button>
          </div>
        </div>

        {/* ================= COLUMN 3: HEADCOUNT ================= */}
        <div className="bg-white border border-zinc-200/80 dark:bg-[#0b0c0e]/90 dark:border-zinc-900/60 rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 space-y-6 w-full lg:min-h-[720px] flex flex-col justify-between transition-colors">
          <div className="space-y-6 w-full">
            <div className="flex justify-between items-center text-zinc-400 dark:text-zinc-500 text-[11px] font-black uppercase tracking-widest">
              <span>👥 HEADCOUNT</span>
              <span className="bg-slate-100 text-zinc-600 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 text-[10px] font-bold px-3 py-1 rounded-full">
                Total: {totalHeadcount}
              </span>
            </div>

            <div className="bg-slate-100/70 border border-zinc-200 dark:bg-[#111315] dark:border-zinc-900 rounded-2xl p-4 sm:p-5 flex justify-between items-center group w-full transition-colors">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">INTERNAL STAFF</span>
              <input 
                type="number"
                value={internalStaff}
                onChange={(e) => setInternalStaff(e.target.value)}
                className="bg-transparent text-right text-xl font-black font-mono text-zinc-800 dark:text-white outline-none w-16"
              />
            </div>

            <div className="bg-slate-100/70 border border-zinc-200 dark:bg-[#111315] dark:border-zinc-900 rounded-2xl p-4 sm:p-5 flex justify-between items-center group w-full transition-colors">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">EXTERNAL GUESTS</span>
              <input 
                type="number"
                value={externalGuests}
                onChange={(e) => setExternalGuests(e.target.value)}
                className="bg-transparent text-right text-xl font-black font-mono text-zinc-800 dark:text-white outline-none w-16"
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}