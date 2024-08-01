import { getServerSession } from 'next-auth';
import Form from './form';
import { redirect } from 'next/navigation';
import { type Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Register | Ranvel Restaurant",
  openGraph: {
    ...openGraphTemplate,
    title: "Register | Ranvel Restaurant",
  },
  twitter: {
    ...twitterTemplate,
    title: "Register | Ranvel Restaurant",
  },
};

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return(
    <div className='flex justify-center items-center min-h-[600px]'>
      <Form />
    </div>
  )
}