import { stances, transitions, tricks } from "@prisma/client";
import { useUserStore } from "@store/userStore";
import React, { useEffect, useState } from "react";
import { useSessionSummariesStore } from "./SessionSummaryStore";
import { v4 as uuidv4 } from "uuid";
import useScreenOrientation from "@hooks/UseScreenOrientaion";
const SelectTrickPopupCommandBar = ({ allTricks }) => {
  const [currentFilter, setCurrentFilter] = useState("");
  const comboPopoverStyle = `no-scrollbar  bottom-[10vh] left-[5vw] z-[20] flex h-full w-full max-w-[90vw] lg:max-w-[40vw] justify-around flex-wrap place-items-center place-content-start gap-2 overflow-y-scroll rounded-xl bg-zinc-900 bg-opacity-80 p-4 backdrop-blur-md`;
  const newCombo = useSessionSummariesStore((s) => s.clipCombo);

  const orientation = useScreenOrientation();
  const lastItem = newCombo[newCombo.length - 1];
  const stances = allTricks?.filter((trick) => trick.type === "Stance");
  const tricks = allTricks?.filter((trick) => trick.type === "Trick");
  const transitions = allTricks?.filter((trick) => trick.type === "Transition");
  const findStanceLeg = (curStance) => {
    const fullStance = stances?.find((s) => s.name === curStance) as stances;
    const leg = fullStance?.leg;
    return leg;
  };
  console.log(currentFilter, lastItem, newCombo);
  useEffect(() => {
    if (newCombo.length > 0) {
      if (lastItem?.type === "Transition") {
        let leg = (lastItem as transitions)?.toLeg;
        setCurrentFilter(leg);
      } else if (lastItem?.type === "Trick") {
        let leg = findStanceLeg((lastItem as tricks)?.landingStance);
        setCurrentFilter(leg);
      }
    }
  }, [lastItem]);
  //   console.log(newCombo);

  return (
    <>
      <PopupCommands orientation={orientation} />
      {newCombo?.length > 0 && lastItem?.type !== "Trick" && (
        <div className={comboPopoverStyle}>
          <TrickButtons
            tricks={tricks}
            findStanceLeg={findStanceLeg}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
        </div>
      )}
      {lastItem?.type !== "Transition" && (
        <div className={comboPopoverStyle}>
          {!lastItem && (
            <TransitionControls
              orientation={orientation}
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
            />
          )}
          <TransitionButtons
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            transitions={transitions}
          />
        </div>
      )}
    </>
  );
};

