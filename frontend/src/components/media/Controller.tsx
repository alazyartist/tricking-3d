import React from "react";
import { useStore } from "@store/store";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import {
  MdSpeed,
  MdLoop,
  MdCenterFocusWeak,
  MdCenterFocusStrong,
} from "@data/icons/MdIcons";
import { MediaButton } from "./MediaButton";
import DragableWrapper from "../sandbox/ui/DraggableSlowMo";

function Controller() {
  const setIsPaused = useStore((state) => state.setIsPaused);
  const setIsPlaying = useStore((state) => state.setIsPlaying);
  const setTrimToggle = useStore((state) => state.setTrimToggle);
  const trimToggle = useStore((state) => state.trimToggle);
  const setBounce = useStore((state) => state.setBounce);
  const isPaused = useStore((state) => state.isPaused);
  const bounce = useStore((state) => state.bounce);
  const setTimescale = useStore((state) => state.setTimescale);
  const timescale = useStore((state) => state.timescale);
  const speedControl = useStore((state) => state.speedControl);
  const setFollowCam = useStore((state) => state.setFollowCam);
  const isFollowCam = useStore((state) => state.isFollowCam);
  const setCurrentTime = useStore((state) => state.setCurrentTime);
  const currentTime = useStore((state) => state.currentTime);
  // Envoke Player Controller

  return (
    <div className="sticky bottom-0 z-[1012]">
      <div
        id="controller-container"
        className="flex
        justify-around text-sm
		"
      >
        <MediaButton
          id="bounce-button"
          f={setFollowCam}
          hide={speedControl}
          content={
            isFollowCam ? (
              <MdCenterFocusStrong className="text-xl text-[hotpink]" />
            ) : (
              <MdCenterFocusWeak className="text-xl text-[gainsboro]" />
            )
          }
        />
        <MediaButton
          id="reverse-button"
          f={() => setTimescale(-timescale)}
          hide={speedControl}
          content={
            timescale < 0 ? (
              <MdLoop className="text-2xl text-zinc-300" />
            ) : (
              <MdLoop className="text-2xl text-zinc-300" />
            )
          }
        />

        <MediaButton
          id="FrameBack-button"
          f={() => {
            if (isPaused)
              setCurrentTime(
                currentTime - 0.05 * timescale * Math.sign(timescale)
              );
            else {
              // setIsPlaying();
            }
          }}
          hide={speedControl}
          content={
            <span className={`${isPaused ? "opacity-100" : "opacity-40"}`}>
              <FaStepBackward color="#d4d4d8" size={20} />
            </span>
          }
        />

        <MediaButton
          id="play-pause-button"
          f={() => setIsPaused()}
          hide={speedControl}
          content={
            !isPaused ? (
              <FaPause color={"#1f2937"} />
            ) : (
              <FaPlay color={"#1f2937"} />
            )
          }
          isPlayPause
        />

        <MediaButton
          id="FrameForward-button"
          f={() => {
            if (isPaused)
              setCurrentTime(
                currentTime + 0.05 * timescale * Math.sign(timescale)
              );
            else {
              // setIsPlaying();
            }
          }}
          hide={speedControl}
          content={
            <span className={`${isPaused ? "opacity-100" : "opacity-40"}`}>
              <FaStepForward color={"#e2e8f0"} size={20} />
            </span>
          }
        />

        <DragableWrapper drag_offset_limit={80}>
          {/* @ts-ignore */}
          <MediaButton
            id="reduce-speed-button"
            content={
              <div className="relative">
                <MdSpeed className="fill-zinc-300 text-2xl" />
                <span className="absolute inset-x-0.5 top-6 text-[.9rem] ">
                  {Math.abs(timescale).toFixed(2)}
                </span>
              </div>
            }
          />
        </DragableWrapper>

        <MediaButton
          id="toggle-playback-button"
          f={() => setTrimToggle()}
          hide={speedControl}
          content={
            <AiOutlineColumnWidth
              size={20}
              color={`${trimToggle ? "#facc15" : "#d4d4d8"}`}
            />
          }
        />
      </div>
    </div>
  );
}

export default Controller;
