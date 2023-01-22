import { ComboDetailsDisplay } from "@old_pages/userProfile/components/ProfileSessionInfo";
import React, { useEffect, useState } from "react";
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
  const [executionScore, setExecutionScore] = useState(0.1);
  const [creativityScore, setCreativityScore] = useState();
  useEffect(() => {
    if (tricks) {
      let count = {};
      tricks.forEach((obj) => {
        if (count[obj.name]) {
          count[obj.name].count++;
          count[obj.name].score -= 0.1;
        } else {
          count[obj.name] = {
            count: 1,
            score: 1,
          };
        }
      });
      count = Object.keys(count)
        .map((key) => count[key])
        .reduce((sum, b) => sum + b.score, 0);
      setCreativityScore(count);
      console.log(count);
    }
  }, [tricks]);
  return (
    <div
      className={
        "absolute top-0 left-0 flex h-full w-full flex-col place-items-center gap-2 bg-zinc-900 bg-opacity-[90%] font-inter backdrop-blur-md"
      }
    >
      <div className="grid w-full grid-cols-5 gap-2 p-2">
        <div
          onClick={() => setCombodexopen(false)}
          className="outlineButton flex place-content-center place-items-center rounded-md border-transparent bg-zinc-300 bg-opacity-30 p-1 px-0 text-2xl"
        >
          X
        </div>

        {/* {combo?.name} */}
        {/* <ComboDetailsDisplay combo={combo} /> */}
        {/* </div> */}
        {/* <div className="col-start-4 flex flex gap-2 text-sm"> */}
        <div
          className={
            "outlineButton border-zinc-300 border-opacity-40 bg-zinc-900"
          }
        >
          {combo?.pointValue}
        </div>
        <div
          className={
            "outlineButton border-zinc-300 border-opacity-40 bg-zinc-900"
          }
        >
          {((creativityScore / 10) * combo.pointValue).toFixed(2)}
        </div>
        <div
          className={
            "outlineButton border-zinc-300 border-opacity-40 bg-zinc-900"
          }
        >
          {(executionScore * combo.pointValue).toFixed(2)}
        </div>
        <div
          className={
            "outlineButton border-zinc-300 border-opacity-80 bg-zinc-900"
          }
        >
          {(
            combo.pointValue +
            (creativityScore / 10) * combo.pointValue +
            executionScore * combo.pointValue
          ).toFixed(2)}
        </div>
      </div>
      {/* </div> */}
      {/* <div>{combo?.comboArray.map((t) => t.trick_id)}</div> */}
      <CombodexTrickDetails tricks={tricks} />
      <ComboExecutionSlider
        executionScore={executionScore}
        setExecutionScore={setExecutionScore}
      />
    </div>
  );
};

export default Combodex;

export const CombodexTrickDetails = ({ tricks }) => {
  return (
    <div
      className={
        "no-scrollbar flex h-fit w-full gap-1 overflow-y-scroll p-2 text-sm"
      }
    >
      {tricks &&
        tricks.map((tr) => {
          if (tr.type === "Transition") {
            return (
              <div className="flex flex-col place-items-center gap-1 whitespace-nowrap rounded-md bg-zinc-200 bg-opacity-20 p-1">
                <div>{tr.name}</div>
                <div className="outlineButton flex w-full justify-between gap-2 whitespace-nowrap border-teal-300">
                  <div>{tr.name}</div>
                  <div>{tr.pointValue}</div>
                </div>
              </div>
            );
          } else if (tr.type === "Trick") {
            return (
              <div className="flex flex-col place-items-center gap-1 whitespace-nowrap rounded-md bg-zinc-200 bg-opacity-20 p-1">
                <div
                  className={"flex h-fit flex-col gap-1 "}
                  key={`${tr.name}`}
                >
                  <div className="text-center">{tr.name}</div>
                  <div
                    className={
                      "outlineButton flex justify-between gap-2 border-zinc-300"
                    }
                  >
                    <div>{tr.base_id}</div>
                    <div>{tr?.base?.pointValue}</div>
                  </div>
                  {tr.type === "Trick" &&
                    tr?.variations?.map((v) => (
                      <div
                        key={`${v.variation.name} + ${Math.random()}`}
                        className="outlineButton flex h-fit w-full justify-between gap-2 border-indigo-400"
                      >
                        <div>{v.variation.name}</div>
                        <div>{v.variation.pointValue}</div>
                      </div>
                    ))}
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};
