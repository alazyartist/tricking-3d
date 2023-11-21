import { router, publicProcedure, protectedProcedure } from "../trpc";
import * as z from "zod";
import { combos, tricks } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { v4 as uuid } from "uuid";
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
    const tricks = await ctx.prisma.tricks.findMany({
      include: {
        variations: { include: { variation: true } },
        animation: true,
      },
    });
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
  getTrickParts: publicProcedure.query(async ({ ctx }) => {
    const allStances = await ctx.prisma.stances.findMany();
    const allBases = await ctx.prisma.bases.findMany();
    const allVariations = await ctx.prisma.variations.findMany();
    const data = [...allStances, ...allBases, ...allVariations];
    return data;
  }),
  updateTrickPartPoints: publicProcedure
    .input(
      z.object({
        id: z.union([z.number(), z.string()]),
        pointValue: z.number(),
        type: z.union([
          z.literal("Transition"),
          z.literal("Stance"),
          z.literal("Base"),
          z.literal("Variation"),
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, pointValue, type } = input;
      try {
        if (type === "Transition") {
          await ctx.prisma.transitions.update({
            where: { id: id as number },
            data: { pointValue: pointValue },
          });
          return "UpdatedPointValue";
        } else if (type === "Stance") {
          await ctx.prisma.stances.update({
            where: { stance_id: id as string },
            data: { pointValue: pointValue },
          });

          return "UpdatedPointValue";
        } else if (type === "Base") {
          await ctx.prisma.bases.update({
            where: { base_id: id as string },
            data: { pointValue: pointValue },
          });
          return "UpdatedPointValue";
        } else if (type === "Variation") {
          await ctx.prisma.variations.update({
            where: { id: id as number },
            data: { pointValue: pointValue },
          });
          return "UpdatedPointValue";
        }
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "FAILED_TO_UPDATE_POINT_VALUE",
        });
      }

      return;
    }),
  makeNewTrick: publicProcedure
    .input(
      z.object({
        name: z.string(),
        base_id: z.string(),
        trickType: z.string(),
        takeoffStance: z.string(),
        variationsArr: z.array(
          z.object({
            id: z.number(),
            variationType: z.string().nullish(),
            type: z.string().nullish(),
            name: z.string().nullish(),
            value: z.string().nullish(),
            pos: z.string().nullish(),
            pointValue: z.number().nullish(),
          })
        ),
        landingStance: z.string(),
        pointValue: z.number(),
        useruuid: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        let newTrick = await ctx.prisma.tricks.findFirst({
          where: { name: input.name },
        });

        if (newTrick !== null) {
          try {
            await ctx.prisma.trick_variations.deleteMany({
              where: { trick_id: newTrick.trick_id },
            });

            await ctx.prisma.tricks.update({
              where: { trick_id: newTrick.trick_id },
              data: {
                base_id: input.base_id,
                trickType: input.trickType,
                takeoffStance: input.takeoffStance,
                landingStance: input.landingStance,
                pointValue: input.pointValue,
              },
            });
            const variationMap = input.variationsArr.map((v) => {
              return {
                variation_id: v.id,
                trick_id: newTrick?.trick_id as string,
              };
            });
            await ctx.prisma.trick_variations.createMany({
              data: variationMap,
            });
          } catch (err) {
            console.log(err);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "FAILED_TO_UPDATE_EXISTING_TRICK",
            });
          }
        } else {
          try {
            newTrick = await ctx.prisma.tricks.create({
              data: {
                trick_id: uuid(),
                name: input.name,
                base_id: input.base_id,
                trickType: input.trickType,
                takeoffStance: input.takeoffStance,
                landingStance: input.landingStance,
                pointValue: input.pointValue,
              },
            });
            if (newTrick !== null) {
              const variationMap = input.variationsArr.map((v) => {
                return { variation_id: v.id, trick_id: newTrick?.trick_id };
              });
              await ctx.prisma.trick_variations.createMany({
                data: variationMap,
              });
            }
          } catch (err) {
            console.log(err);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "FAILED_TO_CREATE_NEW_TRICK",
            });
          }
        }

        //if making new trick
        const updatedTrick = await ctx.prisma.tricks.findUnique({
          where: { trick_id: newTrick.trick_id },
          include: { variations: { include: { variation: true } } },
        });
        console.log("finaltrick", updatedTrick);
        return updatedTrick;
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "FAILED_TO_CREATE_OR_UPDATE_TRICK",
        });
      }
    }),
  claimTrick: publicProcedure
    .input(
      z.object({
        action: z.union([z.literal("Claim"), z.literal("Unclaim")]),
        trick_id: z.string(),
        user_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (input.action === "Claim") {
          const claimedTrick = await ctx.prisma.claimedtricks.create({
            data: { user_id: input.user_id, trick_id: input.trick_id },
          });
          return claimedTrick;
        } else if (input.action === "Unclaim") {
          const unclaimedTrick = await ctx.prisma.claimedtricks.delete({
            where: {
              user_id_trick_id: {
                trick_id: input.trick_id,
                user_id: input.user_id,
              },
            },
          });
          return unclaimedTrick;
        }
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "FAILED_TO_CLAIM_TRICK",
        });
      }

      return;
    }),
});
