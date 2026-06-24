"use client";

import React, { useState, useRef } from "react";
import LinkComponent from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

// 1. Point this exactly to your action file using relative paths


interface SlipItem {
 fileName: string;
 category: string;
 amount: string;
 comment: string;
}

export default function CreateEventPage() {
 const router = useRouter();
 const [loading, setLoading] = useState(false);

 // References for device file explorers
 const venueFileRef = useRef<HTMLInputElement>(null);
 const transportFileRef = useRef<HTMLInputElement>(null);
 const expenseSlipRef = useRef<HTMLInputElement>(null);

 // Card approval status
 const [venueApproved, setVenueApproved] = useState(false);
 const [transportApproved, setTransportApproved] = useState(false);

 // Attached tracking arrays for multiple files
 const [venueFileNames, setVenueFileNames] = useState<string[]>([]);
 const [transportFileNames, setTransportFileNames] = useState<string[]>([]);

 // Dynamic granular tracking for each individual slip entry
 const [slips, setSlips] = useState<SlipItem[]>([]);

 // Fully writeable global input parameters
 const [venueTitle, setVenueTitle] = useState("");
 const [venueDate, setVenueDate] = useState("");
 const [internalStaff, setInternalStaff] = useState("5");
 const [externalGuests, setExternalGuests] = useState("20");

 // Multi-file parsing handlers
 const handleVenueFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (e.target.files) {
 const names = Array.from(e.target.files).map(file => file.name);
 setVenueFileNames(prev => [...prev, ...names]);
 }
 };

 const handleTransportFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (e.target.files) {
 const names = Array.from(e.target.files).map(file => file.name);
 setTransportFileNames(prev => [...prev, ...names]);
 }
 };

 const handleExpenseSlips = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (e.target.files) {
 const newSlips = Array.from(e.target.files).map(file => ({
 fileName: file.name,
 category: "",
 amount: "",
 comment: ""
 }));
 setSlips(prev => [...prev, ...newSlips]);
 }
 };

 // Specific item deletion handlers
 const removeVenueFile = (indexToRemove: number) => {
 setVenueFileNames(prev => prev.filter((_, index) => index !== indexToRemove));
 };

 const removeTransportFile = (indexToRemove: number) => {
 setTransportFileNames(prev => prev.filter((_, index) => index !== indexToRemove));
 };

 const removeSlip = (indexToRemove: number) => {
 setSlips(prev => prev.filter((_, index) => index !== indexToRemove));
 };

 const updateSlipField = (index: number, field: keyof SlipItem, value: string) => {
 setSlips(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
 };

 // Fixed Gmail reminder logic that pulls the venueTitle text input dynamically
 const handleSendReminder = () => {
 const currentPO = venueTitle.trim() || "PO12345";
 const emailBody = `Please approve ${currentPO} on Netsuite`;
 const emailSubject = `Netsuite Approval Required - ${currentPO}`;
 const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
 emailSubject
 )}&body=${encodeURIComponent(emailBody)}`;

 window.open(gmailUrl, "_blank");
 };

 // Clean, fixed submission engine that alerts on failure and stops the spinning loader
 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!venueTitle || !venueDate) {
 alert("Please enter at least a Venue Title and Target Date.");
 return;
 }

 try {
 setLoading(true);
 console.log("Attempting database sync with Firebase...");

 const eventData = {
 title: venueTitle,
 date: venueDate,
 internalStaff: parseInt(internalStaff) || 0,
 externalGuests: parseInt(externalGuests) || 0,
 approvals: {
 venue: venueApproved,
 transport: transportApproved
 },
 attachments: {
 venue: venueFileNames,
 transport: transportFileNames,
 slips: slips 
 },
 createdAt: new Date().toISOString(),
 };

 // 2. Save to Firebase Firestore
 const docRef = await addDoc(collection(db, "events"), eventData);
 console.log("SUCCESS! Saved with ID:", docRef.id);

 // 3. Backup safely to Google Drive via the Server Action Bridge
 const { uploadTrainingToDriveAction } = await import("../../../../actions/actions");
 await uploadTrainingToDriveAction({
 type: "training",
 venue: venueTitle,
 description: `Event configuration for ${venueTitle}. Headcount: ${eventData.internalStaff + eventData.externalGuests}`,
 ...eventData
 });

 alert("Configuration parameters saved and backed up to Google Drive successfully!");
 router.push("/events"); 
 } catch (error: any) {
 console.error("CRITICAL FIRESTORE ERROR EXPOSED:", error);
 alert(`Database link failed: ${error?.message || "Unknown Network Exception"}`);
 } finally {
 setLoading(false);
 }
 };

 const totalHeadcount = (parseInt(internalStaff) || 0) + (parseInt(externalGuests) || 0);

 return (
 <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 sm:p-6 md:p-12 font-sans selection:bg-[var(--destructive)]/30 w-full overflow-x-hidden transition-colors duration-200">
 
 <input type="file" ref={venueFileRef} className="hidden" multiple onChange={handleVenueFiles} />
 <input type="file" ref={transportFileRef} className="hidden" multiple onChange={handleTransportFiles} />
 <input type="file" ref={expenseSlipRef} className="hidden" multiple onChange={handleExpenseSlips} />

 <div className="max-w-[1600px] mx-auto mb-6 flex justify-end">
 <LinkComponent 
 href="/events" 
 className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors uppercase tracking-widest font-bold text-[11px] flex items-center gap-1"
 >
 ✕ CLOSE CONSOLE
 </LinkComponent>
 </div>

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

 {venueFileNames.length > 0 && (
 <div className="mb-3 text-[10px] text-[var(--text-muted)] font-mono max-h-24 overflow-y-auto space-y-1.5 bg-[var(--background)] p-2 rounded-lg border border-[var(--border)]">
 {venueFileNames.map((name, i) => (
 <div key={i} className="flex items-center justify-between gap-2 group">
 <span className="truncate">📎 {name}</span>
 <button
 type="button"
 onClick={() => removeVenueFile(i)}
 className="text-red-500 font-bold hover:text-red-700 font-sans transition-colors cursor-pointer text-xs px-1"
 >
 ✕
 </button>
 </div>
 ))}
 </div>
 )}

 <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full">
 <button 
 type="button" 
 onClick={() => setVenueApproved(!venueApproved)}
 className={`font-black text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg shrink-0 border transition-colors cursor-pointer ${
 venueApproved 
 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20" 
 : "bg-[var(--destructive-bg)] border-[var(--destructive-border)] text-[var(--destructive)] hover:opacity-80"
 }`}
 >
 {venueApproved ? "APPROVED" : "NOT APPROVED"}
 </button>

 <button 
 type="button" 
 onClick={handleSendReminder}
 className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg hover:text-[var(--foreground)] transition-colors shrink-0 shadow-sm"
 >
 SEND REMINDER
 </button>

 <button 
 type="button"
 onClick={() => venueFileRef.current?.click()}
 className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg hover:text-[var(--foreground)] transition-colors shrink-0 shadow-sm flex items-center gap-1 max-w-[120px] truncate"
 >
 {venueFileNames.length > 0 ? `↑ UPLOAD (${venueFileNames.length})` : "↑ UPLOAD PO"}
 </button>
 </div>
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
 className="w-full bg-transparent text-[var(--foreground)] text-sm font-medium outline-none border-b border-[var(--border)] pb-2 focus:border-[var(--primary)] transition-colors dark:color-scheme-dark"
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

 {transportFileNames.length > 0 && (
 <div className="mb-3 text-[10px] text-[var(--text-muted)] font-mono max-h-24 overflow-y-auto space-y-1.5 bg-[var(--background)] p-2 rounded-lg border border-[var(--border)]">
 {transportFileNames.map((name, i) => (
 <div key={i} className="flex items-center justify-between gap-2 group">
 <span className="truncate">📎 {name}</span>
 <button
 type="button"
 onClick={() => removeTransportFile(i)}
 className="text-red-500 font-bold hover:text-red-700 font-sans transition-colors cursor-pointer text-xs px-1"
 >
 ✕
 </button>
 </div>
 ))}
 </div>
 )}

 <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full mt-4">
 <button 
 type="button" 
 onClick={() => setTransportApproved(!transportApproved)}
 className={`font-black text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg shrink-0 border transition-colors cursor-pointer ${
 transportApproved 
 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20" 
 : "bg-[var(--destructive-bg)] border-[var(--destructive-border)] text-[var(--destructive)] hover:opacity-80"
 }`}
 >
 {transportApproved ? "APPROVED" : "NOT APPROVED"}
 </button>

 <button 
 type="button" 
 onClick={handleSendReminder}
 className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg hover:text-[var(--foreground)] transition-colors shrink-0 shadow-sm"
 >
 SEND REMINDER
 </button>

 <button 
 type="button"
 onClick={() => transportFileRef.current?.click()}
 className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg hover:text-[var(--foreground)] transition-colors shrink-0 shadow-sm flex items-center gap-1 max-w-[120px] truncate"
 >
 {transportFileNames.length > 0 ? `↑ UPLOAD (${transportFileNames.length})` : "↑ UPLOAD PO"}
 </button>
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
 
 <div className="flex items-center justify-end w-full">
 <button 
 type="button"
 onClick={() => expenseSlipRef.current?.click()}
 className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] font-bold text-[9px] tracking-wider uppercase px-2.5 py-2 rounded-lg hover:text-[var(--foreground)] transition-colors shrink-0 shadow-sm flex items-center gap-1 cursor-pointer"
 >
 {slips.length > 0 ? `↑ UPLOAD (${slips.length})` : "↑ UPLOAD PO"}
 </button>
 </div>

 {slips.length > 0 ? (
 <div className="space-y-6 pt-2 max-h-[520px] overflow-y-auto pr-1">
 {slips.map((slip, i) => (
 <div key={i} className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-4 space-y-4 relative">
 
 <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] border-b border-[var(--border)] pb-2">
 <span className="truncate max-w-[85%] font-bold">📎 {slip.fileName}</span>
 <button
 type="button"
 onClick={() => removeSlip(i)}
 className="text-red-500 font-bold hover:text-red-700 font-sans transition-colors cursor-pointer text-xs"
 >
 ✕
 </button>
 </div>

 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">CATEGORY</label>
 <input 
 type="text"
 placeholder="Petrol / Snacks"
 value={slip.category}
 onChange={(e) => updateSlipField(i, "category", e.target.value)}
 className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-2 text-xs font-bold text-[var(--foreground)] placeholder-[var(--text-muted)]/50 outline-none focus:border-[var(--border-hover)] transition-colors"
 />
 </div>
 <div>
 <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">AMOUNT</label>
 <input 
 type="text"
 placeholder="0.00"
 value={slip.amount}
 onChange={(e) => updateSlipField(i, "amount", e.target.value)}
 className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-2 text-xs font-bold text-[var(--success)] placeholder-[var(--success)]/40 outline-none focus:border-[var(--border-hover)] transition-colors"
 />
 </div>
 </div>

 <div>
 <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">COMMENT / NOTE</label>
 <input
 type="text"
 placeholder="What was this specific expense for?"
 value={slip.comment}
 onChange={(e) => updateSlipField(i, "comment", e.target.value)}
 className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-2 text-xs font-medium text-[var(--foreground)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--border-hover)] transition-colors"
 />
 </div>

 </div>
 ))}
 </div>
 ) : (
 <div className="text-center py-6 border border-dashed border-[var(--border)] rounded-xl text-xs text-[var(--text-muted)] font-medium">
 No slips uploaded yet. Click upload above to begin adding individual expenses.
 </div>
 )}

 </div>
 </div>

 {/* ================= COLUMN 3: HEADCOUNT & GLOBAL SAVE ================= */}
 <div className="bg-[var(--background)] border border-[var(--border)] rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 space-y-6 w-full lg:min-h-[720px] flex flex-col justify-between transition-colors">
 <div className="space-y-6 w-full">
 <div className="flex justify-between items-center text-[var(--text-muted)] text-[11px] font-black uppercase tracking-widest">
 <span>👥 HEADCOUNT</span>
 <span className="bg-[var(--background-variant)] text-[var(--text-muted)] border border-[var(--border)] text-[10px] font-bold px-3 py-1 rounded-full">
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

 <div className="pt-6 border-t border-[var(--border)] w-full space-y-3">
 <button 
 type="submit"
 disabled={loading}
 className="w-full bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 font-black text-xs uppercase tracking-widest p-4 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-40"
 >
 {loading ? "SAVING CONFIGURATION..." : "💾 SAVE CONFIGURATION"}
 </button>
 <p className="text-[10px] text-[var(--text-muted)] text-center font-medium">
 Submitting syncs options across core layout tables.
 </p>
 </div>
 </div>

 </form>
 </div>
 );
}