import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User extends DefaultUser {
     token?: string;
   }
 
   interface Session {
     user: {
       id: string
     } & DefaultSession["user"]
   }
}
