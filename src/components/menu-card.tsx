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
      className="w-full max-w-sm mx-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader className="relative p-0 m-0">
        <Image src="/foods.jpg" alt={title} layout="responsive" width={500} height={300} className="object-cover w-full h-full" />
      </CardHeader>
      <CardContent className="p-4 flex justify-center flex-col items-center">
        <CardTitle className="text-xl font-semibold xl:text-2xl">{title}</CardTitle>
        <CardDescription className="text-bold mt-2 xl:text-lg">{description}</CardDescription>
        <CardDescription className="text-gray-600 mt-4 text-lg xl:text-xl font-semibold text-orange-600">Rp{price}</CardDescription>
      </CardContent>
    </Card>
  );
}
