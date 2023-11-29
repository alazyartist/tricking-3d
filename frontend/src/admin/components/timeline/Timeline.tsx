import React, { useEffect, useRef, useState } from "react";
import { DragBounds, useGesture } from "@use-gesture/react";
import { useSessionSummariesStore } from "../../components/sessionreview/SessionSummaryStore";
import { animated, useSpring } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { createPortal } from "react-dom";

const useZoom = (vidRef) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [timelineRef, bounds] = useMeasure();
  const [tickAmt, setTickAmt] = useState(5);
  const [timelineOffset, setTimelineOffset] = useState(0);
  const odur = vidRef?.current?.getDuration();
  const dur = odur / Math.max(zoomLevel, 1);

  const zoomControllerWidth = (dur / odur) * bounds.width;

  useEffect(() => {
    if (zoomLevel === 1) {
      setTimelineOffset(0);
      setTickAmt(5);
    }
    console.log(bounds.width);

    if (bounds.width - timelineOffset < zoomControllerWidth && zoomLevel > 1) {
      setTimelineOffset(
        (prev) => prev + (bounds.width - timelineOffset - zoomControllerWidth)
      );
    }

    if (zoomLevel === 3) {
      setTickAmt(2.5);
    }
    if (zoomLevel > 3) {
      setTickAmt(1);
    }
    if (zoomLevel < 3) {
      setTickAmt(5);
    }
  }, [zoomLevel]);

  return {
    zoomLevel,
    setZoomLevel,
    timelineRef,
    bounds,
    timelineOffset,
    tickAmt,
    setTimelineOffset,
    odur,
    dur,
  };
};

const Timeline = ({ vidRef, source }) => {
  const clipData = useSessionSummariesStore((s) => s.clipData);
  const sessionData = useSessionSummariesStore((s) => s.sessionData);
  const vidsrc = useSessionSummariesStore((s) => s.vidsrc);
  const {
    zoomLevel,
    setZoomLevel,
    timelineRef,
    bounds,
    timelineOffset,
    setTimelineOffset,
    tickAmt,
    odur,
    dur,
  } = useZoom(vidRef);

  const adjustedValue = (timelineOffset / bounds.width) * odur;
  let activeWidth = `${(
    ((parseFloat((clipData?.endTime as number).toString()) -
      parseFloat((clipData?.startTime as number).toString())) /
      dur) *
    100
  ).toFixed(2)}%`;
  let activeLeft = `${
    (((clipData?.startTime as number) - adjustedValue) / dur) * 100
  }%`;
  return (
    <div className="relative w-[70vw] ">
      <div className="absolute -left-[4rem] h-20 w-[3rem]">
        <p
          className="m-1 w-full rounded-md bg-zinc-600 text-center"
          onClick={() => setZoomLevel((z) => z + 1)}
        >
          +
        </p>
        <p className="w-full text-center">{zoomLevel}</p>
        <p
          className="m-1 w-full rounded-md bg-zinc-600 text-center"
          onClick={() => setZoomLevel((z) => (z - 1 > 1 ? z - 1 : 1))}
        >
          -
        </p>
      </div>
      <div
        id="timeline-container"
        className="noTouch relative w-full overflow-hidden"
      >
        <CurrentTimeDiplay
          adjustedValue={adjustedValue}
          dur={dur}
          vidRef={vidRef}
        />
        <div className="noTouch z-[-1] h-4 w-full touch-none" />
        <VideoTicks
          bounds={bounds}
          odur={odur}
          tickAmt={tickAmt}
          timelineOffset={timelineOffset}
          zoomLevel={zoomLevel}
        />
        <ZoomController
          timelineOffset={timelineOffset}
          setTimelineOffset={setTimelineOffset}
          dur={dur}
          odur={odur}
          bounds={bounds}
        />
        <div
          ref={timelineRef}
          id="sessionTimelineDisplay"
          className="noTouch z-[20] w-full "
        >
          {sessionData &&
            sessionData.map((e, i) => {
              return (
                e.vidsrc === vidsrc && (
                  <TimelineElement
                    adjustedValue={adjustedValue}
                    zoomLevel={zoomLevel}
                    offset={timelineOffset}
                    timelineWidth={bounds.width}
                    source={source}
                    id="sesionDataDetails"
                    key={`${e.id}+ 'data'`}
                    e={e}
                    i={i}
                    sd={sessionData}
                    duration={dur}
                  />
                )
              );
            })}
          <div
            style={{
              width: activeWidth,

              left: activeLeft,
            }}
            id={`active_video_element'`}
            key={`activeSessionClip'`}
            className={`noTouch absolute top-[4px] h-3 rounded-md bg-teal-300  `}
          ></div>
        </div>
      </div>
    </div>
  );
};

