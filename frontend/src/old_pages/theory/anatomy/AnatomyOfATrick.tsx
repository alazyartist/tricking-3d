import React from "react";
import AOATText from "./components/AOATText";
import AnatomySketch from "../components/AnatomySketchSVG";
import AnatomyTrickSVG from "./components/AnatomyTrickSVG";
import AnatomyIntro from "./components/AnatomyIntro";
import AnatomyBreakdown from "./components/AnatomyBreakdown";
function AnatomyOfATrick() {
  return (
    <div className="flex w-full flex-col place-items-center">
      <div className="sticky top-0 h-14"></div>
      <div className="mt-4 flex flex-col place-content-center place-items-center font-inter font-bold text-white">
        AnatomyOfATrick
      </div>
      <div className=" flex w-[90%] flex-col place-items-center rounded-md bg-zinc-900 bg-opacity-90">
        <AnatomySketch className="h-fit w-full" />
        <AnatomyTrickSVG className="w-full fill-zinc-300" />
        <AnatomyIntro />
        <AnatomyBreakdown />
        <AOATText />
      </div>
    </div>
  );
}

export default AnatomyOfATrick;
