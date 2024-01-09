import useClickOutside from "@hooks/useClickOutside";
import { trpc } from "@utils/trpc";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { TotalScore } from "types/trpc";
import { MdOutlineBackspace } from "../../../data/icons/MdIcons";
import { TrickShapeDisplay } from "../../comboMakerV2/components/SelectTrickPopup";
interface ComboDisplayProps {
  newCombo: any[];
  setDeleteLast?: any;
}
const NewComboDisplay: React.FC<ComboDisplayProps> = ({
  newCombo,
  setDeleteLast,
}) => {
  const { data: totalScore } = trpc.combos.getComboScore.useQuery({
    combo: newCombo,
  });
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
  const ref = useRef<HTMLDivElement>();
  // const scrollToBottom = () => {
  // 	ref?.current?.scrollIntoView({ behavior: "smooth" });
  // };
  // useEffect(() => {
  // 	scrollToBottom();
  // }, [newCombo]);

  // scrollToBottom();
  const scoreCardRef = useClickOutside(() => setShowScoreBreakdown(false));
  return (
    <>
      <p
        className={"h-8 w-24 rounded-md bg-zinc-700 p-1 text-center"}
        onClick={() => setShowScoreBreakdown(true)}
      >
        {totalScore ? totalScore?.totalScore.toFixed(2) : "TotalScore"}
      </p>
      {showScoreBreakdown && (
        <TotalScoreBreakdown ref={scoreCardRef} totalScore={totalScore} />
      )}
      <div className="m-2 flex h-[20vh] w-fit ">
        <div
          id="comboStateArr"
          className="minimalistScroll flex h-full w-[90vw] max-w-[560px]  flex-row place-content-start gap-1 overflow-x-auto rounded-lg bg-zinc-200 bg-opacity-[13%] p-2 backdrop-blur-xl"
        >
          {newCombo?.map((e, i) => (
            <div
              ref={ref}
              key={`${Math.floor(Math.random() * 1000)} + ${e?.name} + i`}
              onClick={() => console.log(e)}
              className="flex h-fit w-fit flex-row place-items-center gap-2 place-self-end text-zinc-300"
            >
              <div className="whitespace-nowrap rounded-md bg-zinc-900 bg-opacity-70 p-2">{`${
                e?.name || e || "Nope"
              }`}</div>
              {/* <TrickShapeDisplay i={i} trick={e} /> */}
              {/* <div>{`${e?.landingStance || e.toLeg || ""}`}</div> */}
            </div>
          ))}

          {newCombo.length === 0 && (
            <div className="flex h-full w-full flex-row place-items-center whitespace-nowrap p-2 text-sm text-zinc-300">
              "Choose a transition to start"
            </div>
          )}
        </div>
        <div className="relative right-[2.25rem] top-[0.1rem] z-[10] w-0 text-3xl text-red-300">
          <MdOutlineBackspace onClick={() => setDeleteLast((s) => s + 1)} />
        </div>
      </div>
    </>
  );
};

export default NewComboDisplay;

const TotalScoreBreakdown = forwardRef<
  HTMLHRElement,
  { totalScore: TotalScore }
>(({ totalScore }, scoreCardRef) => {
  const lowScorePotential = (
    totalScore.bonusScore +
    totalScore.varietyScore +
    totalScore.chainTotal +
    totalScore.powerScore +
    totalScore.executionAverage *
      ((totalScore.powerScore + totalScore.varietyScore) * 0.01)
  ).toFixed(2);
  const highScorePotential = (
    totalScore.bonusScore +
    totalScore.varietyScore +
    totalScore.chainTotal +
    totalScore.powerScore +
    totalScore.executionAverage *
      ((totalScore.powerScore + totalScore.varietyScore) * 1)
  ).toFixed(2);
  return (
    <div
      ref={scoreCardRef}
      className="absolute z-[100] h-[83vh] w-[90vw] space-y-2 overflow-y-scroll  rounded-md bg-zinc-700 p-2"
    >
      <div className={`rounded-md bg-zinc-800 p-2`}>
        <h1 className="text-center text-xl">Chain Score</h1>
        {totalScore.chainMap.map((e) => (
          <div className="flex justify-between gap-2">
            <div className="text-xs">{e[3]}</div>
            <div className="text-xs">{e[1].toFixed(2)}</div>
          </div>
        ))}
        <p className="text-right">{totalScore.chainTotal.toFixed(2)}</p>
      </div>

      <div className={`rounded-md bg-zinc-800 p-2`}>
        <h1 className="text-center text-xl">Variety Score</h1>
        <p className="text-xs">
          the variation score is calculated adding the unique variations of the
          whole combo + the varietyMultiplier * 1.25* the variated tricks
          pointvalue
        </p>
        <div className="flex justify-between gap-2">
          <div className="text-xs">{totalScore.uvScore}</div>
          <div className="text-xs">{totalScore.uvScore}</div>
        </div>
        {totalScore.varietyMap.map((e) => (
          <div className="flex justify-between gap-2">
            <div className="flex justify-between gap-2">
              <div className="text-xs">{e[1]}</div>
              <div className="text-xs">x</div>
              <div className="text-xs">{e[3].toFixed(2)}</div>
            </div>
            <div className="text-xs">{(e[2] == 0 ? 1 : e[2]).toFixed(2)}</div>
          </div>
        ))}
        <p className="text-right">{totalScore.varietyScore.toFixed(2)}</p>
      </div>
      <div className="flex justify-between rounded-md bg-zinc-800 p-2">
        <h1>power score</h1>
        <p className="text-right">{totalScore.powerScore}</p>
      </div>
      <div className="flex justify-between rounded-md bg-zinc-800 p-2">
        <h1>bonus score</h1>
        <p className="text-right">{totalScore.bonusScore}</p>
      </div>
      <div className="flex justify-between rounded-md bg-zinc-800 p-2">
        <h1>execution score</h1>
        <p className="text-right">
          {(
            totalScore.executionAverage *
            (totalScore.powerScore + totalScore.varietyScore)
          ).toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col rounded-md bg-zinc-800 p-2">
        <h1 className="text-center text-xl">Total score</h1>
        <p className="w-fit place-self-center rounded-md bg-emerald-300 bg-opacity-30 p-2 text-center text-xl font-semibold">
          {totalScore.totalScore.toFixed(2)}
        </p>
        <p className="text-xs">
          the total score ultimately depends on the execution average below is
          the possible range of scores
        </p>
        <div className="flex justify-around gap-4">
          <div className="flex flex-col text-center">
            <p>Low</p>
            <p>{lowScorePotential}</p>
          </div>
          <div className="flex flex-col text-center">
            <p>High</p>
            <p>{highScorePotential}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
