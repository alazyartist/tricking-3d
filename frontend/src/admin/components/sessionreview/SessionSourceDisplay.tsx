import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import ReactPlayer from "react-player";
import { useSessionSummariesStore } from "./SessionSummaryStore";
import Timeline from "../timeline/Timeline";

const SessionSourceDisplay = ({ source, mirrored }) => {
  const vidsrcRegex = /(^(\w+).*\.com\/watch\?v=)|(^(\w+.*)\/videos\/)/g;
  const vidRef = useRef<ReactPlayer>(null!);
  const seekTime = useSessionSummariesStore((s) => s.seekTime);
  const setCurrentTime = useSessionSummariesStore((s) => s.setCurrentTime);
  const vidIsPlaying = useSessionSummariesStore((s) => s.vidIsPlaying);
  const removeClipfromCombo = useSessionSummariesStore(
    (s) => s.removeClipfromCombo
  );

  const clipCombo = useSessionSummariesStore((s) => s.clipCombo);
  const vidsrc = useSessionSummariesStore((s) => s.vidsrc);
  const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
  const setSrcid = useSessionSummariesStore((s) => s.setSrcid);
  const detailsVisible = useSessionSummariesStore((s) => s.detailsVisible);
  const setDetailsVisible = useSessionSummariesStore(
    (s) => s.setDetailsVisible
  );
  useEffect(() => {
    setCurrentTime(seekTime);
    //@ts-ignore
    vidRef?.current?.seekTo(seekTime);
  }, [seekTime]);

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
    <div
      key={source.srcid + "1"}
      className="noTouch flex h-0 touch-none flex-col gap-2"
    >
      <animated.div
        style={{ left: showDetails.left, opacity: showDetails.opacity }}
        key={source?.vidsrc.replace(vidsrcRegex, "")}
        className="noTouch relative mt-2 flex w-full flex-col gap-4 rounded-md pl-0"
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

      {vidsrc === source?.vidsrc ? (
        <div className="absolute left-[15vw] top-[-35vh] w-[70vw] md:top-[-15vh]">
          <div className="relative flex max-h-[80vh] flex-col gap-2">
            <div
              className="flex place-items-center gap-2"
              // onClick={() => setVidsrc(null)}
            >
              {/* {vidsrc === source?.vidsrc && <MdClose />}{" "} */}
              {source?.vidsrc.replace(vidsrcRegex, "")}
            </div>
            <ReactPlayer
              ref={vidRef}
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
              onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
              // onPlay={() => handleTimeUpdate()}
              loop
              playsInline
              url={source?.vidsrc}
            />
            <Timeline source={source} vidRef={vidRef} />
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
      ) : null}
    </div>
  );
};
export default SessionSourceDisplay;
