import React from "react";

interface FormErrorProps {
  message: string;
}

export default function FormError({ message }: FormErrorProps) {
  // If there is no error message passed, don't render anything at all
  if (!message) return null;

  return (
    <div className="text-xs text-[var(--destructive)] font-medium bg-[var(--destructive-bg)] py-3 px-4 rounded-md border border-[var(--destructive-border)]">
      {message}
    </div>
  );
}