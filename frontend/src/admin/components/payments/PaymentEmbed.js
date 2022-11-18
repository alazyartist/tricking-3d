import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useApiCreds from "../../../hooks/useApiCreds";
import CheckoutForm from "./CheckoutForm";
const PaymentEmbed = ({ setShowForm }) => {
	const apiPrivate = useApiCreds();
	const [stripePromise, setStripePromise] = useState(null);
	const [clientSecret, setClientSecret] = useState(null);
	useEffect(() => {
		apiPrivate
			.get("/checkout")
			.then(async (response) => setStripePromise(loadStripe(response?.data)));
	}, []);
	useEffect(() => {
		apiPrivate
			.post("/checkout", {})
			.then(async (response) => setClientSecret(response?.data?.clientSecret));
	}, []);
	return (
		<div>
			{stripePromise && clientSecret && (
				<Elements stripe={stripePromise} options={{ clientSecret }}>
					<CheckoutForm setShowForm={setShowForm} />
				</Elements>
			)}
		</div>
	);
};

export default PaymentEmbed;
