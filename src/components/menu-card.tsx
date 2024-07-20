"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

interface MenuCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
}

export default function MenuCard({ id, title, description, price }: MenuCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/food/${id}`);
  };

  return (
    <Card
      className="w-full max-w-sm mx-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader className="relative">
        <Image src="/food-img.png" alt={title} width={500} height={300} className="object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-gray-700 mt-2">{description}</CardDescription>
        <p className="text-gray-600 mt-4 text-lg font-medium">Price: Rp{price}</p>
      </CardContent>
    </Card>
  );
}
