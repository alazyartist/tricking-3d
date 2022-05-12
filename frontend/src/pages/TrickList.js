import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Loader from "../components/loaders/Loader";
import { TrickListArr } from "../data/TricklistClass";
import { TrickListScene } from "../scenes/TrickListScene";
import { ReactComponent as AOAT } from "../data/AnatomyOfATrick.svg";
function TrickList() {
	return (
		<>
			<div className='sticky top-0 h-14 bg-zinc-900'></div>
			<AOAT className='rounded-2xl bg-zinc-300' />
			<div className='font-inter mt-4 flex flex-col place-content-center place-items-center font-bold text-white'>
				{TrickListArr.map((e, i) => (
					<div className='m-4 rounded-2xl bg-gradient-to-br from-sky-300 to-sky-400'>
						<div className='flex-col p-2 text-2xl text-zinc-600'>
							{e.name.toUpperCase()}
						</div>
						<div className='m-4 flex w-[60vw] rounded-lg  p-2 text-left'>
							<div className='flex w-[50%] place-content-center place-items-center'>
								<Canvas className='rounded-2xl bg-zinc-800'>
									<Suspense fallback={<Loader />}>
										<TrickListScene trick={e.name} />
									</Suspense>
								</Canvas>
							</div>
							<div
								className='flex w-full flex-col place-items-center text-zinc-600'
								id={i}>
								<div className='pr-2'>{`TakeoffStance: ${e.takeoffStance}`}</div>
								<div className='pr-2'>{`TakeoffStyle: ${e.takeoffStyle}`}</div>
								<div className='pr-2'>{`Direction: ${e.direction}`}</div>
								<div className='pr-2'>{`Base: ${
									e.base.name || "no base found"
								}`}</div>
								<div className='pr-2'>{`LandingStance: ${e.landingStance}`}</div>
								<div className='pr-2'>{`LandingStyle: ${e.landingStyle}`}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default TrickList;
