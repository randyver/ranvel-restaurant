"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface OrderItem {
  food_id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  order_id: string;
  order_date: string;
  total_amount: number;
  username: string;
  email: string;
}

export default function OrderDetails() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/order/${id}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch order items');
        }
        const data = await response.json();
        setOrder(data.order);
        setOrderItems(data.orderItems);
      } catch (error) {
        console.error('Error fetching order items:', error);
        // Handle error (e.g., show a message to the user)
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Order Details</h1>
      <p><strong>Order ID:</strong> {order.order_id}</p>
      <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
      <p><strong>Username:</strong> {order.username}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <h2 className="text-xl font-semibold mt-4">Items</h2>
      <ul>
        {orderItems.length > 0 ? (
          orderItems.map(item => (
            <li key={item.food_id} className="flex justify-between py-2">
              <span>{item.name}</span>
              <span>Rp{item.price} x {item.quantity}</span>
            </li>
          ))
        ) : (
          <li>No items in your order.</li>
        )}
      </ul>
      <div className="mt-4 text-xl font-bold">Total Amount: Rp{order.total_amount}</div>
    </div>
  );
}
