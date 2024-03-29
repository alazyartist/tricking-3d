import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const transitionsRouter = router({
  updateMultiplier: protectedProcedure
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
  getCombosWithTransition: publicProcedure
    .input(z.object({ id: z.number().nullish() }))
    .query(async ({ input, ctx }) => {
      if (!input.id) return [];
      const combos = await ctx.prisma.combos.findMany({
        include: {
          Clips: true,
        },
        where: {
          AND: [
            {
              comboArray: {
                path: "$[*].id",
                array_contains: input.id,
              },
            },
            {
              comboArray: {
                path: "$[*].type",
                array_contains: "Transition",
              },
            },
            {
              Clips: {
                some: {},
              },
            },
          ],
        },
      });

      return combos;
    }),
});
