import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  useChangeSessionStatus,
  useChangeSessionStatusById,
  useGetAllSessions,
} from "../../api/useSessionSummaries";
import useUserInfoByUUID from "../../api/useUserInfoById";
import useClickOutside from "hooks/useClickOutside";
import { trpc } from "utils/trpc";

const SessionSummariesOverview = () => {
  const { data: sessions, isFetched } = useGetAllSessions();
  console.log(sessions?.data);
  return (
    <div className="flex w-[90vw] flex-col place-items-center text-xs">
      <div className=" w-full rounded-md bg-zinc-900 p-2 font-titan text-lg font-thin text-zinc-300">
        Sessions in Queue
      </div>
      <div className=" no-scrollbar mt-2 flex h-[35vh] w-full flex-col overflow-y-scroll rounded-md bg-zinc-900 bg-opacity-70">
        {sessions?.data?.filter((s) => s.status !== "Reviewed").length ? (
          sessions?.data
            ?.filter((s) => s.status !== "Reviewed")
            ?.map((s) => <SessionDisplay key={s.srcid} s={s} />)
        ) : (
          <div className="flex h-full w-full flex-col place-content-start place-items-center pt-10">
            <div className="text-xl">Awesome.</div>
            <div className="text-zinc-400">Nothing left to review!</div>
          </div>
        )}
      </div>
      <div className="mt-[2.5vh] w-full rounded-md bg-zinc-900 bg-opacity-70 p-2 font-titan text-lg font-thin text-zinc-300">
        Reviewed
      </div>
      <div className="no-scrollbar mt-2 flex h-[35vh] w-full flex-col overflow-y-scroll rounded-md bg-zinc-900 bg-opacity-70">
        {Array.isArray(sessions?.data) &&
          sessions?.data
            ?.filter((s) => s.status === "Reviewed")
            ?.map((s) => <SessionDisplay key={s.srcid} s={s} />)}
      </div>
    </div>
  );
};

export default SessionSummariesOverview;

const SessionDisplay = ({ s }) => {
  const { data: u } = useUserInfoByUUID(s.user_id);
  const [caretOpen, setCaretOpen] = useState(false);

  return (
    <div className="grid w-full grid-cols-6 gap-2 bg-zinc-800 bg-opacity-70">
      <Link
        href={`/admin/sessionReview/${s?.sessionid}`}
        className=" col-span-5 grid w-full grid-cols-5 place-content-center place-items-center justify-between gap-2 rounded-md p-1 text-[10px] "
      >
        <div className="col-span-2 flex w-full place-items-center gap-1">
          <img
            alt={"userProfile image"}
            className="h-6 w-6 rounded-full"
            src={
              u?.profilePic !== null
                ? `/images/${u?.uuid}/${u?.profilePic}`
                : `./noimg.jpeg`
            }
          />
          <div>{s?.name}</div>
        </div>
        <div className="w-fit text-[8px] text-zinc-400">{s?.sessionDate}</div>
        <div className="w-fit">{s?.type}</div>
        <div className="flex w-full place-content-center place-items-center gap-2">
          <div>
            {s?.status === "In Queue" && (
              <div className="h-4 w-4 rounded-full bg-yellow-600" />
            )}
            {s?.status === "In Review" && (
              <div className="h-4 w-4 rounded-full bg-orange-600" />
            )}
            {s?.status === "Reviewed" && (
              <div className="h-4 w-4 rounded-full bg-emerald-600" />
            )}
          </div>
        </div>
      </Link>
      <div>
        <div
          onClick={() => setCaretOpen((prev) => !prev)}
          className="flex place-content-center place-items-center font-titan text-xl text-zinc-500"
        >
          v
        </div>
        {caretOpen && (
          <OptionDropdown
            caretOpen={caretOpen}
            s={s}
            setCaretOpen={setCaretOpen}
          />
        )}
      </div>
    </div>
  );
};

export const OptionDropdown = ({ caretOpen, setCaretOpen, s }) => {
  const ref = useRef();
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [changeStatusOpen, setChangeStatusOpen] = useState(false);
  const { mutateAsync: changeStatus } = useChangeSessionStatusById(s.sessionid);
  const { mutateAsync: deleteSessionSummary } =
    trpc.sessionsummaries.deleteSessionSummaryById.useMutation();
  let clicked = 0;
  useClickOutside(ref, () => {
    if (clicked > 0) {
      setCaretOpen(false);
    }
    if (ref.current && caretOpen === true) {
      console.log("clickedOutside", clicked);
      clicked++;
    }
  });

  const handleStatusClick = async (status) => {
    console.log("StatusClick", status, s.sessionid);
    setChangeStatusOpen(false);
    setCaretOpen(false);
    changeStatus(status);
  };
  const handleDeleteClick = async () => {
    console.log("Deleteing", s);
    deleteSessionSummary({ sessionid: s.sessionid });
    setDeleteCheck(false);
    setCaretOpen(false);
  };
  return (
    <div
      ref={ref}
      className="absolute top-[12] right-7 rounded-md rounded-tr-none bg-zinc-200 p-2 text-xs text-zinc-800"
    >
      {changeStatusOpen && (
        <div className="grid grid-cols-3 gap-6 p-2">
          <div className="flex flex-col place-content-center place-items-center">
            <div
              onClick={() => handleStatusClick("In Queue")}
              className="h-5 w-5 rounded-full bg-yellow-600"
            />
            <div className="text-center text-[10px]">In Queue</div>
          </div>

          <div className="flex flex-col place-content-center place-items-center">
            <div
              onClick={() => handleStatusClick("In Review")}
              className="h-5 w-5 rounded-full bg-orange-600"
            />
            <div className="text-center text-[10px]">In Review</div>
          </div>

          <div className="flex flex-col place-content-center place-items-center">
            <div
              onClick={() => handleStatusClick("Reviewed")}
              className="h-5 w-5 rounded-full bg-emerald-600"
            />
            <div className="text-center text-[10px]">Reviewed</div>
          </div>
        </div>
      )}
      {deleteCheck && (
        <>
          <div className="p-1">Are you sure you want to delete!</div>
          <div className="flex justify-between">
            <div
              onClick={() => handleDeleteClick()}
              className="rounded-md bg-red-100 px-2 font-medium text-red-900"
            >
              DELETE
            </div>
            <div
              onClick={() => setDeleteCheck(false)}
              className="rounded-md bg-lime-100 px-2 font-bold text-lime-900"
            >
              ABSOLUTELY NOT
            </div>
          </div>
        </>
      )}
      {!deleteCheck && !changeStatusOpen && (
        <>
          <div
            onClick={() => {
              console.log("change", s);
              setChangeStatusOpen(true);
            }}
            className="rounded-md bg-lime-100 p-1 text-lime-900"
          >
            Change Status
          </div>
          <div
            onClick={() => {
              console.log("delete", s);
              setDeleteCheck(true);
            }}
            className="rounded-md bg-red-100 p-1 text-red-900"
          >
            Delete
          </div>
        </>
      )}
    </div>
  );
};
