import OrderDetails from "@/components/order-details";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function OrderDetailsPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <OrderDetails />;
}