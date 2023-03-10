import { sessionsummaries } from "@prisma/client";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CompareSessions = () => {
  const router = useRouter();
  const { sessions } = router.query;
  const { data: sessionSummaries, isSuccess } =
    trpc.sessionsummaries.compareDetailsById.useQuery({
      sessions: typeof sessions !== "string" ? sessions : [sessions],
    });
  type sessionSummary = typeof sessionSummaries;
  const transformSessionInfo = (sessionSummaries: sessionSummary) => {
    const sessionInfo = {
      "Total Score": sessionSummaries?.map((s) =>
        s.SessionData.reduce((sum, b) => sum + b.totalScore, 0)?.toFixed(2)
      ),
      "Raw Power": sessionSummaries?.map((s) =>
        s.SessionData.reduce((sum, b) => sum + b.powerScore, 0)?.toFixed(2)
      ),
      "# of Combos": sessionSummaries?.map((s) => s.SessionData.length),
      "# of Tricks": sessionSummaries?.map((s) =>
        s.SessionData?.map((sd) => {
          const com = sd.ClipLabel.comboArray as any[];
          return com.filter((t) => t.type === "Trick").length;
        }).reduce((sum, b) => sum + b, 0)
      ),
      "# of Trans..": sessionSummaries?.map((s) =>
        s.SessionData?.map((sd) => {
          const com = sd.ClipLabel.comboArray as any[];
          return com.filter((t) => t.type === "Transition").length;
        }).reduce((sum, b) => sum + b, 0)
      ),
      "# of Chains": sessionSummaries?.map((s) =>
        s.SessionData.map((sd) => Object.keys(sd.chains).length).reduce(
          (sum, b) => sum + b,
          0
        )
      ),
      "Chain Score": sessionSummaries?.map((s) =>
        s.SessionData.reduce((sum, b) => sum + b.chainTotal, 0)?.toFixed(2)
      ),
      "Bonus Score": sessionSummaries?.map((s) =>
        s.SessionData.reduce((sum, b) => sum + b.bonusScore, 0)?.toFixed(2)
      ),
      "Variety Score": sessionSummaries?.map((s) =>
        s.SessionData.reduce((sum, b) => sum + b.varietyScore, 0)?.toFixed(2)
      ),
      "Execution Avg": sessionSummaries?.map((s) =>
        s.SessionData.reduce(
          (sum, b) =>
            sum + b.executionAverage * (b.powerScore + b.varietyScore),
          0
        )?.toFixed(2)
      ),
      "Chain %": sessionSummaries?.map(
        (s) =>
          (
            ((s.SessionData.reduce((sum, b) => sum + b.chainTotal, 0)?.toFixed(
              2
            ) as number) /
              s.SessionData.reduce((sum, b) => sum + b.totalScore, 0)) *
            100
          )?.toFixed(2) + "%"
      ),
      "Bonus %": sessionSummaries?.map(
        (s) =>
          (
            (s.SessionData.reduce((sum, b) => sum + b.bonusScore, 0)?.toFixed(
              2
            ) /
              s.SessionData.reduce((sum, b) => sum + b.totalScore, 0)) *
            100
          )?.toFixed(2) + "%"
      ),
      "Variety %": sessionSummaries?.map(
        (s) =>
          (
            (s.SessionData.reduce((sum, b) => sum + b.varietyScore, 0)?.toFixed(
              2
            ) /
              s.SessionData.reduce((sum, b) => sum + b.totalScore, 0)) *
            100
          )?.toFixed(2) + "%"
      ),
      "Execution %": sessionSummaries?.map(
        (s) =>
          (
            (s.SessionData.reduce(
              (sum, b) =>
                sum + b.executionAverage * (b.powerScore + b.varietyScore),
              0
            ) /
              s.SessionData.reduce((sum, b) => sum + b.totalScore, 0)) *
            100
          )?.toFixed(2) + "%"
      ),
      "Most Used": sessionSummaries?.map((s) => {
        const trickCount = s.SessionData.map((sd) => sd?.trickCount).reduce(
          (acc: {}, cur: {}) => ({ ...acc, ...cur }),
          {}
        );
        return Object.keys(trickCount)
          ?.filter((key) => trickCount[key].count > 1)
          .sort((a, b) =>
            trickCount[a]?.count > trickCount[b]?.count ? -1 : 1
          )[0];
      }),
    } as const;
    return sessionInfo;
  };
  const [compareData, setCompareData] = useState<{}>();
  useEffect(() => {
    if (isSuccess && sessionSummaries?.length) {
      const compareDatum = transformSessionInfo(sessionSummaries);
      setCompareData(compareDatum);
    }
  }, [sessionSummaries]);
  return (
    <div className="h-screen bg-zinc-900 bg-opacity-40 p-4 text-zinc-100">
      <Link href={"/compare"} className=" font-semi-bold p-4 text-4xl">
        CompareSessions
      </Link>
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
        <div
          id={"Stat Label"}
          className="flex h-full w-full flex-col place-content-center place-items-end text-zinc-300"
        >
          {compareData &&
            Object.keys(compareData).map((stat) => (
              <h1 className="whitespace-nowrap text-right drop-shadow-lg ">
                {stat}
              </h1>
            ))}
        </div>
        <div
          id={"Stat Data"}
          className={`grid grid-cols-${sessions?.length} m-4 mr-0 place-items-center rounded-md bg-zinc-800 bg-opacity-40 text-right backdrop-blur-md`}
        >
          <div className="absolute z-[-2] h-full w-[80%] "></div>
          {compareData &&
            Object.keys(compareData).map((stat) =>
              compareData[stat].map((stat) => (
                <div className="min-w-[100px] text-right">{stat}</div>
              ))
            )}
        </div>
      </div>
    </div>
  );
};

export default CompareSessions;
