import React from "react";
import { FaCcPaypal } from "react-icons/fa";

function PaypalDonate() {
  return (
    <div id="dontate-button-container" className="flex place-content-center">
      <a
        className="m-2 flex place-items-center justify-center rounded-xl bg-inherit p-2 font-inter text-xl font-black"
        href="https://www.paypal.com/donate/?hosted_button_id=PT53YGXKXLBNL"
      >
        <div className="mr-1 flex h-full w-full place-items-center">
          <FaCcPaypal size={32} />
        </div>
        {/* <FaCcPaypal className="mr-1 h-8 w-8" /> */}
        Donate
      </a>
    </div>
  );
}

export default PaypalDonate;
