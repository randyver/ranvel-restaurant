"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function FoodDetail() {
  const { id } = useParams();
  const [food, setFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

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

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = async () => {
    if (food) {
      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            foodId: id,
            quantity,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }

        alert('Item added to cart');
      } catch (error) {
        console.error('Error adding item to cart:', error);
        alert('Failed to add item to cart');
      }
    }
  };

  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{food.name}</h1>
      <p className="text-gray-500">{food.description}</p>
      <p className="text-gray-900 font-semibold">Rp{food.price}</p>
      
      <div className="flex items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-l-md hover:bg-gray-300"
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </button>
        <input
          type="text"
          readOnly
          value={quantity}
          className="w-16 text-center border border-gray-300"
        />
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-r-md hover:bg-gray-300"
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
