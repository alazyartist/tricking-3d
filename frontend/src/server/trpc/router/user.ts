import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  findAll: publicProcedure.query(async ({ input, ctx }) => {
    const users = await ctx.prisma.users.findMany({
      select: {
        id: true,
        profilePic: true,
        uuid: true,
        username: true,
        first_name: true,
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
    // console.log(users);
    return users;
  }),
  findByUUID: publicProcedure
    .input(z.object({ userid: z.string() }))
    .query(async ({ ctx, input }) => {
      const profileInfo = await ctx.prisma.users.findUnique({
        where: { uuid: input.userid },
        select: {
          profilePic: true,
          uuid: true,
          username: true,
          first_name: true,
          email: true,
          captures: true,
          captured_me: true,
          SessionSummaries: true,
          sessionSummaries: true,
        },
      });
      // console.log({
      //   ...profileInfo,
      //   SessionSummaries: [
      //     ...profileInfo.sessionSummaries,
      //     ...profileInfo.SessionSummaries,
      //   ],
      // });
      return {
        ...profileInfo,
        SessionSummaries: [
          ...profileInfo.sessionSummaries,
          ...profileInfo.SessionSummaries,
        ],
      };
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
          captured_me: { include: { capturedUser: true } },
          SessionSummaries: true,
          sessionSummaries: true,
          SessionReviewCredits: true,
        },
      });
      // console.log({
      //   ...profileInfo,
      //   SessionSummaries: [
      //     ...profileInfo.sessionSummaries,
      //     ...profileInfo.SessionSummaries,
      //   ],
      // });
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
      // console.log("input", input);
      const tempUser = await ctx.prisma.users.create({ data: { ...input } });
      // console.log(tempUser);
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

      if (activeUser.id && capturedUser.id) {
        const captureSuccess = await ctx.prisma.captures.create({
          data: { user_id: activeUser.id, captured_id: capturedUser.id },
        });
        return captureSuccess;
      }
    }),
});
