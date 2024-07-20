// app/api/foods/[id]/route.ts

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // or your preferred SQL library

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // Extract ID from the URL path
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  
  try {
    const result = await sql`
      SELECT food_id, name, description, price FROM foods WHERE food_id = ${id}
    `;
    const food = result.rows[0]; // Assume there is only one item

    if (!food) {
      return NextResponse.json({ error: 'Food not found' }, { status: 404 });
    }

    return NextResponse.json(food);
  } catch (error) {
    console.error('Error fetching food:', error);
    return NextResponse.json({ error: 'Failed to fetch food' }, { status: 500 });
  }
}
