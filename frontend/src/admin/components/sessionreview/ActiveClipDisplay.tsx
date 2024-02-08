import useClickOutside from "@hooks/useClickOutside";
import useScreenOrientation from "@hooks/UseScreenOrientaion";
import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useRef, useState } from "react";
import { useSessionSummariesStore } from "./SessionSummaryStore";
import * as d3 from "d3";
const ActiveClipDisplay = () => {
  const activeClipData = useSessionSummariesStore((s) => s.clipData);
  const currentTime = useSessionSummariesStore((s) => s.currentTime);
  const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
  const sessionData = useSessionSummariesStore((s) => s.sessionData);
  const clipCombo = useSessionSummariesStore((s) => s.clipCombo);
  const vidDuration = useSessionSummariesStore((s) => s.vidDuration);
  const clipDetailsVisible = useSessionSummariesStore(
    (s) => s.clipDetailsVisible
  );
  const setClipDetailsVisible = useSessionSummariesStore(
    (s) => s.setClipDetailsVisible
  );
  const closeClipDetailsVisible = useSessionSummariesStore(
    (s) => s.closeClipDetailsVisible
  );
  const orientation = useScreenOrientation();
  const showDetails = useSpring({
    from: { spanOpacity: 1, opacity: 0, width: "0px" },
    to: {
      spanOpacity: !clipDetailsVisible ? 1 : 1,
      opacity: clipDetailsVisible ? 0 : 1,
      left: clipDetailsVisible ? "0px" : "-10px",
      width: !clipDetailsVisible
        ? orientation === "landscape"
          ? "19vw"
          : "80vw"
        : "0vw",
    },
    delay: 100,
    config: { tension: 280, friction: 40 },
    // onRest: () => setOpenHamburger(!openHamburger),
  });

  const [percent, setPercent] = useState(
    (sessionData?.reduce((sum, b) => sum + (b.endTime - b.startTime), 0) /
      vidDuration) *
      100
  );
  useEffect(() => {
    setPercent(
      (sessionData?.reduce((sum, b) => sum + (b.endTime - b.startTime), 0) /
        vidDuration) *
        100
    );
  }, [sessionData]);

  const frame = ((currentTime % 1) * 60).toFixed(0);
  const startframe = (((activeClipData?.startTime || 0) % 1) * 60).toFixed(0);
  const endframe = (((activeClipData?.endTime || 0) % 1) * 60).toFixed(0);
  const ref = useClickOutside(() => closeClipDetailsVisible());
  return (
    <>
      <animated.div
        ref={ref}
        id="activeClipDisplay"
        key={activeClipData?.id + "details"}
        style={{
          // right: showDetails.right,
          width: showDetails.width,
        }}
        className={`absolute left-0 top-0 z-[100] flex h-full w-full flex-col gap-2 rounded-md rounded-r-none bg-zinc-900 bg-opacity-60 p-1  font-inter text-xs text-zinc-300 backdrop-blur-xl`}
      >
        <animated.div
          className="flex h-full flex-col gap-2 pt-8"
          style={{
            display: clipDetailsVisible ? "none" : "flex",
          }}
        >
          <div
            onClick={() => closeClipDetailsVisible()}
            id="progressBar"
            className="h-fit min-h-[2rem] w-full"
          >
            <p className="w-full text-center">percentage reviewed</p>
            <ProgressBar percent={percent} />
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

          <div className="no-scrollbar flex h-full flex-col overflow-y-scroll">
            {sessionData?.map((e, i) => (
              <SessionDataDetailDislpay key={e.id + e.name} e={e} />
            ))}
          </div>
        </animated.div>

        {/* <div className="absolute left-[0px] top-0 h-[20px] w-full " /> */}
      </animated.div>
      {/* {orientation === "landscape" && (
        <animated.span
          onClick={() => {
            setClipDetailsVisible();
          }}
          style={{ opacity: showDetails.spanOpacity }}
          className="absolute left-1 top-1 z-[10] rounded-xl bg-zinc-800 p-2"
        >
          Details
        </animated.span>
      )} */}
    </>
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

const ProgressBar = ({ percent }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (percent && d3Container.current) {
      const svg = d3.select(d3Container.current);
      svg.selectAll("*").remove(); // Clear svg content before adding new elements
      // Set dimensions
      const width = 192;
      const height = 20;

      // Append a rectangle and fill it based on the percent value

      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#eee");

      svg
        .append("rect")
        .attr("width", (width * percent) / 100)
        .attr("height", height)
        .attr("fill", () => {
          if (percent > 65.0) {
            return "#0f4";
          } else {
            return "steelblue";
          }
        });
    }
  }, [percent]);

  return (
    <svg
      className="d3-component w-full rounded-md py-1"
      width="100%"
      height="20"
      ref={d3Container}
    />
  );
};
