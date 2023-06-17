import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { combos, tricks } from "@prisma/client";

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
  getAll: publicProcedure
    .input(z.object({}).optional())
    .query(async ({ input, ctx }) => {
      const tricks = await ctx.prisma.tricks.findMany({});
      const transitions = await ctx.prisma.transitions.findMany({});
      const stances = await ctx.prisma.stances.findMany({});
      // console.log(tricks);
      return [...tricks, ...transitions, ...stances];
    }),
  findAllwithComboClips: publicProcedure.query(async ({ input, ctx }) => {
    const tricks = await ctx.prisma.tricks.findMany({});
    // console.log(tricks);
    //@ts-ignore
    const trickMap = tricks.map(async (trick) => {
      const combos = await ctx.prisma.combos.findMany({
        where: {
          comboArray: { array_contains: { trick_id: trick.trick_id } },
        },
        include: {
          Clips: {
            include: { summary: { include: { SessionSources: true } } },
          },
        },
      });
      return { ...trick, combos: combos };
    }) as (tricks & { combos: Awaited<Promise<combos>> })[];
    await Promise.all(trickMap);
    type trickarr = Awaited<typeof trickMap>;

    console.log(trickMap[0]);
    return Promise.all(trickMap);
  }),
  findCombosWithTrick: publicProcedure
    .input(z.object({ trick_id: z.string() }))
    .query(async ({ input, ctx }) => {
      const combos = await ctx.prisma.combos.findMany({
        where: {
          comboArray: { array_contains: { trick_id: input.trick_id } },
        },
        include: {
          Clips: {
            include: { summary: { include: { SessionSources: true } } },
          },
        },
      });
      // console.log(combos);
      return combos;
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
              animation: true,
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
  getBases: publicProcedure.query(async ({ ctx }) => {
    const bases = await ctx.prisma.bases.findMany();
    return bases;
  }),
});
