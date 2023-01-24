"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useStore } from "@store/store";
import ShowHideUI from "@components/sandbox/ui/ShowHideToggle";
import MinimalUI from "@components/sandbox/ui/MinimalUI";
import TrickInfo from "@components/info/TrickInfo";
import { useVideoStore } from "@components/sandbox/videoOverlay/useVideoStore";
import useVideoControls from "@components/sandbox/videoOverlay/useVideoControls";
import { useRouter } from "next/router";
import TorqueScene from "@scenes/TorqueScene";

import SandboxNav from "./ui/SandboxNav";

import Settings from "./ui/modal/Settings";
import MediaController from "@components/media/Controller";
import DurationSlider from "./ui/DurationSlider";

const Sandbox = () => {
  /*
  const setVidSrc = useVideoStore((s) => s.setVideoSource);
  const setVideoOpacity = useVideoStore((s) => s.setVideoOpacity);
  const setCanvasOpacity = useVideoStore((s) => s.setCanvasOpacity);
  const vidTime = useVideoStore((s) => s.vidTime);
  const setVidDuration = useVideoStore((s) => s.setVidDuration);
  */
  const router = useRouter();
  const { model, trick } = router.query;
  const showUI = useStore((s) => s.showUI);
  const vidSrc = useVideoStore((s) => s.videoSource);
  const videoOpacity = useVideoStore((s) => s.videoOpacity);
  const canvasOpacity = useVideoStore((s) => s.canvasOpacity);
  const setVidTime = useVideoStore((s) => s.setVidTime);
  let vid = useRef();
  useVideoControls(vid);

  let container_border = "min-h-[10vh] overflow-hidden rounded-lg border-2 border-zinc-800 bg-zinc-600 bg-opacity-80"

  return (
    <>
      <div
        style={{ opacity: canvasOpacity }}
        className="w-screen h-screen"
      >
        <Canvas className="w-screen h-screen">
          <TorqueScene gizmoHelper={false} model={model} trick={trick} />
        </Canvas>
      </div>

      <div className="absolute top-0 left-0 flex flex-col justify-between p-2 pt-2 pb-4 gap-2 h-screen w-screen">
        {/* Model UI */}
        <div id="Top-UI-Container" className={`${container_border} flex flex-col w-full max-w-[100vw] `}>
          <SandboxNav />
          {/*
            <ShowHideUI />
          */}
        </div>

        {/* Media Player */}
        <div
          className={`${container_border} p-4`}
          id="Bottom-UI-Container">

          <DurationSlider />
          <MediaController />
        </div>
      </div>
    </>
  );
};
export default Sandbox;
