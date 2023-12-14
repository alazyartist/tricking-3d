import * as z from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { v4 as uuid } from "uuid";

export const tricklistRouter = router({
  findTricklistById: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ ctx, input }) => {
      const tricklists = await ctx.prisma.tricklists.findMany({
        where: { owner: input.uuid },
        include: { combos: { include: { combo: true } } },
      });
      console.log(tricklists);
      return tricklists;
    }),
  makeTricklist: protectedProcedure
    .input(z.object({ uuid: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const tricklist = await ctx.prisma.tricklists.create({
        data: {
          tricklist_id: uuid(),
          name: input.name,
          owner: input.uuid,
          updatedAt: new Date(),
        },
      });
      return tricklist;
    }),
  addComboToTricklist: protectedProcedure
    .input(
      z.object({
        tricklist_id: z.string(),
        user_id: z.string(),
        combo_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tricklist = await ctx.prisma.tricklist_combos.create({
        data: {
          tricklist_id: input.tricklist_id,
          combo_id: input.combo_id,
          updatedAt: new Date(),
        },
      });
      return tricklist;
    }),
  deleteComboFromTricklist: protectedProcedure
    .input(
      z.object({
        tricklist_id: z.string(),
        combo_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tricklist = await ctx.prisma.tricklist_combos.findUnique({
        where: {
          tricklist_id_combo_id: {
            tricklist_id: input.tricklist_id,
            combo_id: input.combo_id,
          },
        },
      });

      return tricklist;
    }),
});
