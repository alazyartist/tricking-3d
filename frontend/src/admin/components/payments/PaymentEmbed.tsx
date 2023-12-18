import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useUserStore } from "../../../store/userStore";
import { trpc } from "@utils/trpc";
const PaymentEmbed = ({ setShowForm, creditAmount }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const { uuid } = useUserStore((s) => s.userInfo);

  const { data: stripeKey } = trpc.payments.getSecretKey.useQuery();
  useEffect(() => {
    if (stripeKey) {
      setStripePromise(loadStripe(stripeKey));
    }
  }, [stripeKey]);

  const { data: response } = trpc.payments.createPaymentIntent.useQuery({
    amount: creditAmount,
    user_id: uuid,
  });
  useEffect(() => {
    setClientSecret(response?.client_secret);
  }, [creditAmount]);
  const appearance = { theme: "night" };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col place-content-center place-items-center gap-4 text-center font-inter text-4xl">
        {(creditAmount > 0 ? creditAmount : 1) * 5}$
        <div className="text-xl leading-3">{`${creditAmount} credit${
          creditAmount > 1 ? "s" : ""
        }`}</div>
      </div>
      <div className="">
        {stripePromise && clientSecret && (
          <Elements
            stripe={stripePromise}
            //@ts-ignore
            options={{ clientSecret, appearance }}
          >
            <CheckoutForm setShowForm={setShowForm} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default PaymentEmbed;
