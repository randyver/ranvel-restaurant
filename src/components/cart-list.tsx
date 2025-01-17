"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data: CartItem[] = await response.json();
        setCartItems(data);

        const totalAmount = data.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setTotal(totalAmount);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        // Handle error (e.g., show a message to the user)
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = async () => {
    const toastId = toast.loading('Processing checkout...');
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Checkout successful", { id: toastId });
        router.push(`/order/${data.orderId}`);
      } else {
        toast.dismiss(toastId);
        if (data.error === "Insufficient saldo") {
          toast.error("Failed to checkout, Your saldo is not enough");
        } else if (data.error === "Cart is empty") {
          toast.error("Failed to checkout, Cart is empty");
        }
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to checkout", { id: toastId });
    }
  };
  
  const handleCancelCart = async () => {
    const toastId = toast.loading('Canceling cart...');
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "X-Action": "CANCEL_CART",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Cart canceled successfully", { id: toastId });
        setCartItems([]);
        setTotal(0);
      } else {
        toast.dismiss(toastId);
        console.error("Failed to cancel cart:", data.error);
        toast.error("Failed to cancel cart");
      }
    } catch (error) {
      console.error("Error during canceling cart:", error);
      toast.error("Failed to cancel cart", { id: toastId });
    }
  };

  return (
    <div className="p-6 rounded-lg border-orange-400 border-2">
      <h1 className="text-3xl font-bold mb-4 text-center xl:text-4xl">Your <span className="text-orange-600">Cart</span></h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-4">
                <span className="text-xl">{item.name}</span>
                <span className="text-xl font-medium">
                  Rp{item.price} x {item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-xl xl:text-2xl font-bold text-right">Total: Rp{total}</div>
          <div className="mt-6 flex justify-between">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded xl:text-lg"
              variant={"destructive"}
              onClick={handleCancelCart}
            >
              Cancel Cart
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded xl:text-lg"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
