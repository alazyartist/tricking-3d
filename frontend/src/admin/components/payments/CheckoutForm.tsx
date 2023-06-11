import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
const CheckoutForm = ({ setShowForm }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>();
  const [isProcessing, setIsProcessing] = useState<boolean>();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/addSession`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment Status:" + paymentIntent.status);
      setShowForm(false);
    }
    setIsProcessing(false);
  };
  return (
    <>
      <form
        className="grid place-items-center gap-8"
        id="payment-form"
        onSubmit={handleSubmit}
      >
        <PaymentElement />
        <button
          type="submit"
          className="w-[200px] rounded-md bg-emerald-500 py-2 text-3xl text-zinc-200"
          disabled={isProcessing}
          id="submit"
        >
          {isProcessing ? "Processing" : "Add Credits"}
        </button>
        <button
          onClick={() => setShowForm(false)}
          type="button"
          className="w-[100px] rounded-md bg-red-500 py-2 text-xl text-zinc-200"
        >
          Cancel
        </button>
      </form>
      <div className="text-center">{message}</div>
    </>
  );
};

export default CheckoutForm;
