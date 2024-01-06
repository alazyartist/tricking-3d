import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { transitions, tricks } from "@prisma/client";

export const animationRouter = router({
  findAll: publicProcedure.query(async ({ input, ctx }) => {
    const animations = await ctx.prisma.animations.findMany();
    return animations;
  }),
  findInfoByAnimation: publicProcedure
    .input(z.object({ animation: z.string() }))
    .query(async ({ input, ctx }) => {
      if (input.animation.includes(">")) {
        const animations = input.animation.split(">");
        const info = await Promise.all(
          animations.map(async (animation) => {
            let trickInfo: tricks | transitions = null!;
            const trick = await ctx.prisma.tricks.findFirst({
              where: { name: animation },
              include: {
                variations: { include: { variation: true } },
                base: true,
              },
            });
            if (trick) {
              trickInfo = trick;
            }
            const transition = await ctx.prisma.transitions.findFirst({
              where: { name: animation },
            });
            if (transition) {
              trickInfo = transition;
            }

            if (trickInfo !== null) {
              return { isCombo: true, ...trickInfo };
            } else {
              throw new TRPCError({
                code: "NOT_FOUND",
                message: `Trick ${animation} not found`,
              });
            }
          })
        );
        return info;
      } else {
        const trickInfo = await ctx.prisma.tricks.findFirst({
          where: { name: input.animation },
          include: { variations: { include: { variation: true } }, base: true },
        });
        if (trickInfo) {
          return [{ isCombo: false, ...trickInfo }];
        } else {
          console.log("not found");
        }
      }
    }),
});
