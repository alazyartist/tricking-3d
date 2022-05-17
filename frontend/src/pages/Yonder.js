import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Swamp from "../animations/Swamp";
import Loader from "../components/loaders/Loader";
import { YonderScene } from "../scenes/YonderScene";

function Yonder() {
	return (
		<>
			<div className='sticky top-0 h-14 bg-zinc-900' />
			<div className='flex place-content-center place-items-center'>
				<div className='m-4 flex w-[80vw] flex-col place-content-center place-items-center'>
					<div className='text-zinc-300'>Yonder</div>
					<div className='h-[80vh] w-full rounded-2xl '>
						<Canvas className='rounded-2xl text-zinc-300'>
							<Suspense fallback={<Loader />}>
								<YonderScene />
								{/* <Swamp /> */}
								<Html>Yonder Coming Soon</Html>
							</Suspense>
						</Canvas>
					</div>
				</div>
			</div>
		</>
	);
}

export default Yonder;
