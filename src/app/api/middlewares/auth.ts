import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/options";
import HttpException from "../utils/exception";
import { RESPONSE_CODE } from "../types";
import prisma from "../../../prisma/prisma";

export function isAuthenticated(fn: Function) {
  return async (req: NextApiRequest) => {
    const session = await getServerSession(nextAuthOptions);
    if (!session) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }

    let user = null;

    // oauth provider like github sometimes dont include email
    if (session.user.email) {
      user = await prisma.users.findFirst({
        where: { email: session.user?.email as string },
      });
    } else {
      user = await prisma.users.findFirst({
        where: { uId: session.user?.id as string },
      });
    }

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

export function isAdmin(fn: Function) {
  return async (req: NextApiRequest) => {
    const userId = (req as any)?.user?.id;

    if (!userId) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }

    const admin = await prisma.users.findFirst({
      where: { uId: userId, role: "admin" },
    });

    if (!admin) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }
    return await fn(req);
  };
}
