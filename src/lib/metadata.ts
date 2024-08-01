import { type Metadata } from "next";

export const openGraphTemplate: Metadata["openGraph"] = {
  description: "Ranvel Restaurant is a restaurant that provides a variety of delicious foods and drinks.",
  url: "https://ranvel-restaurant.vercel.app/",
  siteName: "Ranvel Restaurant",
  locale: "en-US",
  type: "website",
  images: {
    url: "hhttps://ranvel-restaurant.vercel.app/logo/link-preview.png",
    width: "1200",
    height: "630",
    alt: "Ranvel Restaurant Logo",
  },
};

export const twitterTemplate: Metadata["twitter"] = {
  card: "summary_large_image",
  description:
    "Ranvel Restaurant is a restaurant that provides a variety of delicious foods and drinks.",
  images: {
    url: "https://ranvel-restaurant.vercel.app/logo/link-preview.png",
    alt: "Ranvel Restaurant Logo",
  },
};
