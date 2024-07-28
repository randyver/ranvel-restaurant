import { getServerSession } from 'next-auth';
import Form from './form';
import { redirect } from 'next/navigation';

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