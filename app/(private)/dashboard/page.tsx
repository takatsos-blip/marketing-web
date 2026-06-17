import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardCard from "@/components/dashboard/DashBoardCard"; 
import ScheduleBanner from "@/components/dashboard/ScheduleBanner";

const DASHBOARD_ITEMS = [
  {
    icon: "🎓",
    title: "Trainings",
    description: "Launch a new education course or dynamic workshop.",
    actions: [
      { label: "Create Training", href: "/dashboard/create-training" },
      { label: "View Trainings", href: "/trainings" }, // ✅ Updated to public route
    ],
  },
  {
    icon: "🗓️",
    title: "Events",
    description: "Schedule a new community summit or conference.",
    actions: [
      { label: "Create Event", href: "/dashboard/create-event" },
      { label: "View Events", href: "/events" }, // ✅ Updated to public route
    ],
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[var(--background-variant)] to-[var(--background)] text-[var(--foreground)] flex flex-col antialiased">
      
      <DashboardHeader />

      {/* MAIN CONTENT CANVAS */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
        
        <div className="relative pb-2">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] bg-gradient-to-r from-[var(--foreground)] to-[var(--text-muted)] bg-clip-text mb-1.5">
            Admin Dashboard
          </h1>
          <p className="text-sm text-[var(--text-muted)] font-normal max-w-2xl leading-relaxed">
            Welcome back.
          </p>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DASHBOARD_ITEMS.map((item) => (
            <DashboardCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              actions={item.actions}
            />
          ))}
        </div>

        {/* Consolidated Bottom Banner */}
        <ScheduleBanner />

      </main>
    </div>
  );
}