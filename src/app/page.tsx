"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import 'primeicons/primeicons.css';
import { TypewriterEffect } from "@/components/typewriter-effect";
        

export default function Home() {
  const words = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "Ranvel",
      className: "text-orange-600 dark:text-orange-600",
    },
    {
      text: "Restaurant!",
    },
  ];

  return (
    <main className="flex flex-col items-center lg:flex-row">
      <div>
        <Image src="/food-ranvel.png" width={2000} height={2000} alt="Logo" />
      </div>
      <div className="flex flex-col">
      <TypewriterEffect words={words} className="text-4xl font-semibold"/>
        <p className="mt-10 mb-6 xl:text-lg">Indulge in a culinary journey where every dish is crafted with passion and precision, using the finest ingredients to bring you an unforgettable dining experience. Whether you're here for a quick bite or a lavish feast, our warm and inviting atmosphere, combined with our dedication to exceptional service, ensures that every visit is a delightful escape from the ordinary. At Ranvel Restaurant, we don't just serve food; we create memories that linger long after the last bite.</p>
        <div>
          <Button className="xl:text-lg p-6">Order Food<span className="pi pi-shopping-cart ml-2"></span></Button>
        </div>
      </div>
    </main>
  );
}
