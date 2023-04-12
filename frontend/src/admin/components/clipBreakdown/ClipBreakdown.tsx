import { trpc } from "@utils/trpc";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSessionSummariesStore } from "../sessionreview/SessionSummaryStore";
import useMeasure from "react-use-measure";
import { transitions, tricks } from "@prisma/client";

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
                <ClipDataDetails
                  key={`${sd.id} clipData`}
                  currentTime={currentTime}
                  setCurrentTime={setCurrentTime}
                  sd={sd}
                  i={i}
                  vidRef={vidRef}
                  dimensions={dimensions}
                  vidDuration={vidDuration}
                />
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClipBreakdown;
const ClipDataDetails = ({
  sd,
  i,
  currentTime,
  dimensions,
  setCurrentTime,
  vidRef,
  vidDuration,
}) => {
  const [comboTimestamps, setComboTimestamps] = useState([]);
  const utils = trpc.useContext();

  const {
    mutate: saveTimestamps,
    data: saveResponse,
    isLoading,
  } = trpc.sessionsummaries.updateComboTimestamps.useMutation({
    onSuccess(input) {
      utils.sessionsummaries.invalidate();
    },
  });

  const updateTimestamp = (index, bore, value) => {
    setComboTimestamps((prev) => {
      const updatedItems = [...prev];
      console.log(updatedItems);
      if (bore === "Start") {
        updatedItems[index] = {
          ...updatedItems[index],
          clipStart: value,
        };
        if (index - 1 >= 0) {
          updatedItems[index - 1] = {
            ...updatedItems[index - 1],
            clipEnd: value,
          };
        }
      }
      if (bore === "End") {
        updatedItems[index] = {
          ...updatedItems[index],
          clipEnd: value,
        };
        if (index + 1 <= updatedItems.length - 1) {
          updatedItems[index + 1] = {
            ...updatedItems[index + 1],
            clipStart: value,
          };
        }
      }
      saveTimestamps({ sessiondataid: sd.id, comboTimestamps: updatedItems });
      return updatedItems;
    });
    console.log(sd);
  };
  const clipDuration = sd.clipEnd - sd.clipStart;
  useEffect(() => {
    const avgTime = clipDuration / sd.ClipLabel.comboArray.length;
    if (sd.id && sd.comboTimestamps === null) {
      console.log("ransetup");
      const timestamps = sd.ClipLabel.comboArray.map(
        (c: tricks | transitions, i: number) => ({
          type: c.type,
          //@ts-ignore
          id: c.type === "Trick" ? c.trick_id : c.id,
          name: c.name,
          clipStart: sd.clipStart + avgTime * i,
          clipEnd: sd.clipStart + (avgTime * i + avgTime),
        })
      );
      console.log(timestamps);
      setComboTimestamps(timestamps);
    }
    if (!isLoading && sd.comboTimestamps !== null) {
      console.log("ranSave sd.cT", saveResponse);
      setComboTimestamps(sd.comboTimestamps);
    }
    if (saveResponse?.comboTimestamps) {
      console.log("ranSave saveResponse.cT");
      console.log(saveResponse.comboTimestamps);
      setComboTimestamps(saveResponse.comboTimestamps as any[]);
    }
  }, [saveResponse]);
  return (
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
        updateTimestamp={updateTimestamp}
        timestamps={comboTimestamps}
        duration={sd.clipEnd - sd.clipStart}
      />
    </>
  );
};

const SessionDataDetails = ({ e, i, duration }) => {
  const setCurrentTime = useSessionSummariesStore((s) => s.setCurrentTime);
  let w = `${(
    ((parseFloat(e.clipEnd) - parseFloat(e.clipStart)) / parseFloat(duration)) *
    100
  ).toFixed(2)}%`;
  let l = `${((parseFloat(e.clipStart) / parseFloat(duration)) * 100).toFixed(
    0
  )}%`;
  return (
    <>
      <div
        onClick={() => setCurrentTime(e.clipStart)}
        style={{ width: w, left: l }}
        className={`absolute top-[4px] h-3 rounded-[3px] bg-indigo-300 `}
      ></div>
    </>
  );
};
const SubClips = ({
  e,
  duration,
  dimensions,
  i,
  timestamps,
  updateTimestamp,
}) => {
  const [selectedClip, setSelectedClip] = useState({
    ...timestamps?.[i],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  let w = `${(
    ((parseInt(e.clipEnd) - parseInt(e.clipStart)) / parseInt(duration)) *
    100
  ).toFixed(2)}%`;
  let l = `${((parseInt(e.clipStart) / parseInt(duration)) * 100).toFixed(0)}%`;
  const len = e.ClipLabel?.comboArray.length;
  const currentTime = useSessionSummariesStore((s) => s.currentTime);
  console.log("duration", duration);
  return (
    <>
      <div
        // style={{ width: w, left: l }}
        className={
          "abso lute top-[4px] flex h-3 flex-shrink-0 rounded-[3px] bg-red-500"
        }
      >
        {e.ClipLabel.comboArray?.map((c, idx) => {
          return (
            timestamps[idx] && (
              <div
                onClick={() => {
                  setActiveIndex(idx);
                  setSelectedClip({
                    type: c.type,
                    id: c?.id || c.trick_id,
                    name: c.name,
                    clipStart: 0,
                    clipEnd: 10,
                  });
                }}
                style={{
                  left: `${
                    ((timestamps[idx]?.clipStart - e.clipStart) / duration) *
                    100
                  }%`,
                  width: `${
                    ((timestamps[idx]?.clipEnd - timestamps[idx]?.clipStart) /
                      duration) *
                    100
                  }%`,
                }}
                className={`absolute flex-shrink-0 border-2 border-zinc-800 ${
                  idx === activeIndex ? "bg-zinc-200" : "bg-zinc-400"
                } text-[8px]`}
              >
                {c.name}
              </div>
            )
          );
        })}
      </div>
      <div
        key={selectedClip.name + e.name}
        className={
          "fixed left-0 bottom-[10vh] flex w-full place-content-center place-items-center"
        }
      >
        <div
          onClick={() =>
            setActiveIndex(() => {
              if (activeIndex - 1 >= 0) {
                return activeIndex - 1;
              }
              if (activeIndex - 1 < 0) {
                return len - 1;
              }
            })
          }
          className="bg-zinc-300 p-2"
        >
          Prev
        </div>
        <div
          onClick={() => updateTimestamp(activeIndex, "Start", currentTime)}
          className="flex flex-col rounded-md bg-zinc-300 p-2"
        >
          <div>start</div>
          <div>{timestamps?.[activeIndex]?.clipStart.toFixed(2)}</div>
        </div>
        <div className="rounded-md bg-zinc-300 p-2">
          {currentTime.toFixed(2)}
          {selectedClip.name}
        </div>
        <div
          onClick={() => updateTimestamp(activeIndex, "End", currentTime)}
          className="flex flex-col rounded-md bg-zinc-300 p-2"
        >
          <div>end</div>
          <div>{timestamps?.[activeIndex]?.clipEnd.toFixed(2)}</div>
        </div>
        <div
          onClick={() => setActiveIndex((activeIndex + 1) % len)}
          className="bg-zinc-300 p-2"
        >
          Next
        </div>
      </div>
    </>
  );
};
