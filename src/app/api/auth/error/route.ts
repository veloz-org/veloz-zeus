import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

export const GET = (req: NextRequest) => {
  if (req.method === "GET") {
    console.log("AUTH ERROR");
    const error = req.nextUrl.searchParams.get("error");

    const encodedError = encodeURIComponent(error as string);

    // redirect to auth page
    redirect(`/auth?error=${encodedError}`);
  }
};
