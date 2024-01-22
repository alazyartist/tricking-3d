import React from "react";
import { kicks } from "../../../data/trickDataModel/TrickObjects";
import { KicksChart } from "./components/KicksChart";
function Kicks() {
  console.log(Object.keys(kicks));
  return (
    <div className="pb-14 text-zinc-300">
      <div className="py-2 text-2xl text-zinc-300">Kicks</div>
      <KicksChart className="h-fit w-[320px] md:w-[480px]" />
      <div className="py-2 text-2xl text-zinc-300">Variatons</div>
      <div className="grid w-full grid-cols-2 place-content-center gap-2">
        {Object.keys(kicks).map((e, i) => (
          <>
            <div
              key={`${i}1`}
              className="min-w-[40px] place-self-end rounded-md bg-zinc-700 bg-opacity-40 p-2 text-center text-lg"
            >{`${e}:`}</div>
            <div
              key={`${i}2`}
              className="min-w-[40px] place-self-start rounded-md bg-zinc-700 bg-opacity-40 p-2 text-center text-zinc-400"
            >
              {kicks[e]}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Kicks;
