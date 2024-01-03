import { TrickedexLogo } from "@data/icons/TrickedexLogo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router.js";
import React from "react";
import DonateText from "../contribute/components/DonateText";
import MachineLearning from "./components/MachineLearning";
import WhatDoesItInclude from "./components/WhatDoesItInclude";
import WhyBuildThis from "./components/WhyBuildThis";

function LearnMore() {
  const nav = useRouter();

  return (
    <div className="flex w-[100vw] flex-col place-items-center">
      <div className="h-screen w-[95vw] rounded-md bg-zinc-900 bg-opacity-70">
        <div className="no-scrollbar flex h-[88vh] w-full flex-col place-items-center justify-center overflow-y-scroll p-1 pt-14">
          <div className="flex h-full w-[80vw] max-w-[600px] flex-col place-content-start place-items-center gap-5 font-inter text-zinc-300">
            <div className="w-full">
              <h1 className="px-1 text-4xl font-bold leading-none tracking-[.12em] underline underline-offset-4 ">
                Road to
              </h1>
              <TrickedexLogo
                className={"-mt-3"}
                width={"full"}
                fill={"#d4d4d8"}
              />
            </div>
            <Image
              alt={"header"}
              src={"/learnMoreHeader.webp"}
              width={650}
              height={350}
            />
            <p className="indent-4 text-base font-light">
              In order to get where we would like to have this project it will
              take some time and some community support.{" "}
            </p>

            <ContributeLink />
            <h2 className="text-2xl font-semibold">What is the Trickedex?</h2>
            <p className="indent-4 text-base font-light">
              The Trickedex is the final goal for the current tricking-3d
              project in the works. The Trickedex is loosely based off the
              concept of the pokedex from Pokemon. This was a directory that had
              access to all of the pokemon and their various information. Many
              people have talked about such a concept for Tricking moves over
              time. It is our attempt to make that a reality.
            </p>
            <WhatDoesItInclude />
            <Image
              alt={"Trick Grid"}
              src={"/TrickGrid2.webp"}
              width={650}
              height={300}
              objectFit={"contain"}
            />
            <MachineLearning />

            <Image
              alt={"Capture Tricks"}
              src={"/CaptureTricks.webp"}
              width={650}
              height={300}
              objectFit={"contain"}
            />
            <WhyBuildThis />
            <ContributeLink />
            <DonateText />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnMore;

const ContributeLink = () => (
  <Link
    href={"/contribute"}
    className="rounded-md bg-orange-600 p-4 text-xl font-semibold text-zinc-100"
  >
    Become a Contributer
  </Link>
);
