"use client";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './ui/card';

interface HistoryCardProps {
  order_id: string;
  order_date: string;
  onDetailClick: () => void;
}

export default function HistoryCard({ order_id, order_date, onDetailClick }: HistoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order ID: {order_id}</CardTitle>
        <CardDescription>Order Date: {order_date}</CardDescription>
      </CardHeader>
      <CardContent>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onDetailClick}
        >
          Lihat detail
        </button>
      </CardContent>
    </Card>
  );
}
