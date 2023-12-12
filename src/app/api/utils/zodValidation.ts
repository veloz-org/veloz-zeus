import { RESPONSE_CODE } from "@/api/types";
import { NextApiRequest, NextApiResponse } from "next";
import { AnyZodObject } from "zod";
import sendResponse from "./sendResponse";
import { NextRequest } from "next/server";

export default async function ZodValidation(
  schema: AnyZodObject,
  body: object,
  pathname: string
) {
  try {
    const { searchParams } = new URL(pathname);
    const query = searchParams;
    await schema.parseAsync(body ?? query);
    return true;
  } catch (error: any) {
    const msg = error?.issues[0]?.message as any;
    sendResponse.error(
      RESPONSE_CODE.VALIDATION_ERROR,
      "Validation error",
      400,
      {
        message: msg,
        error,
      }
    );
    return false;
  }
}
