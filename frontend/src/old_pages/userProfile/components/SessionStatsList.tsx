import PowerAverageComboLineChart from "@components/d3/PowerAverageComboLineChart";
import { combos, sessiondata, sessionsummaries } from "@prisma/client";
import React from "react";
import ProfileNav from "./ProfileNav";

const SessionStatsList = ({
  setActiveView,
  activeView,
  profileInfo,
  setActiveSummary,
}) => {
  // console.log("sessionStatsList pI", profileInfo);
  return (
    <div className="no-scrollbar h-full w-full overflow-hidden overflow-y-scroll">
      <ProfileNav setActiveView={setActiveView} activeView={activeView} />
      <div className="flex h-[100%] flex-col place-content-start gap-1">
        {profileInfo?.SessionSummaries.map((summary) => (
          <SessionSummaryCard
            setActiveSummary={setActiveSummary}
            summary={summary}
          />
        ))}
        <div className="p-2 font-bold text-zinc-300 drop-shadow-md">
          no more sessions...
        </div>
      </div>
    </div>
  );
};

export default SessionStatsList;

interface SSCProps {
  summary: sessionsummaries & {
    SessionData: (sessiondata & { ClipLabel: combos })[];
  };
  setActiveSummary?: React.Dispatch<React.SetStateAction<sessionsummaries>>;
  f?: () => void;
}
export const SessionSummaryCard: React.FC<SSCProps> = ({
  summary,
  setActiveSummary,
  f,
}) => {
  let totalPoints = summary?.SessionData?.map((data) => {
    if (data.totalScore !== null) return data.totalScore;
  }).reduce((sum: number, b: number) => sum + b, 0);
  const handleClick = () => {
    if (setActiveSummary) {
      setActiveSummary(summary);
    }
    if (f) {
      f();
    } else return;
  };
  // console.log("summarySD", summary.SessionData);
  return (
    <div
      key={summary.sessionid}
      className="flex flex-col justify-between gap-2 rounded-md bg-zinc-900 p-2"
      onClick={() => {
        handleClick();
      }}
    >
      <div className="flex justify-between gap-2">
        <div className="px-2">{summary.name}</div>
        <div className="px-2 font-bold">{totalPoints?.toFixed(2)}</div>
      </div>
      <div className="h-[30px] w-full">
        <PowerAverageComboLineChart
          data={summary?.SessionData?.sort((a, b) => {
            if (a.clipStart === null) return -1;
            if (b.clipStart === null) return 1;
            else return a.clipStart > b.clipStart ? -1 : 1;
          })}
        />
      </div>
    </div>
  );
};
