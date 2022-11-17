import db from "../models/index.js";
const user = await db.sequelize.models.Users;
import stripe from "stripe";
stripe("sk_test_nM3QfjPaJoR8vskDrOJEFxHn");
const endpointSecret =
	"whsec_47b6c77bfcb73c891cb3efd4de965dc04045df2919b1eb0795f7817a10cf8ab1";
export const purchaseSessionReviewCredit = async (req, res) => {
	console.log(req.body);
	const sig = req.headers["stripe-signature"];

	let event;

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
	} catch (err) {
		res.status(400).send(`Webhook Error: ${err.message}`);
		return;
	}

	// Handle the event
	switch (event.type) {
		case "payment_intent.succeeded":
			const paymentIntent = event.data.object;
			// Then define and call a function to handle the event payment_intent.succeeded
			break;
		// ... handle other event types
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	console.log(event);
	// Return a 200 res to acknowledge receipt of the event
	res.send();
};
