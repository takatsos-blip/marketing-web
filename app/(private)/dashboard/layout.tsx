import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
    <section className="w-full min-h-screen bg-background text-foreground">
      {children}
    </section>
  );
}