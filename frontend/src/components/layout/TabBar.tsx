import React, { useEffect, useState } from "react";
import Link from "next/link";
import ComboMakerBlueprintsvg from "../../data/ComboMakerBlueprintsvg";
import { animated, useSpring, useTransition } from "@react-spring/web";
import useLogout from "../../hooks/useLogout";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import TheoryCap from "../../data/icons/TheoryCap";
import HamburgerMenu from "../../data/icons/HamburgerMenu";
import HomeIcon from "../../data/icons/HomeIcon";
import AdminLockIcon from "../../data/icons/AdminLockIcon";
import BiCube from "../../data/icons/BiCube";
import { useRouter } from "next/router";
import useIsAdmin from "hooks/useIsAdmin";
import { IoIosPeople, IoIosPerson } from "react-icons/io";
import { useSessionSummariesStore } from "@admin/components/sessionreview/SessionSummaryStore";
import useClickOutside from "@hooks/useClickOutside";
import DiscordLink from "@components/info/DiscordLink";
import { FaDesktop } from "react-icons/fa";
import useScreenOrientation from "@hooks/UseScreenOrientaion";

function TabBar() {
  const [openHamburger, setOpenHamburger] = useState<Boolean>();
  const [openNav, setOpenNav] = useState<Boolean>(false);
  const isAdmin = useIsAdmin();
  const { user, isSignedIn } = useUser();
  const logout = useLogout();
  const nav = useRouter();
  const clipDetailsVisible = useSessionSummariesStore(
    (s) => s.clipDetailsVisible
  );
  const trickMakerOpen = useSessionSummariesStore((s) => s.trickMakerOpen);
  // const nav = useNavigate();
  // const location = useLocation();
  const orientation = useScreenOrientation();
  const hamburger = useTransition<Boolean, {}>(openHamburger, {
    from: { opacity: 0, right: "-40vw" },
    enter: { opacity: 1, right: "0vw" },
    leave: { opacity: 0, right: "-40vw" },
    reverse: openHamburger,
    delay: 100,
    config: { tension: 280, friction: 40 },
    // onRest: () => setOpenHamburger(!openHamburger),
  });

  const navToggle = useSpring<{}>({
    from: { bottom: "-62px" },
    to: {
      bottom:
        nav.pathname.includes("/sessionReview") && orientation === "landscape"
          ? "-62px"
          : "0px",
    },
    reverse: openNav,
    config: {
      config: { tension: 40, friction: 12 },
    },
  });
  const height = useSpring<{}>({
    from: { height: window.innerWidth < 768 ? "0vh" : "10rem" },
    to: {
      height: window.innerWidth < 768 ? "35vh" : "10rem",
      bottom: orientation === "landscape" ? "0px" : "0px",
    },
    reverse: trickMakerOpen,
    config: {
      config: { tension: 40, friction: 12 },
    },
  });
  const ref = useClickOutside(() => setOpenHamburger(false));
  return (
    <>
      {nav?.pathname?.includes("sessionReview") && (
        <animated.div
          id="landscape-commandBar-root"
          className={`${
            orientation === "landscape" ? "absolute" : "invisible"
          }  right-0 top-0  h-[88vh] w-[19vw] overflow-hidden
                
            `}
        ></animated.div>
      )}
      {
        <animated.div
          id={"tabBar"}
          className={`fixed bottom-0  ${
            orientation === "landscape" ? "z-[1] select-none " : "z-[1014]"
          } w-[100%] `}
        >
          {nav?.pathname?.includes("sessionReview") && (
            <animated.div
              id="commandBar-root"
              style={height}
              className={`${
                orientation === "portrait" ? "block" : "hidden"
              }  z-[1] h-[35vh] w-[80vw] touch-none  md:h-[10rem]`}
            ></animated.div>
          )}
          <animated.div style={navToggle} className="relative">
            <div
              style={navToggle}
              className={`relative left-0 flex ${
                openNav ? "h-12" : "h-12"
              } z-[10] w-full place-content-center place-items-center gap-8 rounded-t-2xl bg-opacity-40 bg-gradient-to-b from-zinc-900 to-zinc-800 text-2xl text-zinc-300 backdrop-blur-md`}
            >
              {isAdmin && (
                <Link href="/admin">
                  <AdminLockIcon />
                </Link>
              )}
              <Link href="/home">
                <HomeIcon />
              </Link>
              <SignedIn>
                <Link id={"dashboard-target-tabBar"} href="/dash">
                  <FaDesktop />
                </Link>
              </SignedIn>
              <SignedOut>
                <div className="flex place-content-center place-items-center gap-2">
                  <SignInButton mode="modal" afterSignInUrl="/addSession">
                    <FaDesktop />
                  </SignInButton>
                </div>
              </SignedOut>
              {/* <Link href="/comboMaker">
              <ComboMakerBlueprintsvg className="h-10 w-10" fill="#ffffff" />
            </Link> */}
              {/* <Link id={"social-target-tabBar"} href="/social">
              <IoIosPeople size={30} color={"#d4d4d8"} />
            </Link> */}
              <Link id={"sandbox-target-tabBar"} href="/sandbox">
                <BiCube />
              </Link>
              <Link id={"theory-target"} href="/theory">
                <TheoryCap />
              </Link>
              <button
                onClick={() => setOpenHamburger(!openHamburger)}
                type="button"
              >
                <HamburgerMenu />
              </button>
            </div>
          </animated.div>
          {/* <button
          type="button"
          className={` ${
            openNav ? "" : " rotate-180"
          } relative left-0 z-[1001] flex h-4 w-[100%] place-content-center place-items-center bg-zinc-800 text-zinc-300`}
          onClick={() => {
            setOpenNav(!openNav);
          }}
        >
          ^^
        </button> */}
        </animated.div>
      }

      {/* Open Hamburger Menu Display */}
      {hamburger(
        (styles, hamburgerMenu) =>
          hamburgerMenu && (
            <animated.div
              id="side-Menu"
              style={styles}
              ref={ref}
              onClick={() => setOpenHamburger(!openHamburger)}
              className="fixed bottom-[5rem] z-[2000] rounded-l-xl"
            >
              <animated.div className="flex h-[40vh] max-w-[40vw] flex-col gap-3 rounded-l-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-3 text-sm text-white">
                <Link href="/about">About</Link>
                <Link href="/contribute">Contibute</Link>
                <Link href="/learnMore">Learn More</Link>
                <SignedIn>
                  <Link href="/userSettings" replace={true}>
                    User Settings
                  </Link>
                  {/* <Link href="/dash" replace={true}>
                      Dashboard
                    </Link> */}
                  <Link href="/experiments" replace={true}>
                    Experiments
                  </Link>
                </SignedIn>
                <Link href="/terms" replace={true}>
                  Glossary
                </Link>
                <SignedIn>
                  <button
                    className="absolute bottom-2 left-3"
                    onClick={() => {
                      logout();
                      nav.push("/home");
                    }}
                  >
                    Logout
                  </button>
                </SignedIn>
              </animated.div>
            </animated.div>
          )
      )}
    </>
  );
}

export default TabBar;
