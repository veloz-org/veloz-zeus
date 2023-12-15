import { NextApiRequest, NextApiResponse } from "next";
import LemonsqueezyWebhookHandler from "../../lib/lemonsqueezy";
import sendResponse from "../../utils/sendResponse";
import { RESPONSE_CODE } from "../../types";
import CatchError from "../../utils/_error";
import HttpException from "../../utils/exception";
import prisma from "../../../../prisma/prisma";
import { NextRequest } from "next/server";
import crypto from "node:crypto";

export const POST = CatchError(async (req: NextRequest) => {
  console.log({ rawBody: "sdc" });
  // const rawBody = await req.json();
  // const secret = String(process.env.LEMONSQUEEZY_WEBHOOK_SECRET);

  // verifySignature(rawBody, req.headers.get("x-signature") as string, secret);
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
    sendResponse.error(RESPONSE_CODE.UNAUTHORIZED, msg, 401);
    return false;
  }

  return true;
}

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const secret = String(process.env.LEMONSQUEEZY_WEBHOOK_SECRET);
//   const { data, success } = await LemonsqueezyWebhookHandler(req, res, secret);

//   console.log(data);

//   if (success) {
//     const { data: LSData, meta } = data;
//     const { event_name, custom_data } = meta;

//     console.log(LSData);

//     if (
//       event_name === "subscription_created" &&
//       LSData.type === "subscriptions"
//     ) {
//       const orderId = LSData.id;
//       const { user_email, status } = LSData.attributes;

//       // customer data
//       const { user_id, plan_id } = custom_data;

//       // check if user and template exists
//       const user = await prisma.users.findFirst({ where: { uId: user_id } });

//       if (!user) {
//         const msg = `User ${user_email} with id ${user_id} not found`;
//         console.log(`❌ ${msg}`);
//         throw new HttpException(RESPONSE_CODE.USER_NOT_FOUND, msg, 404);
//       }
//     }
//   }
// }

// export default CatchError(handler);
