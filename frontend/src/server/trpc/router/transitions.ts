import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const transitionsRouter = router({
  updateMultiplier: publicProcedure
    .input(z.object({ tid: z.number(), multiplier: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const transition = await ctx.prisma.transitions.update({
        where: { id: input.tid },
        data: {
          multiplier: input.multiplier,
        },
      });
      return { transition };
    }),
  getTransitions: publicProcedure.query(async ({ ctx }) => {
    const transitions = await ctx.prisma.transitions.findMany();
    return transitions;
  }),
});
