import React from "react";
import { MediaButton } from "@components/media/MediaButton";
import { MdLoop, MdInfo, MdInfoOutline } from "@data/icons/MdIcons";
import { FaPause, FaPlay } from "react-icons/fa";
import { useStore } from "@store/store";
import Link from "next/link";
function MinimalUI() {
  const setIsPaused = useStore((s) => s.setIsPaused);
  const isPaused = useStore((s) => s.isPaused);
  const showInfo = useStore((s) => s.showInfo);
  const setInfo = useStore((s) => s.setInfo);
  const timescale = useStore((s) => s.timescale);
  const setTimescale = useStore((s) => s.setTimescale);
  return (
    <>
      <div
        id="minimal-ui-container"
        className="absolute bottom-24 right-[2vw] z-10 w-fit"
      >
        <div id="container" className="flex flex-col gap-4">
          {/*
          <MediaButton
            id="info-minimal"
            content={
              showInfo ? (
                <MdInfo className="fill-gray-300 text-3xl" />
              ) : (
                <MdInfoOutline className="fill-gray-300 text-3xl" />
              )
            }
            f={setInfo}
          />
          */}
          <MediaButton
            id="play-pause-minimal"
            f={() => setIsPaused(!isPaused)}
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
            id="reverse-button"
            f={() => setTimescale(-timescale)}
            content={
              timescale < 0 ? (
                <MdLoop color={"rgb(134 239 172)"} />
              ) : (
                <MdLoop color={"rgb(252 165 165)"} />
              )
            }
          />
        </div>
      </div>
    </>
  );
}

export default MinimalUI;
