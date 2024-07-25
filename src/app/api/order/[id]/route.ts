import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest, { params }: { params: any }) {
  const { id } = params;
  
  try {
    const orderResult = await sql`
      SELECT order_id, order_date, total_amount
      FROM orders
      WHERE order_id = ${id}
    `;
    const order = orderResult.rows[0];

    const orderItemsResult = await sql`
      SELECT order_items.food_id, foods.name, order_items.price, order_items.quantity
      FROM order_items
      JOIN foods ON order_items.food_id = foods.food_id
      WHERE order_items.order_id = ${id}
    `;
    const orderItems = orderItemsResult.rows;

    return NextResponse.json({ order, orderItems });
  } catch (error) {
    console.error('Error fetching order items:', error);
    return NextResponse.json({ error: 'Failed to fetch order items' }, { status: 500 });
  }
}