export default SelectTrickPopupCommandBar;
const TransitionControls = ({
  currentFilter,
  setCurrentFilter,
  orientation,
}) => {
  return (
    <div
      className={`flex w-full justify-between gap-2 ${
        orientation === "landscape" ? "flex-col" : ""
      }`}
    >
      <p
        onClick={() => setCurrentFilter("Left")}
        className={`flex-grow rounded-md bg-zinc-200 bg-opacity-20 p-2 text-center ${
          currentFilter === "Left"
            ? "bg-zinc-200 bg-opacity-50"
            : "text-zinc-400"
        }`}
      >
        Left
      </p>
      <p
        onClick={() => setCurrentFilter("Right")}
        className={`flex-grow rounded-md bg-zinc-200 bg-opacity-20 p-2 text-center ${
          currentFilter === "Right"
            ? "bg-zinc-200 bg-opacity-50"
            : "text-zinc-400"
        }`}
      >
        Right
      </p>
      <p
        onClick={() => setCurrentFilter("Both")}
        className={`flex-grow rounded-md bg-zinc-200 bg-opacity-20 p-2 text-center ${
          currentFilter === "Both"
            ? "bg-zinc-200 bg-opacity-50"
            : "text-zinc-400"
        }`}
      >
        Both
      </p>
    </div>
  );
};
const TransitionButtons = ({
  transitions,
  currentFilter,
  setCurrentFilter,
}) => {
  const setCurrentItem = useSessionSummariesStore((s) => s.setClipCombo);
  const filteredTransitions = transitions?.filter((trick) =>
    currentFilter ? trick.fromLeg === currentFilter : trick
  );
  return currentFilter ? (
    filteredTransitions.map((transition) => (
      <div
        className="flex w-fit max-w-[50vw] flex-grow flex-col justify-between rounded-md bg-zinc-600 bg-opacity-10 p-2 text-center"
        onClick={() => {
          setCurrentItem(transition);
          setCurrentFilter(transition.toLeg);
        }}
        key={transition.id + "transition"}
      >
        <div>{transition.name}</div>
        <div className="flex w-full  justify-around gap-2 pt-2 text-xs">
          {/* <div className="w-[37px] rounded-md bg-zinc-700 p-1">
                  {transition.fromLeg}
                </div> */}
          <div className="w-[37px] rounded-md bg-zinc-700 p-1">
            {transition.toLeg}
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="whitespace-nowrap">Select a Leg</p>
  );
};

const TrickButtons = ({
  tricks,
  findStanceLeg,
  currentFilter,
  setCurrentFilter,
}) => {
  const setTrickMakerOpen = useSessionSummariesStore(
    (s) => s.setTrickMakerOpen
  );
  const newCombo = useSessionSummariesStore((s) => s.clipCombo);
  const setCurrentItem = useSessionSummariesStore((s) => s.setClipCombo);
  const inverts = tricks
    ?.filter((trick) => trick.trickType === "Invert")
    ?.filter(
      (trick) =>
        newCombo.length > 0 &&
        findStanceLeg(trick.takeoffStance) === currentFilter
    )

    .sort((a, b) => a.displayName.localeCompare(b.displayName));
  const kicks = tricks
    ?.filter((trick) => trick.trickType === "Kick")
    ?.filter(
      (trick) =>
        newCombo.length > 0 &&
        findStanceLeg(trick.takeoffStance) === currentFilter
    )
    .sort((a, b) => a?.displayName?.localeCompare(b?.displayName));
  const handleSetItem = (trick) => {
    setCurrentItem(trick);
    let stance = findStanceLeg(trick.landingStance);
    setCurrentFilter(stance);
  };
  console.log(tricks, inverts, kicks, currentFilter, newCombo);
  return (
    <>
      {inverts?.map((trick) => (
        <div
          className="flex w-fit place-items-center gap-2 rounded-md bg-zinc-600 bg-opacity-10 p-2 text-center hover:bg-zinc-700"
          onClick={() => {
            handleSetItem(trick);
          }}
          key={trick.trick_id + "invert"}
        >
          <p>{trick.displayName}</p>
        </div>
      ))}
      {kicks?.map((trick) => (
        <div
          className="flex w-fit place-items-center gap-2 rounded-md bg-zinc-600 bg-opacity-10 p-2 text-center hover:bg-zinc-700"
          onClick={() => {
            handleSetItem(trick);
          }}
          key={trick.trick_id + "kick"}
        >
          <p className="h-fit w-fit place-self-center rounded-md bg-zinc-700 px-1">
            {trick.takeoffStance[0]}
          </p>
          <p>{trick.displayName}</p>
        </div>
      ))}
      <div className="w-fit rounded-md bg-zinc-600 bg-opacity-60 p-2 text-center text-zinc-200 hover:bg-zinc-700">
        <button onClick={() => setTrickMakerOpen(true)}>Make Trick</button>
      </div>
    </>
  );
};

const PopupCommands = ({ orientation }) => {
  const newCombo = useSessionSummariesStore((s) => s.clipCombo);

  const removeClipFromCombo = useSessionSummariesStore(
    (s) => s.removeClipfromCombo
  );
  const setTrickPopupVisible = useSessionSummariesStore(
    (s) => s.setTrickPopupVisible
  );
  const { uuid: adminuuid } = useUserStore((s) => s.userInfo);
  const setClipData = useSessionSummariesStore((s) => s.setClipData);
  const setSessionData = useSessionSummariesStore((s) => s.setSessionData);
  const clearClipCombo = useSessionSummariesStore((s) => s.clearClipCombo);
  const handleAdd = () => {
    let combo = useSessionSummariesStore.getState().clipCombo;
    let name = combo.map((c) => c.name).join(">");
    setClipData({
      id: uuidv4(),
      admin: adminuuid as string,
      clipLabel: combo,
      name: name,
      sessionid: useSessionSummariesStore.getState().sessionid,
      srcid: useSessionSummariesStore.getState().srcid,
      vidsrc: useSessionSummariesStore.getState().vidsrc as string,
    });
    setSessionData(useSessionSummariesStore.getState().clipData);
    setClipData({
      name: "",
      startTime: 0,
      endTime: 0,
      clipLabel: [],
      srcid: "",
      vidsrc: "",
      bail: 0,
    });
    clearClipCombo();
    setTrickPopupVisible();
  };
  return (
    <div
      className={` ${
        orientation === "landscape"
          ? "flex flex-col place-content-start"
          : "grid h-fit grid-cols-3 place-content-center justify-around"
      } h-fit  w-full  place-items-center  gap-2`}
    >
      <button
        onClick={() => setTrickPopupVisible()}
        className="h-fit w-full  rounded-md border-[1px] border-b-2 border-zinc-100 border-opacity-30 p-1 text-center"
      >
        Commands
      </button>
      <button
        onClick={() => removeClipFromCombo(newCombo.length - 1)}
        className="h-fit w-full  rounded-md border-[1px] border-b-2 border-zinc-100 border-opacity-30 p-1 text-center"
      >
        Delete
      </button>
      <button
        disabled={newCombo.length <= 1}
        onClick={() => handleAdd()}
        className="h-fit w-full  rounded-md border-[1px] border-b-2 border-zinc-100 border-opacity-30 p-1 text-center"
      >
        Add
      </button>
      <PlayControls orientation={orientation} />
    </div>
  );
};

const PlayControls = ({ orientation }) => {
  const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
  const vidIsPlaying = useSessionSummariesStore((s) => s.vidIsPlaying);
  const setVidIsPlaying = useSessionSummariesStore((s) => s.setVidIsPlaying);
  const frameRate = 0.083;

  const controls = [
    {
      title: "<",
      command: () => {
        setSeekTime(
          useSessionSummariesStore.getState().currentTime - frameRate
        );
      },
    },
    {
      title: vidIsPlaying ? "pause" : "play",
      command: () => setVidIsPlaying(),
    },

    {
      title: ">",
      command: () => {
        setSeekTime(
          useSessionSummariesStore.getState().currentTime + frameRate
        );
      },
    },
  ];

  return (
    <div
      className={`flex h-fit w-full gap-2 ${
        orientation === "landscape" ? "" : "col-span-3"
      }`}
    >
      {controls.map((n) => (
        <button
          key={n.title}
          onClick={n.command}
          className={`h-fit w-full rounded-md border-[1px] border-b-2 border-zinc-100 border-opacity-30 p-1 text-center`}
        >
          {n.title}
        </button>
      ))}
    </div>
  );
};
