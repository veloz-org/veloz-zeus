import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../prisma/prisma";
import PasswordManager from "../../utils/passwordManage";
import HttpException from "../../utils/exception";
import { RESPONSE_CODE } from "../../types";
import GitHubProvider from "next-auth/providers/github";

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
      name: "credentials",
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
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      name: "github",
      clientId: process.env.GH_CLIENT_ID as string,
      clientSecret: process.env.GH_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        } as any;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { email, image, name } = user;

        // check if user exist
        const accountWithGoogleAuth = await prisma.users.findFirst({
          where: {
            email: email as string,
            provider: "google",
          },
        });

        const accountWithoutGoogleAuth = await prisma.users.findFirst({
          where: {
            email: email as string,
          },
        });
        const users = await prisma.users.findMany();

        if (!accountWithGoogleAuth && !accountWithoutGoogleAuth) {
          // create user
          await prisma.users.create({
            data: {
              email: email as string,
              username: name?.toLowerCase() as string,
              fullname: name as string,
              avatar: image as string,
              auth_method: "oauth",
              provider: "google",
              role: users.length === 0 ? "admin" : "user",
            },
          });
          return true;
        }

        if (accountWithGoogleAuth && !accountWithoutGoogleAuth) {
          return true;
        }

        if (!accountWithGoogleAuth && accountWithoutGoogleAuth) {
          throw new HttpException(
            RESPONSE_CODE.USER_ALREADY_EXIST,
            "OAuthAccountNotLinked",
            400
          );
        }
      }
      if (account?.provider === "github") {
        const { image, username, name, email, id } = user as any;

        // check if user exist
        const users = await prisma.users.findMany();
        const accountWithGithubAuth =
          users.length > 0 ? users.find((u) => u.uId === id) : null;

        if (!accountWithGithubAuth) {
          // create user
          await prisma.users.create({
            data: {
              uId: id as string,
              email: (email as string) ?? "",
              username: username?.toLowerCase() as string,
              fullname: name as string,
              avatar: image as string,
              auth_method: "oauth",
              provider: "github",
              role: users.length === 0 ? "admin" : "user",
            },
          });
          return true;
        }

        if (accountWithGithubAuth) {
          return true;
        }
      }
      return true;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uId = user?.id;
        token.email = user?.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token?.uId as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/app/dashboard`;
    },
  },
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
};
