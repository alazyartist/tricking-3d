"use client";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useRef, VideoHTMLAttributes } from "react";
import { useStore } from "@store/store";
import React from "react";
import UI from "../../components/ui/UI";
import ShowHideToggle from "../../components/ui/ShowHideToggle";
// import { useParams, useSearchParams } from "react-router-dom";
import MinimalUI from "../../components/ui/MinimalUI";
import TrickInfo from "@components/info/TrickInfo";
import { useVideoStore } from "../../components/videoOverlay/useVideoStore";
import useVideoControls from "../../components/videoOverlay/useVideoControls";
import { useRouter } from "next/navigation";
import TorqueScene from "@scenes/TorqueScene";
const Page = ({ params }) => {
  const router = useRouter();
  const { model, trick } = params;
  const showUI = useStore((s) => s.showUI);
  const showInfo = useStore((s) => s.showInfo);
  // const setModel = useStore((s) => s.setModel);
  // const setAnim = useStore((s) => s.selectAnim);

  // useMemo(() => {
  // 	model && setModel(model);
  // 	trick && setAnim(trick);
  // }, [model, trick]);

  // function useQueryParam(key) {
  // 	let [searchParams, setSearchParams] = useSearchParams();
  // 	let paramValue = searchParams.get(key);

  // 	let value = React.useMemo(() => JSON.parse(paramValue), [paramValue]);

  // 	let setValue = React.useCallback(
  // 		(newValue, options) => {
  // 			let newSearchParams = new URLSearchParams(searchParams);
  // 			newSearchParams.set(key, JSON.stringify(newValue));
  // 			setSearchParams(newSearchParams, options);
  // 		},
  // 		[key, searchParams, setSearchParams]
  // 	);

  // 	return [value, setValue];
  // }

  // let [urlState, setUrlState] = useQueryParam();
  // useMemo(() => {
  // 	setUrlState({ timescale, isPaused, start, end, showUI });
  // 	console.log("urlState:", urlState);
  // }, [timescale, isPaused, start, end, showUI]);
  // useMemo(() => {
  // 	setTimescale(urlState.timescale);
  // 	setIsPaused(urlState.timescale);
  // 	setUI(urlState.showUI);
  // }, [urlState.timescale, urlState.isPaused, urlState.showUI]);
  //canvas loading progress, async, will run on first render
  // console.log(useStore((state) => state.animationsArray));

  //General Design Handled Here

  const vidSrc = useVideoStore((s) => s.videoSource);
  const setVidSrc = useVideoStore((s) => s.setVideoSource);
  const videoOpacity = useVideoStore((s) => s.videoOpacity);
  const canvasOpacity = useVideoStore((s) => s.canvasOpacity);
  const setVideoOpacity = useVideoStore((s) => s.setVideoOpacity);
  const setCanvasOpacity = useVideoStore((s) => s.setCanvasOpacity);
  const setVidTime = useVideoStore((s) => s.setVidTime);
  const vidTime = useVideoStore((s) => s.vidTime);
  const setVidDuration = useVideoStore((s) => s.setVidDuration);
  let vid = useRef();
  useVideoControls(vid);

  return (
    <>
      <div id="Root-Container" className="fixed h-screen w-screen bg-zinc-900">
        <div
          id="show-hide-container"
          className="absolute top-[5.2rem] right-4 z-[1005] p-1"
        >
          <ShowHideToggle />
        </div>
        {showUI ? <UI /> : <MinimalUI />}
        {showInfo && <TrickInfo />}
        {vidSrc && (
          <video
            style={{ opacity: videoOpacity }}
            id={"video"}
            ref={vid}
            src={vidSrc}
            controls={false}
            muted
            //@ts-ignore
            onTimeUpdate={() => setVidTime(vid?.currentTime)}
            loop
            playsInline
            className={`absolute top-0 left-0 z-[-1] h-full w-full `}
          />
        )}
        <div
          style={{ opacity: canvasOpacity }}
          id="full-screen-canvas"
          className="absolute top-0 h-full w-full "
        >
          <Canvas className="h-100vh w-100vw">
            <TorqueScene gizmoHelper={false} model={model} trick={trick} />
          </Canvas>
          {/* <CanvasComponent /> */}
        </div>
      </div>
    </>
  );
};
export default Page;
