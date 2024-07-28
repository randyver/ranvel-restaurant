import HistoryOrder from '@/components/history-order';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function HistoryPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <HistoryOrder />;

}
