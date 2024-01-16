import { whichLeg } from "@old_pages/comboMaker/components/ArrayDisplay";
import { trpc } from "@utils/trpc";
import React from "react";
import * as terms from "../../../data//Glossary.json";

const StancesV0 = () => {
  const { data: stances } = trpc.trick.findAllStances.useQuery();
  return (
    <>
      <div className="h-full w-[80vw] grid-cols-3 place-content-center place-items-center gap-2 rounded-xl bg-zinc-800 bg-opacity-70 text-zinc-300">
        <div>Stances</div>
        <div className="flex h-full w-full flex-col place-content-center place-items-center gap-2">
          {stances?.map((stance) => (
            <div
              key={stance.stance_id}
              className={
                "w-fit min-w-[125px] rounded-md bg-zinc-600 bg-opacity-40 p-2"
              }
            >
              <div>{stance.name}</div>
              <div>{whichLeg(stance.leg)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StancesV0;
