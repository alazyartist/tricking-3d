import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState, useRef } from "react";
import { FaCompass, FaHamburger } from "react-icons/fa";
import { useSpring, animated, config } from "react-spring";
import AdvancedStanceCircle from "../components/theory/AdvancedStanceCircle";
import TorqueScene from "../scenes/TorqueScene";
import AnatomyNav from "./theory/components/AnatomyNavSVG";
const TestSections = () => {
	const [changeHeight, setChangeHeight] = useState({
		ht1: "20vh",
		ht2: "60vh",
		ht3: "20vh",
	});
	const [lastSelected, setLast] = useState();
	const [isOpenSideDrawer, openSideDrawer] = useState(false);
	const [navOpen, setNavOpen] = useState(false);
	const ref1 = useRef();
	const ref2 = useRef();
	const ref3 = useRef();
	const sideDrawer = useRef();

	const { ht1, ht2, ht3 } = useSpring({
		onChange: () => {
			lastSelected.current.scrollIntoView({
				block: "nearest",
				inline: "end",
				behavior: "smooth",
			});
		},
		to: {
			ht1: changeHeight.ht1,
			ht2: changeHeight.ht2,
			ht3: changeHeight.ht3,
		},
		config: { tension: 180, friction: 12, mass: 1 },
	});
	const { width } = useSpring({
		to: { width: isOpenSideDrawer ? "50vw" : "0vw" },
		config: { ...config.stiff },
	});
	useEffect(() => {
		// ref3.current.scrollIntoView({
		// 	block: "end",
		// 	inline: "end",
		// 	behavior: "smooth",
		// });
	}, [changeHeight, setChangeHeight]);
	return (
		<div className='flex'>
			<animated.div
				style={{ width }}
				ref={sideDrawer}
				id='will-IT-portal'
				className='h-[100vh] bg-zinc-800'>
				Test
			</animated.div>

			<div
				id={"flex"}
				className=' no-scrollbar w-[100vw]} static h-[100vh] overflow-y-scroll font-inter text-xl font-bold text-zinc-900'>
				<animated.div
					ref={ref1}
					style={{ height: ht1 }}
					className='h-[20vh] w-full bg-zinc-800'>
					{navOpen ? (
						<Canvas className='overflow-hidden rounded-xl p-2'>
							<TorqueScene />
						</Canvas>
					) : (
						<AnatomyNav
							style={{ height: changeHeight.ht1 }}
							className='w-[100vw]'
						/>
					)}
					<div
						onClick={() => {
							setLast(ref1);
							setChangeHeight({
								...changeHeight,
								ht1: changeHeight.ht1 === "40vh" ? "20vh" : "40vh",
							});
						}}
						className=' relative z-[200] flex w-full place-content-end px-3 text-3xl text-zinc-400'>
						{/* {changeHeight.ht1 === "20vh" ? <MdExpandMore /> : <MdExpandLess />} */}
					</div>
				</animated.div>
				<div
					onClick={() => openSideDrawer(!isOpenSideDrawer)}
					className='relative top-[1vh] left-[2vh] z-[200] h-0 w-fit text-zinc-400'>
					<FaHamburger />
				</div>
				<div
					onClick={() => setNavOpen(!navOpen)}
					className='relative top-[4vh] left-[2vh] z-[200] h-0 w-fit text-zinc-400'>
					<FaCompass />
				</div>
				<animated.div
					ref={ref2}
					style={{ height: ht2 }}
					className='no-scrollbar relative h-[60vh] w-[100vw] overflow-y-auto bg-zinc-800'>
					<AdvancedStanceCircle sideDrawer={sideDrawer} />
					<div
						onClick={() => {
							setLast(ref2);
							setChangeHeight({
								...changeHeight,
								ht2: changeHeight.ht2 === "80vh" ? "60vh" : "80vh",
							});
						}}
						className=' absolute bottom-[1vh] z-[200] flex w-full place-content-end px-3 text-3xl text-zinc-600'>
						{/* {changeHeight.ht2 === "60vh" ? <MdExpandMore /> : <MdExpandLess />} */}
					</div>
				</animated.div>
				<animated.div
					ref={ref3}
					style={{ height: ht3 }}
					className=' w-[100vw]  bg-zinc-800'>
					<div
						onClick={() => {
							setLast(ref3);
							setChangeHeight({
								...changeHeight,
								ht3: changeHeight.ht3 === "40vh" ? "20vh" : "40vh",
							});
						}}
						className=' relative flex h-0  w-full translate-y-[3vh] place-content-end px-3 text-3xl text-zinc-400'>
						{/* {changeHeight.ht3 === "20vh" ? <MdExpandMore /> : <MdExpandLess />} */}
					</div>
				</animated.div>
			</div>
		</div>
	);
};

export default TestSections;
