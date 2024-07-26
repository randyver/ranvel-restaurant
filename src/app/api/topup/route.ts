import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { amount } = body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
  }

  try {
    const result = await sql`
      UPDATE users
      SET saldo = saldo + ${amount}
      WHERE email = ${session.user.email}
      RETURNING email, username, saldo
    `;
    const updatedUser = result.rows[0];

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error topping up saldo:', error);
    return NextResponse.json({ error: 'Failed to top up saldo' }, { status: 500 });
  }
}
