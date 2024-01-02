import { RESPONSE_CODE } from "../types";
import {
  getCustomerPortalUrlSchema,
  updateUserDetailsSchema,
} from "../utils/schema_validation";
import { NextRequest } from "next/server";
import prisma from "../../../prisma/prisma";
import sendResponse from "../utils/sendResponse";
import ZodValidation from "../utils/zodValidation";
import LemonsqueezyServices from "../services/lemonsqeezy.service";
import HttpException from "../utils/exception";

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

    const subscription = await prisma.subscriptions.findFirst({
      where: {
        uId: user.id,
        status: "active",
      },
    });

    const _subData = {
      status: subscription?.status,
      product_id: subscription?.product_id,
      product_name: subscription?.product_name,
      variant_id: subscription?.variant_id,
      variant_name: subscription?.variant_name,
      ends_at: subscription?.ends_at,
      renews_at: subscription?.renews_at,
      created_at: subscription?.createdAt,
    };

    return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, {
      id: userData?.uId,
      email: userData?.email,
      username: userData?.username,
      full_name: userData?.fullname ?? "",
      avatar: userData?.avatar,
      role: userData?.role,
      subscription: _subData,
    });
  }

  // update user info
  public async updateDetails(req: NextRequest) {
    const user = (req as any)["user"] as ReqUserObj;
    const payload = (await req.json()) as {
      username: string;
      full_name: string;
      email: string;
    };

    // validate payload
    await ZodValidation(updateUserDetailsSchema, payload, req.url);

    const userAvatar = await prisma.users.findFirst({
      where: { uId: user.id },
      select: { avatar: true },
    });

    const newDicebearAvatar = `https://api.dicebear.com/7.x/initials/png?seed=${payload.username}}`;
    const avatar = userAvatar?.avatar?.includes("dicebear")
      ? newDicebearAvatar
      : userAvatar?.avatar;

    await prisma.users.update({
      where: { uId: user.id },
      data: {
        username: payload.username,
        fullname: payload.full_name,
        email: payload.email,
        avatar,
      },
    });

    return sendResponse.success(
      RESPONSE_CODE.SUCCESS,
      "Updated successfully.",
      200
    );
  }
}
