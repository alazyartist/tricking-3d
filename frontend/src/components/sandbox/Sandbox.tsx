"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useStore } from "@store/store";
import ShowHideUI from "@components/sandbox/ui/ShowHideToggle";
import useVideoControls from "@components/sandbox/videoOverlay/useVideoControls";
import { useRouter } from "next/router";
import TorqueScene from "@scenes/TorqueScene";
import SandboxNav from "./ui/SandboxNav";
import MediaController from "@components/media/Controller";
import DurationSlider from "./ui/DurationSlider";
import MinimalUI from "@components/sandbox/ui/MinimalUI";
import Link from "next/link";

const Sandbox = () => {
  /*
  const setVidSrc = useVideoStore((s) => s.setVideoSource);
  const setVideoOpacity = useVideoStore((s) => s.setVideoOpacity);
  const setCanvasOpacity = useVideoStore((s) => s.setCanvasOpacity);
  const vidTime = useVideoStore((s) => s.vidTime);
  const setVidDuration = useVideoStore((s) => s.setVidDuration);
  const vidSrc = useVideoStore((s) => s.videoSource);
  const videoOpacity = useVideoStore((s) => s.videoOpacity);
  const canvasOpacity = useVideoStore((s) => s.canvasOpacity);
  const setVidTime = useVideoStore((s) => s.setVidTime);
  */
  const router = useRouter();
  const { model, trick } = router.query;
  const showUI = useStore((s) => s.showUI);
  let vid = useRef();
  useVideoControls(vid);


  let container_border = "min-h-[10vh] overflow-hidden rounded-lg border-2 border-zinc-800 bg-opacity-80"

  return (
    <>
      <div className="w-screen h-screen">
        <Canvas className="w-screen h-screen bg-zinc-800">
          <TorqueScene gizmoHelper={false} model={model} trick={trick} />
        </Canvas>

        {showUI ? (
          <>
            <div className="absolute top-0 left-0 p-2 pt-2 pb-4 gap-2 w-screen">
              <div className={`${container_border} bg-zinc-600 flex flex-col w-full max-w-[100vw] max-h-[80vh]`}>
                <SandboxNav />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 p-2 pt-2 pb-4 w-screen">
              <div className={`${container_border} p-4 bg-zinc-800`}>
                <DurationSlider />
                <MediaController />
              </div>
            </div>
          </>
        ) : (
          <MinimalUI />
        )}

        <div className={`absolute ${showUI ? "bottom-[15vh]" : "bottom-0"} right-0`}>
          <ShowHideUI />
        </div>
      </div>
    </>
  );
};
export default Sandbox;
