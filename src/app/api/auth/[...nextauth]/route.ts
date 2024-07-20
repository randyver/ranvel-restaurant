import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { sql } from '@vercel/postgres';

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
          const response = await sql`
            SELECT * FROM users WHERE email=${credentials.email}
          `;
          const user = response.rows[0];

          if (!user) {
            console.log('User not found');
            return null;
          }

          // Verify the password
          const passwordCorrect = await compare(
            credentials.password,
            user.password
          );

          if (passwordCorrect) {
            return {
              id: user.id,
              email: user.email,
            };
          } else {
            console.log('Invalid password');
            return null;
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
