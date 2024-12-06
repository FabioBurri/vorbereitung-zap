import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '../lib/supabaseClient';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
    
        if (error || !data.user) {
          throw new Error('InvalidCredentials');
        }
    
        return { id: data.user.id, email: data.user.email };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.user_id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user_id) {
        session.user.id = token.user_id;
      }
      return session;
    },
  },
};


