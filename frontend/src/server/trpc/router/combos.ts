import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const comboRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const combos = await ctx.prisma.combos.findMany();
    return combos;
  }),
});
