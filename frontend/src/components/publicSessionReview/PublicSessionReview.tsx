import React, { useEffect, useMemo, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import ReactPlayer from "react-player";
import { MdClose } from "@data/icons/MdIcons";
import { useSessionSummariesStore } from "@admin/components/sessionreview/SessionSummaryStore";
import RadarChart from "@components/d3/RadarChartAI";
import {
  combos,
  sessiondata,
  sessionsources,
  sessionsummaries,
  transitions,
  tricks,
} from "@prisma/client";
import useScreenOrientation from "@hooks/UseScreenOrientaion";
interface PSRProps {
  source: sessionsources;
  activeSummary: sessionsummaries & {
    SessionData: Array<
      sessiondata & {
        ClipLabel: combos & { comboArray: Array<tricks | transitions> };
        SessionSource: sessionsources;
      }
    >;
  };
  mirrored: boolean;
}
const PublicSessionReview = ({ source, activeSummary, mirrored }: PSRProps) => {
  const vidsrcRegex = /(^(\w+).*\.com\/watch\?v=)|(^(\w+.*)\/videos\/)/g;
  const vidRef = useRef<ReactPlayer>();
  const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
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
  const orientation = useScreenOrientation();
  const clearSessionData = useSessionSummariesStore((s) => s.clearSessionData);
  const setSessionData = useSessionSummariesStore((s) => s.setSessionData);
  const sessionData = useSessionSummariesStore((s) => s.sessionData);
  const clipCombo = useSessionSummariesStore((s) => s.clipCombo);
  const shorthand = useSessionSummariesStore((s) => s.shorthand);
  const vidsrc = useSessionSummariesStore((s) => s.vidsrc);
  const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
  const setSrcid = useSessionSummariesStore((s) => s.setSrcid);
  const detailsVisible = useSessionSummariesStore((s) => s.detailsVisible);
  const setDetailsVisible = useSessionSummariesStore(
    (s) => s.setDetailsVisible
  );
  useEffect(() => {
    clearSessionData();
    activeSummary?.SessionData?.map((sd) => {
      // console.log("sd", sd);
      setSessionData({
        id: sd?.id,
        sessionid: sd?.sessionid,
        name: sd?.ClipLabel?.name,
        startTime: sd?.clipStart,
        endTime: sd?.clipEnd,
        clipLabel: [...sd?.ClipLabel?.comboArray],
        shorthand: sd?.ClipLabel.shorthand,
        srcid: sd?.srcid,
        vidsrc: sd?.SessionSource?.vidsrc,
        bail: sd?.bail,
      });
      return;
    });
  }, [activeSummary]);
  // console.log("PublicSessionReview"); RERUNNING NEEDS OPTIMIZATION
  //ISSUE IS currentTime variable. try to extract elsewhere
  useEffect(() => {
    if (currentTime !== seekTime && seekTime !== 0) {
      setCurrentTime(seekTime);
      vidRef?.current?.seekTo(seekTime);
      setSeekTime(0);
    }
    //@ts-ignore
    setVidIsPlaying(true);
  }, [seekTime]);
  // let colors = ["bg-teal-300", "bg-emerald-300", "bg-indigo-300", "bg-sky-300"];
  // let activeWidth = `${(
  //   ((parseFloat(clipData.endTime.toString()) -
  //     parseFloat(clipData.startTime.toString())) /
  //     vidRef.current?.getDuration()) *
  //   100
  // ).toFixed(2)}%`;
  // let activeLeft = `${(
  //   (parseInt(clipData.startTime.toString()) / vidRef?.current?.getDuration()) *
  //   100
  // ).toFixed(2)}%`;

  const showDetails = useSpring<{}>({
    from: { spanOpacity: 1, opacity: 0, left: "-10vw" },
    to: {
      spanOpacity: !detailsVisible ? 1 : 0,
      opacity: detailsVisible ? 1 : 1,
      left: detailsVisible ? "0" : "0",
    },
    delay: 100,
    config: { tension: 280, friction: 40 },
    // onRest: () => setOpenHamburger(!openHamburger),
  });

  const radarData = activeSummary.SessionData?.reduce(
    (sum, d) => [...sum, ...d.ClipLabel.comboArray],
    []
  );
  // console.log(radarData);
  // const timer = (vidTime) => {
  //   if (vidRef.current) {
  //     setTimeout(() => {
  //       setCurrentTime(vidTime);
  //       timer(vidRef.current?.getCurrentTime());
  //     }, 5);
  //   }
  // };
  // useEffect(() => {
  //   if (vidRef?.current !== undefined) {
  //     timer(vidRef.current?.getCurrentTime());
  //   }
  // }, [vidRef]);
  radarData.filter((t) => t.type !== "Transition");
  const vidDuration = vidRef.current?.getDuration();
  return (
    <div key={source.srcid + "1"} className=" flex w-full flex-col gap-2 p-1">
      <animated.div
        style={{ left: showDetails.left, opacity: showDetails.opacity }}
        key={source?.vidsrc.replace(vidsrcRegex, "")}
        className=" flex w-full flex-col gap-4 rounded-md  pl-0"
      >
        {/* <div
          className={`rounded-md text-center ${
            vidsrc === source.vidsrc ? "bg-zinc-900" : "bg-zinc-700"
          }  active:neumorphicIn p-2 active:rounded-md`}
          onClick={() => {
            setVidsrc(source.vidsrc);
          }}
        >
          Watch Session
        </div> */}
        {/* {radarData && <RadarChart data={radarData} />} */}
      </animated.div>

      {
        vidsrc === source?.vidsrc ? (
          <div className=" md:top-[0vh]">
            <div className="absolute left-0 top-0 z-[1025] flex aspect-video h-[100%] w-[100%] max-w-[100vw] flex-col gap-2 rounded-md bg-zinc-900 p-2">
              <div
                className="absolute left-2 top-2 flex place-items-center gap-2"
                onClick={() => setVidsrc(null)}
              >
                {vidsrc === source?.vidsrc && <MdClose />}{" "}
                {/* {source?.vidsrc.replace(vidsrcRegex, "")} */}
              </div>
              <div
                className={`neumorphicIn no-scrollbar absolute  ${
                  orientation === "landscape"
                    ? "left-[8%] top-0 w-[92%]"
                    : "bottom-8 left-0 h-fit w-[98%]"
                } flex flex-grow-0 gap-2 overflow-hidden overflow-x-scroll whitespace-nowrap rounded-md p-2 text-[12px] text-zinc-300`}
              >
                {shorthand
                  ? shorthand
                  : clipCombo.map((item, index) => (
                      <div key={`${item.name} ${Math.random() * 1000}`}>
                        {item.name}
                      </div>
                    ))}
              </div>
              <ReactPlayer
                ref={vidRef}
                style={{ transform: mirrored ? "rotateY(180deg)" : "" }}
                config={{ facebook: { appId: "508164441188790" } }}
                id={"video"}
                controls={true}
                playing={vidIsPlaying}
                muted
                width={"100%"}
                height={"100%"}
                onReady={() => setSrcid(source?.srcid)}
                onProgress={({ playedSeconds }) =>
                  setCurrentTime(playedSeconds)
                }
                // onPlay={() => handleTimeUpdate()}
                loop
                playsInline
                url={source?.vidsrc}
              />
              <div className="relative w-full">
                <input
                  id="PublicSessionSummary"
                  type="range"
                  step={0.001}
                  onChange={(e) => {
                    setCurrentTime(parseFloat(e.target.value));
                    vidRef.current.seekTo(parseFloat(e.target.value));
                  }}
                  value={currentTime}
                  min={0}
                  //@ts-ignore
                  max={vidDuration}
                  className={`w-full bg-transparent`}
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
                            duration={vidDuration}
                          />
                        )
                      );
                    })}
                  {/* <div
                    style={{
                      width: activeWidth,

                      left: activeLeft,
                    }}
                    id={`activeSessionClip'`}
                    key={`activeSessionClip'`}
                    className={`absolute top-[4px] h-3 rounded-md bg-teal-300  `}
                  ></div> */}
                </div>
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

