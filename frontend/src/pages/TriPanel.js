import CanvasComponent from "../components/panels/CanvasComponent";
import ModelSelector from "../components/ModelSelector";
import LoadingOverlay from "../components/LoadingOverlay.js";
import { useProgress } from "@react-three/drei";
import { useState } from "react";
import { useStore } from "../store/store.js";
import LeftPanelContent from "../components/panels/LeftPanelContent.js";
import RightPanelContent from "../components/panels/RightPanelContent.js";

import ModelDropdown from "../components/ModelDropdown";
import AnimationsDropwdown from "../components/AnimationsDropwdown";
import Controller from "../components/Controller";
import UI from "../components/UI";
import ShowHideToggle from "../components/ShowHideToggle";
export function Home() {
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
					id='App'
					className='flex min-h-screen flex-col items-center bg-gray-700 text-3xl'>
					{/* <div
						id='panel-container'
						className=' flex w-full flex-col md:flex-row'>
						<div
							id='left-panel'
							className=' order-3 flex w-full flex-col justify-between gap-4 bg-gray-700 p-5
						sm:w-[400px] md:order-1 md:mt-0 md:min-h-[500px]
						'>
						 <LeftPanelContent /> 
						</div> 
						 */}

					<div
						id='middle-panel'
						className='aboslute top-0 z-[100] order-1 h-[screen] min-h-min w-full min-w-full max-w-full justify-around overflow-hidden bg-zinc-900 md:relative md:order-2 md:min-h-screen md:min-w-fit '>
						<CanvasComponent />
					</div>

					{/* <div
							id='right-panel'
							className='z-[1] order-2 w-full min-w-fit bg-gray-700 p-[20px] sm:w-[700px] md:mt-0 md:w-[700px] lg:w-[700px]'>
							 <RightPanelContent /> 
						</div> 
					</div>
						*/}
				</div>
			</div>
		</>
	);
}
