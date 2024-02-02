import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
import { DragBounds, useGesture } from "@use-gesture/react";
import { useSessionSummariesStore } from "../../components/sessionreview/SessionSummaryStore";
import { animated, SpringValue, useSpring } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { createPortal } from "react-dom";
import adjustFinalPosition from "./AdjustFinalPostion";
import useScreenOrientation from "@hooks/UseScreenOrientaion";
import { type } from "os";

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
  const boundref = useRef(null!);
  const boundwidth = boundref?.current?.getBoundingClientRect().width;

  const adjustedValue = (timelineOffset / boundwidth) * odur;
  const offsetTime = (timelineOffset / bounds.width) * dur;

  const orientation = useScreenOrientation();
  let activeWidth = `${(
    ((clipData?.endTime - clipData?.startTime) / dur) *
    100
  ).toFixed(2)}%`;
  let activeLeft = `${((clipData?.startTime - adjustedValue) / dur) * 100}%`;
  return (
    <div className="relative w-[80vw] ">
      {/* <div className="absolute -left-[4rem] h-20 w-[3rem]">
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
      </div> */}
      <div
        id="timeline-container"
        className="noTouch relative w-full overflow-hidden"
      >
        <CurrentTimeDiplay
          zoomLevel={zoomLevel}
          offsetTime={offsetTime}
          adjustedValue={adjustedValue}
          dur={dur}
          vidRef={vidRef}
        />
        {/* <div className="noTouch z-[-1] h-4 w-full touch-none" /> */}
        <VideoTicks
          adjustedValue={adjustedValue}
          bounds={bounds}
          odur={odur}
          tickAmt={tickAmt}
          timelineOffset={timelineOffset}
          zoomLevel={zoomLevel}
        />
        {orientation === "landscape" ? (
          createPortal(
            <div className="absolute bottom-2 right-0 z-[100] w-[19vw]">
              <ZoomController
                timelineOffset={timelineOffset}
                setTimelineOffset={setTimelineOffset}
                dur={dur}
                odur={odur}
                bounds={bounds}
                boundwidth={boundwidth}
                zoomLevel={zoomLevel}
                setZoomLevel={setZoomLevel}
                ref={boundref}
              />
            </div>,
            document.getElementById("portal-root")
          )
        ) : (
          <ZoomController
            timelineOffset={timelineOffset}
            setTimelineOffset={setTimelineOffset}
            dur={dur}
            odur={odur}
            bounds={bounds}
            boundwidth={boundwidth}
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
            ref={boundref}
          />
        )}
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

const VideoTicks = ({
  odur,
  tickAmt,
  bounds,
  zoomLevel,
  timelineOffset,
  adjustedValue,
}) => {
  const ticks = Math.floor(odur / tickAmt);

  const tickWidth = (bounds.width / ticks) * zoomLevel;
  const tickOffset = (adjustedValue / odur) * bounds.width * zoomLevel;

  return (
    <div className="noTouch absolute top-[.25rem] flex h-[3rem] w-fit touch-none gap-2">
      {Array.from({ length: ticks - 1 }).map((_, i) => (
        <div
          key={`tick${i}`}
          style={{
            transform: `translateX(${-tickOffset}px)`,
            left: `${(i + 1) * tickWidth}px`,
            height: `${i % 5 == 0 ? "2.5rem" : ".5rem"}`,
          }}
          className="noTouch videoTicks touch-none"
        />
      ))}
    </div>
  );
};
const CurrentTimeDiplay = ({
  adjustedValue,
  dur,
  vidRef,
  offsetTime,
  zoomLevel,
}) => {
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
        setCurrentTime(parseFloat(e.target.value));
        vidRef.current.seekTo(parseFloat(e.target.value));
      }}
      value={currentTime}
      min={Math.max(0, 0 + adjustedValue)}
      //@ts-ignore
      max={dur + adjustedValue}
      className={`noTouch w-[80vw] touch-none bg-transparent`}
    />
  );
};
type ZoomControllerProps = {
  dur: number;
  odur: number;
  bounds: any;
  boundwidth: number;
  setTimelineOffset: React.Dispatch<React.SetStateAction<number>>;
  timelineOffset: number;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
};
const ZoomController = forwardRef<HTMLDivElement, ZoomControllerProps>(
  (
    {
      dur,
      odur,
      bounds,
      boundwidth,
      setTimelineOffset,
      timelineOffset,
      zoomLevel,
      setZoomLevel,
    },
    boundref
  ) => {
    const percent = (dur / odur) * boundwidth;
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
      <div className="grid grid-cols-[1fr_8fr_1fr] gap-1">
        <button
          className="w-full rounded-md bg-zinc-600 p-1 text-center"
          onClick={() => setZoomLevel((z) => (z - 1 > 1 ? z - 1 : 1))}
        >
          -
        </button>
        {/* <p className="w-full text-center">{zoomLevel}</p> */}
        <div
          ref={boundref}
          className="noTouch grid-span-8 relative h-[2rem] w-full touch-none bg-transparent"
        >
          <div
            {...bind()}
            style={{
              width: `${percent}px`,
              left: `${Math.max(0, timelineOffset)}px`,
            }}
            className={`noTouch absolute -top-[.125rem] z-[100] h-[2.25rem] w-full cursor-pointer touch-none rounded-sm bg-zinc-400 p-2`}
          ></div>
        </div>
        <button
          className="w-full rounded-md bg-zinc-600 p-1 text-center"
          onClick={() => setZoomLevel((z) => z + 1)}
        >
          +
        </button>
      </div>
    );
  }
);

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
  const [isLocked, setIsLocked] = useState(true);
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

  useEffect(() => {
    setSrcid(source?.srcid);
  }, [source, vidsrc]);
  const offsetTime = (offset / timelineWidth) * duration;

  let w =
    ((parseFloat(e.endTime) - parseFloat(e.startTime)) / parseFloat(duration)) *
    100;
  let l = ((e.startTime - adjustedValue) / parseFloat(duration)) * 100;
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
      onDrag: ({ movement: [ox, oy], last, xy: [x, y], tap, target }) => {
        if (tap) {
          let thisTap = Date.now();
          if (thisTap - lastTap < 600) {
            // setIsLocked((prev) => !prev);
            setSeeDetails((prev) => !prev);
            api.set({ y: y - 155 });
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
          // let newElement = {};
          // if (target) {
          //   const targetcontainer = (
          //     target as HTMLElement
          //   )?.getBoundingClientRect();
          //   // console.log(x, targetcontainer.x + targetcontainer.width / 2);
          //   if (x > targetcontainer.x + targetcontainer.width / 2) {
          //     newElement = {
          //       id: e.id,
          //       startTime: e.startTime,
          //       endTime: newEndTime + adjustedValue + frame,
          //     };
          //   } else if (x < targetcontainer.x + targetcontainer.width / 2) {
          //     newElement = {
          //       id: e.id,
          //       startTime: newStartTime + adjustedValue + frame,
          //       endTime: e.endTime,
          //     };
          //   }
          // }
          const adjustedElement = adjustFinalPosition(newElement, sd);

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
        console.log(event);
        api.set({ y: event.clientY - 155 });
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
          <ClipMenu
            setIsLocked={setIsLocked}
            setSeeDetails={setSeeDetails}
            isLocked={isLocked}
            e={e}
            props={props}
          />,
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
        //   setSeekTime(e.startTime);
        // }}

        className={`absolute top-[.25rem] h-[2.5rem] cursor-grab touch-none rounded-sm border-[1px] border-zinc-900 ${
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

type ClipMenuProps = {
  e: any;
  props: {
    w: SpringValue<number>;
    l: SpringValue<number>;
    y: SpringValue<number>;
    x: SpringValue<number>;
  };
  isLocked: boolean;
  setSeeDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
};

const ClipMenu = ({
  e,
  setSeeDetails,
  setIsLocked,
  props,
  isLocked,
}: ClipMenuProps) => {
  const clearClipCombo = useSessionSummariesStore((s) => s.clearClipCombo);
  const removeSessionData = useSessionSummariesStore(
    (s) => s.removeSessionData
  );
  const setClipData = useSessionSummariesStore((s) => s.setClipData);
  const setClipComboRaw = useSessionSummariesStore((s) => s.setClipComboRaw);

  const handleEdit = () => {
    setClipData(e);
    clearClipCombo();
    setClipComboRaw(e.clipLabel);
    removeSessionData(e);
  };

  return (
    <>
      <animated.div
        className="absolute left-[2.5vw] top-4 z-[2022] flex w-[95vw] rounded bg-zinc-900 bg-opacity-90 p-2 text-zinc-300 md:left-[25vw] md:w-[50vw]"
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
          <div className=" border-b-[2px] border-zinc-100 border-opacity-30"></div>
          <div className={`${!e?.name ? "text-red-500" : ""}`}>
            {e?.name ? e.name : "Unnamed"}
          </div>
          <button
            onClick={() => {
              setIsLocked((l) => !l);
              setSeeDetails(false);
            }}
            className=" "
          >
            {isLocked ? "Unlock" : "Lock"}
          </button>
          <button onClick={() => handleEdit()}>Edit</button>
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
      </animated.div>
      <div
        className="absolute left-0 top-0 z-[10] h-[100vh] w-[100vw]"
        onClick={() => setSeeDetails(false)}
      />
    </>
  );
};
export default Timeline;
