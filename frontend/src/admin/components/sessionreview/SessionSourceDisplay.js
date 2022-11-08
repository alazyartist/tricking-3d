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
	const clipData = useSessionSummariesStore((s) => s.clipData);
	const setVidIsPlaying = useSessionSummariesStore((s) => s.SetVidIsPlaying);
	const vidIsPlaying = useSessionSummariesStore((s) => s.vidIsPlaying);
	const setClipCombo = useSessionSummariesStore((s) => s.setClipCombo);
	const removeClipfromCombo = useSessionSummariesStore(
		(s) => s.removeClipfromCombo
	);
	const sessionData = useSessionSummariesStore((s) => s.sessionData);
	const clipCombo = useSessionSummariesStore((s) => s.clipCombo);
	const vidsrc = useSessionSummariesStore((s) => s.vidsrc);
	const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
	useEffect(() => console.log(vidRef?.current), [sessionData]);
	useEffect(() => {
		setCurrentTime(seekTime);
		vidRef?.current?.seekTo(seekTime);
	}, [seekTime]);
	let colors = ["bg-teal-300", "bg-emerald-300", "bg-indigo-300", "bg-sky-300"];
	// const handleTimeUpdate = () => {
	// 	setCurrentTime(vidRef.current?.getCurrentTime());
	// 	if (vidRef?.current?.getCurrentTime() < vidRef.current?.getDuration()) {
	// 		setTimeout(() => handleTimeUpdate(), 50);
	// 	}
	// };
	// useEffect(() => {
	// 	if (vidRef?.current?.player?.isPlaying) {
	// 		handleTimeUpdate();
	// 	}
	// }, []);
	let activeWidth = `${(
		((parseInt(clipData.endTime) - parseInt(clipData.startTime)) /
			vidRef.current?.getDuration()) *
		100
	).toFixed(2)}%`;
	let activeLeft = `${(
		(parseInt(clipData.startTime) / vidRef?.current?.getDuration()) *
		100
	).toFixed(2)}%`;
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
								controls={true}
								playing={vidIsPlaying}
								muted
								width={"70vw"}
								height={"40vw"}
								onProgress={({ playedSeconds }) =>
									setCurrentTime(playedSeconds)
								}
								// onPlay={() => handleTimeUpdate()}
								loop
								playsInline
								url={source?.vidsrc}
							/>
							<div className='relative w-[70vw]'>
								<input
									id='sessionSummary'
									type='range'
									step={0.001}
									onChange={(e) => {
										setCurrentTime(e.target.value);
										vidRef.current.seekTo(e.target.value);
									}}
									value={currentTime}
									min={0}
									max={vidRef?.current?.getDuration()}
									className={`w-[70vw] bg-transparent`}
								/>
								<div className=' w-full'>
									{/* switch for sessionData */}
									{
										// [
										// 	{
										// 		width: "w-[12%]",
										// 		left: "left-[22%]",
										// 		color: colors[3],
										// 	},
										// 	{
										// 		width: "w-[20px]",
										// 		left: "left-[740px]",
										// 		color: colors[1],
										// 	},
										// 	{
										// 		width: "w-[200px]",
										// 		left: "left-[440px]",
										// 		color: colors[3],
										// 	},
										// 	{
										// 		width: "w-[40px]",
										// 		left: "left-[120px]",
										// 		color: colors[0],
										// 	},
										// ]

										sessionData.map((e, i) => {
											return (
												<SessionDataDetails
													id='sesionDataDetails'
													key={`${i}+ 'data'`}
													e={e}
													i={i}
													duration={vidRef.current?.getDuration()}
												/>
											);
										})
									}
									<div
										style={{
											width: activeWidth,

											left: activeLeft,
										}}
										id={`activeSessionClip'`}
										key={`activeSessionClip'`}
										className={`absolute top-[4px] h-3 rounded-md bg-teal-300  `}></div>
								</div>
							</div>
							<div className='neumorphicIn flex w-full gap-2 rounded-md p-2 text-zinc-300'>
								{clipCombo.map((item, index) => (
									<span
										key={item.trick_id}
										onClick={() => {
											removeClipfromCombo(index);
										}}>
										{item.name}
									</span>
								))}
							</div>
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

const SessionDataDetails = ({ e, i, duration }) => {
	const [seeDetails, setSeeDetails] = useState(false);
	let w = `${(
		((parseInt(e.endTime) - parseInt(e.startTime)) / parseInt(duration)) *
		100
	).toFixed(2)}%`;
	let l = `${((parseInt(e.startTime) / parseInt(duration)) * 100).toFixed(0)}%`;
	return (
		<>
			{seeDetails && (
				<div
					style={{ width: "fit", left: l }}
					key={`${e.trick_id}detaildropdown`}
					className='absolute top-[20px] flex flex-col rounded bg-zinc-900 bg-opacity-40'>
					<div className=' '>{e.name}</div>
					<div className=' '>{e.startTime}</div>
					<div className=' '>{e.endTime}</div>
					{/* <div className=' '>{e.takeoffStance}</div>
					<div className=' '>{e.landingStance}</div>
					<div className=' '>{e.base_id}</div> */}
				</div>
			)}
			<div
				key={`${i}+${Math.random()}`}
				onMouseOver={() => setSeeDetails(true)}
				onMouseLeave={() => setSeeDetails(false)}
				style={{ width: w, left: l }}
				className={`absolute top-[4px] h-3 rounded-md bg-indigo-300 `}></div>
		</>
	);
};
