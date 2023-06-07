import { Clerk } from "@clerk/clerk-sdk-node";
import db from "../models/index.js";
const users = await db.sequelize.models.Users;
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
				let payingUser = await users.findOne({
					where: { uuid: paymentIntent?.metadata.user_id },
				});
				await payingUser.update({
					SessionReviewCredits:
						parseInt(payingUser.dataValues.SessionReviewCredits) +
						parseInt(paymentIntent.metadata.amount),
				});
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
import { PrismaClient } from "@prisma/client";
const prismaclient = new PrismaClient();
const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });
export const handleClerkEvents = async (req, res) => {
	const _event_type = req.body.type;
	console.log(_event_type);
	if (_event_type === "user.deleted") {
		const user_id = req.body?.data?.id;
		try {
			const deletedUser = await prismaclient.users.delete({
				where: { clerk_id: user_id },
			});
			console.log(deletedUser);
		} catch (err) {}
	}
	if (_event_type === "user.updated") {
		const user_id = req.body?.data?.id;
		const clerkUser = await clerk.users.getUser(user_id);
		const user = await prismaclient.users.findUnique({
			where: { username: clerkUser.username },
		});
		console.log(clerkUser);
		console.log(user);
	}

	if (_event_type === "user.created") {
		const user_id = req.body?.data?.id;
		try {
			const clerkUser = await clerk.users.getUser(user_id);

			// const user = await prismaclient.users.create({
			// 	where: { username: clerkUser.username
			// 	,first_name:clerkUser.first_name,last_name:clerkUser.last_name,
			// 	},
			// });
			if (clerkUser) {
				const email = clerkUser.emailAddresses.find((e) => {
					return e.id === clerkUser.primaryEmailAddressId;
				});
				const user = await prismaclient.users.findUnique({
					where: { username: clerkUser.username },
				});
				if (user) {
					const updatedUser = await prismaclient.users.update({
						where: { username: clerkUser.username },
						data: { clerk_id: clerkUser.id },
					});
					console.log("updatedUser");
					console.log(updatedUser);
				} else {
					const newUser = await prismaclient.users.create({
						data: {
							username: clerkUser.username,
							first_name: clerkUser.firstName,
							last_name: clerkUser.lastName,
							email: email.emailAddress,
							clerk_id: clerkUser.id,
							SessionReviewCredits: 2,
						},
					});
					console.log("newUser");
					console.log(newUser);
				}
			}
			// console.log(user);
		} catch (err) {
			console.log("Failed to Create User");
			return res.status(401).json(err);
		}
	}
	if (_event_type === "session.created") {
		const user_id = req.body?.data?.user_id;
		console.log(user_id);
		const clerkUser = await clerk.users.getUser(user_id);
		console.log(clerkUser?.username);
		const user = await prismaclient.users.findUnique({
			where: { username: clerkUser.username },
		});
		console.log("user", user);
	}

	return res.sendStatus(200);
};
