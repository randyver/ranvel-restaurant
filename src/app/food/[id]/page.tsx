import FoodDetail from "@/components/food-details";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { type Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Foods | Ranvel Restaurant",
  openGraph: {
    ...openGraphTemplate,
    title: "Foods | Ranvel Restaurant",
  },
  twitter: {
    ...twitterTemplate,
    title: "Foods | Ranvel Restaurant",
  },
};

export default async function FoodDetailPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <FoodDetail />;
}