export default PublicSessionReview;

const SessionDataDetails = ({ e, i, id, duration, source }) => {
  const [seeDetails, setSeeDetails] = useState(false);
  const clipData = useSessionSummariesStore((s) => s.clipData);
  const vidsrc = useSessionSummariesStore((s) => s.vidsrc);
  const setClipComboRaw = useSessionSummariesStore((s) => s.setClipComboRaw);
  const setClipData = useSessionSummariesStore((s) => s.setClipData);
  const setShorthand = useSessionSummariesStore((s) => s.setShorthand);
  const setSrcid = useSessionSummariesStore((s) => s.setSrcid);
  const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
  const clearClipCombo = useSessionSummariesStore((s) => s.clearClipCombo);
  const removeSessionData = useSessionSummariesStore(
    (s) => s.removeSessionData
  );
  useEffect(() => {
    setSrcid(source?.srcid);
  }, [source]);
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
          // setSrcid(source.srcid);
          // setClipData(e);
          clearClipCombo();
          setSeekTime(e.startTime);
          setShorthand(e.shorthand);
          setClipComboRaw(e.clipLabel);
          // removeSessionData(e);
        }}
        // onMouseOver={() => setSeeDetails(true)}
        // onMouseLeave={() => setSeeDetails(false)}
        style={{ width: w, left: l }}
        className={`absolute top-[4px] h-3 rounded-[3px] bg-indigo-300 `}
      ></div>
    </>
  );
};
