import CanvasComponent from "../components/panels/CanvasComponent";
import ModelSelector from "../components/ModelSelector";
import LoadingOverlay from "../components/LoadingOverlay.js";
import { useProgress } from "@react-three/drei";
import { useCallback, useMemo, useState } from "react";
import { useStore } from "../store/store.js";
import LeftPanelContent from "../components/panels/LeftPanelContent.js";
import RightPanelContent from "../components/panels/RightPanelContent.js";

import ModelDropdown from "../components/ModelDropdown";
import AnimationsDropwdown from "../components/AnimationsDropwdown";
import Controller from "../components/Controller";
import UI from "../components/UI";
import ShowHideToggle from "../components/ShowHideToggle";
import { useParams } from "react-router-dom";

export function Sandbox() {
	const showUI = useStore((s) => s.showUI);
	const { model, trick } = useParams();
	const setModel = useStore((s) => s.setModel);
	const setAnim = useStore((s) => s.selectAnim);
	useMemo(() => {
		model && setModel(model);
		trick && setAnim(trick);
	}, [model, trick]);

	//canvas loading progress, async, will run on first render
	// console.log(useStore((state) => state.animationsArray));

	//General Design Handled Here
	return (
		<>
			<div id='Root-Container' className='fixed h-screen w-screen'>
				<div
					id='show-hide-container'
					className='absolute top-[3.14rem] right-4 z-[1005]'>
					<ShowHideToggle />
				</div>
				{showUI && <UI />}

				<div
					id='full-screen-canvas'
					className='aboslute top-0 z-[100] order-1 h-[screen] min-h-min w-full min-w-full max-w-full justify-around overflow-hidden bg-zinc-900 md:relative md:order-2 md:min-h-screen md:min-w-fit '>
					<CanvasComponent />
				</div>
			</div>
		</>
	);
}
