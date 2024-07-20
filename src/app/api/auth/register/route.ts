import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { username, email, password, phone } = await request.json();
    // validate username, email, password, and phone
    console.log({ username, email, password, phone });

    const hashedPassword = await hash(password, 10);

    const response = await sql`
      INSERT INTO users (username, email, password, phone)
      VALUES (${username}, ${email}, ${hashedPassword}, ${phone})
    `;
  } catch (e) {
    console.log({ e });
    return NextResponse.json({ message: 'error', error: (e as Error).message }, { status: 500 });
  }

  return NextResponse.json({ message: 'success' });
}
