import { NextRequest } from "next/server";
import UserController from "../../controllers/user.controller";
import CatchError from "../../utils/_error";

const userController = new UserController();

export const POST = CatchError(
  async (req: NextRequest) => await userController.register(req)
);
