import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import Stripe from "stripe";
import { TRPCError } from "@trpc/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
export const paymentsRouter = router({
  getSecretKey: protectedProcedure.query(async ({ ctx }) => {
    const secretKey = process.env.STRIPE_PUBLIC_KEY;
    return secretKey;
  }),
  createPaymentIntent: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        credits: z.number(),
        pack: z.string(),
        user_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          currency: "usd",
          amount: input.amount * 100,
          metadata: {
            user_id: input.user_id,
            amount: input.amount,
            credits: input.credits,
            pack: input.pack,
          },
          automatic_payment_methods: {
            enabled: true,
          },
        });
        return paymentIntent;
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating payment intent",
        });
      }
    }),
});
