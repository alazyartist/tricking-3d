import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import calculateTrickTotals from "@utils/CalculateTrickTotals";

export const comboRouter = router({
  getAll: publicProcedure
    .input(z.object({}).optional())
    .query(async ({ ctx }) => {
      const combos = await ctx.prisma.combos.findMany({
        include: { Clips: true },
      });
      return combos;
    }),
  findById: publicProcedure
    .input(z.object({ combo_id: z.string() }))
    .query(async ({ input, ctx }) => {
      const combo = await ctx.prisma.combos.findUnique({
        where: { combo_id: input.combo_id },
        include: {
          Clips: {
            include: { summary: { include: { SessionSources: true } } },
          },
        },
      });
      return combo;
    }),
  getComboScore: publicProcedure
    .input(z.object({ combo: z.array(z.any()) }))
    .query(async ({ input, ctx }) => {
      if (input.combo.length === 0)
        return {
          totalScore: 0,
          bonusScore: 0,
          varietyMap: [],
          chainTotal: 0,
          varietyScore: 0,
          executionAverage: 0,
          powerScore: 0,
          chainMap: [],
          uvScore: 0,
          trickCount: {},
          chains: {},
        };
      if (input.combo[input.combo.length - 1].type === "Transition") {
        input.combo.pop();
      }
      const totalScore = calculateTrickTotals(input.combo, input.combo, ctx);
      return totalScore;
    }),
});
