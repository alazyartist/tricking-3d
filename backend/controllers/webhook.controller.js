import db from "../models/index.js";
const user = await db.sequelize.models.Users;
import Stripe from "stripe";
const stripe = new Stripe("sk_test_nM3QfjPaJoR8vskDrOJEFxHn");
const endpointSecret =
	"whsec_47b6c77bfcb73c891cb3efd4de965dc04045df2919b1eb0795f7817a10cf8ab1";
export const purchaseSessionReviewCredit = async (req, res) => {
	// console.log(req.body);
	const sig = req.headers["stripe-signature"];

	let event;

	try {
		event = await stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
		// Handle the event
		switch (event.type) {
			case "checkout.session.completed":
				const session = event.data.object;
				// console.log(session.charges.data);
				const checkoutSessionDetails = await stripe.checkout.sessions.retrieve(
					session.id,
					{
						expand: ["line_items"],
					}
				);
				checkoutSessionDetails.line_items.data.map(async (itemDetails) => {
					console.log(itemDetails);
					if (itemDetails.description === "SessionReviewTest") {
						console.log("I AM GOING TO ADD A SESSION CREDIT");
					} else {
						console.log("You Need To Pay for That");
					}
				});
				// const paymentIntent = await stripe.paymentIntents.retrieve(
				// 	event.data.object.paymentIntent
				// );
				// Then define and call a function to handle the event payment_intent.succeeded
				// console.log(line_items);
				// console.log(paymentIntent);
				break;
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		// console.log(paymentIntent);
		// console.log(event);
		// console.log(event?.data);
	} catch (err) {
		console.log(err);
		res.status(400).send(`Webhook Error: ${err.message}`);
		return;
	}

	// Return a 200 res to acknowledge receipt of the event
	res.send();
};
