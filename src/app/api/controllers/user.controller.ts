import { RESPONSE_CODE } from "../types";
import { getCustomerPortalUrlSchema } from "../utils/schema_validation";
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

    // get subscriptions
    const subscriptions = await prisma.subscriptions.findMany({
      where: {
        uId: user.id,
      },
    });

    // format subscriptions and return needed data
    const _subscriptions = subscriptions.map((s) => {
      return {
        id: s.subscription_id,
        status: s.status,
        product_id: s.product_id,
        product_name: s.product_name,
        variant_id: s.variant_id,
        variant_name: s.variant_name,
        ends_at: s.ends_at,
        renews_at: s.renews_at,
        created_at: s.createdAt,
      };
    });

    return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, {
      id: userData?.uId,
      email: userData?.email,
      username: userData?.username,
      avatar: userData?.avatar,
      role: userData?.role,
      subscriptions: _subscriptions,
    });
  }
}
