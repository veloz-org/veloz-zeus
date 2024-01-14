import { NextRequest } from "next/server";
import { isAuthenticated } from "../middlewares/auth";
import CatchError from "../utils/_error";
import SubscriptionController from "../controllers/subscription.controller";

const subscriptionController = new SubscriptionController();

export const POST = CatchError(
  isAuthenticated(
    async (req: NextRequest) => await subscriptionController.subscribe(req)
  )
);

export const GET = CatchError(
  isAuthenticated(
    async (req: NextRequest) =>
      await subscriptionController.getSubscriptions(req)
  )
);
