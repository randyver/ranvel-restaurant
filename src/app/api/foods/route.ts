// app/api/foods/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // atau library SQL yang Anda gunakan

export async function GET() {
  try {
    const result = await sql`
      SELECT food_id, name, description, price FROM foods
    `;
    const foods = result.rows;

    return NextResponse.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    return NextResponse.json({ error: 'Failed to fetch foods' }, { status: 500 });
  }
}
