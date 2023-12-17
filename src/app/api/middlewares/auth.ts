import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/options";
import HttpException from "../utils/exception";
import { RESPONSE_CODE } from "../types";
import prisma from "../../../prisma/prisma";
import { NextResponse } from "next/server";
import env from "../config/env";
import { getAuth } from "@clerk/nextjs/server";

export function isAuthenticated(fn: Function) {
  return async (req: NextApiRequest) => {
    // next-auth
    // const session = await getServerSession(nextAuthOptions);
    // if (!session) {
    //   throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    // }

    // clerk
    const { userId } = getAuth(req);
    if (!userId) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }

    // next-auth
    // const user = await prisma.users.findFirst({
    //   where: { email: session.user?.email as string },
    // });

    // clerk
    const user = await prisma.users.findFirst({
      where: { uId: userId },
    });

    if (!user) {
      throw new HttpException(
        RESPONSE_CODE.UNAUTHORIZED,
        `Unauthorized, Invalid Token`,
        403
      );
    }

    (req as any)["user"] = { id: user.uId };
    return await fn(req);
  };
}
