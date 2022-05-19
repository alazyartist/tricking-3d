import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Loader from "../components/loaders/Loader";
import { TrickListArr } from "../data/TricklistClass";
import { TrickListScene } from "../scenes/TrickListScene";
import { ReactComponent as AOAT } from "../data/AnatomyOfATrick.svg";
import { Link } from "react-router-dom";
import TrickMaker from "../components/theory/TrickMaker";
import ComboMaker from "../components/theory/ComboMaker";
function TrickList() {
	return (
		<>
			<div className='sticky top-0 h-14 bg-zinc-900'></div>
			<AOAT className='rounded-2xl bg-zinc-300' />
			<div className='font-inter mt-4 flex flex-col place-content-center place-items-center font-bold text-white'>
				{TrickListArr.map((e, i) => (
					<div className='m-4 rounded-2xl bg-gradient-to-br from-sky-300 to-sky-400'>
						<Link
							to={`/3d/sandbox/Kerwood/${e.name}`}
							className='flex-col p-2 text-2xl text-zinc-600'>
							{e.name.toUpperCase()}
						</Link>
						<div className='m-4 flex w-[60vw] flex-col rounded-lg p-2  text-left md:flex-row'>
							<div className='flex w-full place-content-center place-items-center md:w-[50%]'>
								<Canvas className='rounded-2xl bg-zinc-800'>
									<Suspense fallback={<Loader />}>
										<TrickListScene trick={e.name} />
									</Suspense>
								</Canvas>
							</div>
							<div className='flex w-full flex-col text-zinc-600' id={i}>
								<div className='pr-2'>{`TakeoffStance: ${e.takeoffStance}`}</div>
								<div className='pr-2'>{`TakeoffStyle: ${e.takeoffStyle}`}</div>
								<div className='pr-2'>{`Direction: ${e.direction}`}</div>
								<div className='pr-2'>{`Family: ${
									e.base?.name || e.base || "no base found"
								}`}</div>
								<div className='pr-2'>{`Rotation: ${e.rotation}`}</div>
								<div className='pr-2'>{`LandingStance: ${e.landingStance}`}</div>
								<div className='pr-2'>{`LandingStyle: ${e.landingStyle}`}</div>
								<table className='m-3 rounded-3xl bg-teal-400'>
									<tr>
										<td>Name</td>
										<td>Rotation</td>
										<td>TakeoffStance</td>
										<td>TakeoffStyle</td>
										<td>LandingStance</td>
										<td>LandingStyle</td>
									</tr>
									<tr>
										<td className='text-white'>{e.name}</td>
										<td className='text-white'>{e.rotation}</td>
										<td className='text-white'>{e.takeoffStance}</td>
										<td className='text-white'>{e.takeoffStyle}</td>
										<td className='text-white'>{e.landingStance}</td>
										<td className='text-white'>{e.landingStyle}</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				))}
				{/* <TrickMaker /> */}
				<ComboMaker />
			</div>
		</>
	);
}

export default TrickList;
