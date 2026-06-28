import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { uploadTrainingToDriveAction } from "@/app/actions/actions";

export interface SlipItem {
  fileName: string;
  category: string;
  amount: string;
  comment: string;
}

export default function useCreateEventForm() {
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

  // Fixed Gmail reminder logic
  const handleSendReminder = () => {
    const currentPO = venueTitle.trim() || "PO12345";
    const emailBody = `Please approve ${currentPO} on Netsuite`;
    const emailSubject = `Netsuite Approval Required - ${currentPO}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.open(gmailUrl, "_blank");
  };

  // Submission engine
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

      const docRef = await addDoc(collection(db, "events"), eventData);
      console.log("SUCCESS! Saved with ID:", docRef.id);

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

  return {
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
    totalHeadcount
  };
}