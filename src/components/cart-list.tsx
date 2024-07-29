"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
        const response = await fetch('/api/cart', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data: CartItem[] = await response.json();
        setCartItems(data);

        const totalAmount = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(totalAmount);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        // Handle error (e.g., show a message to the user)
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Checkout successful');
        router.push(`/order/${data.orderId}`);
      } else {
        console.error('Failed to checkout:', data.error);
        if (data.error === 'Insufficient saldo') {
          toast.error('Failed to checkout, Your saldo is not enough');
        }
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Failed to checkout');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <li key={item.id} className="flex justify-between py-2">
              <span>{item.name}</span>
              <span>Rp{item.price} x {item.quantity}</span>
            </li>
          ))
        ) : (
          <li>Your cart is empty.</li>
        )}
      </ul>
      {cartItems.length > 0 && (
        <div className="mt-4 text-xl font-bold">Total: Rp{total}</div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
}
