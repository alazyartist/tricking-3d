import env from "dotenv";
env.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getSecretKey = async (req, res) => {
	res.send(process.env.STRIPE_PUBLIC_KEY);
};

export const createCheckoutSession = async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		success_url: "https://example.com/success",
		cancel_url: "https://example.com/cancel",
		line_items: [{ price: "price_1M52lH2mGeTC286ZwL90HNmz", quantity: 1 }],
		mode: "payment",
	});
};
export const createPaymentIntent = async (req, res) => {
	console.log("recreatingPaymentIntent");
	console.log(req.body);
	const { user_id, amount } = await req.body;
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			currency: "usd",
			amount: amount * 500,
			automatic_payment_methods: {
				enabled: true,
			},
			metadata: {
				user_id,
				amount,
			},
		});
		console.log(paymentIntent);
		res.send({ clientSecret: paymentIntent.client_secret });
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
};
