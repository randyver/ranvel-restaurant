import OrderDetails from "@/components/order-details";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { type Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Order | Ranvel Restaurant",
  openGraph: {
    ...openGraphTemplate,
    title: "Order | Ranvel Restaurant",
  },
  twitter: {
    ...twitterTemplate,
    title: "Order | Ranvel Restaurant",
  },
};

export default async function OrderDetailsPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <OrderDetails />;
}