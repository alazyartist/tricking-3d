import React, { useEffect, useState } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import DraggableOpacity from "../ui/DraggableOpacity";
import { useVideoStore } from "./useVideoStore";
import { useSpring, animated, config } from "@react-spring/web";
const VideoControls = () => {
  const videoPlaying = useVideoStore((s) => s.videoPlaying);
  const setVideoPlaying = useVideoStore((s) => s.setVideoPlaying);
  const videoOpacity = useVideoStore((s) => s.videoOpacity);
  const canvasOpacity = useVideoStore((s) => s.canvasOpacity);
  const vidTime = useVideoStore((s) => s.vidTime);
  const setScrubbing = useVideoStore((s) => s.setScrubbing);
  const setVidTime = useVideoStore((s) => s.setVidTime);
  const vidDuration = useVideoStore((s) => s.vidDuration);
  let time = Math.trunc((vidTime / vidDuration) * 100).toString() + "%";
  const timeSpring = useSpring({
    to: { width: time },
    config: config.stiff,
  });
  const setStart = useVideoStore((s) => s.setStartTime);
  const setEnd = useVideoStore((s) => s.setEndTime);
  const start = useVideoStore((s) => s.startTime);
  const end = useVideoStore((s) => s.endTime);
  return (
    <div className="flex flex-col">
      <div className="flex w-[400px] place-content-center place-items-center gap-2 rounded-lg bg-zinc-800 p-2">
        <div
          className="text-3xl"
          onClick={() => setVideoPlaying(!videoPlaying)}
        >
          {videoPlaying ? <FaPlayCircle /> : <FaPauseCircle />}
        </div>
        <DraggableOpacity drag_offset_limit={80}>
          <div>
            <div className="select-none">Video</div>
            <span className="text-xs">{Math.trunc(videoOpacity * 100)}%</span>
          </div>
        </DraggableOpacity>
        <DraggableOpacity canvas drag_offset_limit={80}>
          <div>
            <div>3D</div>
            <span className="text-xs">{Math.trunc(canvasOpacity * 100)}%</span>
          </div>
        </DraggableOpacity>
        <span>
          {vidTime} /{vidDuration}
        </span>
      </div>
      <div className="relative h-4 w-full p-[3px]">
        <div className="h-full w-full bg-zinc-300">
          <input
            id="playhead"
            className="pointer-events-none absolute top-0 z-[0] w-full bg-transparent"
            //@ts-ignore
            vid="true"
            type="range"
            min="0"
            onPointerDown={() => setScrubbing(true)}
            onPointerUp={() => setScrubbing(false)}
            onChange={(e) => setVidTime(parseFloat(e.target.value))}
            max={vidDuration}
            value={vidTime}
            step="0.0001"
          />
          <input
            id="start"
            //@ts-ignore
            double={"true"}
            vid="true"
            className="pointer-events-none absolute top-0 z-[1] w-full rounded-none bg-transparent "
            type="range"
            min="0"
            onChange={(e) => setStart(parseFloat(e.target.value))}
            max={vidDuration}
            value={start}
            step="0.001"
          />
          <input
            id="end"
            //@ts-ignore
            vid="true"
            double={"true"}
            className="pointer-events-none absolute top-0 z-[5] w-full bg-transparent "
            type="range"
            min="0"
            onChange={(e) => setEnd(parseFloat(e.target.value))}
            max={vidDuration}
            value={end}
            step="0.001"
          />

          <animated.div
            style={{ ...timeSpring }}
            className={`h-full bg-teal-500`}
          ></animated.div>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
