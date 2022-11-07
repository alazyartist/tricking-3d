import { animated, useSpring } from "react-spring";
import React, { useEffect, useState } from "react";
import { useSessionSummariesStore } from "./SessionSummaryStore";

const ActiveClipDisplay = () => {
	const activeClipData = useSessionSummariesStore((s) => s.clipData);
	const currentTime = useSessionSummariesStore((s) => s.currentTime);

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
	useEffect(() => console.log(activeClipData, "activeClip"), [activeClipData]);
	return (
		<animated.div
			key={activeClipData?.sessionid + "details"}
			onClick={() => {
				setClipDetailsVisible();
				console.log(activeClipData);
			}}
			style={{ right: showDetails.right, opacity: showDetails.opacity }}
			className='absolute top-[20vh] right-2 flex w-[139px] flex-col gap-2 rounded-md rounded-r-none bg-zinc-700 p-1 pl-6 font-inter text-xs text-zinc-300'>
			<div>{activeClipData?.name}</div>
			<div>{activeClipData?.user_id?.slice(-4)}</div>
			<div>clipLabel</div>
			<div>sessionid</div>
			<div>srcid</div>
			<div className='flex gap-2'>
				<div className='rounded-md bg-emerald-300 p-1 text-zinc-800'>
					{activeClipData?.startTime}
				</div>
				<div className='rounded-md bg-red-300  p-1 text-zinc-800'>
					{activeClipData?.endTime}
				</div>
				<div className='rounded-md bg-zinc-300  p-1 text-zinc-800'>
					{Math.floor(currentTime)}
				</div>
			</div>
			<animated.span
				style={{ opacity: showDetails.spanOpacity }}
				className='absolute left-[-11px] top-[4.5vh] -rotate-90'>
				Details
			</animated.span>
		</animated.div>
	);
};

export default ActiveClipDisplay;
