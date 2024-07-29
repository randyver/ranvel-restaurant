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

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const res = await sql`SELECT user_id, saldo FROM users WHERE email=${session.user.email}`;
  const user = res.rows[0];
  const userId = user.user_id;
  const userSaldo = user.saldo;

  const client = await sql.connect();

  if (req.headers.get('X-Action') === 'CANCEL_CART') {
    // Handle cart cancellation
    try {
      await sql`DELETE FROM carts WHERE user_id = ${userId}`;
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error canceling cart:', error);
      return NextResponse.json({ error: 'Failed to cancel cart' }, { status: 500 });
    }
  }

  try {
    await client.query('BEGIN');

    // Fetch the cart items
    const cartItemsResult = await client.query(`
      SELECT carts.food_id, carts.quantity, foods.price
      FROM carts
      JOIN foods ON carts.food_id = foods.food_id
      WHERE carts.user_id = $1
    `, [userId]);
    
    const cartItems = cartItemsResult.rows;

    // Calculate total price
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Check if the user's saldo is sufficient
    if (userSaldo < totalAmount) {
      await client.query('ROLLBACK');
      console.log('Insufficient saldo');
      return NextResponse.json({ error: 'Insufficient saldo' }, { status: 400 });
    }

    if (totalAmount === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Insert into orders table
    const orderResult = await client.query(`
      INSERT INTO orders (user_id, total_amount)
      VALUES ($1, $2)
      RETURNING order_id
    `, [userId, totalAmount]);

    const orderId = orderResult.rows[0].order_id;

    // Insert into order_items table
    for (const item of cartItems) {
      await client.query(`
        INSERT INTO order_items (order_id, food_id, quantity, price)
        VALUES ($1, $2, $3, $4)
      `, [orderId, item.food_id, item.quantity, item.price]);
    }

    // Deduct the total amount from user's saldo
    await client.query(`
      UPDATE users
      SET saldo = saldo - $1
      WHERE user_id = $2
    `, [totalAmount, userId]);

    // Delete items from carts table
    await client.query(`
      DELETE FROM carts
      WHERE user_id = $1
    `, [userId]);

    await client.query('COMMIT');

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error during checkout:', error);
    return NextResponse.json({ error: 'Failed to checkout' }, { status: 500 });
  } finally {
    client.release();
  }
}
