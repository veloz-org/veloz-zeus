import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log({ credentials });
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  // Database...
  // Session...
  // JWT...
  // Events...
  // Callbacks...
  // Pages...
  // Theme...
  // Debug...
};
