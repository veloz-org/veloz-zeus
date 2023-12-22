import { NextRequest } from "next/server";
import { isAuthenticated } from "../middlewares/auth";
import CatchError from "../utils/_error";
import WaitlistController from "../controllers/waitlist.controller";

const waitlistController = new WaitlistController();

export const GET = CatchError(
  isAuthenticated(
    async (req: NextRequest) => await waitlistController.getWaitlist(req)
  )
);

export const POST = CatchError(
  async (req: NextRequest) => await waitlistController.addToWaitlist(req)
);
