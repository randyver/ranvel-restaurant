// app/menu/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import MenuList from '@/components/menu-list';

export default async function MenuPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <MenuList />;
}
