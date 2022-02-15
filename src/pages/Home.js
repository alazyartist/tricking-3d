import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { TorqueScene } from "../scenes/Scene";
import ModelSelector from "../components/ModelSelector";
import AnimationSelectorButton from "../components/AnimationSelector";
import TrickInfo from "../components/TrickInfo";
import Controller from "../components/Controller";
export function Home() {
	// console.log(useStore((state) => state.animationsArray));

	//General Design Handled Here
	return (
		<div className='text-center '>
			<div
				id='App'
				className='flex min-h-screen flex-col items-center bg-[#666666] text-3xl'>
				<div
					id='tripanel'
					className='flex flex-row items-center justify-around'>
					<div
						id='leftPane'
						className='z-1 min-h-[500px] min-w-[300px] bg-gray-700 p-5'>
						<AnimationSelectorButton />
						<TrickInfo />
					</div>

					<div className='min-h-[500px] min-w-[50%] bg-gray-500 '>
						<Canvas className='min-h-[500px] min-w-[50%] resize'>
							<Suspense fallback={null}>
								<TorqueScene />
							</Suspense>
						</Canvas>
					</div>
					<div
						id='rightPane'
						className=' z-1 grid min-h-[500px] min-w-[300px] grid-cols-3 justify-around justify-items-stretch gap-2 bg-gray-700 p-2'>
						<Controller />
					</div>
				</div>
				<h1 className='absolute mt-1 text-red-400'>
					An Interactive 3d Learning Experience
				</h1>
				<div id='btnContainer' className='flex flex-row'>
					<ModelSelector />
				</div>

				<a
					className='text-sky-400'
					href='https://torquetricking.com'
					target='_blank'
					rel='noopener noreferrer'>
					Powered By Torque
				</a>
			</div>
		</div>
	);
}
