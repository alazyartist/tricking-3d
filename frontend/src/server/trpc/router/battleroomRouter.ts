import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const battleroomRouter = router({
  makeNewRoom: protectedProcedure
    .input(
      z.object({
        battleroomid: z.string(),
        duration: z.number(),
        hostid: z.string(),
        team1: z.array(z.any()),
        team2: z.array(z.any()),
        judges: z.array(z.any()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const battleroom = await ctx.prisma.battlerooms.create({
        data: {
          battleroomid: input.battleroomid,
          duration: input.duration,
          host: input.hostid,
          team1: input.team1,
          team2: input.team2,
          judges: input.judges,
          isOpen: true,
        },
      });
      return battleroom;
    }),
  getRooms: publicProcedure
    .input(z.object({}).optional())
    .query(async ({ ctx }) => {
      const battlerooms = await ctx.prisma.battlerooms.findMany({});
      return battlerooms;
    }),
  getRoomById: publicProcedure
    .input(z.object({ battleroomid: z.string() }))
    .query(async ({ input, ctx }) => {
      const battleroom = await ctx.prisma.battlerooms.findUnique({
        where: { battleroomid: input.battleroomid },
        include: { BattleRoomStats: true },
      });
      return battleroom;
    }),
  updateRoomStats: protectedProcedure
    .input(
      z.object({
        battleroomid: z.string(),
        team1Score: z.number().transform((x) => Math.round(x)),
        team2Score: z.number().transform((x) => Math.round(x)),
        team1AudienceScore: z.number().transform((x) => Math.round(x)),
        team2AudienceScore: z.number().transform((x) => Math.round(x)),
        winner: z.string(),
        audienceWinner: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const battleroom = await ctx.prisma.battleroomstats.upsert({
        where: { battleroomid: input.battleroomid },
        create: {
          battleroomid: input.battleroomid,
          team1Score: input.team1Score,
          team2Score: input.team2Score,
          team1AudienceScore: input.team1AudienceScore,
          team2AudienceScore: input.team2AudienceScore,
          winner: input.winner,
          audienceWinner: input.audienceWinner,
        },
        update: {
          team1Score: input.team1Score,
          team2Score: input.team2Score,
          team1AudienceScore: input.team1AudienceScore,
          team2AudienceScore: input.team2AudienceScore,
          winner: input.winner,
          audienceWinner: input.audienceWinner,
        },
      });
      return battleroom;
    }),
  updateRoomScore: protectedProcedure
    .input(
      z.object({
        battleroomid: z.string(),
        team: z.string(),
        score: z.number().transform((x) => Math.round(x)),
        user: z.string().optional(),
        judge: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        if (input.user) {
          const userScore = await ctx.prisma.userscores.create({
            data: {
              battleroomid: input.battleroomid,
              userid: input.user,
              score: input.score,
              team: input.team,
              updatedAt: new Date(),
            },
          });
          return userScore;
        }
        if (input.judge) {
          const judgeScore = await ctx.prisma.judgescores.create({
            data: {
              battleroomid: input.battleroomid,
              judge: input.judge,
              score: input.score,
              team: input.team,
              updatedAt: new Date(),
            },
          });
          return judgeScore;
        }
      } catch (e) {
        console.log(e);
      }
    }),
  closeRoom: protectedProcedure
    .input(z.object({ battleroomid: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const battleroom = await ctx.prisma.battlerooms.update({
        where: { battleroomid: input.battleroomid },
        data: {
          isOpen: false,
        },
      });
      return battleroom;
    }),
});

export default battleroomRouter;
