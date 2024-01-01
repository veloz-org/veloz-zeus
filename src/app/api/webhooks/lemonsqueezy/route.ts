import sendResponse from "../../utils/sendResponse";
import { RESPONSE_CODE } from "../../types";
import CatchError from "../../utils/_error";
import HttpException from "../../utils/exception";
import prisma from "../../../../prisma/prisma";
import { NextRequest } from "next/server";
import crypto from "node:crypto";
import { LS_WebhookPayload } from "../../types/lemonsqueezy_types";
import env from "../../config/env";
import { pricingPlans } from "@/data/pricing/plan";

export const GET = (req: NextRequest) => {
  return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, {
    msg: "You've reached Webhook endpoint",
  });
};

export const POST = CatchError(async (req: NextRequest) => {
  const rawBody = await req.text();
  const secret = String(env.LEMONSQUEEZY_WEBHOOK_SECRET);

  // Verify webhook signature
  verifySignature(rawBody, req.headers.get("x-signature") as string, secret);

  const body = JSON.parse(rawBody) as LS_WebhookPayload;

  // Log every webhook event
  console.log(body);

  const { data, meta } = body;
  const { event_name, custom_data } = meta;

  // Subscription events
  if (data.type === "subscriptions") {
    const {
      status,
      user_email,
      user_name,
      test_mode,
      ends_at,
      renews_at,
      customer_id,
      order_id,
      product_name,
      variant_id,
      variant_name,
      store_id,
      card_brand,
      card_last_four,
    } = data?.attributes;
    const { user_id } = custom_data;

    if (
      event_name === "subscription_created" ||
      event_name === "subscription_updated"
    ) {
      // Check if user exists
      const user = await prisma.users.findFirst({ where: { uId: user_id } });

      if (!user) {
        console.log(`${event_name.toUpperCase()} EVENT`);
        const msg = `User ${user_email} with id ${user_id} not found`;
        console.log(`❌ ${msg}`);
        throw new HttpException(RESPONSE_CODE.USER_NOT_FOUND, msg, 404);
      }

      // Prevent duplicate subscription
      const userSubscription = await prisma.subscriptions.findFirst({
        where: {
          uId: user_id,
          subscription_id: data.id,
        },
      });

      // Update or create subscription
      if (userSubscription) {
        console.log(`SUBSCRIPTION_UPDATED`);

        const _newPlan = pricingPlans.find(
          (p) => p.product_id === Number(data?.attributes.product_id)
        );
        const _prevPlan = pricingPlans.find(
          (p) => p.product_id === Number(userSubscription.product_id)
        );

        await prisma.subscriptions.update({
          where: { id: userSubscription.id, uId: user_id },
          data: {
            status,
            user_email,
            user_name,
            test_mode,
            ends_at,
            renews_at,
            customer_id: String(customer_id),
            order_id: String(order_id),
            product_id: String(data?.attributes.product_id),
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

        console.log(
          `✅ Subscription updated for user ${user_email} with id ${user_id}`
        );
        console.log(`Prev plan: ${_prevPlan?.name ?? "N/A"}`);
        console.log(`New plan: ${_newPlan?.name}`);
      } else {
        console.log(`SUBSCRIPTION_CREATED`);
        // Check if subscription exists
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

        // Create subscription
        const subscription = await prisma.subscriptions.create({
          data: {
            status,
            user_email,
            user_name,
            test_mode,
            ends_at,
            renews_at,
            customer_id: String(customer_id),
            order_id: String(order_id),
            product_id: String(data?.attributes.product_id),
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

        // Check if subscription was created
        if (!subscription) {
          const msg = `Error creating subscription for user ${user_email} with id ${user_id}`;
          console.log(`❌ ${msg}`);
          throw new HttpException(RESPONSE_CODE.ERROR, msg, 400);
        }

        console.log(
          `✅ Subscription created for user ${user_email} with id ${user_id}`
        );
      }
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
