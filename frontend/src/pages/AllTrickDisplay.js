import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import Loader from "../components/loaders/Loader";
// import { TrickListArr } from "../data/TricklistClass";
import { TrickListScene } from "../scenes/TrickListScene";
import { ReactComponent as AOAT } from "../data/AnatomyOfATrick.svg";
import { Link } from "react-router-dom";
import { animated, useTransition, config } from "react-spring";
import TrickOrComboDetails from "../components/info/trickInfo/TrickOrComboDetails";
import useGetTricks from "../api/useGetTricks";
import { FaCheck } from "react-icons/fa";
import { IoIosBody, IoIosWalk } from "react-icons/io";
function AllTrickDisplay() {
	const { data: TrickListArr } = useGetTricks();
	const [filteredTricks, setFilteredTricks] = useState(TrickListArr);
	useEffect(() => {
		setFilteredTricks(TrickListArr);
		console.log(TrickListArr);
	}, [TrickListArr]);
	const handleFilter = (event) => {
		const searchTerm = event.target.value || "";
		const newFilter = TrickListArr.filter((value) => {
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
			<div
				id={"TrickListContainer"}
				className='sticky top-0 flex flex-col place-content-center place-items-center gap-4 font-inter font-bold '>
				<input
					className='w-full rounded-3xl p-2'
					type={"search"}
					placeholder='Search for Tricks...'
					onChange={handleFilter}
				/>
				{/* Maps over data returned from filter and displays it. */}
				<div className='flex flex-col gap-2'>
					{animatedFilter(({ opacity }, e) => (
						<animated.div
							style={{ opacity: opacity }}
							key={e}
							className='rounded-md bg-gradient-to-br from-zinc-500 to-zinc-600'>
							<Link
								to={`/sandbox/Kerwood/${e.name}`}
								className='flex place-items-center justify-between text-xl text-zinc-400'>
								<div className='p-2'>{e.name.toUpperCase()}</div>
								<div className='p-2'>
									{e.defaultAnimation && (
										<IoIosWalk className='text-emerald-400' />
									)}
								</div>
							</Link>
							{/* <div className='m-4 flex w-[60vw] flex-col rounded-lg p-2  text-left md:flex-row'> */}
							{/* <div className='flex w-full place-content-center place-items-center md:w-[50%]'>
								<Canvas className='rounded-2xl bg-zinc-800'>
									<Suspense fallback={<Loader />}>
										<TrickListScene trick={e.name} />
										</Suspense>
								</Canvas> 
							</div>*/}
							{/* <TrickOrComboDetails
								details={e}
								trickOrCombo='Trick'
								key={e.name}
							/> */}
							{/* <div
								className='flex w-full flex-col place-items-center text-zinc-600'
								id={e}>
								<div className=''>{`${e.takeoffStance}`}</div>
								<div className=''>{`Travels: ${e.direction}`}</div>
								<div className=''>{`Family: ${
									e.base?.name || e.base || "no base found"
								}`}</div>
								<div className=''>{`Rotation: ${e.rotation}`}</div>
								<div className=''>{`${e.landingStance}`}</div>
							</div> */}
							{/* </div> */}
						</animated.div>
					))}
				</div>
			</div>
		</>
	);
}

export default AllTrickDisplay;
