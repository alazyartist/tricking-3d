import AnimationDropdown from "../components/AnimationDropdown.js";
import AnimationSelectorButton from "../components/AnimationSelector";
import CanvasComponent from "../components/CanvasComponent";
import Controller from "../components/Controller";
import DurationSlider from "../components/DurationSlider";
import ModelSelector from "../components/ModelSelector";
import TimeSlider from "../components/TimeSlider";
import TrickInfo from "../components/TrickInfo";
import { ReactComponent as HorizontalLogo } from "../data/HorizontalLogo.svg";
import LoadingOverlay from "../components/LoadingOverlay.js";
import { useProgress } from "@react-three/drei";
import { Fragment, useState } from "react";
export function Home() {
	const [isLoaderOpen, setIsLoaderOpen] = useState(true);
	//open state for LoadingOverlay comp

	const { progress } = useProgress();
	//canvas loading progress, async, will run on first render

	// console.log(useStore((state) => state.animationsArray));

	//General Design Handled Here
	return (
		<Fragment>
			{/**loading overlay, comment out if not needed for dev purposes */}
			{isLoaderOpen && (
				<LoadingOverlay progress={progress} setIsLoaderOpen={setIsLoaderOpen} />
			)}
			<div id='Root-Container' className='text-center'>
				<div
					id='App'
					className='flex min-h-screen flex-col items-center bg-gray-700 text-3xl'>
					<div
						id='panel-container'
						className=' flex w-full flex-col md:flex-row'>
						<div
							id='left-panel'
							className='order-3 flex w-fit flex-col justify-between gap-4 bg-gray-700 p-5
						sm:w-[400px] md:order-1 md:mt-0 md:min-h-[500px]
						'>
							{/* TODO: Uncomment TrickInfo after empty anims are handled */}
							<TrickInfo />
							<h1
								id='notice-under-development'
								className=' basis-[1/6] text-base font-semibold text-red-500'>
								Note: Under Active Development. <br />
								WILL BREAK OFTEN
							</h1>
							<a
								id='logo-container'
								className='basis-[1/6] text-gray-500'
								href='https://torquetricking.com'
								target='_blank'
								rel='noopener noreferrer'>
								<div className='item-end justify-center rounded-xl bg-gray-800 p-2'>
									Powered By
									<HorizontalLogo
										id='torque-logo'
										fill='dimgray'
										className='items-center justify-center rounded-xl p-2'
									/>
								</div>
							</a>
						</div>

						<div
							id='middle-panel'
							className=' sticky top-0 z-[1000] order-1 h-1/2 min-h-min w-full min-w-full max-w-full justify-around overflow-hidden bg-zinc-700 md:relative md:order-2 md:min-h-screen md:min-w-fit '>
							<CanvasComponent />
						</div>

						<div
							id='right-panel'
							className='z-[1] order-2 w-full min-w-fit bg-gray-700 p-[20px] sm:w-[700px] md:mt-0 md:w-[700px] lg:w-[700px]'>
							<div id='duration-slider-container'>
								<DurationSlider />
							</div>
							<Controller />
							<TimeSlider />
							<AnimationDropdown />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
