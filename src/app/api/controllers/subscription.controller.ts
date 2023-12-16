import { RESPONSE_CODE } from "../types";
import {
  createCheckoutSchema,
  getCustomerPortalUrlSchema,
} from "../utils/schema_validation";
import { NextRequest } from "next/server";
import prisma from "../../../prisma/prisma";
import sendResponse from "../utils/sendResponse";
import ZodValidation from "../utils/zodValidation";
import { pricingPlans } from "@/data/pricing/plan";
import LemonsqueezyServices from "../services/lemonsqeezy.service";
import HttpException from "../utils/exception";

type ReqUserObj = {
  id: string;
};

const LQS = new LemonsqueezyServices();

export default class SubscriptionController {
  // get users info
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

  public async getSubscriptions(req: NextRequest) {
    const userId = (req as any)["user"]?.id as string;

    // get subscriptions
    const subscriptions = await prisma.subscriptions.findMany({
      where: {
        uId: userId,
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

    // send the subscriptions to the client
    return sendResponse.success(
      RESPONSE_CODE.SUCCESS,
      "Success",
      200,
      _subscriptions
    );
  }

  public async getCustomerPortal(req: NextRequest) {
    const user = (req as any)["user"] as ReqUserObj;
    const payload = (await req.json()) as { product_id: string };

    // validate payload
    await ZodValidation(getCustomerPortalUrlSchema, payload, req.url);

    const subscription = await prisma.subscriptions.findFirst({
      where: { product_id: payload?.product_id, uId: user.id },
    });

    if (!subscription) {
      return sendResponse.error(
        RESPONSE_CODE.ERROR,
        "Subscription not found",
        404
      );
    }

    // get customer portal url
    const url = await LQS.getCustomerPortalUrl(
      subscription.customer_id as string
    );

    if (!url) {
      throw new HttpException(
        RESPONSE_CODE.ERROR,
        "Error getting customer portal url",
        400
      );
    }

    return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, url);
  }
}
