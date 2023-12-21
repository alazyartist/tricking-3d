import React from "react";
import Backgrounds from "./Backgrounds";

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-zinc-300">
      <div className="font-inter text-2xl font-black">MORE COMING SOON</div>
      <div className="flex flex-row gap-3 rounded-xl bg-zinc-900 p-2 text-xl font-bold">
        <div className="text-zinc-300">Background</div>
        <div className="text-zinc-600">Lighting</div>
        {/* <div className="text-zinc-600">Model</div> */}
      </div>
      <div className="flex w-[50vw] flex-col place-content-center place-items-center rounded-xl bg-zinc-900 p-4">
        <Backgrounds />
      </div>
    </div>
  );
};

export default Settings;
