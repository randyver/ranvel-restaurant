import MenuList from '@/components/menu-list';
import { type Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Menus | Ranvel Restaurant",
  openGraph: {
    ...openGraphTemplate,
    title: "Menus | Ranvel Restaurant",
  },
  twitter: {
    ...twitterTemplate,
    title: "Menus | Ranvel Restaurant",
  },
};

export default async function MenuPage() {
  return <MenuList />;
}
