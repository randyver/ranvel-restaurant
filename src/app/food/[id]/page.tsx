import FoodDetail from "@/components/food-details";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function FoodDetailPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <FoodDetail />;
}