import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Import Google Provider

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id; // Add custom fields to session
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add custom fields to JWT
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // You will need to set this up
});