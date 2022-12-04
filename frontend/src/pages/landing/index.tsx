import { Canvas } from "@react-three/fiber";
import TorqueScene from "@scenes/TorqueScene";
import React, { Suspense } from "react";
import Link from "next/link";
import { TrickedexLogo } from "@data/icons/TrickedexLogo";
import { NextPage } from "next";
import AnatomySketch from "old_pages/theory/components/AnatomySketchSVG";
import DetailCard from "@old_pages/landing/components/DetailCard";
import dynamic from "next/dynamic";
const MovingBackground = dynamic(
  () => import("@old_pages/landing/components/MovingBackground")
);
// const EnterSandboxLink = lazy(() =>
// 	import("../../pages/home/components/EnterSandboxLink")
// );
const LandingPage: NextPage = () => {
  return (
    <div className="no-scrollbar fixed top-0 flex h-[100vh] w-[100vw] flex-col place-items-center justify-between gap-2 overflow-y-scroll bg-zinc-100 text-zinc-800">
      <div
        id="abovethefold"
        className="flex h-[100vh] flex-shrink-0 flex-col items-center gap-2"
      >
        <TrickedexLogo className="flex-shrink-0 fill-zinc-800" />
        <div className="flex h-[120px] flex-shrink-0 flex-col place-content-center items-center">
          <div className="font-inter text-3xl font-light">
            Tricking is <span className="font-black">complicated.</span>
          </div>
          <div className="font-light">
            The trickedex gives you the tools <br />
            to make sense of it in one place
          </div>
        </div>
        <Link
          href="/sandbox"
          className="rounded-md bg-indigo-600 p-2 font-bold text-zinc-100"
        >
          Sandbox
        </Link>
        <Link
          href="/home"
          className="rounded-md bg-indigo-400 p-2 font-bold text-zinc-100"
        >
          Home
        </Link>
        <Suspense
          fallback={
            <div className="absolute top-[50vh] -z-20 h-[60vw] w-[60vw] rounded-full bg-teal-300 blur-3xl" />
          }
        >
          <MovingBackground />
        </Suspense>
        <div className="absolute top-[50vh] h-[60vw] w-[90vw] font-inter font-semibold text-zinc-800">
          <div className="text-center text-3xl">
            <span className="font-black ">Please </span>Excuse the Mess.
          </div>
          <div className="text-center">
            We are hard at work on some
            <br /> backend things at the moment.
            <br /> big update on the horizion.
            <div>Stay tuned</div>
          </div>
        </div>
        <div className="absolute top-[50vh] -z-20 h-[60vw] w-[60vw] rounded-full bg-teal-300 blur-3xl" />
        {/* <div className='flex w-[100vw] flex-shrink-0  gap-2 overflow-hidden'>
					<div className='h-[200px] w-[300px] flex-shrink-0 rounded-md bg-zinc-900'></div>
					<div className='h-[200px] w-[100px] flex-shrink-0 rounded-md bg-zinc-900'></div>
				</div> */}
        <div className="absolute bottom-4 font-inter text-3xl font-black">
          Scroll to See More
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DetailCard
          left
          link={"/sandbox"}
          cta={"Go to Sandbox"}
          title={"Explore Tricks in 3D"}
          description="See Tricks like never before. Study the movement's your way."
        >
          <Canvas className="rounded-md bg-zinc-900 md:min-h-[400px]">
            <Suspense>
              <TorqueScene />
            </Suspense>
          </Canvas>
        </DetailCard>
        <DetailCard
          link={"/theory"}
          cta={"Explore Theory Now"}
          title={"Have Quick Access to the Theory"}
          description="Fully Searchable and at you fingertips."
        >
          <AnatomySketch
            className={
              "h-[200px] w-[300px] rounded-md bg-zinc-900 md:h-[400px] md:w-[600px] "
            }
          />
        </DetailCard>
        <DetailCard
          left
          link={"/register"}
          cta={"Register Now"}
          title={"Track your progress"}
          description="Easily see what tricks you've done and track your goals"
        ></DetailCard>
        <DetailCard
          link={"/register"}
          cta={"Register Now"}
          title={"Follow your friends"}
          description="Keep track of your progress as a group."
        ></DetailCard>
        <div className="h-[40px]" />
        <Suspense
          fallback={
            <div className="absolute top-[50vh] -z-20 h-[60vw] w-[60vw] rounded-full bg-teal-300 blur-3xl" />
          }
        >
          <MovingBackground />
        </Suspense>
      </div>
    </div>
  );
};

export default LandingPage;
