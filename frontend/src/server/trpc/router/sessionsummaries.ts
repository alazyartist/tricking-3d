import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const sessionsummariesRouter = router({
  detailsById: publicProcedure
    .input(z.object({ sessionid: z.string() }))
    .query(async ({ input, ctx }) => {
      const sessionSummary = await ctx.prisma.sessionsummaries.findUnique({
        where: { sessionid: input.sessionid },
        include: {
          trickers: {
            include: { user: true },
          },
        },
      });
      const SessionSources = await ctx.prisma.sessionsources.findMany({
        where: { sessionid: input.sessionid },
      });
      const SessionData = await ctx.prisma.sessiondata.findMany({
        where: { sessionid: input.sessionid },
      });
      return {
        SessionData,
        SessionSources,
        ...sessionSummary,
      };
    }),
  updateExecutionScore: publicProcedure
    .input(
      z.object({
        userid: z.string(),
        sessiondataid: z.string(),
        executionScore: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let { userid, sessiondataid, executionScore } = input;
      const updatedScore = await ctx.prisma.sessiondatascores.upsert({
        where: {
          userid_sessiondataid: {
            sessiondataid: sessiondataid,
            userid: userid,
          },
        },
        update: { executionScore: executionScore },
        create: {
          userid: userid,
          sessiondataid: sessiondataid,
          executionScore: executionScore,
        },
      });
      return updatedScore;
    }),
  updateTotalScore: publicProcedure
    .input(
      z.object({
        sessiondataid: z.string(),
        totalScore: z.number(),
        executionAverage: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let { sessiondataid, totalScore, executionAverage } = input;

      const updatedScore = await ctx.prisma.sessiondata.update({
        where: {
          id: sessiondataid,
        },
        data: { totalScore: totalScore, executionAverage: executionAverage },
      });
      return updatedScore;
    }),
  getSessionDataScores: publicProcedure
    .input(z.object({ sessiondataid: z.string() }))
    .query(async ({ input, ctx }) => {
      const sessionDataScores = await ctx.prisma.sessiondatascores.findMany({
        where: { sessiondataid: input.sessiondataid },
      });
      return sessionDataScores;
    }),
  getAllSessionSummaries: publicProcedure.query(async ({ ctx }) => {
    const sessionSummaries = await ctx.prisma.sessionsummaries.findMany({
      where: { status: "Reviewed" },
      // take: 5,
      orderBy: { updatedAt: "desc" },
      include: {
        user: { select: { username: true, profilePic: true, uuid: true } },
      },
    });
    return sessionSummaries;
  }),
  deleteSessionSummaryById: publicProcedure
    .input(z.object({ sessionid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedSummary = await ctx.prisma.sessionsummaries.delete({
        where: { sessionid: input.sessionid },
      });
      return deletedSummary;
    }),
  deleteSessionDataById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedData = await ctx.prisma.sessiondata.delete({
        where: { id: input.id },
      });
      return deletedData;
    }),
  updateSessionDataTricker: publicProcedure
    .input(z.object({ tricker_id: z.string(), sessiondataid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updatedData = await ctx.prisma.sessiondata.update({
        where: { id: input.sessiondataid },
        data: { tricker_id: input.tricker_id },
        include: { tricker: true },
      });
      return updatedData;
    }),
  updateSessionSummaryOwner: publicProcedure
    .input(z.object({ user_id: z.string(), sessionid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updatedData = await ctx.prisma.sessionsummaries.update({
        where: { sessionid: input.sessionid },
        data: { user_id: input.user_id },
      });
      return updatedData;
    }),
});
