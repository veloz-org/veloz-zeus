import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/options";
import HttpException from "../utils/exception";
import { RESPONSE_CODE } from "../types";
import prisma from "../config/prisma";
import { NextResponse } from "next/server";

export function isAuthenticated(fn: Function) {
  return async (req: NextApiRequest) => {
    const session = await getServerSession(nextAuthOptions);
    if (!session) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }

    // check if user exists
    const user = await prisma.user.findFirst({
      where: { email: session.user?.email as string },
    });
    if (!user) {
      // redirect
      throw new HttpException(
        RESPONSE_CODE.UNAUTHORIZED,
        `Unauthorized, Invalid Token`,
        404
      );
    }

    (req as any)["user"] = { id: user.uId };
    return await fn(req);
  };
}
