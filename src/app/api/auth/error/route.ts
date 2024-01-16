import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import CatchError from "../../utils/_error";

export const GET = CatchError((req: NextRequest) => {
  if (req.method === "GET") {
    console.log("AUTH ERROR");
    const error = req.nextUrl.searchParams.get("error");

    const encodedError = encodeURIComponent(error as string);

    // redirect to auth page
    return redirect(`/auth?error=${encodedError}`);
  }
});
