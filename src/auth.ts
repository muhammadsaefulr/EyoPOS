import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./drizzle/db"
import { users } from "./drizzle/schema"
import { eq, isNull } from "drizzle-orm"

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [Google({ 
    clientId: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET})],
    
  pages: {
    signIn: '/login', 
    error: '/login'
  },
  callbacks: {
    async signIn({ user }) {

      const existingUser = await db
      .select()
      .from(users)
      .where(user.email ? eq(users.email, user.email) : isNull(users.email));
    
      if(existingUser.length > 0){
        return true;
      }

      return false
    },
    async session({session, user}){
      session.user.id = user.id
      return session;
    },
    authorized({auth, request: {nextUrl}}) {
      const isLoggedIn = !auth?.user
      const paths = ["/dashboard"]
      const isPotected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if(isPotected && !isLoggedIn){
        const redirectUrl = new URL ("/api/auth/signin", nextUrl.origin)
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
        return Response.redirect(redirectUrl)
      }

      return true
    },
  }
} satisfies NextAuthConfig

export const { 
  handlers, 
  auth, 
  signOut 
} = NextAuth(authConfig)
