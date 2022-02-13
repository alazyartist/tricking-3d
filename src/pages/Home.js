import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { TorqueScene } from "../scenes/Scene";
import Button from "../components/Button";
import ModelSelector from "../components/ModelSelector";
import AnimationSelectorButton from "../components/AnimationSelector";
import { Gui } from "../components/GUI";
import TrickInfo from "../components/TrickInfo";
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
						<TrickInfo />
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
						className=' bg-gray-700 min-w-[300px] min-h-[500px] z-1 grid grid-cols-3 gap-2 p-2 justify-items-stretch justify-around'>
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
