// src/app/layout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar"; // Import the Navbar component
import "./globals.css";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Navbar /> {/* Add Navbar here */}
          <main>{children}</main> {/* Render the main content */}
        </SessionProvider>
      </body>
    </html>
  );
}
