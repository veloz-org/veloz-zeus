import CatchError from "../utils/_error";
import HttpException from "../utils/exception";
import { RESPONSE_CODE } from "../types";
import ZodValidation from "../utils/zodValidation";
import { registerSchema } from "../utils/schema_validation";
import { NextRequest } from "next/server";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import PasswordManager from "../utils/passwordManage";
import sendResponse from "../utils/sendResponse";
import { isAuthenticated } from "../middlewares/auth";

type RegisterPayload = {
  email: string;
  username: string;
  password: string;
};

type ReqUserObj = {
  id: string;
};

export default class UserController {
  // register user (nextauth, jwt)
  public async register(req: NextRequest) {
    const payload = (await req.json()) as RegisterPayload;
    // validate payload
    await ZodValidation(registerSchema, payload, req.url);

    // check if user already exist
    const user = await prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (user) {
      throw new HttpException(
        RESPONSE_CODE.USER_ALREADY_EXIST,
        "User already exist",
        400
      );
    }

    const users = await prisma.user.findMany();
    const pwdHash = PasswordManager.hashPassword(payload.password);
    const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${payload.username}`;

    if (users.length === 0) {
      // ! by default, first user would be created and have the ADMIN role
      await prisma.user.create({
        data: {
          email: payload.email,
          username: payload.username,
          avatar,
          auth_method: "credentials",
          provider: "credentials",
          role: "admin",
          password_hash: pwdHash,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          email: payload.email,
          username: payload.username,
          avatar,
          auth_method: "credentials",
          provider: "credentials",
          password_hash: pwdHash,
          role: "user",
        },
      });
    }

    return sendResponse.success(
      RESPONSE_CODE.SIGNUP_SUCCESSFULL,
      "Signup successful",
      200,
      null
    );
  }

  //   get users info
  public async getUser(req: NextRequest) {
    const user = (req as any)["user"] as ReqUserObj;
    const userData = await prisma.user.findFirst({
      where: {
        uId: user.id,
      },
    });

    return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, {
      id: userData?.uId,
      email: userData?.email,
      username: userData?.username,
      avatar: userData?.avatar,
      role: userData?.role,
    });
  }
}
