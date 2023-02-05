import Link from "next/link";
import React from "react";
import { trpc } from "utils/trpc";

const TempFeed = () => {
  const { data: summaries } =
    trpc.sessionsummaries.getAllSessionSummaries.useQuery();
  return (
    <div className={`flex flex-col gap-1 p-2`}>
      {summaries &&
        summaries
          //   ?.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
          ?.map((summary) => {
            const user = summary.user;
            console.log(summary.sessionid);
            return (
              <Link
                href={`/userProfile/${user.uuid}?sessionid=${summary.sessionid}`}
                className={`w-full rounded-md bg-zinc-900 p-2 text-zinc-300`}
              >
                <div className="flex place-content-center place-items-center justify-between ">
                  <div>{summary.name}</div>
                  <div className="flex place-content-center place-items-center gap-1">
                    <img
                      className="h-5 w-5 rounded-full"
                      src={
                        user?.profilePic !== null
                          ? `/images/${user.uuid}/${user.profilePic}`
                          : `/images/noimg.jpeg`
                      }
                    />
                    <div>{summary.user.username}</div>
                  </div>
                </div>
                <div>{summary?.updatedAt?.toDateString()}</div>
              </Link>
            );
          })}
    </div>
  );
};

export default TempFeed;
