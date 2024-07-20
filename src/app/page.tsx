"use client";

import { useSession } from "next-auth/react";
import AccountDetails from "@/components/account-details";
import Link from "next/link";

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
        <AccountDetails session={session} />
      </div>
    </main>
  );
}
