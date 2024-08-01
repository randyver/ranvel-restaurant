import Cart from "@/components/cart-list";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { type Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Cart | Ranvel Restaurant",
  openGraph: {
    ...openGraphTemplate,
    title: "Cart | Ranvel Restaurant",
  },
  twitter: {
    ...twitterTemplate,
    title: "Cart | Ranvel Restaurant",
  },
};

export default async function CartPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <Cart />;
}
