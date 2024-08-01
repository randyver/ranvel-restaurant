import HistoryOrder from '@/components/history-order';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { type Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "History | Ranvel Restaurant",
  openGraph: {
    ...openGraphTemplate,
    title: "History | Ranvel Restaurant",
  },
  twitter: {
    ...twitterTemplate,
    title: "History | Ranvel Restaurant",
  },
};

export default async function HistoryPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <HistoryOrder />;

}
