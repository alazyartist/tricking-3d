import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { v4 as uuid } from "uuid";
import calculateTrickTotals from "@utils/CalculateTrickTotals";

export const sessionsummariesRouter = router({
  submitSession: protectedProcedure
    .input(
      z.object({
        sessionDate: z.string(),
        user_id: z.string(),
        name: z.string(),
        sessionid: z.string(),
        url: z.union([z.string(), z.array(z.string())]),
        type: z.string(),
        trickers: z.array(
          z.object({
            uuid: z.string(),
            email: z.string(),
            first_name: z.string(),
            last_name: z.string(),
            username: z.string(),
            clerk_id: z.string().nullish(),
          })
          // .partial()
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let status = "In Queue";
      if (!ctx.auth.userId) return { message: "Not Signed In" };
      let submittingUser = await ctx.prisma.users.findUnique({
        where: { clerk_id: ctx.auth.userId },
      });
      if (!submittingUser?.SessionReviewCredits)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      let credits = submittingUser?.SessionReviewCredits;
      if (credits >= 1) {
        try {
          const sessionSetup = await ctx.prisma.sessionsummaries.upsert({
            where: { sessionid: input.sessionid },
            update: {
              name: input.name,
              user_id: input.user_id,
              sessionDate: input.sessionDate,
              type: input.type,
              status: status,
            },
            create: {
              sessionid: input.sessionid,
              name: input.name,
              user_id: input.user_id,
              sessionDate: input.sessionDate,
              type: input.type,
              status: status,
            },
          });

          const trickerMap = input.trickers.map((t) => {
            return {
              user_id: t.uuid,
              sessionid: sessionSetup.sessionid,
            };
          });

          const trickerSetup = await ctx.prisma.user_sessions.createMany({
            data: trickerMap,
          });

          if (typeof input.url === "string") {
            const sourcesSetup = await ctx.prisma.sessionsources.create({
              data: {
                srcid: uuid(),
                sessionid: sessionSetup.sessionid,
                vidsrc: input.url,
              },
            });

            await ctx.prisma.users.update({
              where: { clerk_id: ctx.auth.userId },
              data: { SessionReviewCredits: credits - 1 },
            });
            return {
              sourcesSetup,
              sessionSetup,
              trickerSetup,
              message: "Submitted",
            };
          }
        } catch (err) {
          console.log(err);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "FAILED_TO_SUBMIT_SESSION",
          });
        }
      } else {
        return { message: "Out of Credits" };
      }
    }),
  detailsById: publicProcedure
    .input(z.object({ sessionid: z.string() }))
    .query(async ({ input, ctx }) => {
      const sessionSummary = await ctx.prisma.sessionsummaries.findUnique({
        where: { sessionid: input.sessionid },
        include: {
          SessionSources: true,
          trickers: { include: { user: true } },
          SessionData: { include: { ClipLabel: true, SessionSource: true } },
        },
      });
      // const sessionSummary = await ctx.prisma.sessionsummaries.findUnique({
      //   where: { sessionid: input.sessionid },
      //   include: {
      //     trickers: {
      //       include: { user: true },
      //     },
      //   },
      // });
      // const SessionSources = await ctx.prisma.sessionsources.findMany({
      //   where: { sessionid: input.sessionid },
      // });
      // const SessionData = await ctx.prisma.sessiondata.findMany({
      //   where: { sessionid: input.sessionid },
      // });
      return sessionSummary;
    }),
  compareDetailsById: publicProcedure
    .input(z.object({ sessions: z.array(z.string()) }))
    .query(async ({ input, ctx }) => {
      const sessionSummaries = await ctx.prisma.sessionsummaries.findMany({
        where: { sessionid: { in: input.sessions } },
        include: {
          trickers: {
            include: { user: true },
          },
          SessionData: { include: { ClipLabel: true } },
          SessionSources: true,
        },
      });

      return sessionSummaries;
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
  updateComboTimestamps: publicProcedure
    .input(
      z.object({
        sessiondataid: z.string(),
        comboTimestamps: z.array(
          z.object({
            type: z.string(),
            id: z.string().or(z.number()),
            name: z.string(),
            clipStart: z.number(),
            clipEnd: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let { sessiondataid, comboTimestamps } = input;
      const updateSD = await ctx.prisma.sessiondata.update({
        where: {
          id: sessiondataid,
        },
        data: { comboTimestamps: comboTimestamps },
      });
      return updateSD;
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
  getSessionsById: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ ctx, input }) => {
      const sessions = await ctx.prisma.sessionsummaries.findMany({
        where: { user_id: input.uuid },
        orderBy: { updatedAt: "desc" },
        include: {
          user: { select: { username: true, profilePic: true, uuid: true } },
          SessionData: { include: { ClipLabel: true } },
        },
      });
      return sessions;
    }),
  getReviewedSessionSummaries: publicProcedure
    .input(z.object({}).optional())
    .query(async ({ ctx }) => {
      const sessionSummaries = await ctx.prisma.sessionsummaries.findMany({
        where: { status: "Reviewed" },
        // take: 5,
        orderBy: { updatedAt: "desc" },
        include: {
          user: { select: { username: true, profilePic: true, uuid: true } },
          SessionData: { include: { ClipLabel: true } },
        },
      });
      return sessionSummaries;
    }),
  getAllSessionSummaries: publicProcedure
    .input(z.object({}).optional())
    .query(async ({ ctx }) => {
      const sessionSummaries = await ctx.prisma.sessionsummaries.findMany({
        // take: 5,
        orderBy: { updatedAt: "desc" },
        include: {
          user: { select: { username: true, profilePic: true, uuid: true } },
          SessionData: { include: { ClipLabel: true } },
        },
      });
      return sessionSummaries;
    }),
  deleteSessionSummaryById: publicProcedure
    .input(z.object({ sessionid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.sessionsources.deleteMany({
          where: { sessionid: input.sessionid },
        });
        await ctx.prisma.sessiondata.deleteMany({
          where: { sessionid: input.sessionid },
        });
        await ctx.prisma.user_sessions.deleteMany({
          where: { sessionid: input.sessionid },
        });
        const deletedSummary = await ctx.prisma.sessionsummaries.delete({
          where: { sessionid: input.sessionid },
        });
        return deletedSummary;
      } catch (err) {
        console.log(err);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
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
  updateSessionStatus: publicProcedure
    .input(
      z.object({
        sessionid: z.string(),
        status: z.union([
          z.literal("In Review"),
          z.literal("Reviewed"),
          z.literal("In Queue"),
        ]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updatedStatus = await ctx.prisma.sessionsummaries.update({
        where: { sessionid: input.sessionid },
        data: { status: input.status },
      });
      return updatedStatus;
    }),
  saveSessionDetails: protectedProcedure
    .input(
      z.object({
        data: z.array(
          z.object({
            name: z.string(),
            startTime: z.number(),
            endTime: z.number(),
            bail: z.number(),
            id: z.string(),
            admin: z.string().optional(),
            srcid: z.string(),
            vidsrc: z.string(),
            clipLabel: z.array(z.any()),
          })
        ),
        sessionid: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedData = await Promise.all(
          input.data.map(async (curData) => {
            // if (curData.name === "") return "No Name";
            //find combo
            let foundCombo = await ctx.prisma.combos.findFirst({
              where: { name: curData.name },
            });
            let combo = foundCombo;
            if (!foundCombo) {
              // if no combo, create combo
              combo = await ctx.prisma.combos.create({
                data: {
                  combo_id: uuid(),
                  pointValue: curData.clipLabel.reduce(
                    (sum, b) => sum + b.pointValue,
                    0
                  ),
                  creator:
                    curData.admin || "admin696-8c94-4ca7-b163-9alazyartist",
                  name: curData.name,
                  comboArray: curData.clipLabel,
                },
              });

              //create sessiondata
            }
            if (combo !== null) {
              const totals = await calculateTrickTotals(
                combo.comboArray,
                curData,
                ctx
              );
              await ctx.prisma.sessiondata.upsert({
                where: { id: curData.id },
                update: {
                  srcid: curData.srcid,
                  clipLabel: combo.combo_id,
                  sessionid: input.sessionid,
                  clipStart: curData.startTime,
                  clipEnd: curData.endTime,
                  bail: curData.bail,
                  admin:
                    curData.admin || "admin696-8c94-4ca7-b163-9alazyartist",
                  ...totals,
                },
                create: {
                  id: curData.id,
                  srcid: curData.srcid,
                  clipLabel: combo.combo_id,
                  sessionid: input.sessionid,
                  clipStart: curData.startTime,
                  clipEnd: curData.endTime,
                  bail: curData.bail,
                  admin:
                    curData.admin || "admin696-8c94-4ca7-b163-9alazyartist",
                  ...totals,
                },
              });
              await ctx.prisma.sessionsummaries.update({
                where: { sessionid: input.sessionid },
                data: { updatedAt: new Date() },
              });
            }
            // if no combo, create combo
            return "Saved";
          })
        );
        return "Saved";
      } catch (err) {
        console.log(err);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
