import { getServerSession } from 'next-auth';
import Form from './form';
import { redirect } from 'next/navigation';
import { type Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Login | Ranvel Restaurant",
  openGraph: {
    ...openGraphTemplate,
    title: "Login | Ranvel Restaurant",
  },
  twitter: {
    ...twitterTemplate,
    title: "Login | Ranvel Restaurant",
  },
};

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return (
    <div className='flex justify-center items-center min-h-[600px]'>
      <Form />
    </div>
  )
}