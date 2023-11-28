import React, { useEffect, useState } from "react";
import { IoIosVideocam } from "react-icons/io";
import { useStore } from "@store/store";
import SyncPlayerControls from "../videoOverlay/SyncPlayerControls";
import { useVideoStore } from "../videoOverlay/useVideoStore";
import VideoControls from "../videoOverlay/VideoControls";
import VideoInput from "../videoOverlay/VideoInput";
const VideoOverlay = () => {
  const [videoInput, setVideoInput] = useState(false);
  const setBackground = useStore((s) => s.setBackground);
  const setFollowCam = useStore((s) => s.setFollowCam);
  const handleUpdate = () => {
    setVideoInput(!videoInput);
    setFollowCam();
  };
  const videoSource = useVideoStore((s) => s.videoSource);
  useEffect(() => {
    if (videoSource !== "" || undefined || null) {
      setBackground("The Void");
    }
  }, [videoSource]);

  return (
    <>
      <div className="absolute bottom-[35vh] right-5 z-[1000] flex flex-col gap-2 ">
        <div onClick={() => handleUpdate()} className="text-xl text-zinc-300">
          <IoIosVideocam />
        </div>
        {videoSource && <SyncPlayerControls />}
      </div>
      {videoInput && <VideoInput />}
      {videoSource && (
        <div className="absolute top-[10vh] z-[4] flex w-full place-content-center place-items-center gap-2 text-zinc-300">
          <VideoControls />
        </div>
      )}
    </>
  );
};

export default VideoOverlay;
