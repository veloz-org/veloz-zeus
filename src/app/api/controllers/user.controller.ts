import { RESPONSE_CODE } from "../types";
import {} from "../utils/schema_validation";
import { NextRequest } from "next/server";
import prisma from "../config/prisma";
import sendResponse from "../utils/sendResponse";

type ReqUserObj = {
  id: string;
};

export default class UserController {
  //   get users info
  public async getUser(req: NextRequest) {
    const user = (req as any)["user"] as ReqUserObj;
    const userData = await prisma.users.findFirst({
      where: {
        uId: user.id,
      },
    });

    return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, {
      id: userData?.uId,
      email: userData?.email,
      username: userData?.username,
      avatar: userData?.avatar,
      role: userData?.role,
    });
  }
}
