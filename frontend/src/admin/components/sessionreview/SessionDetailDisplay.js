import { animated, useSpring } from "react-spring";
import React, { useState } from "react";
import { useSessionSummariesStore } from "./SessionSummaryStore";

const SessionDetailDisplay = ({ sessionDetails, mirrored, toggleMirrored }) => {
	const detailsVisible = useSessionSummariesStore((s) => s.detailsVisible);
	const setDetailsVisible = useSessionSummariesStore(
		(s) => s.setDetailsVisible
	);
	const showDetails = useSpring({
		from: { spanOpacity: 1, opacity: 0, left: "-10vw" },
		to: {
			spanOpacity: !detailsVisible ? 1 : 0,
			opacity: detailsVisible ? 1 : 1,
			left: detailsVisible ? "0" : "-122px",
		},
		delay: 100,
		config: { tension: 280, friction: 40 },
		// onRest: () => setOpenHamburger(!openHamburger),
	});

	return (
		<animated.div
			key={sessionDetails.sessionid + "details"}
			style={{ left: showDetails.left, opacity: showDetails.opacity }}
			className='relative flex w-full flex-col gap-2 rounded-md rounded-l-none bg-zinc-700 p-1 font-inter text-xs'>
			<div
				onClick={() => toggleMirrored(!mirrored)}
				className='absolute right-4 top-5 rounded-md bg-zinc-800 p-1 text-sm text-zinc-300'>
				{mirrored ? "Mirrored" : "Normal"}
			</div>
			<div onClick={() => setDetailsVisible()}>{sessionDetails?.name}</div>
			<div>{sessionDetails?.user_id?.slice(-4)}</div>
			<div>{new Date(sessionDetails?.sessionDate).toDateString()}</div>
			<div className='flex gap-2'>
				<div className='rounded-md bg-emerald-300 p-1 text-zinc-800'>
					{sessionDetails?.startTime}
				</div>
				<div className='rounded-md bg-red-300  p-1 text-zinc-800'>
					{sessionDetails?.endTime}
				</div>
			</div>
			<animated.span
				style={{ opacity: showDetails.spanOpacity }}
				className='absolute right-[-11px] top-[4.5vh] rotate-90'>
				Details
			</animated.span>
		</animated.div>
	);
};

export default SessionDetailDisplay;
