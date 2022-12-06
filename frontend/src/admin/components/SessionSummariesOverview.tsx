import React from "react";
import Link from "next/link";
import { useGetAllSessions } from "../../api/useSessionSummaries";
import useUserInfoByUUID from "../../api/useUserInfoById";

const SessionSummariesOverview = () => {
  const { data: sessions } = useGetAllSessions();
  console.log(sessions);
  return (
    <div className="flex w-[70vw] flex-col place-items-center text-xs">
      <div className=" w-full rounded-md bg-zinc-900 p-2 font-titan text-lg font-thin text-zinc-300">
        Sessions in Queue
      </div>
      <div className=" no-scrollbar flex h-[35vh] w-full flex-col gap-1 overflow-y-scroll bg-zinc-900 bg-opacity-70">
        {sessions?.data
          ?.filter((s) => s.status !== "Reviewed")
          ?.map((s) => (
            <SessionDisplay key={s.srcid} s={s} />
          ))}
      </div>
      <div className="mt-[2.5vh] w-full rounded-md bg-zinc-900 bg-opacity-70 p-2 font-titan text-lg font-thin text-zinc-300">
        Reviewed
      </div>
      <div className="no-scrollbar flex h-[35vh] w-full flex-col gap-1 overflow-y-scroll bg-zinc-900 bg-opacity-70">
        {sessions?.data
          ?.filter((s) => s.status === "Reviewed")
          ?.map((s) => (
            <SessionDisplay s={s} />
          ))}
      </div>
    </div>
  );
};

export default SessionSummariesOverview;

const SessionDisplay = ({ s }) => {
  const { data: u } = useUserInfoByUUID(s.user_id);
  return (
    <div className="flex gap-2">
      <Link
        href={`/admin/sessionReview/${s?.sessionid}`}
        className="mt-2 flex w-full place-content-center place-items-center justify-between gap-2 rounded-md bg-zinc-700 bg-opacity-70 p-1"
      >
        <div className="w-1/3">{s?.name}</div>
        <div className="w-1/3">{s?.sessionDate}</div>
        <div className="flex place-items-center gap-1">
          <div>
            {s?.status === "In Queue" && (
              <div className="h-6 w-6 rounded-full bg-yellow-600" />
            )}
            {s?.status === "In Review" && (
              <div className="h-6 w-6 rounded-full bg-orange-600" />
            )}
            {s?.status === "Reviewed" && (
              <div className="h-6 w-6 rounded-full bg-emerald-600" />
            )}
          </div>
          <div>
            <img
              alt={"userProfile image"}
              className="h-6 w-6 rounded-full"
              src={
                u?.profilePic !== null
                  ? `/${u?.uuid}/${u?.profilePic}`
                  : `./noimg.jpeg`
              }
            />
          </div>
        </div>
      </Link>
      {/* <div
				onClick={() => console.log("delete", s)}
				className='font-tian flex place-content-center place-items-center text-xl text-red-500'>
				x
			</div> */}
    </div>
  );
};
