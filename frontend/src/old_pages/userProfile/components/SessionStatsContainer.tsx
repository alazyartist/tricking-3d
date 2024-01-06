import React from "react";
import SessionStatsOverview from ".//SessionStatsOverview";
import { IoIosArrowBack } from "react-icons/io";

import PublicSessionReview from "@components/publicSessionReview/PublicSessionReview";
import { useRouter } from "next/router";
const SessionStatsContainer = ({ setActiveSummary, activeSummary, uuid }) => {
  const router = useRouter();
  const handleBack = () => {
    setActiveSummary(null);
    router.push(`/userProfile/${uuid}`);
    // window.history.replaceState("", "", `/${uuid}`);
  };
  return (
    <div className="no-scrollbar aspect-[5/4] w-full overflow-hidden overflow-y-scroll rounded-md p-3 md:relative">
      <div
        className={
          "absolute left-[1px] top-[2px] flex place-content-center place-items-center p-1"
        }
      >
        <IoIosArrowBack onClick={() => handleBack()} />
      </div>
      <SessionStatsOverview summary={activeSummary} />
      {activeSummary && (
        <>
          {activeSummary?.SessionSources?.map((source) => {
            return (
              <PublicSessionReview
                key={source.srcid}
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
