import { clerkMiddleware, after } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  afterAuth(auth, req) {
    if (!auth.userId) {
      const signUpUrl = new URL("/sign-up", req.url);
      return NextResponse.redirect(signUpUrl);
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/"],
};
