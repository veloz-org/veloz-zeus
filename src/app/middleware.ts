import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";

export const config = { matcher: ["/app/(.*)"] };

export function middleware(request: NextRequest) {
  console.log("request", request);
  return NextResponse.next();
}
