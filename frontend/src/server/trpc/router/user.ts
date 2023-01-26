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
});
