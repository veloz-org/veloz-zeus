import CatchError from "../utils/_error";
import HttpException from "../utils/exception";
import { RESPONSE_CODE } from "../types";
import ZodValidation from "../utils/zodValidation";
import { registerSchema } from "../utils/schema_validation";
import { NextRequest } from "next/server";

export default class UserController {
  // register user (nextauth, jwt)
  public register = CatchError(async (req: NextRequest) => {
    const payload = await req.json();
    const validated = await ZodValidation(registerSchema, payload, req.url);
    if (!validated) {
      throw new HttpException(
        RESPONSE_CODE.VALIDATION_ERROR,
        "Validation error",
        400
      );
    }
  });
}
