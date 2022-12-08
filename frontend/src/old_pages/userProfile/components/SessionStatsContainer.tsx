import React from "react";
import SessionStatsOverview from ".//SessionStatsOverview";
import { IoIosArrowBack } from "react-icons/io";

import PublicSessionReview from "@components/publicSessionReview/PublicSessionReview";
const SessionStatsContainer = ({ setActiveSummary, activeSummary }) => {
  return (
    <div className="neumorphicIn no-scrollbar aspect-[5/4] w-full overflow-hidden overflow-y-scroll rounded-md p-4 md:relative">
      <IoIosArrowBack
        onClick={() => setActiveSummary(null)}
        className={"absolute top-[12px] left-[10px]"}
      />
      <SessionStatsOverview summary={activeSummary} />
      {activeSummary && (
        <>
          {activeSummary.SessionSources.map((source) => {
            return (
              <PublicSessionReview
                source={source}
                activeSummary={activeSummary}
                mirrored={false}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default SessionStatsContainer;
