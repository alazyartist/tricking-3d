import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import ReactPlayer from "react-player";
import { useSessionSummariesStore } from "./SessionSummaryStore";
import Timeline from "../timeline/Timeline";
import { createPortal } from "react-dom";
const SessionSourceDisplay = ({ source, mirrored, orientation }) => {
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
  const setVidDuration = useSessionSummariesStore((s) => s.setVidDuration);
  const vidDuration = useSessionSummariesStore((s) => s.vidDuration);
  const setSrcid = useSessionSummariesStore((s) => s.setSrcid);
  const detailsVisible = useSessionSummariesStore((s) => s.detailsVisible);
  const setDetailsVisible = useSessionSummariesStore(
    (s) => s.setDetailsVisible
  );
  const sessionData = useSessionSummariesStore((s) => s.sessionData);
  const srcid = useSessionSummariesStore((s) => s.srcid);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCurrentTime(seekTime);
    //@ts-ignore
    if (vidDuration === null && vidRef.current) {
      setVidDuration(vidRef?.current?.getDuration());
    }
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
      {/* <animated.div
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
      </animated.div> */}

      {vidsrc === source?.vidsrc ? (
        <div
          className={`absolute ${
            orientation === "landscape"
              ? "left-[0vw] top-[-35vh]"
              : "left-[7vw] top-[-35vh]"
          }  w-[80vw] md:top-[-15vh]`}
        >
          <div
            className={`relative ${orientation === "landscape" ? "top-0" : ""}
 flex aspect-video max-h-[80vh] flex-shrink-0 flex-col gap-2`}
          >
            <ReactPlayer
              ref={vidRef}
              style={{
                transform: mirrored ? "rotateY(180deg)" : "",
                borderRadius: "12px",
                overflow: "hidden",
              }}
              config={{
                facebook: { appId: "508164441188790" },
                youtube: { playerVars: { listType: "user_uploads" } },
              }}
              id={"video"}
              // controls={false}
              playing={vidIsPlaying}
              muted
              width={"80vw"}
              height={"45vw"}
              onReady={() => {
                setSrcid(source?.srcid);
                setReady(true);
              }}
              onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
              // onPlay={() => handleTimeUpdate()}
              loop
              playsInline
              url={source?.vidsrc}
            />
            {ready && orientation === "landscape" ? (
              createPortal(
                <div
                  className={`             ${
                    orientation === "landscape"
                      ? "absolute bottom-[0vh] z-[100]"
                      : ""
                  }`}
                >
                  <Timeline source={source} vidRef={vidRef} />

                  {/* <div>
                  <ProgressBar percent={percent} />
                  </div> */}
                </div>,
                document.getElementById("portal-root")
              )
            ) : (
              <div
                className={`             ${
                  orientation === "landscape" ? "absolute bottom-[0vh]" : ""
                }`}
              >
                <Timeline source={source} vidRef={vidRef} />

                {/* <div>
                <ProgressBar percent={percent} />
                </div> */}
              </div>
            )}
            <div
              className={`neumorphicIn no-scrollbar flex w-full gap-2 overflow-x-scroll rounded-md p-2 text-zinc-300 ${
                orientation === "landscape" ? "absolute top-0" : ""
              }`}
            >
              {" "}
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
