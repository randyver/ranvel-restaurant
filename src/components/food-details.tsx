"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from './ui/button';

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
  const [quantity, setQuantity] = useState<number>(0);

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
    setQuantity(prev => Math.max(0, prev + change));
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
        
        const data = await response.json();

        if(response.ok) {
          toast.success('Item added to cart');
        }
        else{
          if(data.error === 'Null item'){
            toast.error('Failed to add item to cart, Quantity cannot be null');
          }
        }

      } catch (error) {
        console.error('Error adding item to cart:', error);
        toast.error('Failed to add item to cart');
      }
    }
  };

  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{food.name}</h1>
      <p className="text-gray-700 mb-4">{food.description}</p>
      <p className="text-xl font-semibold text-gray-900 mb-6">Rp{food.price}</p>

      <div className="flex items-center mb-6">
        <Button
          onClick={() => handleQuantityChange(-1)}
          className="px-4 py-2 text-lg font-bold bg-gray-400 hover:bg-gray-500 text-white rounded-md"
        >
          -
        </Button>
        <input
          type="text"
          readOnly
          value={quantity}
          className="w-16 mx-2 text-center text-lg border border-gray-300 rounded-md"
        />
        <Button
          onClick={() => handleQuantityChange(1)}
          className="px-4 py-2 text-lg font-bold bg-orange-400 hover:bg-orange-500 text-white rounded-md"
        >
          +
        </Button>
      </div>

      <Button
        onClick={handleAddToCart}
        className="w-full px-4 py-2 text-lg font-bold bg-orange-600 text-white rounded-md hover:bg-orange-500"
      >
        Add to Cart
      </Button>
    </div>
  );
}
