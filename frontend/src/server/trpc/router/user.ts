import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  findAll: publicProcedure.query(async ({ input, ctx }) => {
    const users = await ctx.prisma.users.findMany({
      select: {
        profilePic: true,
        uuid: true,
        username: true,
        first_name: true,
        email: true,
        captures: true,
        SessionSummaries: true,
        sessionSummaries: true,
      },
    });
    // console.log(users);
    return users;
  }),
  findByUUID: publicProcedure
    .input(z.object({ userid: z.string() }))
    .query(async ({ ctx, input }) => {
      const profileInfo = await ctx.prisma.users.findUnique({
        where: { uuid: input.userid },
        select: {
          profilePic: true,
          uuid: true,
          username: true,
          first_name: true,
          email: true,
          captures: true,
          SessionSummaries: true,
          sessionSummaries: true,
        },
      });
      console.log({
        ...profileInfo,
        SessionSummaries: [
          ...profileInfo.sessionSummaries,
          ...profileInfo.SessionSummaries,
        ],
      });
      return {
        ...profileInfo,
        SessionSummaries: [
          ...profileInfo.sessionSummaries,
          ...profileInfo.SessionSummaries,
        ],
      };
    }),
});
