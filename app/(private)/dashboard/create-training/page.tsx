"use client";

import React from "react";
import Link from "next/link";
import AttendanceSection from "@/components/AttendanceSection";
import SiteLogistics from "@/components/SiteLogistics";
import BookingCard from "@/components/BookingCard";
import { useCreateTrainingForm } from "@/hooks/useCreateTrainingForm";

export default function CreateTrainingPage() {
  const form = useCreateTrainingForm();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6 md:p-12 flex flex-col justify-between">
      
      {/* Dynamic Grid Layout */}
      <form onSubmit={form.handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full group">
        
        {/* ================= COLUMN 1: SITE LOGISTICS ================= */}
        <SiteLogistics
          venue={form.venue}
          setVenue={form.setVenue}
          startTime={form.startTime}
          setStartTime={form.setStartTime}
          endTime={form.endTime}
          setEndTime={form.setEndTime}
          foodRequired={form.foodRequired}
          setFoodRequired={form.setFoodRequired}
          foodVendor={form.foodVendor}
          setFoodVendor={form.setFoodVendor}
          foodOrderTime={form.foodOrderTime}
          setFoodOrderTime={form.setFoodOrderTime}
        />

        {/* ================= COLUMN 2: GUEST BOOKINGS ================= */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[32px] p-8 flex flex-col gap-5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-[11px] font-bold tracking-widest uppercase">
            <span className="text-sm">✈️</span> GUEST BOOKINGS
          </div>

          <BookingCard
            title="Flight Booking"
            icon="🛫"
            borderColorClass="border-l-[var(--warning)]"
            focusColorClass="focus:border-[var(--warning)]"
            reference={form.flightRef}
            setReference={form.setFlightRef}
            status={form.flightStatus}
            setStatus={form.setFlightStatus}
            showDetails={form.showFlightPO}
            setShowDetails={form.setShowFlightPO}
            onSendReminder={() => form.handleSendReminder("Flight", form.flightRef)}
          />

          <BookingCard
            title="Accommodation"
            icon="🏨"
            borderColorClass="border-l-[var(--primary)]"
            focusColorClass="focus:border-[var(--primary)]"
            reference={form.hotelRef}
            setReference={form.setHotelRef}
            status={form.hotelStatus}
            setStatus={form.setHotelStatus}
            showDetails={form.showHotelPO}
            setShowDetails={form.setShowHotelPO}
            onSendReminder={() => form.handleSendReminder("Accommodation", form.hotelRef)}
          />

          <BookingCard
            title="Transport"
            icon="🚗"
            borderColorClass="border-l-[var(--primary)]"
            focusColorClass="focus:border-[var(--primary)]"
            reference={form.transportRef}
            setReference={form.setTransportRef}
            status={form.transportStatus}
            setStatus={form.setTransportStatus}
            showDetails={form.showTransportPO}
            setShowDetails={form.setShowTransportPO}
            onSendReminder={() => form.handleSendReminder("Transport", form.transportRef)}
          />
        </div>

        {/* ================= COLUMN 3: ATTENDANCE ================= */}
        <AttendanceSection 
          internalStaff={form.internalStaff}
          setInternalStaff={form.setInternalStaff}
          externalGuests={form.externalGuests}
          setExternalGuests={form.setExternalGuests}
        />

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
          onClick={form.handleSubmit}
          disabled={form.loading}
          className="w-full sm:w-auto text-xs font-bold bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] px-8 py-3.5 rounded-xl transition-all disabled:bg-[var(--disabled)] disabled:text-[var(--text-disabled)] tracking-wider uppercase shadow-md focus:ring-4 focus:ring-[var(--primary-focus)]"
        >
          {form.loading ? "Saving Configuration..." : "Publish & Finalize Logistics"}
        </button>
      </div>

    </div>
  );
}