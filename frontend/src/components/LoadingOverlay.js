import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import DiscordLink from "./info/DiscordLink";
import PaypalDonate from "./info/PaypalDonate";
import Instructions from "./Instructions";

function LoadingOverlay({ progress, setIsLoaderOpen }) {
	return (
		<>
			<Header />
			<div className='fixed z-20 flex h-[100%] w-[100%] flex-col items-center justify-start overflow-scroll bg-zinc-900 pb-[7rem] text-white'>
				{/**top left header thing */}

				<div id='welcome-container' className='mt-14 flex place-content-center'>
					<div
						id='Welcome-message'
						className='w-full items-center justify-center gap-10 self-center rounded-md px-12 font-inter font-light sm:w-6/12
				md:w-7/12 lg:w-6/12 xl:w-4/12'>
						Welcome to <div className='inline font-bold'>Tricking-3D</div>. This
						is one part of a larger project I have been working on for the
						better part of the last few years.
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
				<h1 className='text-semibold mt-6 mb-[-1.5rem] font-inter'>
					Please wait while we prep the sandbox...
				</h1>
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
						<span className='text-red-500'>WILL</span> break and glitch out
						often.
						<br />
						<br />
						Please have patience.
						<DiscordLink />
					</div>
					<div>
						<h1 className='m-2 font-inter text-base text-slate-300'>
							Help Support Development
						</h1>
						<PaypalDonate />
					</div>
				</div>
				<Instructions />
			</div>
		</>
	);
}

export default LoadingOverlay;
