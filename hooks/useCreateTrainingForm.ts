"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { uploadTrainingToDriveAction } from "@/app/actions/actions";

export function useCreateTrainingForm() {
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
    alert(`Reminder trigger clicked for ${bookingType}. PO Ref: ${poRef}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const payload = {
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
      };

      await addDoc(collection(db, "trainings"), payload);

      await uploadTrainingToDriveAction({
        title: venue || "unnamed-venue",
        type: "training",
        date: new Date().toISOString().split('T')[0],
        description: `Training session at ${venue || "Unknown Venue"}. Attendance: ${internalStaff} staff, ${externalGuests} guests.`,
        ...payload
      });

      alert("Training logistics configured and synchronized to Google Drive successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating training layout configuration:", error);
      alert("Something went wrong saving the metrics data.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    venue, setVenue,
    startTime, setStartTime,
    endTime, setEndTime,
    foodRequired, setFoodRequired,
    foodVendor, setFoodVendor,
    foodOrderTime, setFoodOrderTime,
    flightStatus, setFlightStatus,
    hotelStatus, setHotelStatus,
    transportStatus, setTransportStatus,
    flightRef, setFlightRef,
    hotelRef, setHotelRef,
    transportRef, setTransportRef,
    showFlightPO, setShowFlightPO,
    showHotelPO, setShowHotelPO,
    showTransportPO, setShowTransportPO,
    internalStaff, setInternalStaff,
    externalGuests, setExternalGuests,
    handleSendReminder,
    handleSubmit
  };
}