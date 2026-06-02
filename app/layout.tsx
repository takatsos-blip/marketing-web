import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";// 👈 Imported your new providers file

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Personal Assistant",
  description: "Marketing Operations & Campaign Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-zinc-900 dark:bg-black dark:text-white min-h-screen transition-colors duration-200`}
      >
        {/* Wrap your layout inside the theme engine here */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}