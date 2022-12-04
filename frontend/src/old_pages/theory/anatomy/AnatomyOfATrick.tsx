import React from "react";
import AOAT from "@data/AnatomyOfATrickSVG";
import AOAC from "@data/AnatomyOfAComboSVG";
import AOATText from "./components/AOATText";
function AnatomyOfATrick() {
  return (
    <div className="flex w-full flex-col place-items-center">
      <div className="sticky top-0 h-14"></div>
      <div className="mt-4 flex flex-col place-content-center place-items-center font-inter font-bold text-white">
        AnatomyOfATrick
      </div>

      <AOAT className="w-full rounded-xl bg-zinc-400 text-zinc-400" />
      <AOATText />
      <AOAC className="mt-4 w-full rounded-xl bg-zinc-400 text-zinc-400" />
    </div>
  );
}

export default AnatomyOfATrick;
