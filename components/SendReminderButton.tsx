"use client"; // 1. This tells Next.js that users will interact with this button

import React from "react";

// 2. This defines what information the button needs. 
// We are telling it: "Hey, you require a text string called poNumber."
interface SendReminderButtonProps {
  poNumber: string;
}

export default function SendReminderButton({ poNumber }: SendReminderButtonProps) {
  
  // 3. This function runs the moment the user clicks the button
  const handleSendReminder = () => {
    // This is the exact message you asked for
    const emailBody = `Please approve ${poNumber} on Netsuite`;
    
    // We create a subject line for the email
    const emailSubject = `Action Required: Approval for ${poNumber}`;

    // 4. We build the special Gmail link. 
    // encodeURIComponent makes sure spaces and special characters don't break the web link.
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    // 5. This tells the browser: "Open a new internet tab running that Gmail link"
    window.open(gmailUrl, "_blank");
  };

  return (
    <button
      onClick={handleSendReminder}
      style={{
        padding: "10px 20px",
        backgroundColor: "#0070f3", // A nice Next.js blue
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Send Reminder
    </button>
  );
}