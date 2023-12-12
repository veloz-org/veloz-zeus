import UserController from "../../controllers/user.controller";

const userController = new UserController();

export const POST = async (req: Request) => {
  return await userController.register(req);
};
