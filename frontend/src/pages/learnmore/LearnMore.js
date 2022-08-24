import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DonateText from "../contribute/components/DonateText.js";
import MachineLearning from "./components/MachineLearning.js";
import WhatDoesItInclude from "./components/WhatDoesItInclude.js";
import WhyBuildThis from "./components/WhyBuildThis.js";

function LearnMore() {
	const nav = useNavigate();
	const [open, setOpen] = useState(false);
	const [id, setId] = useState();

	return (
		<>
			<div id='sticky-header' className='sticky top-0 h-14 bg-zinc-900'></div>
			<div className='m-0  flex justify-center p-1'>
				<div className='flex w-[80vw] flex-col place-content-center place-items-center gap-5 font-inter text-zinc-300'>
					<h1 className='text-5xl font-bold'>Road to Trickedex</h1>
					<p className='indent-4 text-base font-light'>
						In order to get where we would like to have this project it will
						take some time and some community support.{" "}
					</p>
					<button
						className='rounded-xl bg-zinc-600 p-2 font-semibold text-sky-400'
						onClick={() => nav("/contribute")}>
						Contribute
					</button>
					<h2 className='text-2xl font-semibold'>What is the Trickedex?</h2>
					<p className='indent-4 text-base font-light'>
						The Trickedex is the final goal for the current tricking-3d project
						in the works. The Trickedex is loosely based off the concept of the
						pokedex from Pokemon. This was a directory that had access to all of
						the pokemon and their various information. Many people have talked
						about such a concept for Tricking moves over time. It is our attempt
						to make that a reality.
					</p>
					<WhatDoesItInclude />
					<MachineLearning />

					<WhyBuildThis />
					<DonateText />
				</div>
			</div>
		</>
	);
}

export default LearnMore;
