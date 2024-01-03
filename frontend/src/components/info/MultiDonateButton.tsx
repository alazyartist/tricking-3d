import React from "react";
import KoFiDonate from "./KoFiDonate";
import PaypalDonate from "./PaypalDonate";
function MultiDonateButton() {
  return (
    <div
      id="donate-button-conatiner"
      className="flex h-12 w-fit place-content-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600"
    >
      <PaypalDonate />
      <KoFiDonate />
    </div>
  );
}

export default MultiDonateButton;
