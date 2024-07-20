// src/app/food/[id]/page.tsx

"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use this import to access route parameters

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function FoodDetail() {
  const { id } = useParams(); // Access route parameters using useParams
  const [food, setFood] = useState<Food | null>(null);

  useEffect(() => {
    if (id) {
      const fetchFood = async () => {
        const response = await fetch(`/api/foods/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch food');
        }
        const data: Food = await response.json();
        setFood(data);
      };

      fetchFood();
    }
  }, [id]);

  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{food.name}</h1>
      <p className="text-gray-500">{food.description}</p>
      <p className="text-gray-900 font-semibold">Rp{food.price}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => {
          // Logic for adding to cart
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
