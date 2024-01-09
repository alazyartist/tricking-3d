import { forwardRef } from "react";
import { TotalScore } from "types/trpc";

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
      className="absolute left-[5vw] top-[3.5rem] z-[100] h-[83vh] w-[90vw] space-y-2 overflow-y-scroll  rounded-md bg-zinc-700 p-2"
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
export default TotalScoreBreakdown;
