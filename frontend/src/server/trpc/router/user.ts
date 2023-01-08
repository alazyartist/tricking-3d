import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  test: publicProcedure.query(async ({ input, ctx }) => {
    const tricks = await ctx.prisma.tricks.findMany();
    console.log(tricks);
    return {
      test: `Hello test is definitely working, keen as`,
      test2: "test2",
      tricks: tricks,
    };
  }),
});
