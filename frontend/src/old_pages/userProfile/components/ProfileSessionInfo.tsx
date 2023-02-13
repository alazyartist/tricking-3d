import { useSessionSummariesStore } from "@admin/components/sessionreview/SessionSummaryStore";
import PowerAverageLineChart from "@components/d3/PowerAverageLineChart";
import UpdateComboShorthand from "@components/UpdateComboShorthand";
import Combodex from "@old_pages/combodex/Combodex";
import useIsAdmin from "hooks/useIsAdmin";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosWalk } from "react-icons/io";
import { trpc } from "utils/trpc";

const ProfileSessionInfo = ({ summary }) => {
  const isAdmin = useIsAdmin();
  const [editShorthand, setEditShorthand] = useState(false);
  const [showTrickLongform, setShowTrickLongform] = useState(false);
  return (
    <div className=" ">
      <div className="flex justify-between gap-2">
        <div
          onClick={() => {
            if (isAdmin === true) {
              setEditShorthand(!editShorthand);
            }
          }}
          className="sticky top-0 flex w-fit place-items-center gap-2 rounded-md p-2 text-xl"
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
      <div className="mt-2  flex h-full w-full flex-col gap-1">
        {summary?.SessionData.sort((a, b) => {
          if (a.totalScore > b.totalScore) return -1;
          if (a.totalScore < b.totalScore) return 1;
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
  const [combodexopen, setCombodexopen] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [combodetailsopen, setCombodetailsopen] = useState(false);
  const { data: totalScoreRes, mutateAsync: updateTotalScore } =
    trpc.sessionsummaries.updateTotalScore.useMutation();
  useEffect(() => {
    if (Math.floor(currentTime) === Math.floor(d.clipEnd) && loopMe) {
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
    setSeekTime(parseInt(d.clipStart));
    setLoopMe(true);
  };
  return (
    <>
      <div
        className="flex w-full flex-col place-items-center justify-between rounded-md bg-zinc-900 bg-opacity-90 p-1 text-sm text-zinc-300 md:text-inherit"
        onDoubleClick={() => setLoopMe(false)}
        onClick={() =>
          editShorthand ? setShorthandOpen(!shorthandOpen) : handleClick()
        }
      >
        <div
          onClick={() => setCombodexopen((prev) => !prev)}
          className="grid w-full grid-cols-5 place-items-center justify-between p-1 text-sm text-zinc-300 md:text-inherit"
        >
          <div className="no-scrollbar col-span-3 w-full overflow-x-scroll whitespace-nowrap p-1 text-[12px] md:w-1/3">
            {showTrickLongForm ? (
              <ComboNameDisplay
                setCombodexopen={setCombodexopen}
                combo={d.ClipLabel}
              />
            ) : (
              d?.ClipLabel?.shorthand ?? d.ClipLabel?.name
            )}
          </div>
          <div className="text-xl">...</div>
          <div
            onClick={() => {
              setLoopMe(false);
              console.log(loopMe);
            }}
            className="w-4/9 flex place-items-center gap-2"
          >
            <div className="flex min-w-[22px] place-items-center  text-lg font-black">
              {/* {d?.ClipLabel?.pointValue?.toFixed(2)} */}
              {totalScoreRes?.totalScore
                ? totalScoreRes?.totalScore
                : d?.totalScore
                ? d?.totalScore
                : d?.ClipLabel?.pointValue?.toFixed(2)}
            </div>
            {/* <div className="flex place-items-center rounded-md bg-zinc-900 bg-opacity-40 p-1 text-xs">
            <div className="min-w-[48px] rounded-md text-center text-zinc-300">
              {d?.clipStart}
            </div>
            <div className="min-w-[48px] rounded-md  text-center text-zinc-300">
            {d?.clipEnd}
            </div>
          </div> */}
            {loopMe ? (
              <div className="z-100 whitespace-nowrap">↶</div>
            ) : (
              <div className="whitespace-nowrap">--&gt;</div>
            )}
          </div>
        </div>
        <div
          className="h-[30px] w-full"
          onClick={() => setCombodexopen((prev) => !prev)}
        >
          <PowerAverageLineChart data={d.ClipLabel.comboArray} />
        </div>
        {combodexopen && (
          <>
            {/* <ComboDetailsDisplay
              setCombodexopen={setCombodexopen}
              combo={d.ClipLabel}
            />
            <button
              onClick={() => setCombodexopen(true)}
              className="outlineButton m-1 border-[1px] border-zinc-200 p-1"
            >
              Full Breakdown{" "}
            </button> */}
            <Combodex
              combo={d.ClipLabel}
              sessionData={d}
              setCombodexopen={setCombodexopen}
              updateTotalScore={updateTotalScore}
              totalScoreRes={totalScoreRes}
            />
          </>
        )}
      </div>
      {shorthandOpen && (
        <UpdateComboShorthand setShorthandOpen={setShorthandOpen} combo={d} />
      )}
    </>
  );
};

const ComboNameDisplay = ({ combo, setCombodexopen }) => {
  return (
    <div className="flex w-full gap-0">
      {combo.comboArray?.map((t, i) => {
        return (
          <div className="flex place-items-center">
            <span
              className={`p-1 ${t.type === "Transition" ? "text-[8px]" : ""} `}
            >{`${t.name} `}</span>
            <span>{`${combo.comboArray?.length !== i && ">"}`}</span>
          </div>
        );
      })}
    </div>
  );
};

export const ComboDetailsDisplay: React.FC<any> = ({
  combo,
  setCombodexopen,
}) => {
  return (
    <div
      // onClick={() => setCombodexopen(true)}
      className="no-scrollbar flex w-full gap-1 overflow-y-scroll pb-1 pl-1"
    >
      {combo.comboArray.map((trick) => {
        return (
          <div className="flex flex-col place-items-center gap-1 whitespace-nowrap rounded-md bg-zinc-200 bg-opacity-20 p-1">
            <div>{trick.name}</div>
            <div className="text-[8px]">{trick.type}</div>
            <div className="flex place-content-center place-items-center gap-2">
              <div>{trick.pointValue}</div>
              {trick.defaultAnimation && (
                <IoIosWalk className="text-emerald-500" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
