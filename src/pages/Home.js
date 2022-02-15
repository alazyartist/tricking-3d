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
				<div id='tripanel' className='flex w-full flex-col md:flex-row md:pr-6'>
					<div
						id='leftPane'
						className='order-2 w-full bg-gray-700 p-5 md:order-1 md:min-h-[500px] md:min-w-[30%]'>
						<AnimationSelectorButton />
						<TrickInfo />
					</div>

					<div className='min-h-[500px] min-w-[500px] bg-gray-500 md:order-2 '>
						<h1 className='absolute text-red-400 md:mt-1'>
							An Interactive 3d Learning Experience
						</h1>
						<Canvas className=' min-h-[500px] min-w-[500px] resize-x'>
							<Suspense fallback={null}>
								<TorqueScene />
							</Suspense>
						</Canvas>
					</div>

					<div
						id='rightPane'
						className=' z-1 order-3 grid min-w-[30%] grid-cols-3 justify-around justify-items-stretch gap-5 bg-gray-700 p-2'>
						<Controller />
					</div>
				</div>

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
