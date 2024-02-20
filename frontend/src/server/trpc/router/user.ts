import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { clerkClient } from "@clerk/nextjs";

export const userRouter = router({
  findAll: publicProcedure.query(async ({ input, ctx }) => {
    const users = await ctx.prisma.users.findMany({
      select: {
        id: true,
        clerk_id: true,
        isAdmin: true,
        profilePic: true,
        uuid: true,
        username: true,
        first_name: true,
        last_name: true,
        email: true,
        captures: true,
        captured_me: true,
        SessionSummaries: true,
        sessionSummaries: true,
        Clips: true,
        TotalPoints: true,
        createdAt: true,
      },
    });
    return users;
  }),
  findAllPaginated: publicProcedure
    .input(
      z.object({ limit: z.number().optional(), cursor: z.string().optional() })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 15; // default limit
      const cursor = input.cursor;
      const users = await ctx.prisma.users.findMany({
        take: limit,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { uuid: cursor } : undefined,
        select: {
          id: true,
          clerk_id: true,
          isAdmin: true,
          profilePic: true,
          uuid: true,
          username: true,
          first_name: true,
          last_name: true,
          email: true,
          captures: true,
          captured_me: true,
          SessionSummaries: true,
          sessionSummaries: true,
          Clips: true,
          TotalPoints: true,
          createdAt: true,
        },
        orderBy: { Clips: { _count: "desc" } },
      });
      return { users, cursor: users[users.length - 1].uuid };
    }),
  findByUUID: publicProcedure
    .input(z.object({ userid: z.string() }))
    .query(async ({ ctx, input }) => {
      const profileInfo = await ctx.prisma.users.findUnique({
        where: { uuid: input.userid },
        select: {
          id: true,
          profilePic: true,
          uuid: true,
          username: true,
          first_name: true,
          last_name: true,
          email: true,
          captures: true,
          captured_me: true,
          TricksClaimed: true,
          SessionSummaries: {
            include: {
              SessionData: {
                include: {
                  ClipLabel: true,
                  SessionSource: true,
                  tricker: true,
                },
              },
              SessionSources: true,
            },
            orderBy: {
              sessionDate: "desc",
            },
          },
          sessionSummaries: {
            include: {
              sessionsummary: {
                include: {
                  trickers: {
                    include: {
                      user: {
                        select: {
                          id: true,
                          username: true,
                          deletedAt: false,
                          createdAt: false,
                        },
                      },
                    },
                  },
                  SessionData: {
                    include: {
                      ClipLabel: true,
                      SessionSource: true,
                      tricker: true,
                    },
                  },
                  SessionSources: true,
                },
              },
            },
          },
        },
      });

      if (profileInfo?.sessionSummaries) {
        //combine the two arrays and de duplicate based on sessionid
        const combined = [
          ...profileInfo.sessionSummaries.map((ss) => ss.sessionsummary),
          ...profileInfo.SessionSummaries,
        ];
        const unique = combined.filter(
          (thing, index, self) =>
            index ===
            self.findIndex(
              (t) => t.sessionid === thing.sessionid && t.sessionid !== null
            )
        );
        return {
          ...profileInfo,
          SessionSummaries: unique,
        };
      } else return profileInfo;
    }),
  captureByUUID: publicProcedure
    .input(z.object({ userid: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      if (!input?.userid || input.userid === undefined) return "No User";
      const profileInfo = await ctx.prisma.users.findUnique({
        where: { uuid: input.userid },
        select: {
          id: true,
          profilePic: true,
          uuid: true,
          username: true,
          first_name: true,
          email: true,
          captures: true,
          captured_me: true,
          TricksClaimed: true,
          SessionSummaries: true,
          sessionSummaries: true,
        },
      });

      if (profileInfo?.sessionSummaries) {
        return {
          ...profileInfo,
          SessionSummaries: [
            ...profileInfo.sessionSummaries,
            ...profileInfo.SessionSummaries,
          ],
        };
      } else return profileInfo;
    }),
  findUserImageById: publicProcedure
    .input(z.object({ uuid: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      if (!input.uuid) return "https://trickedex.app/images/noimg.jpeg";
      try {
        const user = await ctx.prisma.users.findUnique({
          where: { uuid: input.uuid },
          select: {
            clerk_id: true,
            profilePic: true,
          },
        });
        if (user?.profilePic) return user.profilePic;
        if (user?.clerk_id) {
          const clerkUser = await clerkClient.users.getUser(user?.clerk_id!);
          if (clerkUser?.imageUrl) {
            return clerkUser.imageUrl;
          }
        } else {
          return "https://trickedex.app/images/noimg.jpeg";
        }
      } catch (e) {
        return "https://trickedex.app/images/noimg.jpeg";
      }
    }),
  findByClerkId: publicProcedure
    .input(z.object({ clerk_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const profileInfo = await ctx.prisma.users.findUnique({
        where: { clerk_id: input.clerk_id },
        select: {
          profilePic: true,
          uuid: true,
          username: true,
          first_name: true,
          last_name: true,
          clerk_id: true,
          email: true,
          captures: { include: { capturedUser: true } },
          captured_me: { include: { user: true } },
          SessionSummaries: true,
          sessionSummaries: true,
          SessionReviewCredits: true,
        },
      });

      if (profileInfo?.sessionSummaries && profileInfo?.SessionSummaries) {
        return {
          ...profileInfo,
          SessionSummaries: [
            ...profileInfo.sessionSummaries,
            ...profileInfo.SessionSummaries,
          ],
        };
      } else {
        return profileInfo;
      }
    }),
  createTempUser: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const tempUser = await ctx.prisma.users.create({ data: { ...input } });
      return tempUser;
    }),
  captureUser: publicProcedure
    .input(
      z.object({
        useruuid: z.string(),
        captureuuid: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const activeUser = await ctx.prisma.users.findFirst({
        where: { uuid: input.useruuid },
      });
      const capturedUser = await ctx.prisma.users.findFirst({
        where: { uuid: input.captureuuid },
      });

      if (!activeUser?.id) return;
      if (!capturedUser?.id) return;

      if (activeUser.id && capturedUser.id) {
        const captureSuccess = await ctx.prisma.captures.create({
          data: { user_id: activeUser.id, captured_id: capturedUser.id },
        });
        return captureSuccess;
      }
    }),
  getDashInfo: publicProcedure.query(async ({ ctx }) => {
    if (!ctx?.auth.userId) return "No User";
    const user = await ctx.prisma.users.findUnique({
      where: { clerk_id: ctx?.auth.userId },
      select: {
        uuid: true,
        profilePic: true,
        clerk_id: true,
        username: true,
      },
    });
    return user;
  }),
  getCurrentCredits: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx?.auth.userId) return "No User";
    const user = await ctx.prisma.users.findUnique({
      where: { clerk_id: ctx?.auth.userId },
      select: {
        SessionReviewCredits: true,
      },
    });
    return user.SessionReviewCredits;
  }),
  getSearchData: publicProcedure.query(async ({ ctx }) => {
    const tricks = await ctx.prisma.tricks.findMany({
      select: {
        trick_id: true,
        name: true,
        displayName: true,
        type: true,
        nicknames: true,
      },
    });
    const transitions = await ctx.prisma.transitions.findMany({
      select: {
        id: true,
        name: true,
        type: true,
      },
    });
    const stances = await ctx.prisma.stances.findMany({
      select: {
        stance_id: true,
        name: true,
        type: true,
      },
    });
    const combos = await ctx.prisma.combos.findMany({
      select: {
        combo_id: true,
        name: true,
        type: true,
      },
    });
    const users = await ctx.prisma.users.findMany({
      select: {
        uuid: true,
        username: true,
        profilePic: true,
        clerk_id: true,
      },
    });
    const sessionsummaries = await ctx.prisma.sessionsummaries.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        user: { select: { username: true, profilePic: true, uuid: true } },
      },
    });
    const data = Promise.all([
      tricks,
      transitions,
      stances,
      combos,
      users,
      sessionsummaries,
    ]);
    return {
      tricks,
      transitions,
      stances,
      combos,
      users,
      sessionsummaries,
    };
  }),
});
