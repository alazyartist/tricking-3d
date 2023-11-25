import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import ReactPlayer from "react-player";
import { MdClose } from "../../../data/icons/MdIcons";
import { useSessionSummariesStore } from "./SessionSummaryStore";
import { DragBounds, useDrag, useGesture } from "@use-gesture/react";
import useMeasure from "react-use-measure";

const SessionSourceDisplay = ({ source, mirrored }) => {
  const vidsrcRegex = /(^(\w+).*\.com\/watch\?v=)|(^(\w+.*)\/videos\/)/g;
  const vidRef = useRef<ReactPlayer>(null!);
  const seekTime = useSessionSummariesStore((s) => s.seekTime);
  const currentTime = useSessionSummariesStore((s) => s.currentTime);
  const setCurrentTime = useSessionSummariesStore((s) => s.setCurrentTime);
  const clipData = useSessionSummariesStore((s) => s.clipData);
  const setVidIsPlaying = useSessionSummariesStore((s) => s.setVidIsPlaying);
  const vidIsPlaying = useSessionSummariesStore((s) => s.vidIsPlaying);
  const setClipCombo = useSessionSummariesStore((s) => s.setClipCombo);
  const removeClipfromCombo = useSessionSummariesStore(
    (s) => s.removeClipfromCombo
  );

  const sessionData = useSessionSummariesStore((s) => s.sessionData);
  const clipCombo = useSessionSummariesStore((s) => s.clipCombo);
  const vidsrc = useSessionSummariesStore((s) => s.vidsrc);
  const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
  const setSrcid = useSessionSummariesStore((s) => s.setSrcid);
  const detailsVisible = useSessionSummariesStore((s) => s.detailsVisible);
  const setDetailsVisible = useSessionSummariesStore(
    (s) => s.setDetailsVisible
  );
  const [zoomLevel, setZoomLevel] = useState(1);
  // useEffect(() => console.log(vidRef?.current), [sessionData, vidRef]);
  useEffect(() => {
    setCurrentTime(seekTime);
    //@ts-ignore
    vidRef?.current?.seekTo(seekTime);
    // console.log("playerstate", vidRef.current);
  }, [seekTime]);
  const [timelineRef, bounds] = useMeasure();

  let colors = ["bg-teal-300", "bg-emerald-300", "bg-indigo-300", "bg-sky-300"];
  let activeWidth = `${(
    ((parseFloat((clipData?.endTime as number).toString()) -
      parseFloat((clipData?.startTime as number).toString())) /
      vidRef.current?.getDuration()) *
    100
  ).toFixed(2)}%`;
  let activeLeft = `${(
    (parseInt((clipData?.startTime as number).toString()) /
      vidRef?.current?.getDuration()) *
    100
  ).toFixed(2)}%`;
  const [timelineOffset, setTimelineOffset] = useState(0);

  const odur = vidRef?.current?.getDuration();
  const dur = odur / Math.max(zoomLevel, 1);
  const ticks = Math.floor(dur / 5);
  const tickWidth = bounds.width / ticks;
  const showDetails = useSpring<{}>({
    from: { spanOpacity: 1, opacity: 0, left: "-10vw" },
    to: {
      spanOpacity: !detailsVisible ? 1 : 0,
      opacity: detailsVisible ? 1 : 1,
      left: detailsVisible ? "0" : "-122px",
    },
    delay: 100,
    config: { tension: 280, friction: 40 },
    // onRest: () => setOpenHamburger(!openHamburger),
  });
  return (
    <div key={source.srcid + "1"} className="flex flex-col gap-2">
      <animated.div
        style={{ left: showDetails.left, opacity: showDetails.opacity }}
        key={source?.vidsrc.replace(vidsrcRegex, "")}
        className="relative mt-2 flex w-full flex-col gap-4 rounded-md pl-0"
      >
        <div
          className={`rounded-md rounded-l-none ${
            vidsrc === source.vidsrc ? "bg-zinc-900" : "bg-zinc-700"
          }  p-2`}
          onClick={() => setVidsrc(source.vidsrc)}
        >
          {source?.vidsrc.replace(vidsrcRegex, "").slice(0, 11)}
        </div>
      </animated.div>

      {
        vidsrc === source?.vidsrc ? (
          <div className="absolute left-[15vw] top-[-35vh] w-[70vw] md:top-[-15vh]">
            <div className="relative flex max-h-[80vh] flex-col gap-2">
              <div
                className="flex place-items-center gap-2"
                onClick={() => setVidsrc(null)}
              >
                {vidsrc === source?.vidsrc && <MdClose />}{" "}
                {source?.vidsrc.replace(vidsrcRegex, "")}
              </div>
              <ReactPlayer
                ref={vidRef}
                s
                style={{ transform: mirrored ? "rotateY(180deg)" : "" }}
                config={{
                  facebook: { appId: "508164441188790" },
                  youtube: { playerVars: { listType: "user_uploads" } },
                }}
                id={"video"}
                // controls={false}
                playing={vidIsPlaying}
                muted
                width={"70vw"}
                height={"40vw"}
                onReady={() => setSrcid(source?.srcid)}
                onProgress={({ playedSeconds }) =>
                  setCurrentTime(playedSeconds)
                }
                // onPlay={() => handleTimeUpdate()}
                loop
                playsInline
                url={source?.vidsrc}
              />
              <div className="relative w-[70vw]">
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
                <input
                  id="sessionSummary"
                  type="range"
                  step={0.001}
                  onChange={(e) => {
                    setCurrentTime(parseFloat(e.target.value));
                    vidRef.current.seekTo(parseFloat(e.target.value));
                  }}
                  value={currentTime}
                  min={0}
                  //@ts-ignore
                  max={dur}
                  className={` w-[70vw] bg-transparent`}
                />
                <div className="absolute top-[.25rem] flex h-[3.5rem] w-fit touch-none gap-2">
                  {Array.from({ length: ticks - 1 }).map((_, i) => (
                    <div
                      style={{
                        left: `${(i == 0 ? 1 : i + 1) * tickWidth}px`,
                        height: `${i % 5 == 0 ? "3.5rem" : ".5rem"}`,
                      }}
                      className="videoTicks"
                    />
                  ))}
                </div>
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
                  className=" z-[20] w-full"
                >
                  {sessionData &&
                    sessionData.map((e, i) => {
                      return (
                        e.vidsrc === vidsrc && (
                          <TimelineElement
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
                    className={`absolute top-[4px] h-3 rounded-md bg-teal-300  `}
                  ></div>
                </div>
              </div>
              <div className="neumorphicIn no-scrollbar flex w-full gap-2 overflow-x-scroll rounded-md p-2 text-zinc-300">
                {clipCombo.map((item, index) => (
                  <span
                    key={`${item.name} ${Math.random() * 1000}`}
                    onClick={() => {
                      removeClipfromCombo(index);
                    }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null
        // <div
        // 	key={source?.vidsrc.replace(vidsrcRegex, "")}
        // 	className='mt-2 flex w-full flex-col gap-4 rounded-md pl-0'>
        // 	<div
        // 		className='rounded-md rounded-l-none bg-zinc-700 p-2'
        // 		onClick={() => setVidsrc(source.vidsrc)}>
        // 		{source?.vidsrc.replace(vidsrcRegex, "")}
        // 	</div>
        // </div>
      }
    </div>
  );
};

export default SessionSourceDisplay;

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
          console.log(_bounds[0]);
          console.log(_bounds[0][0] + _bounds[0][1]);
          console.log(bounds.width);
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
    <div ref={boundref} className="relative h-[1rem] w-full bg-transparent">
      <div
        {...bind()}
        style={{
          width: `${percent}px`,
          left: `${Math.max(0, timelineOffset)}px`,
        }}
        className={`absolute -top-[.125rem] h-[1.25rem] bg-red-800`}
      >
        {timelineOffset}
      </div>
    </div>
  );
};

const TimelineElement = ({ e, i, id, duration, source, timelineWidth, sd }) => {
  const [seeDetails, setSeeDetails] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const clipData = useSessionSummariesStore((s) => s.clipData);
  const vidsrc = useSessionSummariesStore((s) => s.vidsrc);
  const setClipComboRaw = useSessionSummariesStore((s) => s.setClipComboRaw);
  const setClipData = useSessionSummariesStore((s) => s.setClipData);
  const setSrcid = useSessionSummariesStore((s) => s.setSrcid);
  const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
  const clearClipCombo = useSessionSummariesStore((s) => s.clearClipCombo);
  const updateSessionData = useSessionSummariesStore(
    (s) => s.updateSessionData
  );
  const removeSessionData = useSessionSummariesStore(
    (s) => s.removeSessionData
  );

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
  let w =
    ((parseFloat(e.endTime) - parseFloat(e.startTime)) / parseFloat(duration)) *
    100;
  let l = parseFloat(
    ((parseFloat(e.startTime) / parseFloat(duration)) * 100).toFixed(2)
  );
  const [props, api] = useSpring(() => ({
    w: w,
    l: l,
    x: 0,
  }));
  //needed to initialize video elements
  let isSet = false;
  useEffect(() => {
    if (isSet === false) {
      api.set({ w: w, l: l });
      isSet = true;
    }
  }, [l, w]);

  const bind = useGesture(
    {
      onDrag: ({ movement: [ox, oy], last, first, _bounds }) => {
        if (isLocked) return;
        if (first) {
          console.log(_bounds[0]);
        }
        api.start({ x: ox });
        if (last) {
          console.log(_bounds[0]);
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
            startTime: newStartTime + frame,
            endTime: newEndTime + frame,
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
      onDoubleClick: () => {
        setIsLocked((prev) => !prev);
      },
    },
    {
      drag: {
        axis: "x",
        preventDefault: true,
        bounds: () => ({
          left: -((l / 100) * timelineWidth),
          right: ((100 - l - w) / 100) * timelineWidth,
        }), // Adjust the timeline width accordingly
      },
    }
  );

  return (
    <>
      {seeDetails && (
        <div
          style={{ width: "fit", left: l }}
          key={`${e.trick_id} detaildropdown`}
          className="absolute top-[-24px] flex rounded bg-zinc-900 bg-opacity-40 p-2"
        >
          <div className="flex h-full flex-col gap-1 text-sm">
            <div className=" ">{e.name}</div>
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
        </div>
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

        className={` absolute top-[.25rem] h-[3.5rem] touch-none rounded-sm border-[1px] border-zinc-900 ${
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
