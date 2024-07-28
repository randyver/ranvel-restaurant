"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import 'primeicons/primeicons.css';
        

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div>
        <Image src="/food-ranvel.png" width={2000} height={2000} alt="Logo" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-4xl">Welcome to Ranvel Restaurant!</h1>
        <p>Indulge in a culinary journey where every dish is crafted with passion and precision, using the finest ingredients to bring you an unforgettable dining experience. Whether you're here for a quick bite or a lavish feast, our warm and inviting atmosphere, combined with our dedication to exceptional service, ensures that every visit is a delightful escape from the ordinary. At Ranvel Restaurant, we don't just serve food; we create memories that linger long after the last bite.</p>
        <div>
          <Button>Order Food<span className="pi pi-shopping-cart ml-2"></span></Button>
          <Button variant={"outline"} className="border-orange-600">Learn More</Button>
        </div>
      </div>
    </main>
  );
}
