// src/server/router/context.ts
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import type { Session } from "next-auth";
import { getServerAuthSession } from "../common/get-server-auth-session";
import { prisma } from "../db/client";
import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/dist/api";

type CreateContextOptions = {
  session: Session | null;
  user?: any;
  auth: SignedInAuthObject | SignedOutAuthObject;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  // console.log("inner", opts.user);
  return {
    auth: opts.auth,
    session: opts.session,
    user: opts.user,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  if (req?.cookies?.jwt) {
    const [h64, p64, s64] = req?.cookies?.jwt?.split(".");
    const user = JSON.parse(atob(p64).toString());
    const session = await getServerAuthSession({ req, res });

    return await createContextInner({
      session,
      user,
      auth: getAuth(opts.req),
    });
  }
  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({
    session,
    auth: getAuth(opts.req),
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
