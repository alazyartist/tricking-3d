"use client";
// import ComboMakerV2 from "../comboMakerV2/ComboMakerV2";
// import Feed from "./components/Feed";
// import ComboMakerBlueprintsvg from "../../data/ComboMakerBlueprintsvg";
// const TricklistPage = dynamic(() => import("../tricklist/TricklistPage"));
import React, { lazy, Suspense, useState } from "react";
import { FaClipboardList, FaQrcode } from "react-icons/fa";
import Link from "next/link";
import { BsClipboardCheck } from "react-icons/bs";
import { useUserStore } from "../../store/userStore";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
import useUserInfo from "../../api/useUserInfo";
import { IoIosArrowBack, IoMdSearch } from "react-icons/io";
import PublicHomePage from "./components/PublicHomePage";
import { useSpring, animated } from "react-spring";
import BiCube from "../../data/icons/BiCube";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { trpc } from "utils/trpc";
import AllTrickDisplay from "@old_pages/AllTrickDisplay";
import UserList from "@components/UserList";
import { AiOutlineUser } from "react-icons/ai";
import TempFeed from "./components/TempFeed";
import AnimatedSearch from "./components/AnimatedSearch";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
const CapturesPage = dynamic(() => import("../dash/components/CapturesPage"));
const ClaimTricks = dynamic(() => import("../claimtricks/ClaimTricks"));

function Home() {
  // const user = useUserStore((s) => s.userInfo?.username);
  const { isSignedIn, user } = useUser();
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const { data: userData } = trpc.userDB.findByClerkId.useQuery(
    { clerk_id: user?.id },
    {
      onSuccess(data) {
        setUserInfo({ ...data });
      },
    }
  );
  console.log(userData);
  const { uuid } = useUserStore((s) => s.userInfo);
  console.log(user);
  const [seeUserList, setSeeUserList] = useState(false);
  const logoAnim = useSpring({
    to: { width: isSignedIn ? "50vw" : "100vw" },
  });

  return (
    <div className=" stick h-full w-full  md:pt-[15vh] ">
      <div
        id="AppBackground-flex"
        className="flex h-full w-full flex-col place-items-center"
      >
        <div
          className={`flex w-full  ${
            isSignedIn ? "place-content-start" : "place-content-center"
          } text-center text-zinc-200 xl:absolute xl:top-0`}
        >
          <animated.div
            style={{ ...logoAnim }}
            className="left-0 flex max-w-[300px] flex-col text-center text-xl "
          >
            {!isSignedIn && "Welcome to the"}
            <TrickedexLogo className={`-m-2px flex fill-zinc-300`} />
          </animated.div>
        </div>
        {/*
        //Maybe open capture buton
         <FaQrcode
          className={
            "absolute top-14 left-2 place-self-start rounded-md bg-zinc-700 p-2 text-4xl"
          }
        /> */}
        <div className="no-scrollbar z-[1] h-[86%] overflow-y-scroll rounded-xl bg-zinc-800 bg-opacity-40 py-2 backdrop-blur-xl">
          <div className="flex flex-col place-items-center">
            <Link
              href="/learnMore"
              className="m-2 rounded-3xl bg-indigo-600 px-4 py-2 font-inter font-semibold text-zinc-300"
            >
              Learn More
            </Link>

            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut></SignedOut>
            <Button
              href={"/sandbox"}
              label={
                <span className="flex place-content-center items-center gap-2">
                  Sandbox <BiCube />
                </span>
              }
            />
            <Link
              href={"/pppoints"}
              className=" mt-1 mb-1 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)]"
            >
              BattleRooms
            </Link>
            <SignedIn>
              <Button
                href="/captures"
                label={
                  <>
                    <FaQrcode />
                    <div>Capture</div>
                  </>
                }
              />
            </SignedIn>
            <AnimatedSearch />
            <SignedIn>
              <Button
                href={isSignedIn ? "/addSession" : "/login"}
                label={"Add Session"}
              />
            </SignedIn>
            <Button href={"/compare"} label={"Compare"} />
            <Button href={"/debate"} label={"Debate"} />
            <div
              onClick={() => setSeeUserList(!seeUserList)}
              className=" mt-1 mb-2 flex w-[70vw] max-w-[600px] place-content-center place-items-center gap-2 rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] "
            >
              <AiOutlineUser className={"text-xl"} />
              <div className="">Leaderboards</div>
            </div>
          </div>

          {seeUserList && (
            <div
              className={` no-scrollbar relative top-0 my-2 flex max-h-[75vh] w-full max-w-[700px] flex-col place-items-center gap-2 overflow-y-scroll rounded-xl bg-zinc-800 bg-opacity-40 pt-[3vh] backdrop-blur-xl ${
                seeUserList ? "col-span-2 row-span-2 my-0" : ""
              }`}
            >
              <IoIosArrowBack
                className="absolute top-4 right-1 text-4xl"
                onClick={() => setSeeUserList(!seeUserList)}
              />
              <UserList />
            </div>
          )}
          <div className="flex w-[90vw] max-w-[600px] flex-col place-content-center">
            {!isSignedIn ? (
              <PublicHomePage />
            ) : (
              // LoggedIn
              <>
                <div className="flex flex-grow-0 justify-around  text-zinc-300">
                  <div className="grid w-[98%] grid-cols-2 grid-rows-2 place-content-center place-items-center gap-4"></div>
                </div>
              </>
            )}
            <TempFeed />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

const Button = ({ href, label }) => {
  return (
    <Link
      href={href}
      className=" mt-1 mb-2 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] "
    >
      <div className="flex place-content-center place-items-center gap-2">
        {label}
      </div>
    </Link>
  );
};
