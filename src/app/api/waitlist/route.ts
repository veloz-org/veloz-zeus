import { NextRequest } from "next/server";
import { isAdmin, isAuthenticated } from "../middlewares/auth";
import CatchError from "../utils/_error";
import WaitlistController from "../controllers/waitlist.controller";

const waitlistController = new WaitlistController();

export const GET = CatchError(
  isAuthenticated(
    isAdmin(
      async (req: NextRequest) => await waitlistController.getWaitlist(req)
    )
  )
);

export const POST = CatchError(
  async (req: NextRequest) => await waitlistController.addToWaitlist(req)
);

export const DELETE = CatchError(
  isAuthenticated(
    isAdmin(
      async (req: NextRequest) =>
        await waitlistController.deleteFromWaitlist(req)
    )
  )
);
