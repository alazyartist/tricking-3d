import React from "react";
import { trpc } from "utils/trpc";
interface CombodexProps {
  combo: any;
  comboArray?: Array<any>;
  setCombodexopen?: any;
}
const Combodex: React.FC<CombodexProps> = ({
  comboArray,
  combo,
  setCombodexopen,
}) => {
  const idArray = combo.comboArray.map((t) =>
    t.type === "Transition" ? t.id : t.trick_id
  );
  const { data: tricks } = trpc.trick.findMultipleById.useQuery(
    combo.comboArray
  );
  return (
    <div
      className={
        "absolute top-0 left-0 flex h-full w-full flex-col place-items-center bg-zinc-900 bg-opacity-[90%] backdrop-blur-md"
      }
      onClick={() => setCombodexopen(false)}
    >
      <div>Combodex</div>
      <div>{combo?.name}</div>
      {/* <div>{combo?.comboArray.map((t) => t.trick_id)}</div> */}
      <div className={"flex gap-1"}>
        {tricks &&
          tricks.map((tr) => {
            if (tr.type === "Transition") {
              return (
                <div className="rounded-md border-2 border-zinc-300 px-1">
                  {/* {tr.name} */}
                </div>
              );
            } else
              return (
                <div
                  className={" rounded-md border-2 border-indigo-400 px-1"}
                  key={`${tr.name}`}
                >
                  {tr.type === "Trick" &&
                    tr?.variations?.map((v) => v.variation.name)}
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default Combodex;
