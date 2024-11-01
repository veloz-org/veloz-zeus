import { RESPONSE_CODE } from "@/api/types";
import { NextApiRequest, NextApiResponse } from "next";
import { AnyZodObject, ZodError } from "zod";
import sendResponse from "./sendResponse";
import { NextRequest } from "next/server";
import HttpException from "./exception";

export default async function ZodValidation(
  schema: AnyZodObject,
  body: object,
  pathname: string
) {
  try {
    const { searchParams } = new URL(pathname);
    const query = searchParams;
    schema.parse(body ?? query);
  } catch (error: any) {
    const msg = error?.issues[0]?.message as any;
    throw new HttpException(RESPONSE_CODE.VALIDATION_ERROR, msg, 400);
  }
}
