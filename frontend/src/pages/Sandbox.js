import CanvasComponent from "../components/panels/CanvasComponent";
import ModelSelector from "../components//media/ModelSelector";
import LoadingOverlay from "../components/LoadingOverlay.js";
import { useProgress } from "@react-three/drei";
import { useCallback, useMemo, useState } from "react";
import { useStore } from "../store/store.js";
import LeftPanelContent from "../components/panels/LeftPanelContent.js";
import RightPanelContent from "../components/panels/RightPanelContent.js";
import React from "react";
import ModelDropdown from "../components/ui/ModelDropdown";
import AnimationsDropwdown from "../components/ui/AnimationsDropwdown";
import Controller from "../components/media/Controller";
import UI from "../components/ui/UI";
import ShowHideToggle from "../components/ui/ShowHideToggle";
import { useParams, useSearchParams } from "react-router-dom";
import MinimalUI from "../components/ui/MinimalUI";
import InfoButton from "../components/ui/InfoButton";
import TrickInfo from "../components/info/TrickInfo";

export function Sandbox() {
	const { model, trick } = useParams();
	const showUI = useStore((s) => s.showUI);
	const showInfo = useStore((s) => s.showInfo);
	const timescale = useStore((s) => s.timescale);
	const isPaused = useStore((s) => s.isPaused);
	const start = useStore((s) => s.start);
	const end = useStore((s) => s.end);
	const setModel = useStore((s) => s.setModel);
	const setAnim = useStore((s) => s.selectAnim);
	const setTimescale = useStore((s) => s.setTimescale);
	const setUI = useStore((s) => s.setUI);
	const setIsPaused = useStore((s) => s.setIsPaused);
	useMemo(() => {
		model && setModel(model);
		trick && setAnim(trick);
	}, [model, trick]);

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
	return (
		<>
			<div id='Root-Container' className='fixed h-screen w-screen'>
				<div
					id='show-hide-container'
					className='absolute top-[.8rem] right-4 z-[1005]'>
					<ShowHideToggle />
				</div>
				{showUI && <UI />}
				{showInfo && <TrickInfo />}
				{!showUI && <MinimalUI />}
				<div
					id='full-screen-canvas'
					className='aboslute top-0  order-1 h-[screen] min-h-min w-full min-w-full max-w-full justify-around overflow-hidden bg-zinc-900 md:relative md:order-2 md:min-h-screen md:min-w-fit '>
					<CanvasComponent />
				</div>
			</div>
		</>
	);
}
