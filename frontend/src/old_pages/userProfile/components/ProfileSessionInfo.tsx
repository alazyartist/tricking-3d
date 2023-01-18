import { useSessionSummariesStore } from "@admin/components/sessionreview/SessionSummaryStore";
import UpdateComboShorthand from "@components/UpdateComboShorthand";
import useIsAdmin from "hooks/useIsAdmin";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const ProfileSessionInfo = ({ summary }) => {
  const isAdmin = useIsAdmin();
  const [editShorthand, setEditShorthand] = useState(false);
  const [showTrickLongform, setShowTrickLongform] = useState(false);
  return (
    <div className=" ">
      <div className="flex gap-2">
        <div
          onClick={() => {
            if (isAdmin === true) {
              setEditShorthand(!editShorthand);
            }
          }}
          className="sticky top-0 flex w-fit place-items-center gap-2 rounded-md bg-zinc-900 bg-opacity-90 p-2 text-2xl"
        >
          {summary?.name}
          {editShorthand && (
            <span className="text-[12px] text-purple-500">
              Editing Shorthand
            </span>
          )}
        </div>
        <div
          onClick={() => setShowTrickLongform((prev) => !prev)}
          className={`flex place-items-center p-1 text-center text-[8px] leading-none ${
            showTrickLongform ? "text-emerald-300" : "text-zinc-300"
          }`}
        >
          show <br />
          {showTrickLongform ? "shorthand" : "fullname"}
        </div>
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
          <DataDetails
            showTrickLongForm={showTrickLongform}
            editShorthand={editShorthand}
            key={d.id}
            d={d}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSessionInfo;

const DataDetails = ({ d, editShorthand, showTrickLongForm }) => {
  // console.log(d);
  const currentTime = useSessionSummariesStore((s) => s.currentTime);
  const setShorthand = useSessionSummariesStore((s) => s.setShorthand);
  const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
  const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
  const clearClipCombo = useSessionSummariesStore((s) => s.clearClipCombo);
  const setClipComboRaw = useSessionSummariesStore((s) => s.setClipComboRaw);
  const [shorthandOpen, setShorthandOpen] = useState(false);
  const [loopMe, setLoopMe] = useState(false);

  useEffect(() => {
    if (Math.floor(currentTime) === Math.floor(d.clipEnd) && loopMe) {
      console.log(d);
      setSeekTime(0);
      setSeekTime(Math.floor(d.clipStart));
    }
  }, [currentTime]);
  useEffect(() => {
    if (Math.floor(d.clipStart) === Math.floor(currentTime)) {
      setClipComboRaw(d.ClipLabel.comboArray);
      setShorthand(d.ClipLabel.shorthand);
    }
  }, [currentTime, d]);
  const handleClick = () => {
    clearClipCombo();
    setVidsrc(d.SessionSource.vidsrc);
    setClipComboRaw(d.ClipLabel.comboArray);
    setSeekTime(d.clipStart);
    setLoopMe((prev) => !prev);
  };
  return (
    <>
      <div
        className="flex place-items-center justify-between rounded-md bg-zinc-900 bg-opacity-90 p-1 text-sm text-zinc-300 md:text-inherit"
        onClick={() =>
          editShorthand ? setShorthandOpen(!shorthandOpen) : handleClick()
        }
      >
        <div className="no-scrollbar w-[164px] overflow-x-scroll whitespace-nowrap p-1 text-[12px] md:w-1/3">
          {showTrickLongForm
            ? d?.ClipLabel?.name
            : d?.ClipLabel?.shorthand ?? d.ClipLabel?.name}
        </div>
        <div className="flex gap-1">
          {d.ClipLabel.comboArray.map((trick) => (
            <div>
              <div>{trick.name}</div>
              <div>{trick.pointValue}</div>
            </div>
          ))}
        </div>
        {/* <div className='w-1/3 '>{d?.SessionSource?.vidsrc}</div> */}
        <div className="w-4/9 flex place-items-center gap-2">
          <div className="flex min-w-[22px] place-items-center  text-lg font-black">
            {d?.ClipLabel?.pointValue?.toFixed(2)}
          </div>
          <div className="flex place-items-center rounded-md bg-zinc-900 bg-opacity-40 p-1 text-xs">
            <div className="min-w-[48px] rounded-md text-center text-zinc-300">
              {d?.clipStart}
            </div>
            {!loopMe && <div className="whitespace-nowrap">--&gt;</div>}
            {loopMe && <div className="whitespace-nowrap">↶</div>}
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
