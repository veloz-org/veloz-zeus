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
    const waitlist = await prisma.waitlist.findMany();

    const _waitlist = waitlist.map((user) => {
      return {
        email: user.email,
        date: user.createdAt,
        id: user.id,
      };
    });

    return sendResponse.success(
      RESPONSE_CODE.SUCCESS,
      "Success",
      200,
      _waitlist
    );
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

  // delete from waitlist
  public async deleteFromWaitlist(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email") as string;

    if (!email) {
      throw new HttpException(
        RESPONSE_CODE.USER_NOT_FOUND,
        "User not found",
        400
      );
    }

    const user = await prisma.waitlist.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        RESPONSE_CODE.USER_NOT_FOUND,
        "User not found",
        400
      );
    }

    await prisma.waitlist.delete({
      where: {
        email,
      },
    });

    return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200);
  }
}
