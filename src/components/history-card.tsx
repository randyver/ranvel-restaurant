"use client";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';

interface HistoryCardProps {
  order_id: string;
  order_date: string;
  onDetailClick: () => void;
}

export default function HistoryCard({ order_id, order_date, onDetailClick }: HistoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg xl:text-xl'>Order ID: {order_id}</CardTitle>
        <CardDescription>Order Date: {order_date}</CardDescription>
      </CardHeader>
      <CardContent className='flex justify-end'>
        <Button
          className="mt-4 px-4 py-2 text-white rounded-lg shadow-sm xl:text-lg"
          onClick={onDetailClick}
        >
          See more
        </Button>
      </CardContent>
    </Card>
  );
}
