import React from "react";
import AOATText from "./components/AOATText";
import AnatomyTrickSVG from "./components/AnatomyTrickSVG";
import AnatomyIntro from "./components/AnatomyIntro";
import AnatomyBreakdown from "./components/AnatomyBreakdown";
function AnatomyOfATrick() {
  return (
    <div className="flex w-full flex-col place-items-center lg:w-[60vw]">
      <div className="sticky top-0 h-8"></div>
      <div className=" flex w-full flex-col place-items-center rounded-md bg-zinc-900 bg-opacity-90">
        <AnatomyIntro />
        <AnatomyBreakdown />
        {/* <AnatomyTrickSVG className="w-full fill-zinc-300" /> */}
        <AOATText />
      </div>
    </div>
  );
}

export default AnatomyOfATrick;
