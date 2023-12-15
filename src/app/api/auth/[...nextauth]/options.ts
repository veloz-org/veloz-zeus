import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma/prisma";
import PasswordManager from "../../utils/passwordManage";

type CredentialsPayload = {
  email: string;
  password: string;
  csrfToken: string;
  callbackUrl: string;
  json: string;
};

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as CredentialsPayload;

        // check if user exist
        const user = await prisma.users.findFirst({
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
          id: user.uId,
          email: user.email,
          image: user.avatar,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
};
