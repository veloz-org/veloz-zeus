import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";

// next-auth middleware
export function middleware(request: NextRequest) {
  console.log("request", request);
  return NextResponse.next();
}

// default config
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
