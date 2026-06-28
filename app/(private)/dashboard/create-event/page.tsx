"use client";

import React from "react";
import LinkComponent from "next/link";

// Notice the clean default import statement here
import useCreateEventForm from "@/hooks/useCreateEventForm";
import VenueCard from "@/components/VenueCard";
import TransportCard from "@/components/TransportCard";
import TripExpenses from "@/components/TripExpenses";
import HeadcountCard from "@/components/HeadcountCard";

export default function CreateEventPage() {
  const {
    loading,
    venueFileRef,
    transportFileRef,
    expenseSlipRef,
    venueApproved,
    setVenueApproved,
    transportApproved,
    setTransportApproved,
    venueFileNames,
    transportFileNames,
    slips,
    venueTitle,
    setVenueTitle,
    venueDate,
    setVenueDate,
    internalStaff,
    setInternalStaff,
    externalGuests,
    setExternalGuests,
    handleVenueFiles,
    handleTransportFiles,
    handleExpenseSlips,
    removeVenueFile,
    removeTransportFile,
    removeSlip,
    updateSlipField,
    handleSendReminder,
    handleSubmit,
    totalHeadcount,
  } = useCreateEventForm();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 sm:p-6 md:p-12 font-sans selection:bg-[var(--destructive)]/30 w-full overflow-x-hidden transition-colors duration-200">
      
      {/* Invisible Global Native File Handlers */}
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
          <VenueCard
            venueTitle={venueTitle}
            setVenueTitle={setVenueTitle}
            venueFileNames={venueFileNames}
            removeVenueFile={removeVenueFile}
            venueApproved={venueApproved}
            setVenueApproved={setVenueApproved}
            handleSendReminder={handleSendReminder}
            venueFileRef={venueFileRef}
          />

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
          <TransportCard
            transportFileNames={transportFileNames}
            removeTransportFile={removeTransportFile}
            transportApproved={transportApproved}
            setTransportApproved={setTransportApproved}
            handleSendReminder={handleSendReminder}
            transportFileRef={transportFileRef}
          />
        </div>

        {/* ================= COLUMN 2: TRIP EXPENSES ================= */}
        <TripExpenses
          slips={slips}
          removeSlip={removeSlip}
          updateSlipField={updateSlipField}
          expenseSlipRef={expenseSlipRef}
        />

        {/* ================= COLUMN 3: HEADCOUNT & GLOBAL SAVE ================= */}
        <HeadcountCard
          internalStaff={internalStaff}
          setInternalStaff={setInternalStaff}
          externalGuests={externalGuests}
          setExternalGuests={setExternalGuests}
          totalHeadcount={totalHeadcount}
          loading={loading}
        />

      </form>
    </div>
  );
}