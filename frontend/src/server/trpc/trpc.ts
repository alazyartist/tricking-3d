import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "./context";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  // console.log("ctx", ctx);
  if (!ctx.user.uuid) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  if (ctx.user.uuid) return next({ ctx: { user: ctx.user } });
  // if (!ctx.session || !ctx.session.user) {
  //   throw new TRPCError({ code: "UNAUTHORIZED" });
  // }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      // session: { ...ctx.session, user: ctx.session.user },
      user: { ...ctx.user },
    },
  });
});

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);
