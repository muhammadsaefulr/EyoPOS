import NextAuth from 'next-auth';
import { auth, authConfig } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
 
export default NextAuth(authConfig).auth;
 
export async function middleware(req: NextRequest) {
  const session = await auth(); 

  if (!session) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname); 
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.png).*)',"/dashboard/:path*"],
};
