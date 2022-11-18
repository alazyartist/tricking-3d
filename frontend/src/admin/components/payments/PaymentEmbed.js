import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useApiCreds from "../../../hooks/useApiCreds";
import CheckoutForm from "./CheckoutForm";
import { useUserStore } from "../../../store/userStore";
const PaymentEmbed = ({ setShowForm }) => {
	const apiPrivate = useApiCreds();
	const [stripePromise, setStripePromise] = useState(null);
	const [clientSecret, setClientSecret] = useState(null);
	const { uuid } = useUserStore((s) => s.userInfo);
	useEffect(() => {
		apiPrivate
			.get("/checkout")
			.then(async (response) => setStripePromise(loadStripe(response?.data)));
	}, []);
	useEffect(() => {
		apiPrivate
			.post("/checkout", { user_id: uuid })
			.then(async (response) => setClientSecret(response?.data?.clientSecret));
	}, []);
	const appearance = {
		theme: "night",
		labels: "floating",
	};
	return (
		<div>
			{stripePromise && clientSecret && (
				<Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
					<CheckoutForm setShowForm={setShowForm} />
				</Elements>
			)}
		</div>
	);
};

export default PaymentEmbed;
