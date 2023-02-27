import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(async ({ ctx }) => {
    const userInfo = await ctx.prisma.users.findUnique({
      where: { uuid: ctx.user.uuid },
      select: {
        username: true,
        uuid: true,
        password: false,
        refresh_token: false,
      },
    });
    console.log("secretCtx", ctx.user, userInfo);
    return userInfo;
  }),
});