const VideoTicks = ({ odur, tickAmt, bounds, zoomLevel, timelineOffset }) => {
  const ticks = Math.floor(odur / tickAmt);

  const tickWidth = (bounds.width / ticks) * zoomLevel;

  return (
    <div className="noTouch absolute top-[.25rem] flex h-[3.5rem] w-fit touch-none gap-2">
      {Array.from({ length: ticks - 1 }).map((_, i) => (
        <div
          key={`tick${i}`}
          style={{
            left: `${(i + 1) * tickWidth - timelineOffset * zoomLevel}px`,
            height: `${i % 5 == 0 ? "3.5rem" : ".5rem"}`,
          }}
          className="noTouch videoTicks touch-none"
        />
      ))}
    </div>
  );
};
const CurrentTimeDiplay = ({ adjustedValue, dur, vidRef }) => {
  const currentTime = useSessionSummariesStore((s) => s.currentTime);
  const setCurrentTime = useSessionSummariesStore((s) => s.setCurrentTime);

  return (
    <input
      id={`${
        currentTime < adjustedValue || currentTime > dur + adjustedValue
          ? "sessionSummary2"
          : "sessionSummary"
      }`}
      type="range"
      step={0.001}
      onChange={(e) => {
        console.log(e.target.value);
        setCurrentTime(parseFloat(e.target.value));
        vidRef.current.seekTo(parseFloat(e.target.value));
      }}
      value={currentTime}
      min={Math.max(0, 0 + adjustedValue)}
      //@ts-ignore
      max={dur + adjustedValue}
      className={`noTouch w-[70vw] touch-none bg-transparent`}
    />
  );
};
const ZoomController = ({
  dur,
  odur,
  bounds,
  setTimelineOffset,
  timelineOffset,
}) => {
  const percent = (dur / odur) * bounds.width;
  const boundref = useRef(null!);
  const bind = useGesture(
    {
      onDrag: ({ offset: [ox, oy], last, first, _bounds }) => {
        if (first) {
        }
        setTimelineOffset(ox);
      },
    },
    {
      drag: {
        axis: "x",
        preventDefault: true,
        bounds: boundref as DragBounds, // Adjust the timeline width accordingly
      },
    }
  );
  return (
    <div
      ref={boundref}
      className="noTouch relative h-[2rem] w-full touch-none bg-transparent"
    >
      <div
        {...bind()}
        style={{
          width: `${percent}px`,
          left: `${Math.max(0, timelineOffset)}px`,
        }}
        className={`noTouch absolute -top-[.125rem] z-[100] h-[2.25rem] cursor-pointer touch-none rounded-sm bg-zinc-400 p-2`}
      ></div>
    </div>
  );
};

