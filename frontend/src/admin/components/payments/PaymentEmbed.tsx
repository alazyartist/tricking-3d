import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useApiCreds from "../../../hooks/useApiCreds";
import CheckoutForm from "./CheckoutForm";
import { useUserStore } from "../../../store/userStore";
const PaymentEmbed = ({ setShowForm, creditAmount }) => {
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
      .post("/checkout", {
        user_id: uuid,
        amount: creditAmount,
      })
      .then(async (response) => setClientSecret(response?.data?.clientSecret));
  }, [creditAmount]);
  const appearance = { theme: "night" };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex place-content-center place-items-center gap-4 text-center font-inter text-4xl">
        {(creditAmount > 0 ? creditAmount : 1) * 5}$
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
