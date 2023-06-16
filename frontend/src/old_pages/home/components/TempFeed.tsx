import Link from "next/link";
import React from "react";
import { trpc } from "utils/trpc";

const TempFeed = () => {
  const { data: summaries } =
    trpc.sessionsummaries.getAllSessionSummaries.useQuery();
  return (
    <div className={`flex flex-col gap-1 p-2 font-inter`}>
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
                          ? `/images/${user.uuid}/${user.profilePic}`
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
              </Link>
            );
          })}
    </div>
  );
};

export default TempFeed;
