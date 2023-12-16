import sendResponse from "../../utils/sendResponse";
import { RESPONSE_CODE } from "../../types";
import CatchError from "../../utils/_error";
import HttpException from "../../utils/exception";
import prisma from "../../../../prisma/prisma";
import { NextRequest } from "next/server";
import crypto from "node:crypto";
import { LS_WebhookPayload } from "../../types/lemonsqueezy_types";
import env from "../../config/env";

export const GET = (req: NextRequest) => {
  return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, {
    msg: "You've reached Webhook endpoint",
  });
};

export const POST = CatchError(async (req: NextRequest) => {
  const rawBody = await req.text();
  const secret = String(env.LEMONSQUEEZY_WEBHOOK_SECRET);

  // verofy webhook signature
  verifySignature(rawBody, req.headers.get("x-signature") as string, secret);

  const body = JSON.parse(rawBody) as LS_WebhookPayload;

  // log every webhook event
  console.log(body);

  const { data, meta } = body;
  const { event_name, custom_data } = meta;

  // subscription created event
  if (data.type === "subscriptions") {
    // subscription created event
    if (event_name === "subscription_created") {
      console.log("SUBSCRIPTION CREATED EVENT");
      const { user_id } = custom_data;
      const {
        status,
        user_email,
        user_name,
        test_mode,
        ends_at,
        renews_at,
        customer_id,
        order_id,
        product_id,
        product_name,
        variant_id,
        variant_name,
        store_id,
        card_brand,
        card_last_four,
      } = data?.attributes;

      // check if user exists
      const user = await prisma.users.findFirst({ where: { uId: user_id } });

      if (!user) {
        const msg = `User ${user_email} with id ${user_id} not found`;
        console.log(`❌ ${msg}`);
        throw new HttpException(RESPONSE_CODE.USER_NOT_FOUND, msg, 404);
      }

      // check if user is already subscribed
      // We have 0/1 chance of this happenening, but we still need to check. (🤑)
      const userSubscription = await prisma.subscriptions.findFirst({
        where: {
          uId: user_id,
          status: "active",
        },
      });

      if (userSubscription) {
        const msg = `User ${user_email} with id ${user_id} is already subscribed`;
        console.log(`❌ ${msg}`);
        throw new HttpException(
          RESPONSE_CODE.USER_ALREADY_SUBSCRIBED,
          msg,
          400
        );
      }

      // check if subscription exists
      const subscriptionExists = await prisma.subscriptions.findFirst({
        where: {
          subscription_id: data.id,
        },
      });

      if (subscriptionExists) {
        const msg = `Duplicate subscription with id ${data.id}`;
        console.log(`❌ ${msg}`);
        throw new HttpException(RESPONSE_CODE.ERROR, msg, 400);
      }

      // create subscription
      const subscription = await prisma.subscriptions.create({
        data: {
          // uId: user_id,
          status,
          user_email,
          user_name,
          test_mode,
          ends_at,
          renews_at,
          customer_id: String(customer_id),
          order_id: String(order_id),
          product_id: String(product_id),
          product_name,
          variant_id: String(variant_id),
          variant_name,
          store_id: String(store_id),
          card_brand,
          card_last_four,
          subscription_id: data.id,
          user: {
            connect: {
              uId: user_id,
            },
          },
        },
      });

      // check if subscription was created
      if (!subscription) {
        const msg = `Error creating subscription for user ${user_email} with id ${user_id}`;
        console.log(`❌ ${msg}`);
        throw new HttpException(RESPONSE_CODE.ERROR, msg, 400);
      }

      console.log(
        `✅ Subscription created for user ${user_email} with id ${user_id}`
      );
    }
    // subscription updated event
    if (event_name === "subscription_updated") {
      console.log("SUBSCRIPTION UPDATED EVENT");
      const {
        status,
        user_email,
        user_name,
        test_mode,
        ends_at,
        renews_at,
        customer_id,
        order_id,
        product_id,
        product_name,
        variant_id,
        variant_name,
        store_id,
        card_brand,
        card_last_four,
      } = data?.attributes;
      const sub_id = data?.id;

      // check if subscription exists
      const subscription = await prisma.subscriptions.findFirst({
        where: {
          subscription_id: sub_id,
        },
      });

      if (!subscription) {
        const msg = `Subscription with id ${sub_id} not found`;
        console.log(`❌ ${msg}`);
        throw new HttpException(RESPONSE_CODE.SUBSCRIPTION_NOT_FOUND, msg, 404);
      }

      // update subscription
      const updatedSubscription = await prisma.subscriptions.update({
        where: {
          id: subscription.id,
          subscription_id: sub_id,
        },
        data: {
          status,
          user_email,
          user_name,
          test_mode,
          ends_at,
          renews_at,
          customer_id: String(customer_id),
          order_id: String(order_id),
          product_id: String(product_id),
          product_name,
          variant_id: String(variant_id),
          variant_name,
          store_id: String(store_id),
          card_brand,
          card_last_four,
        },
      });

      // check if subscription was updated
      if (!updatedSubscription) {
        const msg = `Error updating subscription with id ${sub_id}`;
        console.log(`❌ ${msg}`);
        throw new HttpException(RESPONSE_CODE.ERROR, msg, 400);
      }

      console.log(`✅ Subscription updated with id ${sub_id}`);
    }
  }
});

// export { handler as Get, handler as POST, handler as PUT, handler as DELETE };

function verifySignature(
  rawBody: string,
  headerSignature: string | undefined,
  secret: string
) {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const signature = Buffer.from(headerSignature || "", "utf8");

  if (!crypto.timingSafeEqual(digest, signature)) {
    const msg = "❌ Invalid lemonsqueezy signature";
    throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, msg, 401);
  }
}
