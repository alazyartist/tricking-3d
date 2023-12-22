import { clerkClient } from "@clerk/nextjs";
import { prisma } from "server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const buffer = (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    const body = await buffer(req);

    event = stripe.webhooks.constructEvent(body as string, sig, endpointSecret);
    // Handle the event
    switch (event.type) {
      // case "checkout.session.completed":
      // 	const session = event.data.object;
      // 	// console.log(session.charges.data);
      // 	const checkoutSessionDetails = await stripe.checkout.sessions.retrieve(
      // 		session.id,
      // 		{
      // 			expand: ["line_items"],
      // 		}
      // 	);
      // 	checkoutSessionDetails.line_items.data.map(async (itemDetails) => {
      // 		console.log(itemDetails);
      // 		if (itemDetails.description === "SessionReviewTest") {
      // 			console.log("I AM GOING TO ADD A SESSION CREDIT");
      // 		} else {
      // 			console.log("You Need To Pay for That");
      // 		}
      // 	});
      case "payment_intent.created":
        console.log(event.data);
        return res.status(200).json({ received: true });
      case "charge.succeeded":
        const charge = event.data.object;
        console.log(charge);
        break;
      case "payment_intent.succeeded":
        const paymentIntent = await stripe.paymentIntents.retrieve(
          event.data.object.id
        );
        // Then define and call a function to handle the event payment_intent.succeeded
        // console.log(line_items);
        console.log(paymentIntent.metadata);
        let payingUser = await prisma.users.findUnique({
          where: { uuid: paymentIntent?.metadata.user_id },
        });
        await prisma.users.update({
          where: { uuid: payingUser.uuid },
          data: {
            SessionReviewCredits:
              payingUser.SessionReviewCredits +
              parseInt(paymentIntent.metadata.amount),
          },
        });

        break;
      // ... handle other event types
      default:
        res.status(200).json({ received: true });
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
