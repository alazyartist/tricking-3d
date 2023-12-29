import { useSessionSummariesStore } from "@admin/components/sessionreview/SessionSummaryStore";
import ExecutionAverageGaugeChart from "@components/d3/ExecutionAverageGuageChart";
import PowerAverageComboLineChart from "@components/d3/PowerAverageComboLineChart";
import PowerAverageLineChart from "@components/d3/PowerAverageLineChart";
import TransitionsBarChart from "@components/d3/TransitionsBarChart";
import TransitionsPieChart from "@components/d3/TransitionsPieChart";
import TrickInvertGaugeChart from "@components/d3/TricikInvertGuageChart";
import { DensityDisplay } from "@old_pages/combodex/Combodex";
import React from "react";
import { IoPlayCircle } from "react-icons/io5";

const SessionStatsOverview = ({ summary }) => {
  let sessionCombosArr = summary?.SessionData.sort((a, b) =>
    parseFloat(a.clipStart) < parseFloat(b.clipEnd) ? 1 : -1
  );
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
  console.log(summary.SessionData);
  let totalPoints = summary?.SessionData?.reduce(
    (sum, b) => sum + b?.totalScore,
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
  let transitiondensityArr = sessionCombosArr
    .map(
      (s) =>
        s?.ClipLabel.comboArray
          .filter((t) => t.type === "Transition")
          .reduce((sum, b) => sum + b?.pointValue, 0) /
        s?.ClipLabel?.comboArray.filter((t) => t.type === "Transition").length
    )
    .filter((d) => !Number.isNaN(d));
  let densityArrB = sessionCombosArr.map(
    (s) =>
      s?.ClipLabel.comboArray
        .filter((t) => t.type === "Trick")
        .reduce((sum, b) => sum + b?.pointValue, 0) /
      s?.ClipLabel?.comboArray.filter((t) => t.type === "Trick").length
  );

  let sessionTransitionDensity =
    transitiondensityArr.reduce((sum, b) => sum + b, 0) /
    transitiondensityArr.length;
  let sessionDensityB =
    densityArrB.reduce((sum, b) => sum + b, 0) / densityArrB.length;
  let nonZeroExecutionAverages = sessionCombosArr
    .map((s) => s.executionAverage)
    .filter((s) => s !== 0);

  let sessionExecutionAverage =
    nonZeroExecutionAverages.reduce((sum, b) => sum + b, 0) /
    nonZeroExecutionAverages.length;
  return (
    <div className=" grid w-full grid-cols-2 flex-col gap-1 text-xs">
      <OverviewCard
        sessionCombosArr={sessionCombosArr}
        sessionTricksArr={sessionTricksArr}
        summary={summary}
        totalPoints={totalPoints}
      />
      <div className="w-full text-center drop-shadow-md">
        <span className="font-bold">
          {
            uniqueTricks.filter((t: { type: string }) => t?.type === "Trick")
              .length
          }
        </span>
        {" Unique Tricks"}
      </div>
      <div className="w-full text-center drop-shadow-md">
        <span className="font-bold">
          {
            uniqueTricks.filter(
              (t: { type: string }) => t?.type === "Transition"
            ).length
          }
        </span>
        {" Unique Transitions"}
      </div>

      <div className="col-span-2 w-full rounded-md p-2 text-center">
        <span className="text-zinc-400">Greatest Trick: </span>
        {tricksByPoints?.[0]?.name}{" "}
        <span className="rounded-md bg-zinc-900 p-1 font-bold text-zinc-400">
          {tricksByPoints?.[0]?.pointValue}
        </span>
      </div>
      {/* LINES BELOW */}
      {/* Points
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
      </div> */}

      {/* <div className="grid gap-2 text-center">
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
      </div> */}
      <div className="col-span-2 flex h-full min-h-[120px] w-full flex-col justify-around md:min-h-[200px]">
        {/* <TransitionsPieChart
          data={sessionTricksArr.filter((t) => t.type === "Transition")}
        /> */}
        <TransitionsBarChart
          data={sessionTricksArr.filter((t) => t.type === "Transition")}
        />
      </div>
      <ExecutionAverageGaugeChart data={sessionCombosArr} />
      <TrickInvertGaugeChart
        data={sessionTricksArr.filter((t) => t.type === "Trick")}
      />
      <div className="col-span-2">
        <DensityDisplay
          trickDensity={sessionDensityB}
          transitionDensity={sessionTransitionDensity}
        />
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

export const OverviewCard = ({
  summary,
  totalPoints,
  sessionTricksArr,
  sessionCombosArr,
}) => {
  const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
  console.log(summary);
  return (
    <div className="col-span-2 flex w-full flex-col place-self-center rounded-md bg-zinc-900 p-2 text-2xl">
      <div className="flex w-full place-items-center ">
        <div className="p-1">
          <div className="text-xs tracking-wide text-zinc-500">
            {summary?.name}
          </div>
          <div className="">{totalPoints.toFixed(2)}</div>
        </div>
        <div
          onClick={() => {
            setVidsrc(summary?.SessionSources?.[0]?.vidsrc);
          }}
          className="rounded-md p-4 text-xs text-zinc-300"
        >
          <IoPlayCircle className="fill-emerald-500 text-3xl" />
        </div>
        {/* <div className="text-sm text-zinc-400">
      {summary?.name}
    </div> */}
      </div>
      <div className="h-[45px] w-full pb-2">
        <PowerAverageComboLineChart
          data={summary?.SessionData.sort((a, b) =>
            parseFloat(a.clipStart) < parseFloat(b.clipEnd) ? 1 : -1
          ).map((d) => d)}
        />
      </div>
      <div className="text-xs">
        <span className="font-bold">{sessionTricksArr?.length}</span>
        {" Tricks in "}
        <span className="font-bold">{sessionCombosArr?.length}</span>
        {" Combos"}
      </div>
    </div>
  );
};
