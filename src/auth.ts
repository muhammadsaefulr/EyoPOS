import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./drizzle/db";
import { users } from "./drizzle/schema";
import { eq } from "drizzle-orm";
import { registredUser } from "./drizzle/schema/registred_user";

export const authConfig = {
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({ 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const dummyUser = { id: "1", name: "J Smith", email: "jsmith@example.com", password: "password123" };
        
        if (credentials?.username === dummyUser.email && credentials?.password === dummyUser.password) {
          return { id: dummyUser.id, name: dummyUser.name, email: dummyUser.email };
        }
        return null;
      }
    })
  ],
  
  pages: {
    signIn: '/login',
    error: '/login'
  },
  
  callbacks: {
    async signIn({ user }) {

      // // if (account?.provider === "credentials") {
      //   return true; // Jangan cek database untuk credentials
      // // }

      if (!user.email) return false;

      const isUserRegistred = await db.select()
      .from(registredUser)
      .where(eq(registredUser.email, user.email)).then(rows => rows[0] || null)
      
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email)).then(rows => rows[0] || null);
      
      return (existingUser || isUserRegistred) ? true : false;
    },

    async jwt({ token, user}){
      if(user){
        token.sub = user.id
      }

      return token
    },
    
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ["/dashboard"];
      const isProtected = protectedPaths.some(path => nextUrl.pathname.startsWith(path));
      
      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/api/auth/signin", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }
      return true;
    }
  }
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authConfig);
