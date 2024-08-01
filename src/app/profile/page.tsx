import UserDetail from "@/components/user-detail"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { type Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Profile | Ranvel Restaurant",
  openGraph: {
    ...openGraphTemplate,
    title: "Profile | Ranvel Restaurant",
  },
  twitter: {
    ...twitterTemplate,
    title: "Profile | Ranvel Restaurant",
  },
};

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return <UserDetail />
}