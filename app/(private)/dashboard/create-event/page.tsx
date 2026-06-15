"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import ApprovalButtonGroup from "@/components/ApprovalButtonGroup";

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

  // Card approval status
  const [venueApproved, setVenueApproved] = useState(false);
  const [dateApproved, setDateApproved] = useState(false);
  const [transportApproved, setTransportApproved] = useState(false);

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
        approvals: {
          venue: venueApproved,
          dateConfig: dateApproved,
          transport: transportApproved
        },
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 sm:p-6 md:p-12 font-sans selection:bg-[var(--destructive)]/30 w-full overflow-x-hidden transition-colors duration-200">
      
       {/* Hidden background system entrypoints for file picking */}
      <input type="file" ref={venueFileRef} className="hidden" onChange={handleVenueFile} />
      <input type="file" ref={dateFileRef} className="hidden" onChange={handleDateFile} />
      <input type="file" ref={transportFileRef} className="hidden" onChange={handleTransportFile} />

      {/* Top Header Controls */}
      <div className="max-w-[1600px] mx-auto mb-6 flex justify-end">
        <Link 
          href="/dashboard" 
          className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors uppercase tracking-widest font-bold text-[11px] flex items-center gap-1"
        >
          ✕ CLOSE CONSOLE
        </Link>
      </div>

      {/* Main Responsive 3-Column Grid Layout */}
      <form onSubmit={handleSubmit} className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-left w-full">
        
        {/* ================= COLUMN 1: PRE-APPROVAL REQUIRED ================= */}
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 space-y-6 w-full lg:min-h-[720px] transition-colors">
          <div className="text-[var(--text-muted)] text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
            <span>📌 PRE-APPROVAL REQUIRED</span>
          </div>

          {/* VENUE CARD */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 sm:p-6 relative overflow-hidden border-l-[4px] border-l-[var(--primary)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black tracking-wider text-[var(--foreground)] uppercase">VENUE</h3>
                <span className="text-[10px] text-[var(--text-muted)] font-bold tracking-wider uppercase block mt-0.5">Booking Ref / Details</span>
              </div>
              <span className="text-[var(--text-muted)] text-xl">🏛️</span>
            </div>
            
            <input
              type="text"
              required
              placeholder="e.g., Vaal de Grace-Parys"
              value={venueTitle}
              onChange={(e) => setVenueTitle(e.target.value)}
              className="w-full bg-transparent text-[var(--foreground)] placeholder-[var(--text-muted)] text-sm font-medium outline-none border-b border-[var(--border)] pb-2 mb-4 focus:border-[var(--primary)] transition-colors"
            />

            {venueExpanded && (
              <div className="mb-4 p-3 rounded-xl bg-[var(--background-variant)] border border-[var(--border)] space-y-2">
                <button 
                  type="button"
                  onClick={() => venueFileRef.current?.click()}
                  className={`w-full text-center border border-dashed border-[var(--border)] hover:border-[var(--border-hover)] text-[11px] font-bold tracking-wider uppercase py-2.5 rounded-lg text-[var(--text-muted)] transition-colors block truncate px-2`}
                >
                  {venueFileName ? `📎 ${venueFileName}` : "📁 LINK PO DOCUMENT"}
                </button>
              </div>
            )}

            <ApprovalButtonGroup 
              sectionName="Venue Portfolio"
              isExpanded={venueExpanded}
              isApproved={venueApproved}
              onToggleExpand={() => setVenueExpanded(!venueExpanded)}
              onToggleApproval={() => setVenueApproved(!venueApproved)}
              onSendReminder={handleSendReminder}
            />
          </div>

          {/* DATE OF EVENT CARD */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 sm:p-6 relative overflow-hidden border-l-[4px] border-l-[var(--primary)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black tracking-wider text-[var(--foreground)] uppercase">DATE OF EVENT</h3>
                <span className="text-[10px] text-[var(--text-muted)] font-bold tracking-wider uppercase block mt-0.5">Timeline Selector</span>
              </div>
              <span className="text-[var(--text-muted)] text-xl">📅</span>
            </div>

            <input
              type="date"
              required
              value={venueDate}
              onChange={(e) => setVenueDate(e.target.value)}
              className="w-full bg-transparent text-[var(--foreground)] text-sm font-medium outline-none border-b border-[var(--border)] pb-2 mb-4 focus:border-[var(--primary)] transition-colors dark:color-scheme-dark"
            />

            {dateExpanded && (
              <div className="mb-4 p-3 rounded-xl bg-[var(--background-variant)] border border-[var(--border)] space-y-2">
                <button 
                  type="button"
                  onClick={() => dateFileRef.current?.click()}
                  className="w-full text-center border border-dashed border-[var(--border)] hover:border-[var(--border-hover)] text-[11px] font-bold tracking-wider uppercase py-2.5 rounded-lg text-[var(--text-muted)] transition-colors block truncate px-2"
                >
                  {dateFileName ? `📎 ${dateFileName}` : "📁 LINK PO DOCUMENT"}
                </button>
              </div>
            )}

            <ApprovalButtonGroup 
              sectionName="Event Date Window"
              isExpanded={dateExpanded}
              isApproved={dateApproved}
              onToggleExpand={() => setDateExpanded(!dateExpanded)}
              onToggleApproval={() => setDateApproved(!dateApproved)}
              onSendReminder={handleSendReminder}
            />
          </div>

          {/* TRANSPORT CARD */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 sm:p-6 relative overflow-hidden border-l-[4px] border-l-[var(--warning)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black tracking-wider text-[var(--foreground)] uppercase">TRANSPORT</h3>
                <span className="text-[10px] text-[var(--text-muted)] font-bold tracking-wider uppercase block mt-0.5">Booking Ref / Details</span>
              </div>
              <span className="text-[var(--text-muted)] text-xl">🚙</span>
            </div>

            {transportExpanded && (
              <div className="mb-4 p-3 rounded-xl bg-[var(--background-variant)] border border-[var(--border)] space-y-2">
                <button 
                  type="button"
                  onClick={() => transportFileRef.current?.click()}
                  className="w-full text-center border border-dashed border-[var(--border)] hover:border-[var(--border-hover)] text-[11px] font-bold tracking-wider uppercase py-2.5 rounded-lg text-[var(--text-muted)] transition-colors block truncate px-2"
                >
                  {transportFileName ? `📎 ${transportFileName}` : "📁 LINK PO DOCUMENT"}
                </button>
              </div>
            )}

            <div className="mt-6">
              <ApprovalButtonGroup 
                sectionName="Transport Deployment Logistics"
                isExpanded={transportExpanded}
                isApproved={transportApproved}
                onToggleExpand={() => setTransportExpanded(!transportExpanded)}
                onToggleApproval={() => setTransportApproved(!transportApproved)}
                onSendReminder={handleSendReminder}
              />
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2: TRIP EXPENSES ================= */}
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 space-y-6 w-full lg:min-h-[720px] transition-colors">
          <div className="flex justify-between items-center text-[var(--text-muted)] text-[11px] font-black uppercase tracking-widest">
            <span>💸 TRIP EXPENSES</span>
            <button type="button" className="text-[var(--text-muted)] hover:text-[var(--foreground)] text-[10px] font-bold tracking-wider transition-colors">
              + ADD EXPENSE
            </button>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 sm:p-6 space-y-5 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">CATEGORY</label>
                <input 
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-3 text-xs font-bold text-[var(--foreground)] outline-none focus:border-[var(--border-hover)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">AMOUNT</label>
                <input 
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-3 text-xs font-bold text-[var(--success)] outline-none focus:border-[var(--border-hover)] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">COMMENT / NOTE</label>
              <textarea 
                placeholder="What was this for?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-3 text-xs font-medium text-[var(--foreground)] placeholder-[var(--text-muted)] outline-none resize-none focus:border-[var(--border-hover)] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--background-variant)] text-[var(--text-muted)] font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
                📷 SNAP
              </button>
              <button type="button" className="bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--background-variant)] text-[var(--text-muted)] font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
                📁 UPLOAD
              </button>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full border border-[var(--destructive-border)] hover:border-[var(--destructive)] bg-transparent text-[var(--destructive)] font-black text-xs uppercase tracking-widest p-4 rounded-xl transition-all mt-4 disabled:opacity-40"
            >
              {loading ? "LINKING MATRIX..." : "LINK RECEIPT / PUBLISH"}
            </button>
          </div>
        </div>

        {/* ================= COLUMN 3: HEADCOUNT ================= */}
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 space-y-6 w-full lg:min-h-[720px] flex flex-col justify-between transition-colors">
          <div className="space-y-6 w-full">
            <div className="flex justify-between items-center text-[var(--text-muted)] text-[11px] font-black uppercase tracking-widest">
              <span>👥 HEADCOUNT</span>
              <span className="bg-[var(--background-variant)] text-[var(--text-muted)] border border(--border)] text-[10px] font-bold px-3 py-1 rounded-full">
                Total: {totalHeadcount}
              </span>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 sm:p-5 flex justify-between items-center group w-full transition-colors">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">INTERNAL STAFF</span>
              <input 
                type="number"
                value={internalStaff}
                onChange={(e) => setInternalStaff(e.target.value)}
                className="bg-transparent text-right text-xl font-black font-mono text-[var(--foreground)] outline-none w-16"
              />
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 sm:p-5 flex justify-between items-center group w-full transition-colors">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">EXTERNAL GUESTS</span>
              <input 
                type="number"
                value={externalGuests}
                onChange={(e) => setExternalGuests(e.target.value)}
                className="bg-transparent text-right text-xl font-black font-mono text-[var(--foreground)] outline-none w-16"
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}