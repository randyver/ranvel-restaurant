import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { sql } from '@vercel/postgres';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        try {
          // Fetch user from the database
          const user = await db.query.users.findFirst({
            where: eq(users.email, credentials.email),
          });

          if(!user || !user.password) {
            throw new Error('Invalid email or password');
          }

          // Check if the password is valid
          const isValid = await compare(credentials.password, user.password);

          if (!isValid) {
            throw new Error('Invalid email or password');
          }
          
          return { id: user.user_id, email: user.email };
          

        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
