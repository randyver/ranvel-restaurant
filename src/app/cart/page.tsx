import Cart from "@/components/cart-list";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function CartPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <Cart />;
}