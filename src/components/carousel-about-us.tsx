"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
}

const Content = ({ description }: { description: string }) => {
  return (
    <>
      <div className="bg-orange-200 rounded-xl p-4">
        <p>{description}</p>
      </div>
    </>
  );
};

const data = [
  {
    category: "Cleanliness",
    title: "A clean environment, including the dining area, kitchen, and restrooms, is essential.",
    src: "/cleanliness.jpg",
    content: <Content description="Ensuring cleanliness in all areas of the restaurant helps maintain hygiene and creates a positive impression. Cleanliness not only prevents the spread of germs and illnesses but also reflects the establishment's standards and values. A well-maintained environment can significantly enhance the overall dining experience, making customers feel comfortable and cared for." />,
  },
  {
    category: "Comfortable Ambiance",
    title: "A pleasant and comfortable atmosphere that matches the restaurant's theme.",
    src: "/comfortable-restaurant.jpg",
    content: <Content description="Creating a comfortable ambiance enhances the dining experience and encourages customers to return. The right lighting, music, and decor can create a welcoming atmosphere that aligns with the restaurant's theme and cuisine. A well-thought-out ambiance not only attracts customers but also contributes to their overall satisfaction and enjoyment, making their visit memorable." />,
  },
  {
    category: "Delicious Food",
    title: "High-quality, tasty dishes that appeal to a variety of tastes.",
    src: "/delicious food.jpg",
    content: <Content description="Offering delicious food is key to attracting and retaining customers, as it meets their expectations for taste and quality. The use of fresh ingredients, expert preparation, and creative presentation can elevate a dish from ordinary to extraordinary. Consistently delivering delicious food not only satisfies customers but also builds a loyal customer base and enhances the restaurant's reputation." />,
  },
  {
    category: "Consistent Quality",
    title: "Consistency in the taste and presentation of dishes over time.",
    src: "/staff restaurant.jpg",
    content: <Content description="Maintaining consistent quality ensures that customers have a reliable and satisfying dining experience every time they visit. This consistency builds trust and encourages repeat visits, as customers can expect the same high standard of food and service. Achieving consistent quality involves training staff, standardizing recipes, and regularly monitoring performance to ensure that every dish meets the restaurant's standards." />,
  },
  {
    category: "Hygiene and Food Safety",
    title: "Strict adherence to hygiene and food safety standards.",
    src: "/hygiene and food safety.jpg",
    content: <Content description="Following strict hygiene and food safety standards is crucial for protecting customers' health and building trust. This includes proper food handling, storage, and preparation practices, as well as maintaining a clean and sanitized kitchen environment. Adherence to these standards not only prevents foodborne illnesses but also demonstrates the restaurant's commitment to the well-being of its customers, thereby enhancing its reputation." />,
  },
];
