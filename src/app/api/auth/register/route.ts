import { NextRequest } from "next/server";
import UserController from "../../controllers/user.controller";

const userController = new UserController();

export const POST = async (req: NextRequest) =>
  await userController.register(req);
