"use client";
import React from "react";
import Link from "next/link";
import { useUserStore } from "../../store/userStore";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
import PublicHomePage from "./components/PublicHomePage";
import { useSpring, animated } from "@react-spring/web";
import BiCube from "../../data/icons/BiCube";
import { trpc } from "utils/trpc";
import TempFeed from "./components/TempFeed";
import AnimatedSearch from "./components/AnimatedSearch";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import mixpanel from "@utils/mixpanel";

function Home() {
  // const user = useUserStore((s) => s.userInfo?.username);
  const { isSignedIn } = useUser();

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
        <div className="no-scrollbar z-[1] h-[84vh] overflow-y-scroll rounded-xl bg-zinc-800 bg-opacity-40 py-2 backdrop-blur-xl">
          <div className="flex flex-col place-items-center">
            <Link
              href="/learnMore"
              className="m-2 rounded-3xl bg-indigo-600 px-4 py-2 font-inter font-semibold text-zinc-300"
            >
              Learn More
            </Link>

            <SignedIn>
              <UserButton afterSignOutUrl="/home" />
              <SnagUserInfo />
            </SignedIn>
            <AnimatedSearch />
            <Button
              href={"/sandbox"}
              label={
                <span className="flex place-content-center items-center gap-2">
                  Sandbox <BiCube />
                </span>
              }
            />
            <SignedIn>
              <Button
                href={isSignedIn ? "/addSession" : "/login"}
                label={"Add Session"}
              />
            </SignedIn>
            <SignedOut>
              <div className=" mb-2 mt-1 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] ">
                <div className="flex place-content-center place-items-center gap-2">
                  <SignInButton mode="modal" afterSignInUrl="/addSession">
                    Add Session
                  </SignInButton>
                </div>
              </div>
            </SignedOut>

            <Button href={"/social"} label={"Social"} />
          </div>

          <div className="flex h-fit w-[90vw] max-w-[600px] flex-col place-content-center">
            {!isSignedIn ? (
              <PublicHomePage />
            ) : (
              // LoggedIn
              <>
                {/* <div className="flex flex-grow-0 justify-around  text-zinc-300">
                  <div className="grid w-[98%] grid-cols-2 grid-rows-2 place-content-center place-items-center gap-4"></div>
                </div> */}
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
      className=" mb-2 mt-1 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] "
    >
      <div className="flex place-content-center place-items-center gap-2">
        {label}
      </div>
    </Link>
  );
};

const SnagUserInfo = () => {
  const { isSignedIn, user } = useUser();
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const { data: userData } = trpc.userDB.findByClerkId.useQuery(
    { clerk_id: user?.id as string },
    {
      onSuccess(data) {
        setUserInfo({ ...data });
        mixpanel.identify(data.uuid);
      },
    }
  );
  return <></>;
};
