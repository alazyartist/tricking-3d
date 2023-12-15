import { animated, useSpring } from "@react-spring/web";
import React, { useEffect } from "react";
import { useSessionSummariesStore } from "./SessionSummaryStore";

const ActiveClipDisplay = () => {
  const activeClipData = useSessionSummariesStore((s) => s.clipData);
  const currentTime = useSessionSummariesStore((s) => s.currentTime);
  const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
  const sessionData = useSessionSummariesStore((s) => s.sessionData);
  const clipCombo = useSessionSummariesStore((s) => s.clipCombo);

  const clipDetailsVisible = useSessionSummariesStore(
    (s) => s.clipDetailsVisible
  );
  const setClipDetailsVisible = useSessionSummariesStore(
    (s) => s.setClipDetailsVisible
  );
  const showDetails = useSpring({
    from: { spanOpacity: 1, opacity: 0, right: "-10vw", width: "0px" },
    to: {
      spanOpacity: !clipDetailsVisible ? 1 : 1,
      opacity: clipDetailsVisible ? 0 : 1,
      // right: clipDetailsVisible ? "0" : "-200px",
      width: !clipDetailsVisible ? "220px" : "10px",
    },
    delay: 100,
    config: { tension: 280, friction: 40 },
    // onRest: () => setOpenHamburger(!openHamburger),
  });

  // useEffect(
  //   () => console.log(activeClipData, "activeClip"),
  //   [activeClipData, sessionData]
  // );
  const frame = ((currentTime % 1) * 60).toFixed(0);
  const startframe = (((activeClipData?.startTime || 0) % 1) * 60).toFixed(0);
  const endframe = (((activeClipData?.endTime || 0) % 1) * 60).toFixed(0);
  useEffect(() => {
    let element = document.getElementById("commandBar-root");
    if (element) {
      //translate element by showDetails.width
      if (parseInt(showDetails.width.get().replace("px", "")) > 100) {
        element.classList.add("hidden");
      } else {
        element.classList.remove("hidden");
      }
    }
  }, [showDetails]);
  return (
    <animated.div
      key={activeClipData?.id + "details"}
      style={{
        // right: showDetails.right,
        width: showDetails.width,
      }}
      className="absolute right-2 top-14 z-[100] flex h-[92.5vh] w-[220px] flex-col gap-2 rounded-md rounded-r-none bg-zinc-900 bg-opacity-60 p-1 pl-6 font-inter text-xs text-zinc-300 backdrop-blur-xl"
    >
      <animated.div
        className="flex h-full flex-col gap-2"
        style={{
          display: clipDetailsVisible ? "none" : "flex",
        }}
      >
        <div id="progressBar" className="h-fit min-h-[2rem] w-full">
          <p className="w-full text-center">percentage reviewed</p>
        </div>
        {/* <div className="w-full overflow-hidden rounded-md rounded-r-sm bg-zinc-200 bg-opacity-70 p-2 text-center font-inter text-2xl font-bold text-zinc-900"></div> */}
        {/* <div>{activeClipData?.name}</div> */}
        {/* <div>{activeClipData?.user_id?.slice(-4)}</div> */}
        <div className="grid h-[2rem] w-full grid-cols-[1fr_1fr_1fr] justify-around gap-2 overflow-hidden pt-2 text-center font-bold">
          <div
            onClick={() => setSeekTime(activeClipData?.startTime as number)}
            className="min-w-10 h-fit place-self-center rounded-md bg-emerald-300 p-1 text-zinc-800"
          >
            {Math.floor(activeClipData?.startTime as number)}|{startframe}
          </div>
          <div className="h-fit w-full place-self-center rounded-md bg-zinc-300 p-1 text-center font-bold text-zinc-800">
            <span>{Math.floor(currentTime)}</span>
            <span>|{frame}</span>
          </div>
          <div
            onClick={() => setSeekTime(activeClipData?.endTime as number)}
            className="min-w-10 h-fit place-self-center rounded-md bg-red-300  p-1 text-zinc-800"
          >
            {Math.floor(activeClipData?.endTime as number)}|{endframe}
          </div>
        </div>

        <div className="minimalistScroll flex h-full flex-col overflow-y-scroll">
          {sessionData?.map((e, i) => (
            <SessionDataDetailDislpay key={e.id + e.name} e={e} />
          ))}
        </div>
      </animated.div>

      <div
        onClick={() => {
          setClipDetailsVisible();
          console.log(activeClipData);
        }}
        className="absolute left-[-4px] h-full w-[25px] "
      />
      <animated.span
        style={{ opacity: showDetails.spanOpacity }}
        className="absolute left-[-11px] top-[4.5vh] -rotate-90"
      >
        Details
      </animated.span>
    </animated.div>
  );
};

export default ActiveClipDisplay;

const SessionDataDetailDislpay = ({ e }) => {
  const clipData = useSessionSummariesStore((s) => s.clipData);
  const vidsrc = useSessionSummariesStore((s) => s.vidsrc);
  const setClipComboRaw = useSessionSummariesStore((s) => s.setClipComboRaw);
  const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
  const setClipData = useSessionSummariesStore((s) => s.setClipData);
  const setSrcid = useSessionSummariesStore((s) => s.setSrcid);
  const clearClipCombo = useSessionSummariesStore((s) => s.clearClipCombo);
  const removeSessionData = useSessionSummariesStore(
    (s) => s.removeSessionData
  );
  const handleEdit = () => {
    setClipData(e);
    clearClipCombo();
    setClipComboRaw(e.clipLabel);
    removeSessionData(e);
  };
  return (
    <div className=" flex gap-1">
      <div
        onClick={() => console.log(e)}
        className="over:bg-zinc-900 relative flex w-full place-content-center place-items-center justify-between gap-1 whitespace-nowrap p-1"
        // transition delay-75 duration-[1400ms] ease-in-out hover:translate-x-[-100%] h
      >
        <button
          type="button"
          onClick={() => setSeekTime(e.startTime)}
          className="no-scrollbar h-full w-full min-w-[40px] overflow-y-scroll rounded-md bg-zinc-800"
        >
          {e.name}
        </button>
        <button
          type={"button"}
          className="rounded-md bg-zinc-800 p-1"
          onClick={() => handleEdit()}
        >
          Edit
        </button>
      </div>
    </div>
  );
};
