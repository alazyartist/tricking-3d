import PowerAverageComboLineChart from "@components/d3/PowerAverageComboLineChart";
import React from "react";
import ProfileNav from "./ProfileNav";

const SessionStatsList = ({
  setActiveView,
  activeView,
  profileInfo,
  setActiveSummary,
}) => {
  console.log("sessionStatsList pI", profileInfo);
  return (
    <div className="no-scrollbar h-full w-full overflow-hidden overflow-y-scroll">
      <ProfileNav setActiveView={setActiveView} activeView={activeView} />
      <div className="flex h-[100%] flex-col place-content-start gap-1">
        {profileInfo.SessionSummaries.map((summary) => {
          let pointValue = summary.SessionData.map(
            (data) => data.ClipLabel.pointValue
          ).reduce((sum, b) => sum + b, 0);
          console.log(summary.SessionData);
          return (
            <div
              className="flex flex-col justify-between gap-2 rounded-md bg-zinc-900 p-2"
              onClick={() => {
                setActiveSummary(summary);
              }}
              key={Math.random() + "link"}
            >
              <div className="flex justify-between gap-2">
                <div className="px-2">{summary.name}</div>
                <div className="px-2 font-bold">{pointValue.toFixed(2)}</div>
              </div>
              <div className="h-[30px] w-full">
                <PowerAverageComboLineChart
                  data={summary.SessionData.sort((a, b) =>
                    a.startTime > b.startTime ? -1 : 1
                  )}
                />
              </div>
            </div>
          );
        })}
        <div className="p-2 font-bold text-zinc-300 drop-shadow-md">
          no more sessions...
        </div>
      </div>
    </div>
  );
};

export default SessionStatsList;
