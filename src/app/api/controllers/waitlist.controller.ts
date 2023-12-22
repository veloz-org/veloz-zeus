import { RESPONSE_CODE } from "../types";
import { addToWaitlistSchema } from "../utils/schema_validation";
import { NextRequest } from "next/server";
import prisma from "../../../prisma/prisma";
import sendResponse from "../utils/sendResponse";
import ZodValidation from "../utils/zodValidation";
import HttpException from "../utils/exception";

type ReqUserObj = {
  id: string;
};

export default class WaitlistController {
  // get waitlist
  public async getWaitlist(req: NextRequest) {
    const user = (req as any)["user"] as ReqUserObj;

    const _user = await prisma.users.findFirst({
      where: {
        uId: user.id,
      },
    });

    if (!_user || _user.role !== "admin") {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }

    const waitlist = await prisma.waitlist.findMany();
    return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, {
      waitlist,
    });
  }

  // add to waitlist
  public async addToWaitlist(req: NextRequest) {
    const payload = (await req.json()) as any;
    const { email } = payload;

    // validate payload
    await ZodValidation(addToWaitlistSchema, payload, req.url);

    const user = await prisma.waitlist.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new HttpException(
        RESPONSE_CODE.USER_ALREADY_EXIST,
        "User already exist",
        400
      );
    }

    await prisma.waitlist.create({
      data: {
        email,
      },
    });

    // handle background job of sending email to user(admin)

    return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200);
  }
}
