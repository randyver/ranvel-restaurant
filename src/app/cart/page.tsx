"use client";
import { useEffect, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

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
        onClick={() => {
          // Logic for checkout
        }}
      >
        Checkout
      </button>
    </div>
  );
}
