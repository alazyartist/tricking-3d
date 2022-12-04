import React from "react";
import ProfileNav from "./ProfileNav";

const SessionStatsList = ({
  setActiveView,
  activeView,
  profileInfo,
  setActiveSummary,
}) => {
  return (
    <div className="h-full w-full overflow-hidden overflow-y-scroll">
      <ProfileNav setActiveView={setActiveView} activeView={activeView} />
      <div className="flex h-[100%] flex-col place-content-start gap-1">
        {profileInfo.SessionSummaries.map((summary) => (
          <div
            key={summary.id}
            className="flex-col gap-2 rounded-md bg-zinc-900 p-2"
            onClick={() => {
              console.log(summary);
              setActiveSummary(summary);
            }}
          >
            {summary.name}
          </div>
        ))}
        <div className="p-2 font-bold text-zinc-900">no more sessions...</div>
      </div>
    </div>
  );
};

export default SessionStatsList;
