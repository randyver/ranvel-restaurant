import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const res = await sql`SELECT user_id FROM users WHERE email=${session.user.email}`;
  const userId = res.rows[0].user_id;

  try {
    const result = await sql`
      SELECT order_id, order_date
      FROM orders
      WHERE user_id = ${userId}
      ORDER BY order_date DESC
    `;
    const orders = result.rows;
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    return NextResponse.json({ error: 'Failed to fetch order history' }, { status: 500 });
  }
}
