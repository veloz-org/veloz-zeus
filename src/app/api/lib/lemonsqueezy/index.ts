import { Readable } from "stream";
import { LS_WebhookPayload } from "./types";
import type { ServerResponse, IncomingMessage } from "http";
import crypto from "crypto";
import { RESPONSE_CODE } from "../../types";

type Response = {
  errorMsg: string | null;
  success: boolean;
  data: LS_WebhookPayload;
};

type LemonsqueezyWebhookResponse = Promise<Response>;

export default async function LemonsqueezyWebhookHandler(
  req: IncomingMessage,
  res: ServerResponse,
  secret: string
): LemonsqueezyWebhookResponse {
  const response = { errorMsg: null, success: false, data: {} } as Response;

  if (req.method !== "POST") {
    const msg = `❌ Method not allowed for lemonsqueezy webhook`;
    sendErrorResponse(
      res,
      405,
      RESPONSE_CODE.METHOD_NOT_ALLOWED,
      msg,
      response
    );
    return response;
  }

  try {
    // parse the request body manually (for some reason)
    const rawBody = (await buffer(req)).toString("utf-8");

    // verify webhook signature
    if (
      !verifySignature(
        rawBody,
        req.headers["x-signature"] as string,
        secret,
        res,
        response
      )
    ) {
      return response;
    }

    const payload: LS_WebhookPayload = JSON.parse(rawBody);

    sendSuccessResponse(res, response);
    console.log("✅ Webhook received");

    response.success = true;
    response.data = payload;

    return response;
  } catch (e: any) {
    const msg = `❌ ERROR: ${e.message}`;
    sendErrorResponse(
      res,
      500,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      msg,
      response
    );
    return response;
  }
}

function sendSuccessResponse(res: ServerResponse, response: Response) {
  res.writeHead(200, { "Content-Type": "application/json" }).end(
    JSON.stringify({
      errorStatus: false,
      code: RESPONSE_CODE.SUCCESS,
      message: "✅ Webhook received",
    })
  );
}

function sendErrorResponse(
  res: ServerResponse,
  statusCode: number,
  code: number,
  msg: string,
  response: Response
) {
  res.writeHead(statusCode, { "Content-Type": "application/json" }).end(
    JSON.stringify({
      errorStatus: true,
      code: code,
      message: msg,
    })
  );
  console.log(msg);
  response.errorMsg = msg;
  response.success = false;
}

function verifySignature(
  rawBody: string,
  headerSignature: string | undefined,
  secret: string,
  res: ServerResponse,
  response: Response
) {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const signature = Buffer.from(headerSignature || "", "utf8");

  if (!crypto.timingSafeEqual(digest, signature)) {
    const msg = "❌ Invalid lemonsqueezy signature";
    sendErrorResponse(res, 401, RESPONSE_CODE.UNAUTHORIZED, msg, response);
    return false;
  }

  return true;
}

async function buffer(readable: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}
