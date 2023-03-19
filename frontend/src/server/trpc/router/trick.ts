import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const tricksRouter = router({
  findById: publicProcedure
    .input(z.object({ trick_id: z.string() }))
    .query(async ({ input, ctx }) => {
      const trick = await ctx.prisma.tricks.findUnique({
        where: { trick_id: input.trick_id },
        include: {
          base: true,
          variations: { include: { variation: true } },
        },
      });
      // console.log(tricks);
      return trick;
    }),
  findAll: publicProcedure.query(async ({ input, ctx }) => {
    const tricks = await ctx.prisma.tricks.findMany({});
    // console.log(tricks);
    return tricks;
  }),
  findAllTransitions: publicProcedure.query(async ({ input, ctx }) => {
    const transitions = await ctx.prisma.transitions.findMany({});
    // console.log(transitions);
    return transitions;
  }),
  findAllStances: publicProcedure.query(async ({ input, ctx }) => {
    const stances = await ctx.prisma.stances.findMany({});
    // console.log(stances);
    return stances;
  }),
  findMultipleById: publicProcedure
    //takes in clipLable array
    .input(z.array(z.any()))
    .mutation(async ({ input, ctx }) => {
      let newData = input.map(async (trick) => {
        if (trick.type == "Trick") {
          let td = await ctx.prisma.tricks.findUnique({
            where: { trick_id: trick.trick_id },
            include: {
              base: true,
              variations: { include: { variation: true } },
            },
          });
          return td;
        }
        if (trick.type == "Transition") {
          let td = await ctx.prisma.transitions.findUnique({
            where: { id: trick.id },
          });
          return td;
        }
      });
      await Promise.all(newData);
      // console.log(newData);
      return Promise.all(newData);
    }),
});
