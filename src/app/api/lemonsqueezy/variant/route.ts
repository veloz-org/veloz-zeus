import { NextRequest } from "next/server";
import sendResponse from "../../utils/sendResponse";
import { RESPONSE_CODE } from "../../types";
import env from "../../config/env";
import axios from "axios";
import CatchError from "../../utils/_error";
import LemonsqueezyServices from "../../services/lemonsqeezy.service";
import { LemonsqueezyConfig } from "../../config";

const LQS = new LemonsqueezyServices();

export const GET = CatchError(async (req: NextRequest) => {
  // accessible only on development
  if (process.env.NODE_ENV !== "development") {
    return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, {
      msg: "This route is only accessible on development mode",
    });
  }

  // check if lemonsqueezy api key is set
  if (!env.LEMONSQUEEZY_API_KEY) {
    return sendResponse.error(
      RESPONSE_CODE.VALIDATION_ERROR,
      "Lemonsqueezy API key is not set. Please set it in the .env file",
      400
    );
  }

  const products = await LQS.getProductVariants();

  return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, {
    products,
  });
});
