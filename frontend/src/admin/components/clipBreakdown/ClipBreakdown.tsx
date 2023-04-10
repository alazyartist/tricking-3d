import { trpc } from "@utils/trpc";
import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { useSessionSummariesStore } from "../sessionreview/SessionSummaryStore";

const ClipBreakdown = ({ sessionid, initialSummary }) => {
  const { data: summary } = trpc.sessionsummaries.detailsById.useQuery(
    { sessionid: sessionid },
    { initialData: initialSummary }
  );
  const vidRef = useRef<ReactPlayer>();
  const vidIsPlaying = useSessionSummariesStore((s) => s.vidIsPlaying);
  const currentTime = useSessionSummariesStore((s) => s.currentTime);
  const setCurrentTime = useSessionSummariesStore((s) => s.setCurrentTime);
  const vidDuration = vidRef.current?.getDuration();
  return (
    <div className="no-scrollbar fixed top-0 left-0 flex h-screen w-screen flex-col content-center items-center overflow-scroll font-inter">
      <h1 className={"p-2 text-3xl text-zinc-300"}>{summary.name}</h1>
      <ReactPlayer
        ref={vidRef}
        config={{ facebook: { appId: "508164441188790" } }}
        id={"video"}
        controls={true}
        playing={vidIsPlaying}
        muted
        width={"70vw"}
        height={"40vw"}
        // onReady={() => setSrcid(source?.srcid)}
        // onProgress={({ playedSeconds }) =>
        // setCurrentTime(playedSeconds)
        // }
        // onPlay={() => handleTimeUpdate()}
        loop
        playsInline
        url={summary.SessionSources?.[0]?.vidsrc}
      />
      <div className={"w-[70vw] py-2"}>
        <div className="relative w-full">
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
            max={vidDuration}
            className={`w-full bg-transparent`}
          />
          {summary.SessionData.map((sd, i) => (
            <SessionDataDetails
              key={`${sd.id}+ 'sessiondata'`}
              e={sd}
              i={i}
              duration={vidDuration}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClipBreakdown;

const SessionDataDetails = ({ e, i, duration }) => {
  let w = `${(
    ((parseInt(e.clipEnd) - parseInt(e.clipStart)) / parseInt(duration)) *
    100
  ).toFixed(2)}%`;
  let l = `${((parseInt(e.clipStart) / parseInt(duration)) * 100).toFixed(0)}%`;
  console.log(w, l, e);
  return (
    <>
      <div
        style={{ width: w, left: l }}
        className={`absolute top-[4px] h-3 rounded-[3px] bg-indigo-300 `}
      ></div>
    </>
  );
};

const SubClips = ({ w, l, combo }) => {
  return (
    <div
      style={{ width: w, left: l }}
      className={"aboslute top-[4px] h-3 rounded-[3px]"}
    ></div>
  );
};
