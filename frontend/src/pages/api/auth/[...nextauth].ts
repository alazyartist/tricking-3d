import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import Email from "next-auth/providers/email";
import {
  myAccessToken,
  sendVerificationRequest,
} from "../../../utils/nodemailer";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    // ...add more providers here
    Email({
      from: "torquetricking@gmail.com",
      server: {
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          type: "OAUTH2",
          user: "torquetricking@gmail.com",
          clientId: env.GMAIL_CLIENT_ID,
          clientSecret: env.GMAIL_CLIENT_SECRET,
          refreshToken: env.GMAIL_REFRESH_TOKEN,
          accessToken: myAccessToken,
        },
      },
      sendVerificationRequest({ identifier, url, provider }) {
        sendVerificationRequest({ identifier, url, provider });
      },
    }),
  ],
};

export default NextAuth(authOptions);
