import { trpc } from "@utils/trpc";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSessionSummariesStore } from "../sessionreview/SessionSummaryStore";
import useMeasure from "react-use-measure";

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
  const [clipRef, dimensions] = useMeasure();
  console.log(dimensions);
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
        onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
        // onPlay={() => handleTimeUpdate()}
        loop
        playsInline
        url={summary.SessionSources?.[0]?.vidsrc}
      />
      <div id={"sessionData-combos"} className={"w-[70vw] py-2"}>
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
      <div ref={clipRef} id={"sessionData-clips"} className={"w-[70vw] py-2"}>
        <div className="relative w-full">
          {summary.SessionData.map((sd, i) => (
            <>
              {sd.clipStart <= currentTime && currentTime <= sd.clipEnd && (
                <>
                  <input
                    id="sessionSummary"
                    type="range"
                    step={0.001}
                    onChange={(e) => {
                      setCurrentTime(parseFloat(e.target.value));
                      vidRef.current.seekTo(parseFloat(e.target.value));
                    }}
                    value={currentTime}
                    min={sd.clipStart}
                    //@ts-ignore
                    max={sd.clipEnd}
                    className={`w-full bg-transparent`}
                  />
                  <SubClips
                    dimensions={dimensions}
                    key={`${sd.id}+ 'sessiondata'`}
                    e={sd}
                    i={i}
                    duration={vidDuration}
                  />
                </>
              )}
            </>
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
const SubClips = ({ e, duration, dimensions }) => {
  const [selectedClip, setSelectedClip] = useState("");
  let w = `${(
    ((parseInt(e.clipEnd) - parseInt(e.clipStart)) / parseInt(duration)) *
    100
  ).toFixed(2)}%`;
  let l = `${((parseInt(e.clipStart) / parseInt(duration)) * 100).toFixed(0)}%`;
  const len = e.ClipLabel?.comboArray.length;
  return (
    <>
      <div
        // style={{ width: w, left: l }}
        className={"abso lute top-[4px] flex h-3 rounded-[3px] bg-red-500"}
      >
        {e.ClipLabel.comboArray?.map((c) => (
          <div
            onClick={() => setSelectedClip(c.name)}
            style={{ width: dimensions.width / len }}
            className="border-2 border-zinc-800 bg-zinc-400 text-[8px]"
          >
            {c.name}
          </div>
        ))}
      </div>
      <div
        className={
          "fixed left-0 bottom-[10vh] flex w-full place-content-center place-items-center"
        }
      >
        <div className="rounded-md bg-zinc-300 p-2">{selectedClip}</div>
      </div>
    </>
  );
};
