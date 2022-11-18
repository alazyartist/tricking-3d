import { animated, useSpring } from "react-spring";
import React, { useEffect, useState } from "react";
import { useSessionSummariesStore } from "./SessionSummaryStore";
import { useParams } from "react-router-dom";

const ActiveClipDisplay = () => {
	const activeClipData = useSessionSummariesStore((s) => s.clipData);
	const currentTime = useSessionSummariesStore((s) => s.currentTime);
	const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
	const sessionData = useSessionSummariesStore((s) => s.sessionData);
	const clipCombo = useSessionSummariesStore((s) => s.clipCombo);

	const vidsrc = useSessionSummariesStore((s) => s.vidsrc);
	const { sessionid } = useParams();
	const setActiveClipData = useSessionSummariesStore((s) => s.setClipData);
	const clipDetailsVisible = useSessionSummariesStore(
		(s) => s.clipDetailsVisible
	);
	const setClipDetailsVisible = useSessionSummariesStore(
		(s) => s.setClipDetailsVisible
	);
	const showDetails = useSpring({
		from: { spanOpacity: 1, opacity: 0, right: "-10vw" },
		to: {
			spanOpacity: !clipDetailsVisible ? 1 : 0,
			opacity: clipDetailsVisible ? 1 : 1,
			right: clipDetailsVisible ? "0" : "-122px",
		},
		delay: 100,
		config: { tension: 280, friction: 40 },
		// onRest: () => setOpenHamburger(!openHamburger),
	});
	useEffect(
		() => console.log(activeClipData, "activeClip"),
		[activeClipData, sessionData]
	);
	return (
		<animated.div
			key={activeClipData?.sessionid + "details"}
			style={{ right: showDetails.right, opacity: showDetails.opacity }}
			className='absolute top-[40vh] right-2 flex w-[139px]  flex-col gap-2 rounded-md rounded-r-none bg-zinc-700 p-1 pl-6 font-inter text-xs text-zinc-300 md:top-[20vh]'>
			<div
				onClick={() => {
					setClipDetailsVisible();
					console.log(activeClipData);
				}}
				className='absolute left-[-4px] h-full w-[25px] '
			/>
			<div className='whitespace-pre-wrap'>
				{clipCombo.map((e) => e.name).join(">")}
			</div>
			<div>{activeClipData?.name}</div>
			<div>
				Points:
				{clipCombo.length &&
					clipCombo.reduce((sum, b) => sum + b.pointValue, 0)}
			</div>
			<div>{activeClipData?.user_id?.slice(-4)}</div>
			<div>{activeClipData?.sessionid}</div>
			<div>{activeClipData?.bail > 0 && activeClipData?.bail}</div>
			<div>{activeClipData?.vidsrc}</div>
			<div className='flex justify-around gap-2 text-center font-bold'>
				<div
					onClick={() => setSeekTime(activeClipData?.startTime)}
					className='min-w-10 rounded-md bg-emerald-300 p-1 text-zinc-800'>
					{activeClipData?.startTime}
				</div>
				<div
					onClick={() => setSeekTime(activeClipData?.endTime)}
					className='min-w-10 rounded-md bg-red-300  p-1 text-zinc-800'>
					{activeClipData?.endTime}
				</div>
			</div>
			<div className='w-24 place-self-center rounded-md bg-zinc-300 p-1  text-center font-bold text-zinc-800'>
				{Math.floor(currentTime)}
			</div>
			<animated.span
				style={{ opacity: showDetails.spanOpacity }}
				className='absolute left-[-11px] top-[4.5vh] -rotate-90'>
				Details
			</animated.span>
			<div className='flex flex-col'>
				{sessionData?.map((e, i) => (
					<div
						key={sessionData[i].id + `${Math.random()}`}
						className='flex gap-1'>
						<div
							onClick={() => console.log(e)}
							className='relative whitespace-nowrap p-1 transition delay-75 duration-[1400ms] ease-in-out hover:translate-x-[-100%] hover:bg-zinc-900'>
							{e.name}
						</div>
					</div>
				))}
			</div>
		</animated.div>
	);
};

export default ActiveClipDisplay;
