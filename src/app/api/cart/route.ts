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
      SELECT foods.food_id, foods.name, foods.price, carts.quantity
      FROM carts
      JOIN foods ON carts.food_id = foods.food_id
      WHERE carts.user_id = ${userId}
    `;
    
    const cartItems = result.rows;
    return NextResponse.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const res = await sql`SELECT user_id FROM users WHERE email=${session.user.email}`;
  const userId = res.rows[0].user_id;

  try {
    const { foodId, quantity } = await req.json();
    console.log('Received:', { userId, foodId, quantity });

    await sql`
      INSERT INTO carts (user_id, food_id, quantity)
      VALUES (${userId}, ${foodId}, ${quantity})
      ON CONFLICT (user_id, food_id)
      DO UPDATE SET quantity = carts.quantity + EXCLUDED.quantity
    `;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}
