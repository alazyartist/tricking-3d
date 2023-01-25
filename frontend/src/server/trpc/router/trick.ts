import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const tricksRouter = router({
  findAll: publicProcedure.query(async ({ input, ctx }) => {
    const tricks = await ctx.prisma.tricks.findMany({});
    // console.log(tricks);
    return { tricks };
  }),
  findMultipleById: publicProcedure
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
