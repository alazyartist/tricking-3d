import React, { useRef, useState } from "react";
import Link from "next/link";

import useClickOutside from "hooks/useClickOutside";
import { trpc } from "utils/trpc";
import * as d3 from "d3";
import type { FindAllUsers, GetAllSessionSummaries } from "types/trpc";

const SessionSummariesOverview = () => {
  const { data: sessions } =
    trpc.sessionsummaries.getAllSessionSummaries.useQuery();

  return (
    <div className="flex w-[90vw] flex-col place-items-center text-xs">
      <h1 className=" w-full rounded-md bg-zinc-900 p-2 font-titan text-lg font-thin text-zinc-300">
        Sessions in Queue
      </h1>
      <div className=" no-scrollbar mt-2 flex h-[35vh] w-full flex-col overflow-y-scroll rounded-md bg-zinc-900 bg-opacity-70">
        {Array.isArray(sessions) &&
        sessions?.filter((s) => s.status !== "Reviewed").length ? (
          sessions
            ?.filter((s) => s.status !== "Reviewed")
            ?.map((s) => <SessionDisplay key={s.sessionid} s={s} />)
        ) : (
          <div className="flex h-full w-full flex-col place-content-start place-items-center pt-10">
            <h2 className="text-xl">Awesome.</h2>
            <p className="text-zinc-400">Nothing left to review!</p>
          </div>
        )}
      </div>
      <h1 className="mt-[2.5vh] w-full rounded-md bg-zinc-900 bg-opacity-70 p-2 font-titan text-lg font-thin text-zinc-300">
        Reviewed
      </h1>
      <div className="no-scrollbar mt-2 flex h-[35vh] w-full flex-col overflow-y-scroll rounded-md bg-zinc-900 bg-opacity-70">
        {Array.isArray(sessions) &&
          sessions
            ?.filter((s) => s.status === "Reviewed")
            ?.map((s) => <SessionDisplay key={s.sessionid} s={s} />)}
      </div>
    </div>
  );
};

export default SessionSummariesOverview;

const SessionDisplay = ({ s }: { s: GetAllSessionSummaries[0] }) => {
  const { data: u } = trpc.userDB.findByUUID.useQuery({ userid: s.user_id });
  const { data: users } = trpc.userDB.findAll.useQuery();

  const [caretOpen, setCaretOpen] = useState(false);

  return (
    <div className="grid w-full grid-cols-7 place-content-center place-items-center gap-2 bg-zinc-800 bg-opacity-70">
      <Link
        href={`/admin/sessionReview/${s?.sessionid}`}
        className=" col-span-5 grid w-full grid-cols-5 place-content-center place-items-center justify-between gap-2 rounded-md p-1 text-[10px] "
      >
        <div className="col-span-3 flex w-full place-items-center gap-1">
          {/* <img
            alt={"userProfile image"}
            className="h-6 w-6 rounded-full"
            src={
              u?.profilePic !== null
                ? `/images/${u?.uuid}/${u?.profilePic}`
                : `./noimg.jpeg`
            }
          /> */}
          <div
            key={u?.uuid}
            className="flex flex-col place-items-center
            "
          >
            <div
              style={{
                backgroundColor: d3.interpolateRainbow(
                  (u?.id % 15) / users?.length
                ),
              }}
              className={`relative h-5 w-5 rounded-full`}
            >
              <img
                src={
                  !u?.profilePic
                    ? `/images/noimg.jpeg`
                    : `/images/${u?.uuid}/${u?.profilePic}`
                }
                alt={"profilePic"}
                className={`h-5 w-5 rounded-full ${
                  !u?.profilePic ? " mix-blend-multiply contrast-150" : ""
                }`}
              />
            </div>
          </div>
          <p>{s?.name}</p>
        </div>
        <div className="col-span-2">
          <p className="text-[8px]">{u?.username.slice(0, 19)}</p>
          <p className="w-fit text-[8px] text-zinc-400">{s?.sessionDate}</p>
        </div>
        {/* <p className="w-fit">{s?.type}</p> */}
      </Link>
      <div className="col-span-2 flex gap-2">
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
        <div>
          <button
            type="button"
            onClick={() => setCaretOpen((prev) => !prev)}
            className="flex place-content-center place-items-center font-inter text-lg text-zinc-500"
          >
            v
          </button>
          {caretOpen && (
            <OptionDropdown
              users={users}
              caretOpen={caretOpen}
              key={`option ${s.sessionid}`}
              s={s}
              setCaretOpen={setCaretOpen}
            />
          )}
        </div>
        <Link
          className={"flex content-center items-center"}
          href={`/admin/clipBreakdown/${s.sessionid}`}
        >
          clip
        </Link>
      </div>
    </div>
  );
};

