import { RESPONSE_CODE } from "@/api/types";
import { NextResponse } from "next/server";
import HttpException from "./exception";
import sendResponse from "./sendResponse";

//! Do not change the _error.ts file to error.ts as that a client component.

export default function CatchError(fn: Function) {
  return async function (req: Request) {
    try {
      await fn(req);
    } catch (err: any) {
      const code = RESPONSE_CODE[RESPONSE_CODE.INTERNAL_SERVER_ERROR];
      console.log(`😥 Error [${code}]: ${err?.message}`);
      console.log(err);
      if (err instanceof HttpException) {
        return sendResponse.error(
          RESPONSE_CODE[err.code] as any,
          err.message,
          err.statusCode,
          err
        );
      }

      return sendResponse.error(
        RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        "INTERNAL SERVER ERROR",
        500,
        err
      );
    }
  };
}
