import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import ReactPlayer from "react-player";
import { MdClose } from "../../../data/icons/MdIcons";
import { useSessionSummariesStore } from "./SessionSummaryStore";

const SessionSourceDisplay = ({ source, mirrored }) => {
  const vidsrcRegex = /(^(\w+).*\.com\/watch\?v=)|(^(\w+.*)\/videos\/)/g;
  const vidRef = useRef<ReactPlayer>();
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
  useEffect(() => console.log(vidRef?.current), [sessionData, vidRef]);
  useEffect(() => {
    setCurrentTime(seekTime);
    //@ts-ignore
    vidRef?.current?.seekTo(seekTime);
  }, [seekTime]);
  let colors = ["bg-teal-300", "bg-emerald-300", "bg-indigo-300", "bg-sky-300"];
  let activeWidth = `${(
    ((parseFloat(clipData.endTime.toString()) -
      parseFloat(clipData.startTime.toString())) /
      vidRef.current?.getDuration()) *
    100
  ).toFixed(2)}%`;
  let activeLeft = `${(
    (parseInt(clipData.startTime.toString()) / vidRef?.current?.getDuration()) *
    100
  ).toFixed(2)}%`;

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
          <div className="absolute top-[-35vh] left-[15vw] w-[70vw] md:top-[-15vh]">
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
                style={{ transform: mirrored ? "rotateY(180deg)" : "" }}
                config={{ facebook: { appId: "508164441188790" } }}
                id={"video"}
                controls={true}
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
                  max={vidRef?.current?.getDuration()}
                  className={`w-[70vw] bg-transparent`}
                />

                <div id="sessionTimelineDisplay" className=" w-full">
                  {sessionData &&
                    sessionData.map((e, i) => {
                      return (
                        e.vidsrc === vidsrc && (
                          <SessionDataDetails
                            source={source}
                            id="sesionDataDetails"
                            key={`${e.id}+ 'data'`}
                            e={e}
                            i={i}
                            duration={vidRef.current?.getDuration()}
                          />
                        )
                      );
                    })}
                  <div
                    style={{
                      width: activeWidth,

                      left: activeLeft,
                    }}
                    id={`activeSessionClip'`}
                    key={`activeSessionClip'`}
                    className={`absolute top-[4px] h-3 rounded-md bg-teal-300  `}
                  ></div>
                </div>
              </div>
              <div className="neumorphicIn flex w-full gap-2 rounded-md p-2 text-zinc-300">
                {clipCombo.map((item, index) => (
                  <span
                    key={item.trick_id}
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

const SessionDataDetails = ({ e, i, id, duration, source }) => {
  const [seeDetails, setSeeDetails] = useState(false);
  const clipData = useSessionSummariesStore((s) => s.clipData);
  const vidsrc = useSessionSummariesStore((s) => s.vidsrc);
  const setClipComboRaw = useSessionSummariesStore((s) => s.setClipComboRaw);
  const setClipData = useSessionSummariesStore((s) => s.setClipData);
  const setSrcid = useSessionSummariesStore((s) => s.setSrcid);
  const clearClipCombo = useSessionSummariesStore((s) => s.clearClipCombo);

  const removeSessionData = useSessionSummariesStore(
    (s) => s.removeSessionData
  );
  useEffect(() => {
    setSrcid(source?.srcid);
  }, [source, vidsrc]);
  let w = `${(
    ((parseInt(e.endTime) - parseInt(e.startTime)) / parseInt(duration)) *
    100
  ).toFixed(2)}%`;
  let l = `${((parseInt(e.startTime) / parseInt(duration)) * 100).toFixed(0)}%`;
  return (
    <>
      {seeDetails && (
        <div
          style={{ width: "fit", left: l }}
          key={`${e.trick_id}detaildropdown`}
          className="absolute top-[20px] flex rounded bg-zinc-900 bg-opacity-40 p-2"
        >
          <div className="flex h-full flex-col gap-1 text-sm">
            <div className=" ">{e.name}</div>
            <div className="flex justify-between">
              <div className="bg-emerald-300 p-1 text-zinc-800 ">
                {e.startTime}
              </div>
              <div className="bg-red-300 p-1 text-zinc-800 ">{e.endTime}</div>
            </div>
            <div className=" ">{e.admin}</div>
          </div>
          {/* <div className=' '>{e.takeoffStance}</div>
					<div className=' '>{e.landingStance}</div>
					<div className=' '>{e.base_id}</div> */}
        </div>
      )}
      <div
        key={`${e.id}+${Math.random()}`}
        onClick={() => {
          setSrcid(source.srcid);
          setClipData(e);
          clearClipCombo();
          setClipComboRaw(e.clipLabel);
          removeSessionData(e);
        }}
        onMouseOver={() => setSeeDetails(true)}
        onMouseLeave={() => setSeeDetails(false)}
        style={{ width: w, left: l }}
        className={`absolute top-[4px] h-3 rounded-md bg-indigo-300 `}
      ></div>
    </>
  );
};
