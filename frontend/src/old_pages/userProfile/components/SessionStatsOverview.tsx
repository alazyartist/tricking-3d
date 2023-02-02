import ExecutionAverageGaugeChart from "@components/d3/ExecutionAverageGuageChart";
import TrickInvertGaugeChart from "@components/d3/TricikInvertGuageChart";
import React from "react";

const SessionStatsOverview = ({ summary }) => {
  let sessionCombosArr = summary?.SessionData;
  let sessionTricksArr = summary?.SessionData?.map(
    (s) => s.ClipLabel.comboArray
  )
    ?.flat()
    ?.sort((a, b) => {
      if (a.type > b.type) return 1;
      if (a.type < b.type) return -1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  let longestCombo = sessionCombosArr?.sort((a, b) => {
    if (a.ClipLabel.comboArray.length > b.ClipLabel.comboArray.length)
      return -1;
    if (a.ClipLabel.comboArray.length < b.ClipLabel.comboArray.length) return 1;
    return 0;
  })?.[0]?.ClipLabel;
  let greatestCombo = sessionCombosArr?.sort((a, b) => {
    // console.log(a.ClipLabel);
    if (a.ClipLabel.pointValue > b.ClipLabel.pointValue) return -1;
    if (a.ClipLabel.pointValue < b.ClipLabel.pointValue) return 1;
    return 0;
  })?.[0]?.ClipLabel;
  let uniqueTricks = [
    //@ts-ignore
    ...new Map(sessionTricksArr?.map((item) => [item["name"], item])).values(),
  ];
  let tricksByPoints = sessionTricksArr?.sort((a, b) => {
    if (a.pointValue > b.pointValue) return -1;
    if (a.pointValue < b.pointValue) return 1;
    return 0;
  });
  let totalPoints = summary?.SessionData?.reduce(
    (sum, b) => sum + b?.ClipLabel?.pointValue,
    0
  );
  let trickPercentage = Math.floor(
    (tricksByPoints?.[0]?.pointValue / totalPoints) * 100
  );
  let comboPercentage = Math.floor(
    (greatestCombo?.pointValue / totalPoints) * 100
  );
  let uniqueTrickPercentage = Math.floor(
    (uniqueTricks?.filter((t: { type: string }) => t.type === "Trick").length /
      totalPoints) *
      100
  );
  let uniqueTransitionPercentage = Math.floor(
    (uniqueTricks?.filter((t: { type: string }) => t.type === "Transition")
      .length /
      totalPoints) *
      100
  );
  let densityArr = sessionCombosArr.map(
    (s) =>
      s?.ClipLabel.comboArray
        // .filter((t) => t.type === "Trick")
        .reduce((sum, b) => sum + b?.pointValue, 0) /
      // .filter((t) => t.type === "Trick")
      s?.ClipLabel?.comboArray.length
  );
  let densityArrB = sessionCombosArr.map(
    (s) =>
      s?.ClipLabel.comboArray
        .filter((t) => t.type === "Trick")
        .reduce((sum, b) => sum + b?.pointValue, 0) /
      s?.ClipLabel?.comboArray.filter((t) => t.type === "Trick").length
  );
  let sessionDensity =
    densityArr.reduce((sum, b) => sum + b, 0) / densityArr.length;
  let sessionDensityB =
    densityArrB.reduce((sum, b) => sum + b, 0) / densityArrB.length;
  let nonZeroExecutionAverages = sessionCombosArr
    .map((s) => s.executionAverage)
    .filter((s) => s !== 0);

  let sessionExecutionAverage =
    nonZeroExecutionAverages.reduce((sum, b) => sum + b, 0) /
    nonZeroExecutionAverages.length;
  console.log(sessionExecutionAverage);

  return (
    <div className="grid w-full grid-cols-2 flex-col gap-1 text-xs">
      <div className="col-span-2 flex w-full place-content-center place-items-center place-self-center rounded-md bg-zinc-900 p-2 text-2xl">
        <span className="font-black text-zinc-400">Total Points: </span>
        {totalPoints}
      </div>
      Points
      <div className="relative col-span-2 h-[4px] w-full rounded-md bg-indigo-300">
        <div
          style={{ width: `${comboPercentage}%`, left: `${trickPercentage}%` }}
          className="absolute top-0 left-0 col-span-2 h-[4px] rounded-md bg-indigo-500"
        />
        <div
          style={{ width: `${trickPercentage}%` }}
          className="absolute top-0 left-0 col-span-2 h-[4px] rounded-md bg-indigo-700"
        />
      </div>
      Tricks
      <div className="relative col-span-2 h-[4px] w-full rounded-md bg-teal-300">
        <div
          style={{
            width: `${uniqueTrickPercentage}%`,
            left: `${uniqueTransitionPercentage}%`,
          }}
          className="absolute top-0 left-0 col-span-2 h-[4px] rounded-md bg-teal-500"
        />
        <div
          style={{
            width: `${uniqueTransitionPercentage}%`,
          }}
          className="absolute top-0 left-0 col-span-2 h-[4px] rounded-md bg-teal-700"
        />
      </div>
      <div className="grid gap-2 text-center">
        <div className="rounded-md bg-zinc-900 p-2">
          <span className="text-zinc-400">Combos: </span>
          {sessionCombosArr?.length}
        </div>
        <div className="rounded-md bg-zinc-900 p-2">
          <span className="text-zinc-400">Tricks:</span>{" "}
          {sessionTricksArr?.length}
        </div>
      </div>
      <div className="grid gap-2 text-center">
        <div className="rounded-md bg-teal-500 p-2 text-zinc-900">
          <span className="text-zinc-800">Unique Tricks: </span>
          {
            uniqueTricks?.filter((t: { type: string }) => t?.type === "Trick")
              .length
          }
        </div>
        <div className="rounded-md bg-teal-700 p-2 text-zinc-200">
          <span className="text-zinc-300">Unique Transitions: </span>
          {
            uniqueTricks?.filter(
              (t: { type: string }) => t?.type === "Transition"
            )?.length
          }
        </div>
      </div>
      <div className="col-span-2 flex h-full justify-around">
        <ExecutionAverageGaugeChart data={sessionCombosArr} />
        <TrickInvertGaugeChart data={sessionTricksArr} />
        <ExecutionAverageGaugeChart data={sessionCombosArr} />
      </div>
      <div className="col-span-2">
        <span className="text-zinc-400">Greatest Trick: </span>
        {tricksByPoints?.[0]?.name}
      </div>
      <div className="col-span-2">
        <span className="text-zinc-400">Density - Tricks Only: </span>
        {sessionDensityB.toFixed(3)}
      </div>
      <div className="col-span-2">
        <span className="text-zinc-400">Density - All: </span>
        {sessionDensity.toFixed(3)}
      </div>
      <div className="col-span-2">
        <span className="text-zinc-400">Session ExecutionAverage: </span>
        {sessionExecutionAverage.toFixed(2)}
      </div>
      <div className="col-span-2 w-[100%] whitespace-pre-wrap break-words">
        <span className="text-zinc-400">
          Longest {longestCombo?.name === greatestCombo?.name && "& Greatest"}{" "}
          Combo:
        </span>{" "}
        {longestCombo?.shorthand || longestCombo?.name}
      </div>
      {longestCombo?.name !== greatestCombo?.name && (
        <div>
          <span className="text-zinc-400">Greatest Combo: </span>
          {greatestCombo?.shorthand || greatestCombo?.name}
        </div>
      )}
    </div>
  );
};

export default SessionStatsOverview;
