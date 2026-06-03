"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreateTrainingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State matching the layout UI fields
  const [venue, setVenue] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  // Food Logistics States
  const [foodRequired, setFoodRequired] = useState(false);
  const [foodVendor, setFoodVendor] = useState("");
  const [foodOrderTime, setFoodOrderTime] = useState("");
  
  // Statuses ("NOT APPROVED" or "APPROVED")
  const [flightStatus, setFlightStatus] = useState("NOT APPROVED");
  const [hotelStatus, setHotelStatus] = useState("NOT APPROVED");
  const [transportStatus, setTransportStatus] = useState("NOT APPROVED");

  const [flightRef, setFlightRef] = useState("");
  const [hotelRef, setHotelRef] = useState("");
  const [transportRef, setTransportRef] = useState("");

  // Expandable Panel States for PO uploads
  const [showFlightPO, setShowFlightPO] = useState(false);
  const [showHotelPO, setShowHotelPO] = useState(false);
  const [showTransportPO, setShowTransportPO] = useState(false);

  const [internalStaff, setInternalStaff] = useState(12);
  const [externalGuests, setExternalGuests] = useState(1);

  // Reminder Email handler placeholders
  const handleSendReminder = (bookingType: string, poRef: string) => {
    // You can compose your custom email logic here later
    alert(`Reminder trigger clicked for ${bookingType}. PO Ref: ${poRef}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      await addDoc(collection(db, "trainings"), {
        venue,
        timeWindow: { start: startTime, end: endTime },
        foodLogistics: {
          required: foodRequired,
          vendor: foodRequired ? foodVendor : "",
          orderAdvanceTime: foodRequired ? foodOrderTime : ""
        },
        bookings: {
          flight: { reference: flightRef, status: flightStatus },
          accommodation: { reference: hotelRef, status: hotelStatus },
          transport: { reference: transportRef, status: transportStatus }
        },
        attendance: {
          internalStaff: Number(internalStaff),
          externalGuests: Number(externalGuests)
        },
        createdAt: new Date().toISOString(),
      });

      alert("Training logistics configured successfully!");
      router.push("/dashboard"); 
    } catch (error) {
      console.error("Error creating training layout configuration:", error);
      alert("Something went wrong saving the metrics data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6 md:p-12 flex flex-col justify-between">
      
      {/* Dynamic Grid Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full group">
        
        {/* ================= COLUMN 1: SITE LOGISTICS ================= */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[32px] p-8 flex flex-col gap-6 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-[11px] font-bold tracking-widest uppercase">
            <span className="text-sm">📍</span> SITE LOGISTICS
          </div>
          
          <div className="flex flex-col gap-4 mt-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Venue" 
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full bg-[var(--background-variant)] border border-[var(--border)] rounded-2xl p-4 text-sm focus:outline-none focus:border-[var(--primary)] hover:border-[var(--border-hover)] placeholder:text-[var(--text-disabled)] text-[var(--foreground)] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative flex items-center bg-[var(--background-variant)] border border-[var(--border)] rounded-2xl px-4 py-3.5">
                <input 
                  type="text" 
                  placeholder="--:-- --" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none placeholder:text-[var(--text-disabled)] text-[var(--foreground)]"
                />
                <span className="text-[var(--text-muted)] text-xs">🕒</span>
              </div>
              <div className="relative flex items-center bg-[var(--background-variant)] border border-[var(--border)] rounded-2xl px-4 py-3.5">
                <input 
                  type="text" 
                  placeholder="--:-- --" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none placeholder:text-[var(--text-disabled)] text-[var(--foreground)]"
                />
                <span className="text-[var(--text-muted)] text-xs">🕒</span>
              </div>
            </div>

            {/* Food Sub-Section Card */}
            <div className="bg-[var(--background-variant)] border border-[var(--card-border)] rounded-2xl p-5 mt-2 border-l-2 border-l-[var(--primary)]">
              <label className="flex items-center justify-between cursor-pointer group/food">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold tracking-wide">Catering / Food Logistics</span>
                  <span className="text-[10px] text-[var(--text-muted)]">Is food required for this training?</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={foodRequired} 
                  onChange={(e) => setFoodRequired(e.target.checked)} 
                  className="w-4 h-4 rounded [accent-color:var(--primary)] cursor-pointer"
                />
              </label>

              {foodRequired && (
                <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-col gap-3 transition-all">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Restaurant Name" 
                      value={foodVendor}
                      onChange={(e) => setFoodVendor(e.target.value)}
                      className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-3 text-xs focus:outline-none focus:border-[var(--primary)] placeholder:text-[var(--text-disabled)] text-[var(--foreground)]"
                    />
                  </div>
                  <div className="relative flex items-center bg-[var(--background)] border border-[var(--border)] rounded-xl px-3 py-2.5">
                    <input 
                      type="text" 
                      placeholder="Order date" 
                      value={foodOrderTime}
                      onChange={(e) => setFoodOrderTime(e.target.value)}
                      className="w-full bg-transparent text-xs focus:outline-none placeholder:text-[var(--text-disabled)] text-[var(--foreground)]"
                    />
                    <span className="text-[var(--text-muted)] text-xs ml-1">🍱</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ================= COLUMN 2: GUEST BOOKINGS ================= */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[32px] p-8 flex flex-col gap-5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-[11px] font-bold tracking-widest uppercase">
            <span className="text-sm">✈️</span> GUEST BOOKINGS
          </div>

          {/* Flight Card */}
          <div className="bg-[var(--background-variant)] border border-[var(--card-border)] rounded-2xl p-5 border-l-2 border-l-[var(--warning)]">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-bold tracking-wide">Flight Booking</h3>
              <span className="text-base">🛫</span>
            </div>
            <input 
              type="text" 
              placeholder="Booking Ref / Details" 
              value={flightRef}
              onChange={(e) => setFlightRef(e.target.value)}
              className="w-full bg-transparent text-xs text-[var(--text-muted)] border-b border-[var(--border)] py-1 mb-4 focus:outline-none focus:border-[var(--warning)] text-[var(--foreground)]"
            />
            <div className="grid grid-cols-3 gap-2 text-[9px] font-bold tracking-wider text-center">
              <button 
                type="button"
                onClick={() => setFlightStatus(prev => prev === "NOT APPROVED" ? "APPROVED" : "NOT APPROVED")}
                className={`py-2.5 rounded-lg font-bold select-none transition-colors border transition-all ${
                  flightStatus === "APPROVED" 
                    ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-800" 
                    : "bg-[var(--destructive-bg)] text-[var(--destructive)] border-[var(--destructive-border)]"
                }`}
              >
                {flightStatus}
              </button>
              
              <button 
                type="button" 
                onClick={() => handleSendReminder("Flight", flightRef)}
                className="bg-[var(--background)] border border-[var(--border)] py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[var(--disabled)] transition-colors text-[var(--foreground)]"
              >
                SEND REMINDER
              </button>

              <button 
                type="button" 
                onClick={() => setShowFlightPO(!showFlightPO)}
                className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] py-2.5 rounded-lg hover:bg-[var(--disabled)] transition-colors"
              >
                {showFlightPO ? "HIDE DETAILS" : "+ ADD DETAILS"}
              </button>
            </div>

            {showFlightPO && (
              <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-col gap-1.5 transition-all">
                <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Upload PO Document</span>
                <input 
                  type="file" 
                  className="w-full text-xs text-[var(--text-muted)] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[9px] file:font-bold file:bg-[var(--background)] file:text-[var(--foreground)] file:hover:bg-[var(--disabled)] cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Accommodation Card */}
          <div className="bg-[var(--background-variant)] border border-[var(--card-border)] rounded-2xl p-5 border-l-2 border-l-[var(--primary)]">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-bold tracking-wide">Accommodation</h3>
              <span className="text-base">🏨</span>
            </div>
            <input 
              type="text" 
              placeholder="Booking Ref / Details" 
              value={hotelRef}
              onChange={(e) => setHotelRef(e.target.value)}
              className="w-full bg-transparent text-xs text-[var(--text-muted)] border-b border-[var(--border)] py-1 mb-4 focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
            />
            <div className="grid grid-cols-3 gap-2 text-[9px] font-bold tracking-wider text-center">
              <button 
                type="button"
                onClick={() => setHotelStatus(prev => prev === "NOT APPROVED" ? "APPROVED" : "NOT APPROVED")}
                className={`py-2.5 rounded-lg font-bold select-none transition-colors border transition-all ${
                  hotelStatus === "APPROVED" 
                    ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-800" 
                    : "bg-[var(--destructive-bg)] text-[var(--destructive)] border-[var(--destructive-border)]"
                }`}
              >
                {hotelStatus}
              </button>

              <button 
                type="button" 
                onClick={() => handleSendReminder("Accommodation", hotelRef)}
                className="bg-[var(--background)] border border-[var(--border)] py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[var(--disabled)] transition-colors text-[var(--foreground)]"
              >
                SEND REMINDER
              </button>

              <button 
                type="button" 
                onClick={() => setShowHotelPO(!showHotelPO)}
                className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] py-2.5 rounded-lg hover:bg-[var(--disabled)] transition-colors"
              >
                {showHotelPO ? "HIDE DETAILS" : "+ ADD DETAILS"}
              </button>
            </div>

            {showHotelPO && (
              <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-col gap-1.5 transition-all">
                <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Upload PO Document</span>
                <input 
                  type="file" 
                  className="w-full text-xs text-[var(--text-muted)] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[9px] file:font-bold file:bg-[var(--background)] file:text-[var(--foreground)] file:hover:bg-[var(--disabled)] cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Transport Card */}
          <div className="bg-[var(--background-variant)] border border-[var(--card-border)] rounded-2xl p-5 border-l-2 border-l-[var(--primary)]">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-bold tracking-wide">Transport</h3>
              <span className="text-base">🚗</span>
            </div>
            <input 
              type="text" 
              placeholder="Booking Ref / Details" 
              value={transportRef}
              onChange={(e) => setTransportRef(e.target.value)}
              className="w-full bg-transparent text-xs text-[var(--text-muted)] border-b border-[var(--border)] py-1 mb-4 focus:outline-none focus:border-[var(--primary)] text-[var(--foreground)]"
            />
            <div className="grid grid-cols-3 gap-2 text-[9px] font-bold tracking-wider text-center">
              <button 
                type="button"
                onClick={() => setTransportStatus(prev => prev === "NOT APPROVED" ? "APPROVED" : "NOT APPROVED")}
                className={`py-2.5 rounded-lg font-bold select-none transition-colors border transition-all ${
                  transportStatus === "APPROVED" 
                    ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-800" 
                    : "bg-[var(--destructive-bg)] text-[var(--destructive)] border-[var(--destructive-border)]"
                }`}
              >
                {transportStatus}
              </button>

              <button 
                type="button" 
                onClick={() => handleSendReminder("Transport", transportRef)}
                className="bg-[var(--background)] border border-[var(--border)] py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[var(--disabled)] transition-colors text-[var(--foreground)]"
              >
                SEND REMINDER
              </button>

              <button 
                type="button" 
                onClick={() => setShowTransportPO(!showTransportPO)}
                className="bg-[var(--background)] border border-[var(--border)] text-[var(--text-muted)] py-2.5 rounded-lg hover:bg-[var(--disabled)] transition-colors"
              >
                {showTransportPO ? "HIDE DETAILS" : "+ ADD DETAILS"}
              </button>
            </div>

            {showTransportPO && (
              <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-col gap-1.5 transition-all">
                <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Upload PO Document</span>
                <input 
                  type="file" 
                  className="w-full text-xs text-[var(--text-muted)] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[9px] file:font-bold file:bg-[var(--background)] file:text-[var(--foreground)] file:hover:bg-[var(--disabled)] cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* ================= COLUMN 3: ATTENDANCE ================= */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[32px] p-8 flex flex-col gap-6 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-[11px] font-bold tracking-widest uppercase">
            <span className="text-sm">👥</span> ATTENDANCE
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {/* Internal Staff counter */}
            <div className="flex items-center justify-between bg-[var(--background-variant)] border border-[var(--border)] rounded-2xl p-5">
              <span className="text-[11px] font-black tracking-wider text-[var(--foreground)] opacity-90">INTERNAL STAFF</span>
              <input 
                type="number" 
                value={internalStaff} 
                onChange={(e) => setInternalStaff(Number(e.target.value))}
                className="w-16 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl py-2 text-center text-sm font-bold focus:outline-none focus:border-[var(--primary)]"
              />
            </div>

            {/* External Guests counter */}
            <div className="flex items-center justify-between bg-[var(--background-variant)] border border-[var(--border)] rounded-2xl p-5">
              <span className="text-[11px] font-black tracking-wider text-[var(--foreground)] opacity-90">EXTERNAL GUESTS</span>
              <input 
                type="number" 
                value={externalGuests} 
                onChange={(e) => setExternalGuests(Number(e.target.value))}
                className="w-16 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl py-2 text-center text-sm font-bold focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
          </div>
        </div>

      </form>

      {/* Global Form Submission Actions Drawer at base */}
      <div className="max-w-7xl mx-auto w-full mt-8 pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/dashboard"
          className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors py-2"
        >
          ← Cancel and Return to Dashboard
        </Link>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full sm:w-auto text-xs font-bold bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] px-8 py-3.5 rounded-xl transition-all disabled:bg-[var(--disabled)] disabled:text-[var(--text-disabled)] tracking-wider uppercase shadow-md focus:ring-4 focus:ring-[var(--primary-focus)]"
        >
          {loading ? "Saving Configuration..." : "Publish & Finalize Logistics"}
        </button>
      </div>

    </div>
  );
}