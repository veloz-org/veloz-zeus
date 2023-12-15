import { NextRequest } from "next/server";
import sendResponse from "../../utils/sendResponse";
import { RESPONSE_CODE } from "../../types";
import env from "../../config/env";
import axios from "axios";
import CatchError from "../../utils/_error";

export const GET = CatchError(async (req: NextRequest) => {
  // retrieve store information from the database
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

  const stores = await getLemonsqueezyStores();

  return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, {
    stores,
  });
});

async function getLemonsqueezyStores() {
  const api = `https://api.lemonsqueezy.com/v1/stores`;
  const res = await axios.get(api, {
    headers: {
      Authorization: `Bearer ${env.LEMONSQUEEZY_API_KEY}`,
    },
  });

  const data = res.data;

  if (data?.data) {
    const stores = data?.data;
    const _stores = stores.map((s: any) => {
      return {
        id: s.id,
        name: s.attributes.name,
      };
    });
    return _stores;
  }
  return [];
}
