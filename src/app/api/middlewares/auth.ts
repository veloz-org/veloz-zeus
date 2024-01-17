import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { nextAuthOptions } from "../auth/[...nextauth]/options";
import HttpException from "../utils/exception";
import { RESPONSE_CODE } from "../types";
import prisma from "../../../prisma/prisma";
import { getToken } from "next-auth/jwt";

export function isAuthenticated(fn: Function) {
  return async (req: NextApiRequest) => {
    const jwtToken = await getToken({
      req,
      secret: process.env.JWT_SECRET,
    });

    if (!jwtToken) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }

    let user = await prisma.users.findFirst({
      where: { uId: jwtToken?.uId as string },
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
