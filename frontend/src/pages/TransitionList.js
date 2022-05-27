import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import Loader from "../components/loaders/Loader";
import { transArr } from "../data/TricklistClass";
import { TrickListScene } from "../scenes/TrickListScene";
import { ReactComponent as AOAT } from "../data/AnatomyOfATrick.svg";
import { Link } from "react-router-dom";
import { animated, config, useTransition } from "react-spring";
export function TransitionList() {
	const [filteredTricks, setFilteredTricks] = useState([...transArr]);
	const handleFilter = (event) => {
		const searchTerm = event.target.value;
		console.log(searchTerm);
		const newFilter = transArr.filter((value) => {
			// console.log(value);
			return value.name.toLowerCase().includes(searchTerm.toLowerCase());
		});
		setFilteredTricks(newFilter);
	};

	const animatedFilter = useTransition(filteredTricks, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: {
			duration: 300,
			config: config.stiff,
		},
	});

	return (
		<>
			{/* <div className='sticky top-0 h-14 bg-zinc-900'></div> */}
			{/* <AOAT className='rounded-2xl bg-zinc-300' /> */}
			<input
				className='sticky top-0 w-full rounded-3xl p-2'
				type={"search"}
				placeholder='Search for Transitions...'
				onChange={handleFilter}
			/>
			<div className='font-inter mt-4 flex flex-col place-content-center place-items-center font-bold text-white'>
				{animatedFilter(({ opacity }, e) => (
					<animated.div
						style={{ opacity: opacity }}
						className='m-4 rounded-2xl bg-gradient-to-br from-sky-300 to-sky-400'>
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
							<div className='flex w-full flex-col text-zinc-600' id={e}>
								<div className='pr-2'>{`TransitionFamily: ${
									e.transitionType || "no base found"
								}`}</div>
								<div className='pr-2'>{`TakeoffStance: ${e.takeoffStance}`}</div>
								<div className='pr-2'>{`LandingStance: ${e.landingStance}`}</div>
								<div className='pr-2'>{`TakeoffStyle: ${e.takeoffStyle}`}</div>
								<div className='pr-2'>{`LandingStyle: ${e.landingStyle}`}</div>
								<div className='pr-2'>{`Direction: ${
									e.direction || "Any"
								}`}</div>
								<div className='pr-2'>{`Rotation: ${e.rotation}`}</div>
								<table className='m-3 rounded-3xl bg-teal-400'>
									<thead>
										<tr>
											<td>Name</td>
											<td>Rotation</td>
											<td>TakeoffStance</td>
											<td>TakeoffStyle</td>
											<td>LandingStance</td>
											<td>LandingStyle</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className='text-white'>{e.name}</td>
											<td className='text-white'>{e.rotation}</td>
											<td className='text-white'>{e.takeoffStance}</td>
											<td className='text-white'>{e.landingStance}</td>
											<td className='text-white'>{e.takeoffStyle}</td>
											<td className='text-white'>{e.landingStyle}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</animated.div>
				))}
			</div>
		</>
	);
}
