import React from "react";
import ContributeNavBar from "./components/ContributeNavBar";
import DonateText from "./components/DonateText.jsx";
function Contribute() {
  return (
    <>
      <div id="sticky-header" className="sticky top-0 h-14 bg-zinc-900"></div>
      <div className=" px-4 font-inter text-3xl font-bold text-zinc-300">
        I can help with...
      </div>
      <ContributeNavBar />
      <div
        id="outlet-container"
        className="flex place-content-center place-items-center text-zinc-300"
      >
        {/* TODO children for routes */}
      </div>

      <DonateText />
    </>
  );
}

export default Contribute;
