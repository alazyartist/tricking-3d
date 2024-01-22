import PowerAverageComboLineChart from "@components/d3/PowerAverageComboLineChart";
import { YoutubeThumnail } from "@old_pages/userProfile/components/SessionStatsOverview";
import Link from "next/link";
import React from "react";
import { IoPlayCircle } from "react-icons/io5";
import { trpc } from "utils/trpc";

const TempFeed = () => {
  const { data: summaries } =
    trpc.sessionsummaries.getAllSessionSummaries.useQuery();
  return (
    <div id="temp-feed" className={`flex flex-col gap-1 p-2 font-inter`}>
      <p className={"text-center  text-zinc-300"}>Recently Reviewed</p>
      {summaries &&
        summaries
          //   ?.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
          ?.map((summary) => {
            const user = summary.user;
            // console.log(summary);
            return (
              <Link
                key={`${user.uuid},${summary.sessionid}`}
                href={`/userProfile/${user.uuid}?sessionid=${summary.sessionid}`}
                className={`w-full rounded-md bg-zinc-900 p-2 text-zinc-300`}
              >
                <div className="flex place-content-center place-items-center justify-between  ">
                  <div className="font-medium ">{summary.name}</div>
                  <div className="flex place-content-center place-items-center gap-1">
                    <img
                      className="h-5 w-5 rounded-full"
                      src={
                        user?.profilePic !== null
                          ? user.profilePic
                          : `/images/noimg.jpeg`
                      }
                    />
                    <div className="text-zinc-400">
                      {summary.user.username?.slice(0, 15)}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-zinc-400">
                  {summary?.updatedAt?.toDateString()}
                </div>
                <div className="relative h-full w-full">
                  <IoPlayCircle className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] fill-zinc-200 text-3xl" />
                  <YoutubeThumnail src={summary.SessionSources?.[0]?.vidsrc} />
                  <div className="absolute bottom-0 h-16 w-full bg-opacity-90 bg-gradient-to-t from-zinc-900">
                    <div className="absolute bottom-0 h-8 w-full">
                      <PowerAverageComboLineChart data={summary.SessionData} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default TempFeed;
