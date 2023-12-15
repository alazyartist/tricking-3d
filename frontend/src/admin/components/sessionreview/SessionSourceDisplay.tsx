import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import ReactPlayer from "react-player";
import { useSessionSummariesStore } from "./SessionSummaryStore";
import Timeline from "../timeline/Timeline";
import * as d3 from "d3";
import { createPortal } from "react-dom";
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
  const sessionData = useSessionSummariesStore((s) => s.sessionData);
  const srcid = useSessionSummariesStore((s) => s.srcid);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCurrentTime(seekTime);
    //@ts-ignore
    vidRef?.current?.seekTo(seekTime);
  }, [seekTime]);
  useEffect(() => {
    console.log(ready);
  }, [ready]);
  const [percent, setPercent] = useState(
    (sessionData?.reduce((sum, b) => sum + (b.endTime - b.startTime), 0) /
      vidRef?.current?.getDuration()) *
      100
  );
  useEffect(() => {
    setPercent(
      (sessionData?.reduce((sum, b) => sum + (b.endTime - b.startTime), 0) /
        vidRef?.current?.getDuration()) *
        100
    );
    console.log(sessionData);
  }, [sessionData]);

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
        <div className="absolute left-[15vw] top-[-35vh] w-[70vw] md:top-[-15vh]">
          <div className="relative flex max-h-[80vh] flex-col gap-2">
            <div
              className="flex place-items-center gap-2"
              // onClick={() => setVidsrc(null)}
            >
              {/* {vidsrc === source?.vidsrc && <MdClose />}{" "} */}
              {/* {source?.vidsrc.replace(vidsrcRegex, "")} */}
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
            {ready && (
              <>
                <Timeline source={source} vidRef={vidRef} />

                <div>
                  <ProgressBar percent={percent} />
                </div>
              </>
            )}
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

const ProgressBar = ({ percent }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (percent && d3Container.current) {
      const svg = d3.select(d3Container.current);
      svg.selectAll("*").remove(); // Clear svg content before adding new elements
      console.log(percent);
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

  return createPortal(
    <svg
      className="d3-component rounded-md py-1"
      width="100%"
      height="20"
      ref={d3Container}
    />,
    document.getElementById("progressBar")
  );
};
export default SessionSourceDisplay;
