import { trpc } from "@utils/trpc";
import React from "react";

const SessionList = ({ uuid }) => {
  const { data: sessions } = trpc.sessionsummaries.getSessionsById.useQuery({
    uuid: uuid,
  });
  return (
    <div className={"h-full w-full rounded-md bg-zinc-800"}>
      <div>My Sessions</div>
      {sessions &&
        sessions.map((s) => {
          return (
            <div
              className={`flex justify-between border-b-[1px] ${
                s.status === "Reviewed"
                  ? "border-emerald-300"
                  : "border-zinc-300"
              } p-2`}
            >
              <p>{s.name}</p>
              <p>{s.status}</p>
            </div>
          );
        })}
    </div>
  );
};

export default SessionList;
