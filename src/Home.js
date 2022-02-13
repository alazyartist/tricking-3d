import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { TorqueScene } from "./Scene";
import Button from "./Button";
import ModelSelector from "./ModelSelector";
import AnimationSelectorButton from "./AnimationSelector";
import { Gui } from "./GUI";
import TrickInfo from "./TrickInfo";
export function Home() {
	// console.log(useStore((state) => state.animationsArray));

	//General Design Handled Here
	return (
		<div className='text-center '>
			<div
				id='App'
				className='bg-[#666666] min-h-screen flex flex-col items-center text-3xl'>
				<div
					id='tripanel'
					className='flex flex-row items-center justify-around'>
					<div
						id='leftPane'
						className='p-5 bg-gray-700 min-w-[300px] min-h-[500px] z-1'>
						<AnimationSelectorButton />
					</div>

					<div className='bg-gray-500 min-w-[50%] min-h-[500px]'>
						<Canvas className='min-w-[50%] min-h-[500px]'>
							<Suspense fallback={null}>
								<TorqueScene />
							</Suspense>
						</Canvas>
					</div>
					<div
						id='rightPane'
						className=' bg-gray-700 min-w-[300px] min-h-[500px] z-1 grid grid-cols-3 space-x-2 pr-[10px]'>
						<Button />
						<Button />
						<Button />
						<Button />
						<Button />
						<Button />
						<Button />
						<Button />
						<Button />
					</div>
				</div>
				<h1 className='text-red-400 absolute mt-1'>
					An Interactive 3d Learning Experience
				</h1>
				<div id='btnContainer' className='flex flex-row'>
					<ModelSelector />
				</div>
				<TrickInfo />
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
