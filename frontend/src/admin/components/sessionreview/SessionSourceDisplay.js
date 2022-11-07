import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { MdClose } from "../../../data/icons/MdIcons";
import { useSessionSummariesStore } from "./SessionSummaryStore";

const SessionSourceDisplay = ({ source }) => {
	const vidsrcRegex = /(^(\w+).*\.com\/watch\?v=)|(^(\w+.*)\/videos\/)/g;
	const vidRef = useRef();
	const seekTime = useSessionSummariesStore((s) => s.seekTime);
	const currentTime = useSessionSummariesStore((s) => s.currentTime);
	const setCurrentTime = useSessionSummariesStore((s) => s.setCurrentTime);

	const vidIsPlaying = useSessionSummariesStore((s) => s.vidIsPlaying);
	const vidsrc = useSessionSummariesStore((s) => s.vidsrc);
	const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
	useEffect(() => console.log(vidRef?.current), []);
	useEffect(() => {
		setCurrentTime(seekTime);
		vidRef?.current?.seekTo(seekTime);
	}, [seekTime]);

	const handleTimeUpdate = () => {
		setCurrentTime(vidRef.current?.getCurrentTime());
		if (vidRef?.current?.getCurrentTime() < vidRef.current?.getDuration()) {
			setTimeout(() => handleTimeUpdate(), 50);
		}
	};
	useEffect(() => {
		if (vidRef?.current?.player?.isPlaying) {
			handleTimeUpdate();
		}
	}, []);
	return (
		<div key={source.srcid + "1"} className='flex flex-col gap-2'>
			<div
				key={source?.vidsrc.replace(vidsrcRegex, "")}
				className='mt-2 flex w-full flex-col gap-4 rounded-md pl-0'>
				<div
					className={`rounded-md rounded-l-none ${
						vidsrc === source.vidsrc ? "bg-zinc-900" : "bg-zinc-700"
					}  p-2`}
					onClick={() => setVidsrc(source.vidsrc)}>
					{source?.vidsrc.replace(vidsrcRegex, "")}
				</div>
			</div>
			{
				vidsrc === source?.vidsrc ? (
					<div className='absolute top-[-15vh] left-[15vw] w-[70vw]'>
						<div className='relative flex max-h-[80vh] flex-col gap-2 overflow-hidden'>
							<div
								className='flex place-items-center gap-2'
								onClick={() => setVidsrc(false)}>
								{vidsrc === source?.vidsrc && <MdClose />}{" "}
								{source?.vidsrc.replace(vidsrcRegex, "")}
							</div>
							<ReactPlayer
								ref={vidRef}
								config={{ facebook: { appId: "508164441188790" } }}
								id={"video"}
								controls={false}
								playing={vidIsPlaying}
								muted
								width={"70vw"}
								height={"40vw"}
								onPlay={() => handleTimeUpdate()}
								loop
								playsInline
								url={source?.vidsrc}
							/>
							<input
								id='sessionSummary'
								type='range'
								step={0.001}
								onChange={(e) => {
									setCurrentTime(e.target.value);
									vidRef?.current?.seekTo(e.target.value);
								}}
								value={currentTime}
								min={0}
								max={vidRef?.current?.getDuration()}
								className={`w-[70vw] bg-transparent`}
							/>
						</div>
					</div>
				) : null
				// <div
				// 	key={source?.vidsrc.replace(vidsrcRegex, "")}
				// 	className='mt-2 flex w-full flex-col gap-4 rounded-md pl-0'>
				// 	<div
				// 		className='rounded-md rounded-l-none bg-zinc-700 p-2'
				// 		onClick={() => setVidsrc(source.vidsrc)}>
				// 		{source?.vidsrc.replace(vidsrcRegex, "")}
				// 	</div>
				// </div>
			}
		</div>
	);
};

export default SessionSourceDisplay;
