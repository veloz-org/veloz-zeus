import { NextRequest } from "next/server";
import UserController from "../../controllers/user.controller";

const userController = new UserController();

export const POST = async (req: NextRequest) => {
  return await userController.register(req);
};
