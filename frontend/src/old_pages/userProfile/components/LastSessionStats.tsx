import PowerAverageComboLineChart from "@components/d3/PowerAverageComboLineChart";
import { sessionsummaries, stances, transitions, tricks } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { ProfileInfo } from "types/trpc";

const LastSessionStats = ({ profileInfo }: { profileInfo: ProfileInfo }) => {
  const lastSession = profileInfo?.SessionSummaries.filter(
    (s) => s.status === "Reviewed"
  )?.[0];
  const lastSessionTricks = lastSession?.SessionData?.map(
    (data) =>
      Array.isArray(data.ClipLabel.comboArray) &&
      data.ClipLabel.comboArray
        ?.map((trick: stances | tricks | transitions) => {
          if (trick.type !== ("Transition" || "Stance")) return trick;
        })
        .filter((combo) => combo !== undefined)
  ).flat(2);

  const favoriteTrick = lastSessionTricks?.reduce((acc, curr) => {
    if (acc[curr.name]) {
      acc[curr.name]++;
    } else {
      acc[curr.name] = 1;
    }
    return acc;
  }, {});
  const favoriteTrickName = Object.keys(favoriteTrick)
    .map((key) => {
      return [key, favoriteTrick[key]];
    })
    .sort((a, b) => b[1] - a[1]);

  // console.log(lastSessionTricks, favoriteTrickName);
  return (
    <div>
      <Link href={`${profileInfo.uuid}?sessionid=${lastSession.sessionid}`}>
        {lastSession.name}
      </Link>
      <div className="flex w-full flex-wrap gap-2 text-[12px] text-zinc-400">
        {favoriteTrickName?.map(
          (ft, i) =>
            i < 5 && (
              <p
                key={ft[0]}
                className="whitespace-nowrap rounded-md bg-zinc-800 p-1"
              >
                {ft[0]} {ft[1]}
              </p>
            )
        )}
      </div>
      <div className="h-12 w-full">
        <PowerAverageComboLineChart data={lastSession.SessionData} />
      </div>
    </div>
  );
};

export default LastSessionStats;
