import React from "react";

import MultiDonateButton from "@components/info/MultiDonateButton";

function DonateText() {
  return (
    <div className="h-full w-full place-content-center place-items-center rounded-xl bg-opacity-25 bg-gradient-to-b from-zinc-600 to-zinc-700 p-2 pb-0 md:max-w-[60vw]">
      <div className=" text-center font-inter text-2xl font-bold text-zinc-300">
        Help Support the Project!
      </div>
      <div
        id="donate-flex"
        className="m-4 mt-1 flex flex-col place-content-center place-items-center rounded-xl md:flex-row "
      >
        <div className="pb-2 font-inter text-sm font-light text-zinc-300 md:pr-4">
          It is our goal to keep this project
          <span className="font-extrabold"> free to use</span> for as long as
          possible.
        </div>
        <MultiDonateButton />
      </div>
      <div className="px-4 pb-2 font-inter text-sm font-light text-zinc-300">
        In order to do that there is some overhead that needs to be taken care
        of.
      </div>
      <div className="px-4 pb-4 font-inter text-sm font-light text-zinc-300">
        Your donations will help to fund the servers, and the development team
        that is making this project possible.
        <div className="pt-2 text-[.7rem]">
          Everyone currently works for free so anything helps!
        </div>
      </div>
    </div>
  );
}

export default DonateText;
