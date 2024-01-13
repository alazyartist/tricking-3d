import SessionLineChart from "@components/d3/SessionLineChart";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import React from "react";

const SessionList = ({ uuid }) => {
  const { data: sessions } = trpc.sessionsummaries.getSessionsById.useQuery({
    uuid: uuid,
  });
  if (!sessions) return <div>loading</div>;
  return (
    <div
      className={
        "no-scrollbar  h-[60vh] w-full overflow-y-scroll rounded-md bg-zinc-900 bg-opacity-70"
      }
    >
      <div className={"p-2"}>My Sessions</div>
      {sessions && <SessionLineChart data={sessions} />}
      <div className="flex h-full flex-col place-content-start gap-4 p-2 pt-[1rem] ">
        {sessions &&
          sessions.map((s) => {
            return (
              <div
                key={s.sessionid}
                className={` grid grid-cols-[1.25fr_.5fr_.5fr] justify-between gap-1 border-l-4 lg:grid-cols-[2fr_.5fr_.25fr] ${
                  s.status === "Reviewed"
                    ? "border-emerald-500"
                    : "border-zinc-300"
                } rounded-md bg-zinc-800 bg-opacity-40 p-2`}
              >
                <p
                  className={`  ${
                    s.status === "Reviewed" ? "text-zinc-300" : "text-zinc-500"
                  }`}
                >
                  {s.name}
                </p>
                <Link
                  href={`userProfile/${s.user_id}?sessionid=${s.sessionid}`}
                >
                  <p>{s.status}</p>
                </Link>
                <p className="text-right">{s.SessionData.length} Clips</p>
              </div>
            );
          })}

        <p>no more sessions to show</p>
      </div>
    </div>
  );
};

export default SessionList;
