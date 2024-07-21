import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { foods } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Fetch the data using Drizzle's query builder
    const result = await db
      .select({
        food_id: foods.food_id,
        name: foods.name,
        description: foods.description,
        price: foods.price,
      })
      .from(foods)
      .execute();

    // Return the fetched data as JSON
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching foods:', error);
    return NextResponse.json({ error: 'Failed to fetch foods' }, { status: 500 });
  }
}
