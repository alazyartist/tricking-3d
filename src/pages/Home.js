import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { TorqueScene } from "../scenes/Scene";
import ModelSelector from "../components/ModelSelector";
import AnimationSelectorButton from "../components/AnimationSelector";
import TrickInfo from "../components/TrickInfo";
import Controller from "../components/Controller";
import AnimationDropdown from "../components/AnimationDropdown.js";
export function Home() {
	// console.log(useStore((state) => state.animationsArray));

	//General Design Handled Here
	return (
		<div className='text-center'>
			<div
				id='App'
				className='flex min-h-screen flex-col items-center bg-gray-700 text-3xl'>
				<div
					id='tripanel'
					className=' flex w-full flex-col md:flex-row md:pr-6'>
					<div
						id='leftPane'
						className='order-3 w-full bg-gray-700 p-5 md:order-1 md:mt-0 md:min-h-[500px] md:min-w-[30%]'>
						<TrickInfo />
						<a
							className=' text-sky-400'
							href='https://torquetricking.com'
							target='_blank'
							rel='noopener noreferrer'>
							Powered By Torque
						</a>
					</div>

					<div
						id='MiddlePane'
						className=' z-1 fixed top-0 h-[500px] min-h-[500px] w-full justify-around bg-gray-500 md:relative md:order-2 md:min-h-screen md:min-w-[500px] '>
						<Canvas className='  min-h-[500px] min-w-[500px] resize-x'>
							<Suspense fallback={null}>
								<TorqueScene />
							</Suspense>
						</Canvas>
					</div>

					<div
						id='rightPane'
						className='  order-2 mt-[500px] min-w-[30%] bg-gray-700 p-2 md:mt-0'>
						<Controller />
						<AnimationDropdown />
					</div>
				</div>

				<h1 className='fixed top-0 text-center text-gray-800 md:mt-2'>
					Tricking-3D
				</h1>
			</div>
		</div>
	);
}
