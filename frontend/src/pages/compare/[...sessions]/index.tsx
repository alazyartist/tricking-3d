import { sessionsummaries } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CompareSessions = () => {
  const router = useRouter();
  const { sessions } = router.query;
  const { data: sessionSummaries } =
    trpc.sessionsummaries.compareDetailsById.useQuery({
      sessions: typeof sessions !== "string" ? sessions : [sessions],
    });
  const [compareData, setCompareData] = useState<{}>();
  useEffect(() => {
    if (sessionSummaries.length) {
      const compareDatum = transformSessionInfo(sessionSummaries);
      setCompareData(compareDatum);
    }
  }, [sessionSummaries]);
  return (
    <div className="text-zinc-300">
      <h1 className=" font-semi-bold p-4 text-4xl">CompareSessions</h1>
      <div className=" grid grid-cols-[1fr_4fr]">
        <div className="flex h-full w-full place-content-end place-items-center">
          Session
        </div>
        <div
          className={`grid grid-cols-${sessions?.length} place-items-center`}
        >
          {Array.isArray(sessionSummaries) &&
            sessionSummaries.map((s) => <div className="p-2">{s.name}</div>)}
        </div>
        <div className="flex h-full w-full flex-col place-content-center place-items-end">
          {compareData &&
            Object.keys(compareData).map((stat) => (
              <h1 className="text-right">{stat}</h1>
            ))}
        </div>
        <div
          className={`grid grid-cols-${sessions?.length} place-items-center`}
        >
          {compareData &&
            Object.keys(compareData).map((stat) =>
              compareData[stat].map((stat) => <div>{stat}</div>)
            )}
        </div>
      </div>
    </div>
  );
};

export default CompareSessions;

const transformSessionInfo = (sessionSummaries) => {
  const sessionInfo = {
    "Total Score": sessionSummaries?.map((s) =>
      s.SessionData.reduce((sum, b) => sum + b.totalScore, 0)?.toFixed(2)
    ) as string,
    "Raw Power": sessionSummaries?.map((s) =>
      s.SessionData.reduce(
        (sum, b) => sum + b.ClipLabel.pointValue,
        0
      )?.toFixed(2)
    ) as string,
    "Total Combos": sessionSummaries?.map(
      (s) => s.SessionData.length
    ) as number,
    "Total Tricks": sessionSummaries?.map((s) =>
      s.SessionData?.map((sd) => sd.ClipLabel.comboArray.length).reduce(
        (sum, b) => sum + b,
        0
      )
    ) as number,
  } as const;
  return sessionInfo;
};
