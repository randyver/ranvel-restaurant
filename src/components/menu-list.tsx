"use client";

import { useState, useEffect } from "react";
import MenuCard from "@/components/menu-card";
import { Input } from "@/components/ui/input";
import "primeicons/primeicons.css";

export default function MenuList() {
  const [foods, setFoods] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoods, setFilteredFoods] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFoods() {
      const response = await fetch("/api/foods");
      if (!response.ok) {
        throw new Error("Failed to fetch foods");
      }
      const data = await response.json();
      setFoods(data);
    }

    fetchFoods();
  }, []);

  useEffect(() => {
    setFilteredFoods(
      foods.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, foods]);

  return (
    <div className="p-6">
      <h2 className="font-bold text-center text-3xl xl:text-4xl">
        Our <span className="text-orange-600">Menus</span>
      </h2>
      <div className="flex justify-center my-20">
        <div className="relative w-full md:w-9/12 xl:w-6/12">
          <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <Input
            placeholder="Search for food..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-xl xl:text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <MenuCard
              key={food.food_id}
              id={food.food_id}
              title={food.name}
              description={food.description}
              price={food.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No results found
          </p>
        )}
      </div>
    </div>
  );
}
