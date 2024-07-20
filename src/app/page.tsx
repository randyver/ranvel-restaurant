"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-center text-gray-700 mb-4">
          You are not signed in. Please{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            login
          </Link>.
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        Welcome, {session.user?.email}!
      </div>
      <Link href="/menu" className="text-blue-500 hover:underline">Order food here</Link>
      {/* Logout */}
      <Button
        onClick={() => signOut()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >Logout</Button>
    </main>
  );
}
