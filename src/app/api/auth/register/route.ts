import { NextRequest } from "next/server";
import CatchError from "../../utils/_error";
import AuthController from "../../controllers/auth.controller";

const authController = new AuthController();

export const POST = CatchError(
  async (req: NextRequest) => await authController.register(req)
);
