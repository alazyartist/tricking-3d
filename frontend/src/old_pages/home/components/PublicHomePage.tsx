import React from "react";
import Link from "next/link";
import Image from "next/image";
// import ComboMakerBlueprint from "../../../data/ComboMakerBlueprint.svg";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";
import MultiDonateButton from "../../../components/info/MultiDonateButton";
import TheoryCap from "../../../data/icons/TheoryCap";
import ComboMakerBlueprintsvg from "@data/ComboMakerBlueprintsvg";

const PublicHomePage = () => {
  return (
    <div className="flex flex-col place-content-center place-items-center">
      {/* <Link className="" href="/instructions">
        <div className=" mt-4 mb-8 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-30 p-2 text-center font-titan text-3xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] ">
          <div>Instructions</div>
        </div>
      </Link> */}

      {/* <div className="m-2 flex w-full max-w-[620px] place-content-center gap-4 rounded-xl p-2 text-zinc-300">
        <Link
          className="flex h-20 w-full flex-col place-content-center place-items-center rounded-xl bg-gradient-to-b from-zinc-800  text-4xl"
          href="/comboMaker"
        > */}
      {/* UnderConstruction Label */}
      {/* <div className='relative top-7 right-8 -rotate-[22deg] rounded-md bg-red-500 bg-opacity-70 p-2 text-sm'>
						Under Construction
					</div> */}
      {/* <ComboMakerBlueprintsvg fill={"#d4d4d8"} /> */}
      {/* <ComboMakerBlueprint fill={"#d4d4d8"} /> */}
      {/* <div className="mt-[-14px] text-sm font-bold">Combo Maker</div> */}
      {/* </Link> */}
      {/* <Link */}
      {/* className="flex h-20 w-full flex-col place-content-center place-items-center rounded-xl bg-gradient-to-b from-zinc-800 text-6xl" 
          href="/theory"
        >
          <TheoryCap />
          <div className="text-sm font-bold">Theory</div>
        </Link>
      </div>
          */}

      <div className=" flex gap-4">
        <div
          className={
            "flex w-full place-content-center place-items-center gap-4"
          }
        >
          <div
            className={"rounded-xl bg-zinc-300 p-3 py-2 text-xl text-zinc-700"}
          >
            <SignInButton mode="modal" redirectUrl={"/home"}>
              Login
            </SignInButton>
          </div>
          <div
            className={"rounded-xl bg-zinc-700 p-3 py-2 text-xl text-zinc-300"}
          >
            <SignUpButton mode="modal" redirectUrl="/home">
              Register
            </SignUpButton>
          </div>
        </div>
        {/* <Link href="/login">
          <div className="w-fit rounded-xl bg-zinc-300 p-3">LOGIN</div>
        </Link>
        <Link href="/register">
          <div className="w-fit rounded-xl bg-zinc-700 p-3 text-zinc-300">
            REGISTER
          </div>
        </Link> */}
      </div>

      <div className="bottom-8 py-8">
        <MultiDonateButton />
      </div>
    </div>
  );
};

export default PublicHomePage;
