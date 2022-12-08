import { useSessionSummariesStore } from "@admin/components/sessionreview/SessionSummaryStore";
import UpdateComboShorthand from "@components/UpdateComboShorthand";
import useIsAdmin from "hooks/useIsAdmin";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const ProfileSessionInfo = ({ summary }) => {
  const isAdmin = useIsAdmin();
  const [editShorthand, setEditShorthand] = useState(false);
  return (
    <div className=" ">
      <div
        onClick={() => {
          isAdmin ? setEditShorthand(!editShorthand) : null;
        }}
        className="sticky top-0 z-20 flex w-fit place-items-center gap-2 rounded-md bg-zinc-900 bg-opacity-90 p-2 text-2xl"
      >
        {summary?.name}
        {editShorthand && <FaCheck className={"fill-emerald-500"} />}
      </div>
      <div className="mt-2  flex flex-col gap-1">
        {summary?.SessionData.sort((a, b) => {
          if (a.ClipLabel.pointValue > b.ClipLabel.pointValue) return -1;
          if (a.ClipLabel.pointValue < b.ClipLabel.pointValue) return 1;
          if (a.SessionSource?.vidsrc < b.SessionSource?.vidsrc) return -1;
          if (a.SessionSource?.vidsrc > b.SessionSource?.vidsrc) return 1;
          if (a.clipStart > b.clipStart) return 1;
          if (a.clipStart < b.clipStart) return -1;

          return 0;
        }).map((d) => (
          <DataDetails editShorthand={editShorthand} key={d.id} d={d} />
        ))}
      </div>
    </div>
  );
};

export default ProfileSessionInfo;

const DataDetails = ({ d, editShorthand }) => {
  // console.log(d);
  const currentTime = useSessionSummariesStore((s) => s.currentTime);
  const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
  const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
  const clearClipCombo = useSessionSummariesStore((s) => s.clearClipCombo);
  const setClipComboRaw = useSessionSummariesStore((s) => s.setClipComboRaw);
  const [shorthandOpen, setShorthandOpen] = useState(false);

  useEffect(() => {
    if (Math.floor(d.clipStart) === Math.floor(currentTime)) {
      setClipComboRaw(d.ClipLabel.comboArray);
    }
  }, [currentTime, d]);
  const handleClick = () => {
    clearClipCombo();
    setVidsrc(d.SessionSource.vidsrc);
    setClipComboRaw(d.ClipLabel.comboArray);
    setSeekTime(d.clipStart);
  };
  return (
    <>
      <div
        className="flex place-items-center justify-between rounded-md bg-zinc-900 bg-opacity-90 p-1 text-sm text-zinc-300 md:text-inherit"
        onClick={() =>
          editShorthand ? setShorthandOpen(!shorthandOpen) : handleClick()
        }
      >
        <div className="no-scrollbar w-[175px] overflow-x-scroll whitespace-nowrap p-1 text-[12px] md:w-1/3">
          {d?.ClipLabel.shorthand ?? d?.ClipLabel?.name}
        </div>
        {/* <div className='w-1/3 '>{d?.SessionSource?.vidsrc}</div> */}
        <div className="w-4/9 flex place-items-center gap-4">
          <div className="flex min-w-[22px] place-items-center  text-xl font-black">
            {d?.ClipLabel?.pointValue}
          </div>
          <div className="flex place-items-center rounded-md bg-zinc-900 bg-opacity-40 p-1">
            <div className="min-w-[48px] rounded-md  text-center text-zinc-300">
              {d?.clipStart}
            </div>
            <div className="whitespace-nowrap">--&gt;</div>
            <div className="min-w-[48px] rounded-md  text-center text-zinc-300">
              {d?.clipEnd}
            </div>
          </div>
        </div>
      </div>
      {shorthandOpen && (
        <UpdateComboShorthand setShorthandOpen={setShorthandOpen} combo={d} />
      )}
    </>
  );
};
