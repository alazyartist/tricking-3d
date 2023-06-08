import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const debateRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const debates = await ctx.prisma.debates.findMany({
      include: { host: true },
    });
    return debates;
  }),
  findById: publicProcedure
    .input(z.object({ debateid: z.string() }))
    .query(async ({ ctx, input }) => {
      const debate = await ctx.prisma.debates.findUnique({
        where: { debateid: input.debateid },
        include: { host: true, messages: { include: { user: true } } },
      });
      return debate;
    }),
  openDebate: publicProcedure
    .input(
      z.object({
        title: z.string(),
        topic: z.string(),
        media: z.string(),
        mediaType: z.string(),
        user_id: z.string(),
        debateid: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const debates = await ctx.prisma.debates.upsert({
        where: { debateid: input.debateid },
        update: {
          title: input.title,
          topic: input.topic,
          media: input.media,
          mediaType: input.mediaType,
        },
        create: {
          debateid: input.debateid,
          title: input.title,
          topic: input.topic,
          media: input.media,
          mediaType: input.mediaType,
          host: { connect: { uuid: input.user_id } },
        },
      });
      return debates;
    }),
  saveMessage: publicProcedure
    .input(
      z.object({
        messageid: z.string(),
        debateid: z.string(),
        vote: z.string(),
        anonHash: z.string(),
        message: z.string(),
        user_id: z.string(),
        media: z.string(),
        mediaType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const debates = await ctx.prisma.debateMessages.create({
        data: {
          messageid: input.messageid,
          vote: input.vote,
          anonHash: input.anonHash,
          message: input.message,
          media: input.media,
          mediaType: input.mediaType,
          Debate: { connect: { debateid: input.debateid } },
          user: { connect: { uuid: input.user_id } },
        },
      });
      return debates;
    }),
  deleteDebate: publicProcedure
    .input(
      z.object({
        debateid: z.string(),
        user_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const debateMessages = await ctx.prisma.debateMessages.deleteMany({
        where: { debateid: input.debateid },
      });
      const debates = await ctx.prisma.debates.delete({
        where: {
          debateid: input.debateid,
        },
      });
      return debates;
    }),
  closeOrReopenDebate: publicProcedure
    .input(
      z.object({
        debateid: z.string(),
        closed: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const debates = await ctx.prisma.debates.update({
        where: {
          debateid: input.debateid,
        },
        data: {
          closed: input.closed,
        },
      });
      return debates;
    }),
});
