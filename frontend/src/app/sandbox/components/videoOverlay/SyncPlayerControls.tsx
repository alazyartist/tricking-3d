import React, { useEffect } from "react";
import { useVideoStore } from "./useVideoStore";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { useStore } from "@store/store";

const SyncPlayerControls = () => {
  const playBoth = useVideoStore((s) => s.playBoth);
  const setPlayBoth = useVideoStore((s) => s.setPlayBoth);
  const setVideoPlaying = useVideoStore((s) => s.setVideoPlaying);
  const setCanvasPlaying = useStore((s) => s.setIsPaused);

  useEffect(() => {
    if (playBoth === true) {
      setVideoPlaying(true);
      setCanvasPlaying(true);
    } else {
      setVideoPlaying(false);
      setCanvasPlaying(false);
    }
  }, [playBoth]);

  return (
    <div className="text-xl text-zinc-300">
      {playBoth ? (
        <FaPauseCircle onClick={() => setPlayBoth(false)} />
      ) : (
        <FaPlayCircle onClick={() => setPlayBoth(true)} />
      )}
    </div>
  );
};

export default SyncPlayerControls;
