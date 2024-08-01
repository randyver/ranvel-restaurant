import Home from "@/components/home";
import { type Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Home | Ranvel Restaurant",
  openGraph: {
    ...openGraphTemplate,
    title: "Home | Ranvel Restaurant",
  },
  twitter: {
    ...twitterTemplate,
    title: "Home | Ranvel Restaurant",
  },
};

export default function HomePage(){
  return <Home />;
}