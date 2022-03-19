import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import DiscordLink from "./DiscordLink";
import Instructions from "./Instructions";

function LoadingOverlay({ progress, setIsLoaderOpen }) {
	return (
		<div className='fixed z-[1001] flex h-[100%] w-[100%] flex-col items-center justify-start overflow-scroll bg-gray-900 pb-[7rem] text-white'>
			{/**top left header thing */}
			<div
				className='flex w-full flex-col content-start
	      justify-start py-5 px-5'>
				<div>
					<p className='font-inter text-2xl font-extrabold'>Tricking 3D</p>
				</div>
				<div />
			</div>
			<div id='welcome-container' className='items-center justify-center'>
				<div
					id='Welcome-message'
					className='font-inter w-full items-center justify-center 
				gap-10 rounded-md px-12 font-light sm:w-6/12
				md:w-7/12 lg:w-6/12 xl:w-4/12'>
					Welcome to <div className='inline font-bold'>Tricking-3D</div>. This
					is one part of a larger project I have been working on for the better
					part of the last few years.
					<br />
					<br /> It began as writing a book about Tricking.
					<br />
					<br /> Alongside that book I began creating some 2d graphics to go
					alongside the written portion but something was missing. Once I
					realized what it was I began learning how to build what I could
					picture in my mind. <br />
					<br />
					With some help and after many sleepless nights I am happy to release
					the early beta of Tricking-3d. I hope this will be a starting point
					for many future projects.
				</div>
			</div>

			{/**loader container */}
			<div
				id='start-button-container'
				className='flex h-[30rem] w-10/12 flex-col items-center 
	  	justify-center gap-10 rounded-md p-10 sm:w-6/12
          md:w-7/12 lg:w-6/12 xl:w-4/12'>
				{progress !== 100 && (
					<div>
						<p className='text-4xl font-medium'>{Math.trunc(progress)}%</p>
					</div>
				)}
				{progress === 100 && (
					<div>
						<Link to={"/3d/sandbox"}>
							<button
								id='start-button'
								className='focus:shadow-outline m-2 h-12 rounded-lg bg-indigo-600 px-6 text-lg 
							text-indigo-100 transition-colors duration-500 hover:bg-indigo-700'
								onClick={() => setIsLoaderOpen(false)}>
								<p className='text-large font-bold'>Start</p>
							</button>
						</Link>
					</div>
				)}
				<div
					id='beta-warning'
					className='text-center text-base font-semibold text-slate-300'>
					This app is currently in beta and
					<br />
					<div className='inline text-red-500'>WILL</div> break and glitch out
					often.
					<br />
					<br />
					Please have patience.
					<DiscordLink />
				</div>
			</div>
			<Instructions />
		</div>
	);
}

export default LoadingOverlay;
