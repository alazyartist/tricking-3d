// import RadarChart from "@components/d3/RadarChartAI";
import React from "react";

const OverallStatDisplay = ({ profileInfo }) => {
  if (!profileInfo) return null;
  let SessionSummaries = profileInfo.SessionSummaries;
  let totalTricks = SessionSummaries?.map((summary) =>
    summary.SessionData?.map((data) => data.ClipLabel.comboArray.length)
  );
  let allSessionTricks = SessionSummaries?.map((summary) =>
    summary.SessionData?.map((data) =>
      data.ClipLabel.comboArray
        .map((trick) => {
          if (trick.type != "Transition") {
            console.log(trick);
          }
          if (trick.type != ("Transition" || "Stance")) return trick.name;
        })
        .filter((combo) => combo != undefined)
    )
  );
  //count tricks to find most used trick
  const favoriteTrick = allSessionTricks.flat(2).reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr]++;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {});
  const favoriteTrickName = Object.keys(favoriteTrick)
    .map((key) => {
      return [key, favoriteTrick[key]];
    })
    .sort((a, b) => b[1] - a[1]);
  console.log(favoriteTrickName, favoriteTrick);
  totalTricks = totalTricks
    ?.map((a) => {
      return a?.reduce((sum, b) => sum + b, 0);
    })
    .reduce((sum, b) => sum + b, 0);
  return (
    <div className="space-y-2 text-[12px] text-zinc-400">
      <div>
        Sesions Submitted:{" "}
        <span className="text-zinc-300">
          {profileInfo.SessionSummaries.length}
        </span>
      </div>
      <div>Total Tricks: {totalTricks}</div>
      <div className="flex w-full place-items-center gap-2 whitespace-nowrap">
        <div className="flex w-full flex-wrap gap-2">
          {favoriteTrickName?.map(
            (ft, i) =>
              i < 5 && (
                <p className="whitespace-nowrap rounded-md bg-zinc-800 p-1">
                  {ft[0]} {ft[1]}
                </p>
              )
          )}
        </div>
      </div>
      {/* <div className={"absolute right-5 top-5 h-[200px] w-[400px]"}>
        <RadarChart data={allSessionTricks} />
      </div> */}
    </div>
  );
};

export default OverallStatDisplay;
