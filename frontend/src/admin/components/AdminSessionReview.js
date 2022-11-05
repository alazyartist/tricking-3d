import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useGetSessionDetailsbySessionid } from "../../api/useSessionSummaries";
import { MdClose } from "../../data/icons/MdIcons";
import { useTransition, animated, useSpring } from "react-spring";

const AdminSessionReview = () => {
	const { sessionid } = useParams();
	const { data } = useGetSessionDetailsbySessionid(sessionid);
	const sessionDetails = data?.data;
	// console.log(sessionDetails);
	const [playerVisible, setPlayerVisible] = useState(false);
	return (
		<div>
			<Link to={-1}>
				<IoIosArrowBack className='absolute top-4 left-2 text-3xl text-zinc-300' />
			</Link>
			{sessionDetails && (
				<div className='mt-8 flex flex-col place-items-center text-zinc-300'>
					<div>{sessionDetails?.name}</div>
					<div className='absolute left-2 top-[20vh]'>
						<SessionDetailDisplay sessionDetails={sessionDetails} />

						{sessionDetails?.SessionSources?.map((source) => (
							<SessionSourceDisplay
								playerVisible={playerVisible}
								setPlayerVisible={setPlayerVisible}
								source={source}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminSessionReview;

const SessionSourceDisplay = ({ source, playerVisible, setPlayerVisible }) => {
	const vidsrcRegex = /(^(\w+).*\.com\/watch\?v=)|(^(\w+.*)\/videos\/)/g;
	const vidRef = useRef();
	useEffect(() => console.log(vidRef), []);
	return (
		<div key={source.srcid + "1"} className='flex flex-col gap-2'>
			{playerVisible === source?.vidsrc ? (
				<div className='absolute top-[-15vh] left-[15vw] flex w-[80vw] flex-col gap-2'>
					<div
						className='flex place-items-center gap-2'
						onClick={() => setPlayerVisible(false)}>
						{playerVisible === source?.vidsrc && <MdClose />}{" "}
						{source?.vidsrc.replace(vidsrcRegex, "")}
					</div>
					<ReactPlayer
						ref={vidRef}
						config={{ facebook: { appId: "508164441188790" } }}
						id={"video"}
						controls={false}
						muted
						width={"70vw"}
						height={"39.5vw"}
						loop
						playsInline
						className={`h-full w-full`}
						url={source?.vidsrc}
					/>
					<input
						id='sessionSummary'
						type='range'
						min={0}
						max={vidRef?.current}
						className={`w-[70vw] bg-transparent`}
					/>
				</div>
			) : (
				<div
					key={source?.vidsrc.replace(vidsrcRegex, "")}
					className='flex flex-col gap-4 rounded-md p-2 pl-0'>
					<div
						className='rounded-md rounded-l-none bg-zinc-700 p-2'
						onClick={() => setPlayerVisible(source.vidsrc)}>
						{source?.vidsrc.replace(vidsrcRegex, "")}
					</div>
				</div>
			)}
		</div>
	);
};

const SessionDetailDisplay = ({ sessionDetails }) => {
	const [detailsVisible, setDetailsVisible] = useState(true);
	const showDetails = useSpring({
		from: { spanOpacity: 1, opacity: 0, left: "-10vw" },
		to: {
			spanOpacity: !detailsVisible ? 1 : 0,
			opacity: detailsVisible ? 1 : 1,
			left: detailsVisible ? "0" : "-6.5vw",
		},
		delay: 100,
		config: { tension: 280, friction: 40 },
		// onRest: () => setOpenHamburger(!openHamburger),
	});

	return (
		<animated.div
			onClick={() => setDetailsVisible(!detailsVisible)}
			style={{ ...showDetails }}
			className='relative flex flex-col gap-2 rounded-md rounded-l-none bg-zinc-700 p-1 font-inter text-xs'>
			<div>{sessionDetails?.name}</div>
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
