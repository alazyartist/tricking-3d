import { ComboDetailsDisplay } from "@old_pages/userProfile/components/ProfileSessionInfo";
import React, { useState } from "react";
import { trpc } from "utils/trpc";
import ComboExecutionSlider from "./components/ComboExecutionSlider";
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
  const [executionScore, setExecutionScore] = useState(0);
  let creativityScore =
    tricks &&
    tricks?.reduce((sum, b) => sum + b?.pointValue, 0) - tricks.length;
  return (
    <div
      className={
        "absolute top-0 left-0 flex h-full w-full flex-col place-items-center gap-2 bg-zinc-900 bg-opacity-[90%] font-inter backdrop-blur-md"
      }
    >
      <div
        onClick={() => setCombodexopen(false)}
        className="absolute left-2 top-2 pt-2 text-2xl"
      >
        x
      </div>
      <div className="grid grid-cols-8 gap-2 p-2">
        <div className="col-span-7 overflow-scroll pt-2 text-sm">
          {/* {combo?.name} */}
          <ComboDetailsDisplay combo={combo} />
        </div>
        <div className="col-start-8 flex flex-col gap-2 text-sm">
          <div className={"outlineButton border-zinc-300 bg-zinc-900"}>
            {combo?.pointValue}
          </div>
          <div className={"outlineButton border-zinc-300 bg-zinc-900"}>
            {((creativityScore / 10) * combo.pointValue).toFixed(2)}
          </div>
          <div className={"outlineButton border-zinc-300 bg-zinc-900"}>
            {(executionScore * combo.pointValue).toFixed(2)}
          </div>
          <div className={"outlineButton border-zinc-300 bg-zinc-900"}>
            {(
              combo.pointValue +
              (creativityScore / 10) * combo.pointValue +
              executionScore
            ).toFixed(2)}
          </div>
        </div>
      </div>
      {/* <div>{combo?.comboArray.map((t) => t.trick_id)}</div> */}
      <div
        className={
          "no-scrollbar flex h-fit w-full gap-1 overflow-y-scroll p-2 text-sm"
        }
      >
        {tricks &&
          tricks.map((tr) => {
            if (tr.type === "Transition") {
              return (
                <div className="outlineButton flex w-full justify-between gap-2 whitespace-nowrap border-teal-300">
                  <div>{tr.name}</div>
                  <div>{tr.pointValue}</div>
                </div>
              );
            } else
              return (
                <div
                  className={"flex h-fit flex-col gap-1 "}
                  key={`${tr.name}`}
                >
                  <div
                    className={
                      "outlineButton flex justify-between gap-2 border-zinc-300"
                    }
                  >
                    <div>{tr.base_id}</div>
                    <div>{tr?.bases?.pointValue}</div>
                  </div>
                  {tr.type === "Trick" &&
                    tr?.variations?.map((v) => (
                      <div className="outlineButton flex h-fit w-full justify-between gap-2 border-indigo-400">
                        <div>{v.variation.name}</div>
                        <div>{v.variation.pointValue}</div>
                      </div>
                    ))}
                </div>
              );
          })}
      </div>
      <ComboExecutionSlider
        executionScore={executionScore}
        setExecutionScore={setExecutionScore}
      />
    </div>
  );
};

export default Combodex;
