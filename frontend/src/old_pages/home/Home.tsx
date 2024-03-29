"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "../../store/userStore";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
import PublicHomePage from "./components/PublicHomePage";
import { useSpring, animated } from "@react-spring/web";
import BiCube from "../../data/icons/BiCube";
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
import GetStartedPopup from "./components/GetStartedPopup";
import { FaQuestionCircle } from "react-icons/fa";
import MultiDonateButton from "@components/info/MultiDonateButton";

function Home({ userInfo: stringy }) {
  // const user = useUserStore((s) => s.userInfo?.username);
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const walkthroughSeen = useUserStore((s) => s.walkthroughSeen.home);

  const { isSignedIn } = useUser();
  useEffect(() => {
    if (isSignedIn && stringy) {
      const userInfo = JSON.parse(stringy);
      if (userInfo) {
        setUserInfo(userInfo);
        mixpanel.identify(userInfo?.uuid);
        mixpanel.people.set({
          $email: userInfo.email,
          $username: userInfo.username,
          $name: userInfo.username,
          $created: userInfo.createdAt,
          $last_login: userInfo.lastLoginAt,
          $image: userInfo.profilePic,
        });
      }
    }
  }, [stringy, isSignedIn]);

  const logoAnim = useSpring({
    to: { width: isSignedIn ? "50vw" : "100vw" },
  });
  const [helpVisible, setHelpVisible] = React.useState(false);
  useEffect(() => {
    if (walkthroughSeen) {
      setHelpVisible(!walkthroughSeen);
    }
  }, [walkthroughSeen]);
  return (
    <div className=" stick h-full w-full overflow-hidden ">
      <SignedIn>
        {helpVisible && (
          <GetStartedPopup
            setHelpVisible={setHelpVisible}
            steps={[
              {
                title: "Welcome",
                content:
                  "This walkthrough will show you around the site, you can close it at any time by pressing skip",
                id: "add-session-button",
              },
              {
                title: "QuickMenu",
                content:
                  "This will open a quickmenu with access to your profile,dashboard, and settings",
                id: "user-icon",
              },
              {
                title: "Dashboard",
                content: "You're Dashboard also can be foundhere",
                id: "dashboard-target-tabBar",
              },
              {
                title: "SandBox",
                content: "Click here to go to the sandbox",
                id: "sandbox-target-home",
              },
              {
                title: "SandBox..",
                content: "You can also access the sandbox from here",
                id: "sandbox-target-tabBar",
              },
              {
                title: "Add Session",
                content: "Click here to add a session",
                id: "add-session-button",
              },
              {
                title: "Socials",
                content: "Click here to go to the socials",
                id: "social-target-home",
              },

              {
                title: "TempFeed",
                content:
                  "This is the temp feed, it will be replaced with a real feed soon",
                id: "temp-feed",
              },

              {
                title: "Theory",
                content: "Access The Trickedex Theory Section",
                id: "theory-target",
              },
              {
                title: "Search",
                content: "Search for tricks, combos, users, and more",
                id: "search-bar",
              },
              {
                title: "Enjoy!",
                content: (
                  <div>
                    You Can find this walkthrough again
                    <br /> in the help menu under the{" "}
                    <FaQuestionCircle
                      className="inline"
                      color={"#cccccc"}
                      size={22}
                    />
                  </div>
                ),
                id: "help-button",
              },
            ]}
          />
        )}
      </SignedIn>
      <SignedOut>
        {helpVisible && (
          <GetStartedPopup
            setHelpVisible={setHelpVisible}
            steps={[
              {
                title: "Welcome",
                content:
                  "This walkthrough will show you around the site, you can close it at any time by pressing skip",
                id: "add-session-button",
              },

              {
                title: "SandBox",
                content: "Click here to go to the sandbox",
                id: "sandbox-target-home",
              },
              {
                title: "SandBox..",
                content: "You can also access the sandbox from here",
                id: "sandbox-target-tabBar",
              },
              {
                title: "Add Session",
                content: "Click here to add a session",
                id: "add-session-button",
              },
              {
                title: "Socials",
                content: "Click here to go to the socials",
                id: "social-target-home",
              },

              {
                title: "TempFeed",
                content:
                  "This is the temp feed, it will be replaced with a real feed soon",
                id: "temp-feed",
              },

              {
                title: "Theory",
                content: "Access The Trickedex Theory Section",
                id: "theory-target",
              },
              {
                title: "Search",
                content: "Search for tricks, combos, users, and more",
                id: "search-bar",
              },
              {
                title: "Enjoy!",
                content: (
                  <div>
                    You Can find this walkthrough again
                    <br /> in the help menu under the{" "}
                    <FaQuestionCircle
                      className="inline"
                      color={"#cccccc"}
                      size={22}
                    />
                  </div>
                ),
                id: "help-button",
              },
            ]}
          />
        )}
      </SignedOut>
      <div
        id="AppBackground-flex"
        className="flex h-full w-full flex-col place-items-center"
      >
        <div
          className={`flex w-full  ${
            isSignedIn ? "place-content-start" : "place-content-center "
          } text-center text-zinc-200 `}
        >
          <animated.div
            style={{ ...logoAnim }}
            className="left-0 flex max-w-[300px] flex-col text-center text-xl "
          >
            {!isSignedIn && "Welcome to the"}
            <TrickedexLogo className={`-m-2px flex fill-zinc-300`} />
          </animated.div>
        </div>
        <div className="no-scrollbar z-[1] h-[82vh] overflow-y-scroll rounded-xl bg-zinc-800 bg-opacity-40 py-2 backdrop-blur-xl">
          <div className="flex flex-col place-items-center">
            <div
              id="help-button"
              className="absolute right-5 z-[800]"
              onClick={() => setHelpVisible((prev) => !prev)}
            >
              <FaQuestionCircle color={"#cccccc"} size={30} />
            </div>
            <Link
              href="/learnMore"
              className="m-2 rounded-3xl bg-indigo-600 px-8 py-2 font-inter font-semibold text-zinc-200"
            >
              Learn More
            </Link>

            <AnimatedSearch />
            <Button
              id={"sandbox-target-home"}
              href={"/sandbox"}
              label={
                <span className="flex place-content-center items-center gap-2">
                  Sandbox 3D
                  <BiCube />
                </span>
              }
            />
            <SignedIn>
              <Button
                id={"add-session-button"}
                href="addSession"
                label={"Add Session"}
              />
            </SignedIn>
            <Button
              id={"combo-maker-button"}
              href="comboMaker"
              label={"Combo Maker"}
            />
            <SignedOut>
              <div className=" mb-2 mt-1 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-inter text-xl font-semibold text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] lg:max-w-[420px] ">
                <div className="flex place-content-center place-items-center gap-2">
                  <SignInButton mode="modal" afterSignInUrl="/addSession">
                    Add Session
                  </SignInButton>
                </div>
              </div>
            </SignedOut>

            <Button
              id={"social-target-home"}
              href={"/social"}
              label={"Social"}
            />
            <SignedIn>
              <div className="py-3">
                <MultiDonateButton />
              </div>
            </SignedIn>
          </div>

          <SignedOut>
            <div className="flex h-fit w-[90vw] max-w-[600px] flex-col place-content-center">
              <PublicHomePage />
            </div>
          </SignedOut>
          <div className="flex h-fit w-[90vw] max-w-[600px] flex-col place-content-center">
            <TempFeed />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

const Button = ({ href, label, id }) => {
  return (
    <Link
      id={id}
      href={href}
      className=" mb-2 mt-1 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-inter text-xl font-semibold text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] lg:max-w-[420px]"
    >
      <div className="flex place-content-center place-items-center gap-2">
        {label}
      </div>
    </Link>
  );
};
