"use client";

import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import Navbar from "@/components/navbar";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State to manage navbar active status
  const [isNavBarActive, setIsNavBarActive] = useState(false);

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {/* Pass the state and state updater to the Navbar */}
          <Navbar 
            isNavBarActive={isNavBarActive} 
            setIsNavBarActive={setIsNavBarActive} 
          />
          <main className="p-10">{children}</main>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
