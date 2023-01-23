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
    </>
  );
};

export default VideoOverlay;
