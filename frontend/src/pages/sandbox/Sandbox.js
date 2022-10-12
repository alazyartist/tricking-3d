import CanvasComponent from "./CanvasComponent.js";
import { useEffect, useMemo } from "react";
import { useStore } from "../../store/store.js";

import React from "react";
import UI from "./ui/UI";
import ShowHideToggle from "./ui/ShowHideToggle";
import { useParams, useSearchParams } from "react-router-dom";
import MinimalUI from "./ui/MinimalUI";
import TrickInfo from "../../components/info/TrickInfo";
import { useVideoStore } from "./videoOverlay/useVideoStore.js";
import useVideoControls from "./videoOverlay/useVideoControls.js";

export default function Sandbox() {
	// const { model, trick } = useParams();
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
	let vid = document.getElementById("video");
	useVideoControls(vid);

	return (
		<>
			<div id='Root-Container' className='fixed h-screen w-screen bg-zinc-900'>
				<div
					id='show-hide-container'
					className='absolute top-[5.2rem] right-4 z-[1005] p-1'>
					<ShowHideToggle />
				</div>
				{showUI ? <UI /> : <MinimalUI />}
				{showInfo && <TrickInfo />}
				{vidSrc && (
					<video
						style={{ opacity: videoOpacity }}
						id={"video"}
						src={vidSrc}
						controls={false}
						muted
						onTimeUpdate={() => setVidTime(vid?.currentTime)}
						loop
						playsInline
						className={`absolute top-0 left-0 z-[-1] h-full w-full `}
					/>
				)}
				<div
					style={{ opacity: canvasOpacity }}
					id='full-screen-canvas'
					className='absolute top-0  order-1 h-[screen] min-h-min w-full min-w-full max-w-full justify-around overflow-hidden  md:relative md:order-2 md:min-h-screen md:min-w-fit '>
					<CanvasComponent />
				</div>
			</div>
		</>
	);
}
