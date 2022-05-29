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
		exitBeforeEnter: true,
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
				className=' w-full rounded-3xl p-2'
				type={"search"}
				placeholder='Search for Transitions...'
				onChange={handleFilter}
			/>
			<div
				id={"TransitionListContainer"}
				className='font-inter mt-4 flex max-h-[80vh] flex-col place-content-center place-items-center font-bold '>
				<div
					id='scrollContainer'
					className='flex max-h-[69vh] w-full flex-col  place-items-center overflow-hidden overflow-y-scroll font-bold text-white'>
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
								</div>
							</div>
						</animated.div>
					))}
				</div>
			</div>
		</>
	);
}
