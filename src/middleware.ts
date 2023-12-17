import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
// export { default } from "next-auth/middleware";

// next-auth middleware
// export function middleware(request: NextRequest) {
//   console.log("request", request);
//   return NextResponse.next();
// }

// clerk middleware
export default authMiddleware({
  publicRoutes: ["/api/(.*)", "/", "/auth", "/api/webhook/(.*)"],
  afterAuth: (auth, req, evt) => {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

// default config
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
