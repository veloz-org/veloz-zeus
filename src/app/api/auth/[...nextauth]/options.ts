import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../config/prisma";
import PasswordManager from "../../utils/passwordManage";

type CredentialsPayload = {
  email: string;
  password: string;
  csrfToken: string;
  callbackUrl: string;
  json: string;
};

export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as CredentialsPayload;

        // check if user exist
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        // check if password is correct
        const isPasswordValid = PasswordManager.comparePassword(
          password,
          user?.password_hash as string
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          image: user.avatar,
        };
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
