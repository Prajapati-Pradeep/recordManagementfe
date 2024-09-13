import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { API } from "@/libs/axios";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // if (!credentials?.email || !credentials.password) {
        //   return null;
        // }

        // api call
        try {
          const response = await API.post("/api/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });
          const { data } = response;
          return data;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("Token>>>>>>>>>>>>>>>>>>", token);
      console.log("Session>>>>>>>>>>>>>>>>>>", session);
      return {
        ...session,
        user: {
          ...session.user,
          access_token: token.access_token,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        console.log("User:>>>>>>", user);
        console.log("Token:>>>>>>", token);
        return {
          ...token,
          id: u.id,
          access_token: u.access_token,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
