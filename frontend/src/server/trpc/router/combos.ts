import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import calculateTrickTotals from "@utils/CalculateTrickTotals";
import { v4 as uuidv4 } from "uuid";
import { TRPCError } from "@trpc/server";
export const comboRouter = router({
  saveCombo: protectedProcedure
    .input(
      z.object({
        creator: z.string(),
        comboName: z.string(),
        comboArray: z.array(z.any()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      //check if combo exists first
      const comboExists = await ctx.prisma.combos.findFirst({
        where: {
          name: input.comboName,
        },
      });
      if (comboExists) {
        return "Combo Already Exists";
      }
      if (input.comboArray.length === 0) return "Combo is empty";

      if (!comboExists) {
        const combo = await ctx.prisma.combos.create({
          data: {
            combo_id: uuidv4(),
            name: input.comboName,
            comboArray: input.comboArray,
            creator: input.creator,
            updatedAt: new Date(),
            createdAt: new Date(),
          },
        });
        return combo;
      }
    }),
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
    .mutation(async ({ input, ctx }) => {
      if (!input.combo) return;
      try {
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
      } catch (err) {
        console.log(err);
      }
    }),
  syncComboArray: protectedProcedure.mutation(async ({ input, ctx }) => {
    await ctx.prisma.$transaction(async (prisma) => {
      const combos = await prisma.combos.findMany({});
      for (let i = 0; i < combos.length; i++) {
        const combo = combos[i];
        const comboArray = combo.comboArray as unknown as any[];
        const newComboArray = [];
        for (let j = 0; j < comboArray.length; j++) {
          if (comboArray[j].type === "Trick") {
            const trick = comboArray[j];
            const trickInfo = await prisma.tricks.findFirst({
              where: { trick_id: trick.trick_id },
            });
            if (trickInfo) {
              newComboArray.push(trickInfo);
            }
          }
          if (comboArray[j].type === "Transition") {
            const transition = comboArray[j];
            const transitionInfo = await prisma.transitions.findFirst({
              where: { id: transition.id },
            });
            if (transitionInfo) {
              newComboArray.push(transitionInfo);
            }
          }
        }

        if (newComboArray.length === comboArray.length) {
          await prisma.combos.update({
            where: { combo_id: combo.combo_id },
            data: {
              comboArray: newComboArray,
            },
          });
        }
      }
    });
    return "Combos Synchronized";
  }),
  // fixCheatCombos: protectedProcedure.mutation(async ({ input, ctx }) => {
  //   await ctx.prisma.$transaction(async (prisma) => {
  //     const combos = await prisma.combos.findMany({
  //       where: { name: { contains: "cheat>vanish" } },
  //     });
  //     // console.log(combos);
  //     const cheat = await prisma.transitions.findFirst({
  //       where: { name: "Cheat", fromLeg: "Left", toLeg: "Right" },
  //     });
  //     for (let i = 0; i < combos.length; i++) {
  //       const combo = combos[i];
  //       const comboArray = combo.comboArray as unknown as any[];
  //       const newComboArray = [];
  //       for (let j = 0; j < comboArray.length; j++) {
  //         if (
  //           comboArray[j].name.toLowerCase() === "cheat" &&
  //           comboArray[j + 1].name.toLowerCase() === "vanish"
  //         ) {
  //           // console.log(comboArray[j - 1], comboArray[j], comboArray[j + 1]);
  //           try {
  //             comboArray.splice(j, 2, cheat);
  //             const name = comboArray.map((c) => c.name).join(">");
  //             // console.log(comboArray, name);

  //             const updated = await prisma.combos.update({
  //               where: { combo_id: combo.combo_id },
  //               data: {
  //                 name: name,
  //                 comboArray: comboArray,
  //               },
  //             });
  //           } catch (err) {
  //             console.log(err);
  //             throw new TRPCError({
  //               code: "INTERNAL_SERVER_ERROR",
  //               message: "Failed to update combo" + combo.name,
  //             });
  //           }

  //           //       const trick = comboArray[j];
  //         }
  //       }
  //     }
  //       if (trickInfo) {
  //         newComboArray.push(trickInfo);
  //       }
  //     }
  //     if (comboArray[j].type === "Transition") {
  //       const transition = comboArray[j];
  //       const transitionInfo = await prisma.transitions.findFirst({
  //         where: { id: transition.id },
  //       });
  //       if (transitionInfo) {
  //         newComboArray.push(transitionInfo);
  //       }
  //     }
  //   }

  //   if (newComboArray.length !== comboArray.length) {
  //     await prisma.combos.delete({
  //       where: { combo_id: combo.combo_id },
  //     });
  //   }
  //   });
  //   return "Cheat Combos Detected";
  // }),
});
