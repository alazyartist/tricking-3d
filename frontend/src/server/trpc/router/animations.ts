import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const animationRouter = router({
  findAll: publicProcedure.query(async ({ input, ctx }) => {
    const animations = await ctx.prisma.animations.findMany();
    return animations;
  }),
});
