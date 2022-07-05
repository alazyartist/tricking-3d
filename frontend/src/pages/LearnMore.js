import React from "react";
import { useNavigate } from "react-router-dom";
import DonateText from "../pages/contribute/components/DonateText.js";

function LearnMore() {
	const nav = useNavigate();
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
						onClick={() => nav("/3d/contribute")}>
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
					<h2 className='text-2xl font-semibold'>What does it include?</h2>
					<h3 className='text-xl'>Tricktionary</h3>
					<p className='indent-4 text-base font-light'>
						The goal is to create an application that can showcase Tricking
						movements in a way that can be easily pulled up and its associated
						information had at a glance. Each Trick will have information about
						its various Parts, Takeoff, Landing, What Trick Progression it is
						within, Prerequisites, and interactive 3D examples. Users should be
						able to have discussions around these Tricks and Concepts. Saving
						the ones most relevant to their current exploration of Tricking.
					</p>
					<h3 className='text-xl'>Theory</h3>
					<p className='indent-4 text-base font-light'>
						This section would be taking the pure theory of many of these tricks
						and show how they are used and manipulated. The goal here would be
						to encourage an understanding of how Tricks can be created an
						explored beyond what is commonly used.
					</p>
					<h3 className='text-xl'>Social</h3>
					<p className='indent-4 text-base font-light'>
						A different take on the social media experience. Instead of being
						able to add just anyone to your friends list. I think it would
						benefit us to encourage the in-person connection to be had first. So
						in order to capture another user you would need fo physically scan
						their code. This would mean we are only interacting with people we
						actually know in some way or other. Not complete strangers. I
						believe this will encourage more cordiality in discussion rather
						than the disrespect we commonly see on the internet. This would work
						by having a QR style code on the user’s device that other Users can
						scan to capture them. This encourages travel and interacting in
						person to grow your network, not mass clicking add friend because
						this person knows 5 people you do.
					</p>
					<h2 className='text-2xl font-semibold'>Machine Learning</h2>
					<h3 className='text-xl'>{"Video Capture & Comparison"}</h3>
					<p className='indent-4 text-base font-light'>
						The idea is to be able to upload your personally shot videos and
						compare them with a Trick you are working towards. Once uploaded you
						would be able to see the difference between your attempt and the
						goal you are working towards. Using computer vision to draw pose
						estimation on top of the body and the model we would be able to see
						very accurate differences between our actual attempts and the goals
						we are working towards. Having the Trick models be captured in a 3D
						way allows for any angle that you film from to be able to be
						overlayed with any trick you would want to emulate.
					</p>
					<h3 className='text-xl'>Video Analysis</h3>
					<p className='indent-4 text-base font-light'>
						Buiding on the Video Capture and Comparisson feature the idea here
						is to use the data from our users to build a Trick Classifier that
						will be able to watch through a video and make suggestions of the
						Tricks it is seeing. Eventually this would be able to take in
						footage and timestamp relevant Tricks with their relevant labels,
						making footage ingestion for video editing much easier.{" "}
					</p>
					<h3 className='text-xl'>Generative Animations</h3>
					<p className='indent-4 text-base font-light'>
						Using all of the other aspects of this Application together the
						attempt will be to create a completely interactive Trick builder
						that can take in paramaters and deliver back a new (possibly never
						been seen before) trick based on the criteria it was given. You
						would be able to select various element of a Trick and have an
						example be created for you out of those. Say an inside flip that has
						720degrees of rotation, takes off from hyper and lands in semi, and
						has a hook kick at the end. It would generate some version of a
						GrandMasterDoubleTwistHookHalfGyro. Which maybe has been done but i
						wouldnt know where to find footage of it off the top of my head.
						This would allow for that, or anything we could conceivably dream
						up, to be accessible.{" "}
					</p>
					<h2 className='text-2xl font-semibold'>
						Why build something like this?
					</h2>
					<p className='indent-4 text-base font-light'>
						Tricking is so much more than the movements, but it is through its
						movements that we discover that moreness. The rich world of
						exploration only comes after a basic understanding is grasped. The
						goal of this project is to bridge that gap. To create something that
						will speed up the realization of what is available to be played with
						to the newcomer. To create a set of tools that will take anyone on
						this journey and encourage it to develop faster and in the way that
						that individual sees fit.{" "}
					</p>
					<p className='indent-4 text-base font-light'>
						One of the biggest benefits I personally see Tricking delivering is
						that it opens us up to have conversations with ourselves about our
						goals, desires, and the obstacles in our way. When we do this it
						allows us to realize what we really want and go after that, learning
						to overcome the obstacles in our ways. That understanding is
						something that extends well beyond flips. So if we can get more
						people Tricking, and maybe coming to that understanding, those
						people will go on to do great things for all of us. The rising tide
						lifts all ships. So let us be that tide.
					</p>
					<DonateText />
				</div>
			</div>
		</>
	);
}

export default LearnMore;
