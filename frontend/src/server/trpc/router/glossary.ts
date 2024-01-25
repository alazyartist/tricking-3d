import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const glossaryRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const glossary = await ctx.prisma.glossary.findMany();
    return glossary;
  }),
  addInitialTerms: publicProcedure
    .input(
      z.object({
        terms: z.array(z.object({ term: z.string(), definition: z.string() })),
      })
    )
    .mutation(async ({ input, ctx }) => {
      //   console.log(input.terms);
      try {
        console.log("adding terms");
        const terms = await ctx.prisma.glossary.createMany({
          data: input.terms,
        });
        return terms;
      } catch (e) {
        console.log(e);
      }
    }),
});
