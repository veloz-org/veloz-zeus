import { RESPONSE_CODE } from "../types";
import { createCheckoutSchema } from "../utils/schema_validation";
import { NextRequest } from "next/server";
import prisma from "../../../prisma/prisma";
import sendResponse from "../utils/sendResponse";
import ZodValidation from "../utils/zodValidation";
import { pricingPlans } from "@/data/pricing/plan";
import LemonsqueezyServices from "../services/lemonsqeezy.service";

type ReqUserObj = {
  id: string;
};

const LQS = new LemonsqueezyServices();

export default class SubscriptionController {
  //   get users info
  public async subscribe(req: NextRequest) {
    const user = (req as any)["user"] as ReqUserObj;
    const payload = (await req.json()) as { plan_id: string };

    // validate request body
    await ZodValidation(createCheckoutSchema, payload, req.url);

    const { plan_id } = payload;

    // check if plan exists
    const plan = pricingPlans.find((p) => p.id === plan_id);

    if (!plan) {
      return sendResponse.error(
        RESPONSE_CODE.PLAN_NOT_FOUND,
        "Plan not found",
        404
      );
    }

    // check if user is already subscribed to a plan
    const userSubscription = await prisma.subscriptions.findFirst({
      where: {
        uId: user.id,
        planId: plan_id,
        status: "active",
      },
    });

    if (userSubscription) {
      return sendResponse.error(
        RESPONSE_CODE.USER_ALREADY_SUBSCRIBED,
        "User already subscribed to this plan",
        400
      );
    }

    // create the checkout url
    const checkoutUrl = await LQS.createCheckout({
      user_id: user.id,
      plan_id: plan_id,
    });

    if (checkoutUrl.error) {
      return sendResponse.error(
        RESPONSE_CODE.CHECKOUT_ERROR,
        "Error creating checkout",
        400
      );
    }

    // send the checkout url to the client
    return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, {
      url: checkoutUrl.data.url,
    });
  }
}
