"use client";

import { useState, useEffect } from 'react';
import MenuCard from '@/components/menu-card';
import { Input } from '@/components/ui/input'; // Ensure the path is correct

export default function MenuList() {
  const [foods, setFoods] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFoods() {
      const response = await fetch('/api/foods');
      if (!response.ok) {
        throw new Error('Failed to fetch foods');
      }
      const data = await response.json();
      setFoods(data);
    }

    fetchFoods();
  }, []);

  useEffect(() => {
    setFilteredFoods(
      foods.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, foods]);

  return (
    <div className="p-6">
      <Input
        placeholder="Search for food..."
        className="mb-6 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredFoods.length > 0 ? (
          filteredFoods.map(food => (
            <MenuCard
              key={food.food_id}
              id={food.food_id}
              title={food.name}
              description={food.description}
              price={food.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
}
