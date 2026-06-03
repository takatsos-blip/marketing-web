"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  // This tells React 19 to safely ignore the inline script tag check
  const scriptProps = { type: "application/json" } as const;

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}