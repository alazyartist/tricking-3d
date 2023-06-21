import { trpc } from "@utils/trpc";
import Link from "next/link";
import React from "react";

const SessionList = ({ uuid }) => {
  const { data: sessions } = trpc.sessionsummaries.getSessionsById.useQuery({
    uuid: uuid,
  });
  return (
    <div className={"h-full w-full rounded-md bg-zinc-900 bg-opacity-70"}>
      <div className={"p-2"}>My Sessions</div>
      {sessions &&
        sessions.map((s) => {
          return (
            <div
              className={`flex justify-between border-b-[1px] lg:grid lg:grid-cols-[2fr_.5fr_.25fr] ${
                s.status === "Reviewed"
                  ? "border-emerald-300"
                  : "border-zinc-300"
              } p-2`}
            >
              <p>{s.name}</p>
              <Link href={`userProfile/${s.user_id}?sessionid=${s.sessionid}`}>
                <p>{s.status}</p>
              </Link>
              <p>{s.SessionData.length} Clips</p>
            </div>
          );
        })}
    </div>
  );
};

export default SessionList;
