import { NextRequest } from "next/server";
import CatchError from "../../utils/_error";
import { Webhook } from "svix";
import env from "../../config/env";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import HttpException from "../../utils/exception";
import { RESPONSE_CODE } from "../../types";
import prisma from "@/prisma/prisma";
import sendResponse from "../../utils/sendResponse";

export const handler = CatchError(async (req: NextRequest) => {
  const wh_body = await req.text();
  const headers = req.headers;

  const svix_required_headers = {
    "svix-id": headers.get("svix-id"),
    "svix-signature": headers.get("svix-signature"),
    "svix-timestamp": headers.get("svix-timestamp"),
  };

  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET as string);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(wh_body, svix_required_headers as any) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    console.log(`❌ Invalid webhook signature`);
    throw new HttpException(
      RESPONSE_CODE.ERROR,
      "invalid webhook signature",
      400
    );
  }
  const data = evt.data;

  console.log({ data });

  const eventType = evt.type;
  if (eventType === "user.created") {
    const {
      email_addresses,
      image_url,
      first_name,
      last_name,
      id,
      external_accounts,
    } = data as any;

    // check if user exists, if it doesn't then create a new user
    // if it does do nothing
    const email = email_addresses[0]?.email_address;
    const user = await prisma.users.findFirst({
      where: { email },
    });
    const users = await prisma.users.findMany();
    const fullname =
      first_name === null
        ? last_name
        : last_name === null
        ? first_name
        : `${first_name} ${last_name}`;

    if (!user) {
      await prisma.users.create({
        data: {
          uId: id,
          fullname: `${fullname}`,
          username: fullname.toLowerCase().replace(/\s/g, ""),
          email,
          avatar: image_url,
          auth_method: "clerk",
          role: users.length === 0 ? "admin" : "user",
        },
      });

      console.log(`✅ User ${email} created!`);
      sendResponse.success(
        RESPONSE_CODE.SUCCESS,
        `User ${email} created!`,
        200
      );
      return;
    }
    sendResponse.error(
      RESPONSE_CODE.ERROR,
      `User ${email} already exists.`,
      400
    );
    console.log(`❌ User ${email} already exists. `);
  }
  if (eventType === "user.deleted") {
    const { id } = data as any;

    try {
      // delere related user data from database

      // check if user exist
      const user = await prisma.users.findFirst({
        where: { uId: id },
      });

      if (!user) {
        console.log(`❌ Failed to delete: User ${id} not found`);
        return;
      }

      await prisma.users.delete({ where: { uId: id } });

      console.log(`✅ User ${id} data deleted`);
    } catch (e: any) {
      console.log(e);
      console.log(`❌ Error deleting user ${id} data`);
    }
  }
});

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
