import UserDetail from "@/components/user-detail"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return <UserDetail />
}