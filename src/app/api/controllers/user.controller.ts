import CatchError from "../utils/_error";
import HttpException from "../utils/exception";
import { RESPONSE_CODE } from "../types";

export default class UserController {
  // register user (nextauth, jwt)
  register = CatchError(async (req: Request) => {
    const payload = await req.json();
  });
}
