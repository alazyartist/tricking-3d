"use client";
import { useEffect } from "react";
import { useStore } from "@store/store";
import { useVideoStore } from "./useVideoStore";
const useVideoControls = (vid) => {
  const timescale = useStore((s) => s.timescale);
  const videoPlaying = useVideoStore((s) => s.videoPlaying);
  const startTime = useVideoStore((s) => s.startTime);
  const endTime = useVideoStore((s) => s.endTime);
  const vidTime = useVideoStore((s) => s.vidTime);
  const scrubbing = useVideoStore((s) => s.scrubbing);
  const vidSrc = useVideoStore((s) => s.videoSource);
  const setEndTime = useVideoStore((s) => s.setEndTime);
  const setStartTime = useVideoStore((s) => s.setStartTime);
  const setVidDuration = useVideoStore((s) => s.setVidDuration);
  useEffect(() => {
    if (vid) {
      if (scrubbing) {
        vid.pause();
        vid.currentTime = vidTime;
        vid.play();
      }
      if (vidTime > endTime) {
        vid.currentTime = startTime;
      }
      if (vidTime < startTime) {
        vid.currentTime = startTime;
      }
    }
  }, [vid, vidTime]);
  useEffect(() => {
    if (vid?.duration) {
      setVidDuration(vid?.duration);
      setStartTime(0);
      setEndTime(vid?.duration);
    }
  }, [vidSrc]);
  useEffect(() => {
    if (vid.pause) {
      videoPlaying ? vid?.pause() : vid?.play();

      // if (timescale > 0.1 && timescale < 2) {
      // 	vid.playbackRate = timescale;
      // }
    }
  }, [videoPlaying, timescale, vid]);
  return;
};

export default useVideoControls;
