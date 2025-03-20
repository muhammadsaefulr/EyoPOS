import NextAuth from "next-auth";
import { auth, authConfig } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@auth/core/jwt";

export default NextAuth(authConfig).auth;

  export async function middleware(req: NextRequest) {
    console.log('middleware running, ', req.nextUrl.pathname)

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    console.log(token)

    if(req.nextUrl.pathname.startsWith("/api") && !token){
        return NextResponse.json(
          { message: "Unauthorized: Please login first!" },
          { status: 401 }
        );
    }

    if (!token) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/api/:path*",
    "/dashboard/:path*",
  ],
};
