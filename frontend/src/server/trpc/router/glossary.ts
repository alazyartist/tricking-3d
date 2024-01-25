import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const glossaryRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const glossary = await ctx.prisma.glossary.findMany();
    return glossary;
  }),
  addTerm: protectedProcedure
    .input(z.object({ term: z.string(), definition: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const term = await ctx.prisma.glossary.create({
        data: {
          term: input.term,
          definition: input.definition,
        },
      });
      return term;
    }),
});