export const OptionDropdown = ({
  caretOpen,
  setCaretOpen,
  s,
  users,
}: {
  caretOpen: boolean;
  setCaretOpen: React.Dispatch<React.SetStateAction<boolean>>;
  s: GetAllSessionSummaries[0];
  users: FindAllUsers;
}) => {
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [changeStatusOpen, setChangeStatusOpen] = useState(false);
  const [switchUserOpen, setSwitchUserOpen] = useState(false);

  const { mutateAsync: changeStatus } =
    trpc.sessionsummaries.updateSessionStatus.useMutation();
  const { mutateAsync: deleteSessionSummary } =
    trpc.sessionsummaries.deleteSessionSummaryById.useMutation();
  let clicked = 0;
  const ref = useClickOutside(() => {
    if (clicked > 0) {
      setCaretOpen(false);
    }
    if (ref.current && caretOpen === true) {
      clicked++;
    }
  });

  const handleStatusClick = async (status) => {
    setChangeStatusOpen(false);
    setCaretOpen(false);
    changeStatus({ sessionid: s.sessionid, status: status });
  };
  const handleDeleteClick = async () => {
    deleteSessionSummary({ sessionid: s.sessionid });
    setDeleteCheck(false);
    setCaretOpen(false);
  };
  return (
    <div
      ref={ref}
      className="absolute right-7 top-[12] max-h-[200px] max-w-[85vw] overflow-hidden overflow-y-scroll rounded-md rounded-tr-none bg-zinc-200 p-2 text-xs text-zinc-800"
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
      {switchUserOpen && (
        <SwitchUsers
          users={users}
          setCaretOpen={setCaretOpen}
          setSwitchUserOpen={setSwitchUserOpen}
          s={s}
        />
      )}
      {!deleteCheck && !changeStatusOpen && !switchUserOpen && (
        <>
          <div
            onClick={() => {
              setSwitchUserOpen(true);
            }}
            className="rounded-md bg-sky-100 p-1 text-sky-900"
          >
            Switch User
          </div>
          <div
            onClick={() => {
              setChangeStatusOpen(true);
            }}
            className="rounded-md bg-lime-100 p-1 text-lime-900"
          >
            Change Status
          </div>
          <div
            onClick={() => {
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

const SwitchUsers = ({ s, setSwitchUserOpen, setCaretOpen, users }) => {
  // const { data: users } = trpc.userDB.findAll.useQuery();
  const { mutateAsync: switchUser } =
    trpc.sessionsummaries.updateSessionSummaryOwner.useMutation();
  const handleSwitch = (user) => {
    switchUser({ sessionid: s.sessionid, user_id: user.uuid });
    setSwitchUserOpen(false);
    setCaretOpen(false);
  };
  return (
    <div className="grid grid-cols-4 gap-4">
      {users?.length &&
        users?.map((user) => {
          return (
            <div
              key={user?.uuid}
              onClick={() => handleSwitch(user)}
              className="flex flex-col place-items-center
            "
            >
              <div
                style={{
                  backgroundColor: d3.interpolateRainbow(
                    (user?.id % 15) / users.length
                  ),
                }}
                className={`relative h-5 w-5 rounded-full`}
              >
                <img
                  src={
                    !user?.profilePic
                      ? `/images/noimg.jpeg`
                      : `/images/${user?.uuid}/${user?.profilePic}`
                  }
                  alt={"profilePic"}
                  className={`h-5 w-5 rounded-full ${
                    !user?.profilePic ? " mix-blend-multiply contrast-150" : ""
                  }`}
                />
              </div>
              <p className="text-xs">{user.username}</p>
            </div>
          );
        })}
    </div>
  );
};
