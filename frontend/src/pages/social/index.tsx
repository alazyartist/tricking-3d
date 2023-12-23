import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { FaQrcode } from "react-icons/fa";

const SocialPage = () => {
  return (
    <div className="flex flex-col place-items-center pt-14 font-inter">
      <h1 className="text-xl text-zinc-300">Social</h1>
      <p className="p-2 text-zinc-300">
        Here you can Capture Friends, See what's happening on the leaderboards,
        and debate with the community!
      </p>
      <SignedIn>
        <Link
          href={"/captures"}
          className=" mb-2 mt-1 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] "
        >
          <div className="flex place-content-center place-items-center gap-2">
            <FaQrcode /> Captures
          </div>
        </Link>
      </SignedIn>
      <SignedOut>
        <div className=" mb-2 mt-1 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] ">
          <div className="flex place-content-center place-items-center gap-2">
            <SignInButton mode="modal" afterSignInUrl="/addSession">
              <div className="flex place-content-center place-items-center gap-2">
                <FaQrcode /> Captures
              </div>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
      <Link
        href={"/leaderboard"}
        className=" mb-2 mt-1 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] "
      >
        <div className="flex place-content-center place-items-center gap-2">
          Leaderboards
        </div>
      </Link>
      <Link
        href={"/compare"}
        className=" mb-2 mt-1 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] "
      >
        <div className="flex place-content-center place-items-center gap-2">
          Compare
        </div>
      </Link>
      <Link
        href={"/debate"}
        className=" mb-2 mt-1 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] "
      >
        <div className="flex place-content-center place-items-center gap-2">
          Debate
        </div>
      </Link>
    </div>
  );
};

export default SocialPage;
