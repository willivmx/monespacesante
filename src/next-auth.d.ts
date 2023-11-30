import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    profile: any;
  }
  interface Session {
    user: User & {
      id: string;
      email: string;
      profile: any;
    };
    token: {
      id: string;
      email: string;
      profile: any;
    };
  }
}
