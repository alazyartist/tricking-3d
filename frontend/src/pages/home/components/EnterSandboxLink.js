import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { TorqueScene } from "../../../scenes/TorqueScene";
import Loader from "../../../components/loaders/Loader";
import { Link } from "react-router-dom";

const EnterSandboxLink = () => {
	return (
		<Link
			to='/sandbox/'
			id='canvas-container'
			className='m-5 h-[40vw] w-[90vw] rounded-2xl bg-zinc-900 md:h-[40vh] md:w-[90vh] '>
			<Suspense fallback={<Loader />}>
				<Canvas className='rounded-2xl'>
					<Suspense fallback={<Loader />}>
						<TorqueScene />
					</Suspense>
				</Canvas>
			</Suspense>

			<div className='translate-y-[-5vh] lg:translate-y-[-6vh] 2xl:translate-y-[-10vh] '>
				<h1 className='l:text-4xl text-center text-xl font-black text-zinc-300 md:text-2xl'>
					Enter Sandbox
				</h1>
			</div>
		</Link>
	);
};

export default EnterSandboxLink;
