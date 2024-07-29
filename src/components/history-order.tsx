"use client"
import { useEffect, useState } from 'react';
import HistoryCard from "@/components/history-card";
import { useRouter } from 'next/navigation';

interface Order {
  order_id: string;
  order_date: string;
}

export default function HistoryOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/history', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-20 xl:text-4xl">Order History</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <HistoryCard
            key={order.order_id}
            order_id={order.order_id}
            order_date={new Date(order.order_date).toLocaleString()}
            onDetailClick={() => router.push(`/order/${order.order_id}`)}
          />
        ))}
      </div>
    </div>
  );
}