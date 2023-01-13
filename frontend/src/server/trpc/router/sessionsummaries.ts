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
      console.log(sessionSummary, SessionSources, SessionData);
      return {
        SessionData,
        SessionSources,
        ...sessionSummary,
      };
    }),
});