const TimelineElement = ({
  e,
  i,
  id,
  duration,
  source,
  timelineWidth,
  sd,
  offset,
  adjustedValue,
  zoomLevel,
}) => {
  const [seeDetails, setSeeDetails] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const vidsrc = useSessionSummariesStore((s) => s.vidsrc);
  const setSrcid = useSessionSummariesStore((s) => s.setSrcid);
  const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
  const updateSessionData = useSessionSummariesStore(
    (s) => s.updateSessionData
  );

  const dragBounds = useRef<HTMLElement>(null!);
  useEffect(() => {
    //@ts-ignoreF
    dragBounds.current = document.getElementById("sessionTimelineDisplay");
  }, [dragBounds]);
  // const dragBounds = useRef(document.getElementById("sessionTimelineDisplay"));
  const adjustFinalPosition = (newElement) => {
    for (const s of sd) {
      let offset;
      let durr = newElement.endTime - newElement.startTime;
      let sdurr = s.endTime - s.startTime;
      const frame = 1 / 30;

      if (newElement.id !== s.id) {
        // Check if the new element's start time is within the range of the existing element
        if (
          newElement.startTime >= s.startTime &&
          newElement.startTime <= s.endTime
        ) {
          offset = newElement.startTime - s.startTime;
          console.log("startTime", offset, durr);
          return {
            ...newElement,
            startTime: s.endTime + frame,
            endTime: s.endTime + frame + durr,
          }; // There is an overlap
        }
        // Check if the new element's end time is within the range of the existing element
        if (
          newElement.endTime >= s.startTime &&
          newElement.endTime <= s.endTime
        ) {
          offset = newElement.endTime - s.endTime;
          console.log("endTime", offset, durr);
          return {
            ...newElement,
            startTime: newElement.startTime - offset - sdurr,
            endTime: newElement.endTime - offset - sdurr,
          }; // There is an overlap
        }
        // Check if the existing element is completely within the range of the new element
        if (
          s.startTime >= newElement.startTime &&
          s.endTime <= newElement.endTime
        ) {
          offset = Math.max(
            newElement.endTime - s.endTime,
            newElement.startTime - s.startTime
          );
          console.log("contained", offset, durr);
          return {
            ...newElement,
            startTime: s.endTime + frame,
            endTime: s.endTime + frame + durr,
          }; // There is an overlap
        }
        // Check if the existing element completely encompasses the new element
        if (
          s.startTime <= newElement.startTime &&
          s.endTime >= newElement.endTime
        ) {
          offset = s.startTime - newElement.startTime;
          console.log("encompassing", offset, durr);
          return {
            ...newElement,
            startTime: newElement.startTime + offset + durr,
            endTime: newElement.endTime + offset + durr,
          }; // There is an overlap
        }
      }
    }

    return newElement;
  };

  useEffect(() => {
    setSrcid(source?.srcid);
  }, [source, vidsrc]);
  const offsetTime = (offset / timelineWidth) * duration;
  let w =
    ((parseFloat(e.endTime) - parseFloat(e.startTime)) / parseFloat(duration)) *
    100;
  let l = ((e.startTime - offsetTime * zoomLevel) / parseFloat(duration)) * 100;
  const [props, api] = useSpring(() => ({
    from: {
      w: w,
      l: l,
      y: 0,
      x: 0,
    },
    config: { tension: 222, friction: 22 },
  }));
  //needed to initialize video elements
  let isSet = false;
  useEffect(() => {
    if (isSet === false) {
      api.set({ w: w, l: l });
      isSet = true;
    }
  }, [l, w]);
  let lastTap = Date.now();
  const bind = useGesture(
    {
      onDrag: ({ movement: [ox, oy], last, xy: [x, y], tap }) => {
        if (tap) {
          let thisTap = Date.now();
          if (thisTap - lastTap < 600) {
            // setIsLocked((prev) => !prev);
            setSeeDetails((prev) => !prev);
            api.set({ y: y });
          }
          lastTap = thisTap;
        }

        if (isLocked) return;
        api.start({ x: ox });
        if (last) {
          const frame = 1 / 30;
          const dragPercent = (ox / timelineWidth) * 100;
          const newStartTime = parseFloat(
            (((dragPercent + l) / 100) * duration).toFixed(2)
          );
          const newEndTime = parseFloat(
            (((dragPercent + l + w) / 100) * duration).toFixed(2)
          );

          const newElement = {
            id: e.id,
            startTime: newStartTime + adjustedValue + frame,
            endTime: newEndTime + adjustedValue + frame,
          };
          const adjustedElement = adjustFinalPosition(newElement);

          api.set({ x: 0 });
          updateSessionData({
            ...e,
            startTime: adjustedElement.startTime,
            endTime: adjustedElement.endTime,
          });
          setSeekTime(adjustedElement.startTime);
        }
      },
      // onMouseOver: () => setSeeDetails(true),
      // onMouseLeave: () => setSeeDetails(false),

      // onDoubleClick: () => {
      //   setIsLocked((prev) => !prev);
      // },
      onContextMenu: ({ event }) => {
        event.preventDefault();
        console.log(e);
        setSeeDetails((prev) => !prev);
      },
    },
    {
      drag: {
        axis: "x",
        preventDefault: true,
        bounds: dragBounds as DragBounds, // Adjust the timeline width accordingly
        filterTaps: true,
      },
    }
  );

  return (
    <>
      {seeDetails &&
        createPortal(
          <animated.div
            className="relative left-[2.5vw] top-4 z-[100] flex w-[95vw] rounded bg-zinc-900 bg-opacity-90 p-2 text-zinc-300"
            style={{
              // left: props.l.to((left) => `${left + 5}%`),
              //top from last mouse position
              top: props.y.to((y) => `${y}px`),
              width: "fit",
              // x: props.x.to((x) => `${x}px`),
            }}
            key={`${e.trick_id} detaildropdown`}
          >
            <div className="flex h-full cursor-pointer flex-col gap-2 text-sm">
              <div className="" onClick={() => setSeeDetails(false)}>
                Clip menu
              </div>
              <div className=" border-b-2 border-zinc-100"></div>
              <div className=" ">{e.name}</div>
              <div
                onClick={() => {
                  setIsLocked((l) => !l);
                  setSeeDetails(false);
                }}
                className=" "
              >
                {isLocked ? "Unlock" : "Lock"}
              </div>
              {/* <div className="flex justify-between">
                <div className="bg-emerald-300 p-1 text-zinc-800 ">
                  {e.startTime}
                </div>
                <div className="bg-red-300 p-1 text-zinc-800 ">{e.endTime}</div>
              </div> */}
              {/* <div className=" ">{e.admin}</div> */}
            </div>
            {/* <div className=' '>{e.takeoffStance}</div>
                      <div className=' '>{e.landingStance}</div>
                      <div className=' '>{e.base_id}</div> */}
          </animated.div>,
          document.getElementById("portal-root")
        )}
      <animated.div
        {...bind()}
        id={"video_element"}
        key={`${e.id}+${Math.random()}`}
        // onClick={() => {
        //   // setSrcid(source.srcid);
        //   // setClipData(e);
        //   // clearClipCombo();
        //   // setClipComboRaw(e.clipLabel);
        //   // removeSessionData(e);
        //   console.log(e.startTime);
        //   setSeekTime(e.startTime);
        // }}

        className={`absolute top-[.25rem] h-[3.5rem] cursor-grab touch-none rounded-sm border-[1px] border-zinc-900 ${
          isLocked ? "bg-indigo-600" : "bg-indigo-300"
        } `}
        style={{
          left: props.l.to((left) => `${left}%`),
          width: props.w.to((width) => `${width}%`),
          x: props.x.to((x) => `${x}px`),
        }}
      ></animated.div>
    </>
  );
};

export default Timeline;
