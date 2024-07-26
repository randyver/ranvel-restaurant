"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar"; // Import the Navbar component
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar /> {/* Add Navbar here */}
          <main>{children}</main> {/* Render the main content */}
        </SessionProvider>
      </body>
    </html>
  );
}
