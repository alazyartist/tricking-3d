import CanvasComponent from "../components/panels/CanvasComponent";
import ModelSelector from "../components/media/ModelSelector";
import LoadingOverlay from "../components/LoadingOverlay.js";
import { useProgress } from "@react-three/drei";
import { useState } from "react";
import { useStore } from "../store/store.js";
import LeftPanelContent from "../components/panels/LeftPanelContent.js";
import RightPanelContent from "../components/panels/RightPanelContent.js";

import ModelDropdown from "../components/ui/ModelDropdown";
import AnimationsDropwdown from "../components/ui/AnimationsDropwdown";
import Controller from "../components/media/Controller";
import UI from "../components/ui/UI";
import ShowHideToggle from "../components/ui/ShowHideToggle";
import { Outlet } from "react-router-dom";
export function FullScreen() {
	const [isLoaderOpen, setIsLoaderOpen] = useState(true);
	//open state for LoadingOverlay comp
	const { progress } = useProgress();
	const showUI = useStore((s) => s.showUI);
	//canvas loading progress, async, will run on first render

	// console.log(useStore((state) => state.animationsArray));

	//General Design Handled Here
	return (
		<>
			{/**loading overlay, comment out if not needed for dev purposes */}
			{isLoaderOpen && (
				<LoadingOverlay progress={progress} setIsLoaderOpen={setIsLoaderOpen} />
			)}
			<div id='Root-Container' className='fixed h-screen w-screen'>
				<div
					id='show-hide-container'
					className='absolute top-[3.14rem] right-4 z-[1005]'>
					{!isLoaderOpen && <ShowHideToggle />}
				</div>
				{showUI && !isLoaderOpen && <UI />}

				<div
					id='full-screen-canvas'
					className='aboslute top-0 z-[100] order-1 h-[screen] min-h-min w-full min-w-full max-w-full justify-around overflow-hidden bg-zinc-900 md:relative md:order-2 md:min-h-screen md:min-w-fit '>
					<CanvasComponent />
				</div>
			</div>
		</>
	);
}
