import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prismadb";
import { match } from "@/lib/encryption";

const authOptions: NextAuthOptions = {
  /* pages: {
    signIn: "/auth/login",
  }, */
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@exemple.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const userExists = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            email: true,
            password: true,
            profile: true,
          },
        });

        if (!userExists) return null;

        const passwordMatch = await match(
          credentials.password,
          userExists.password
        );

        if (!passwordMatch) return null;

        return {
          id: userExists.id,
          email: userExists.email,
          profile: userExists.profile,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com");
      }
      return true;
    },
    async jwt({ token, user }) {
        if (user) {
          return {
            ...token,
            id: user.id,
            email: user.email,
            profile: user.profile,
          };
        }
        return token;
      },
      async session({ session, user, token }) {
        return {
          ...session,
          user: {
            id: token.id,
            email: token.email,
            profile: token.profile,
          },
        };
      },
  },
};

export default authOptions;
