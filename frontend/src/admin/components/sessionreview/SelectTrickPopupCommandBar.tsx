import { stances } from "@prisma/client";
import { useUserStore } from "@store/userStore";
import React, { useState } from "react";
import { useSessionSummariesStore } from "./SessionSummaryStore";
import { v4 as uuidv4 } from "uuid";
import useScreenOrientation from "@hooks/UseScreenOrientaion";
const SelectTrickPopupCommandBar = ({ allTricks }) => {
  const [activeDropdown, setActiveDropdown] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");
  const comboPopoverStyle = `no-scrollbar  bottom-[10vh] left-[5vw] z-[20] flex h-full w-full max-w-[90vw] lg:max-w-[40vw] justify-around flex-wrap place-items-center place-content-start gap-2 overflow-y-scroll rounded-xl bg-zinc-900 bg-opacity-80 p-4 backdrop-blur-md`;
  const setCurrentItem = useSessionSummariesStore((s) => s.setClipCombo);
  const newCombo = useSessionSummariesStore((s) => s.clipCombo);
  const setTrickPopupVisible = useSessionSummariesStore(
    (s) => s.setTrickPopupVisible
  );
  const { uuid: adminuuid } = useUserStore((s) => s.userInfo);
  const setClipData = useSessionSummariesStore((s) => s.setClipData);
  const setSessionData = useSessionSummariesStore((s) => s.setSessionData);
  const clearClipCombo = useSessionSummariesStore((s) => s.clearClipCombo);
  const setTrickMakerOpen = useSessionSummariesStore(
    (s) => s.setTrickMakerOpen
  );
  const removeClipFromCombo = useSessionSummariesStore(
    (s) => s.removeClipfromCombo
  );
  const orientation = useScreenOrientation();
  const lastItem = newCombo[newCombo.length - 1];
  const stances = allTricks?.filter((trick) => trick.type === "Stance");
  const findStanceLeg = (curStance) => {
    const fullStance = stances?.find((s) => s.name === curStance) as stances;
    const leg = fullStance?.leg;
    return leg;
  };
  //   console.log(newCombo);
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
    <>
      {/* {activeDropdown !== "" && (
        <div
          className="absolute right-[15vw] top-[23vh] text-4xl"
          onClick={() => setActiveDropdown("")}
        >
          <MdClose />
        </div>
      )} */}
      {/* <div className=" flex h-fit w-[98vw]  flex-wrap place-content-center place-items-end gap-2 text-zinc-300"></div> */}
      {/* <div className=" flex h-fit w-[98vw]  flex-wrap place-content-center place-items-end gap-2 text-zinc-300">
        {newCombo?.length <= 0 && (
          <button type="button" onClick={() => setActiveDropdown("Transition")}>
            Setup
          </button>
        )}
        {newCombo?.length > 0 && lastItem?.type !== "Transition" && (
          <button type="button" onClick={() => setActiveDropdown("Transition")}>
            Transition
          </button>
        )}
        {newCombo?.length > 0 && lastItem?.type !== "Trick" && (
          <button type="button" onClick={() => setActiveDropdown("Trick")}>
            Trick
          </button>
        )}
      </div> */}
      <div
        className={` ${
          orientation === "landscape"
            ? "flex flex-col place-content-start"
            : "grid max-h-[9vh] grid-cols-3 place-content-center justify-around"
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
      </div>
      {newCombo?.length > 0 && lastItem?.type !== "Trick" && (
        <div className={comboPopoverStyle}>
          {allTricks
            ?.filter((trick) =>
              newCombo.length > 0
                ? findStanceLeg(trick.takeoffStance) === currentFilter
                : trick
            )
            ?.map((trick) =>
              trick.type === "Trick" ? (
                <div
                  className="w-fit rounded-md bg-zinc-600 bg-opacity-10 p-2 text-center hover:bg-zinc-700"
                  onClick={() => {
                    setCurrentItem(trick);
                    setActiveDropdown("");
                  }}
                  key={trick.trick_id + "trick"}
                >
                  {trick.name}
                </div>
              ) : null
            )}
          <div className="w-fit rounded-md bg-zinc-600 bg-opacity-60 p-2 text-center text-zinc-200 hover:bg-zinc-700">
            <button onClick={() => setTrickMakerOpen(true)}>Make Trick</button>
          </div>
        </div>
      )}
      {lastItem?.type !== "Transition" && (
        <div className={comboPopoverStyle}>
          {!lastItem && (
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
          )}
          {!currentFilter && <p className="whitespace-nowrap">Select a Leg</p>}
          {currentFilter &&
            allTricks
              ?.filter((trick) =>
                currentFilter ? trick.fromLeg === currentFilter : trick
              )
              .map((trick) =>
                trick.type === "Transition" ? (
                  <div
                    className="flex w-fit max-w-[50vw] flex-grow flex-col justify-between rounded-md bg-zinc-600 bg-opacity-10 p-2 text-center"
                    onClick={() => {
                      setCurrentItem(trick);
                      setActiveDropdown("");
                    }}
                    key={trick.id + "transition"}
                  >
                    <div>{trick.name}</div>
                    <div className="flex w-full  justify-between gap-2 pt-2 text-xs">
                      <div className="w-[37px] rounded-md bg-zinc-700 p-1">
                        {trick.fromLeg}
                      </div>
                      <div className="w-[37px] rounded-md bg-zinc-700 p-1">
                        {trick.toLeg}
                      </div>
                    </div>
                  </div>
                ) : null
              )}
        </div>
      )}
    </>
  );
};

export default SelectTrickPopupCommandBar;
