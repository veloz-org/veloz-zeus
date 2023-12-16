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
    const payload = (await req.json()) as { product_id: number };

    // product_id is actually related to the pricing "plan" in ../data/plan.ts

    // validate request body
    await ZodValidation(createCheckoutSchema, payload, req.url);

    const { product_id } = payload;

    // check if plan exists
    const product = pricingPlans.find(
      (p) => String(p.product_id) === String(product_id)
    );

    if (!product) {
      return sendResponse.error(
        RESPONSE_CODE.PLAN_NOT_FOUND,
        "Subscription plan not found",
        404
      );
    }

    // check if user is already subscribed to a plan
    const userSubscription = await prisma.subscriptions.findFirst({
      where: {
        uId: user.id,
        product_id: String(product_id),
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
    const checkoutUrl = await LQS.createCheckout(product.product_id, {
      user_id: user.id,
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
