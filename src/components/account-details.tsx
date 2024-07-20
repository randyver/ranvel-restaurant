"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function AccountDetails({ session }: { session: Session }) {
  const router = useRouter();

  async function onSignOut() {
    await signOut({ redirect: false });
    router.push("/");
  }

  return (
    <>
      <p className="font-belleza text-2xl">Your Account</p>

      <div className="flex flex-col gap-4">
        <p>Name: {session.user?.name}</p>
        <p>Email: {session.user?.email}</p>
      </div>

      <Button onClick={onSignOut} className="self-start rounded-full px-8">
        Logout
      </Button>
    </>
  );
}

export default AccountDetails;
