import Link from "next/link";
import React from "react";

const ExperimentsPage = () => {
  return (
    <div className="flex flex-col place-items-center pt-14 font-inter">
      <h1 className="text-xl text-zinc-300">Experiments</h1>
      <p className="p-2 text-zinc-300">
        Here are some of the features we are working on that aren't quite
        finished. Feel free to explore and let us know what's still broken!
      </p>
      <Link
        href={"/ppoints"}
        className=" mt-1 mb-2 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] "
      >
        <div className="flex place-content-center place-items-center gap-2">
          BattleRooms
        </div>
      </Link>
      <Link
        href={"/comboMaker"}
        className=" mt-1 mb-2 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] "
      >
        <div className="flex place-content-center place-items-center gap-2">
          ComboMaker
        </div>
      </Link>
    </div>
  );
};

export default ExperimentsPage;
