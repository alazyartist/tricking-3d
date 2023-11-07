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
      data.ClipLabel.comboArray.map((combo) => combo.name)
    )
  );
  console.log(allSessionTricks);
  totalTricks = totalTricks
    ?.map((a) => {
      return a?.reduce((sum, b) => sum + b, 0);
    })
    .reduce((sum, b) => sum + b, 0);
  return (
    <div className="text-[12px] text-zinc-400">
      <div>
        Sesions Submitted:{" "}
        <span className="text-zinc-300">
          {profileInfo.SessionSummaries.length}
        </span>
      </div>
      <div>Total Tricks: {totalTricks}</div>
      {/* <div className={"absolute right-5 top-5 h-[200px] w-[400px]"}>
        <RadarChart data={allSessionTricks} />
      </div> */}
    </div>
  );
};

export default OverallStatDisplay;
