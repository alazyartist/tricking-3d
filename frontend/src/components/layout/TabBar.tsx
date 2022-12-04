import React, { useEffect, useState } from "react";
import Link from "next/link";
import ComboMakerBlueprintsvg from "../../data/ComboMakerBlueprintsvg";
import { animated, useSpring, useTransition } from "react-spring";
import useLogout from "../../hooks/useLogout";
import { useUserStore } from "../../store/userStore";
import TheoryCap from "../../data/icons/TheoryCap";
import HamburgerMenu from "../../data/icons/HamburgerMenu";
import HomeIcon from "../../data/icons/HomeIcon";
import AdminLockIcon from "../../data/icons/AdminLockIcon";
import BiCube from "../../data/icons/BiCube";
import { useRouter } from "next/router";

function TabBar() {
  const [openHamburger, setOpenHamburger] = useState<Boolean>();
  const [openNav, setOpenNav] = useState<Boolean>(true);
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);
  const logout = useLogout();
  const nav = useRouter();
  // const nav = useNavigate();
  // const location = useLocation();
  const userInfo = useUserStore((s) => s.userInfo);
  useEffect(() => {
    if (
      userInfo?.uuid === "admin696-8c94-4ca7-b163-9alazyartist" ||
      userInfo?.uuid === "baf6a9c6-432f-4a08-8260-717249d5b71c" ||
      userInfo?.uuid === "admin696-8c94-4ca7-b163-969420Tohzt"
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userInfo]);
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
    from: { bottom: "-38px" },
    to: { bottom: "0px" },
    reverse: openNav,
    config: {
      config: { tension: 40, friction: 12 },
    },
  });

  return (
    <>
      <div className="fixed bottom-0 w-[100%] overflow-hidden ">
        <animated.div style={navToggle} className="relative">
          <button
            className="relative left-0 z-[1001] flex h-4 w-[100%] place-content-center place-items-center"
            onClick={() => {
              setOpenNav(!openNav);
            }}
          />
          <div
            style={navToggle}
            className="relative left-0 z-[100] flex h-12 w-full place-content-center place-items-center gap-8 rounded-t-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 text-2xl text-zinc-300"
          >
            {isAdmin && (
              <Link href="/admin">
                <AdminLockIcon />
              </Link>
            )}
            <Link href="/home">
              <HomeIcon />
            </Link>
            <Link href="/comboMaker">
              <ComboMakerBlueprintsvg className="h-10 w-10" fill="#ffffff" />
            </Link>
            <Link href="/sandbox">
              <BiCube />
            </Link>
            <Link href="/theory">
              <TheoryCap />
            </Link>
            <HamburgerMenu onClick={() => setOpenHamburger(!openHamburger)} />
          </div>
        </animated.div>
      </div>

      {/* Open Hamburger Menu Display */}
      {hamburger(
        (styles, hamburgerMenu) =>
          hamburgerMenu && (
            <animated.div
              id="side-Menu"
              style={styles}
              onClick={() => setOpenHamburger(!openHamburger)}
              className="fixed bottom-14 z-[100] rounded-l-xl"
            >
              <animated.div className="flex h-[40vh] max-w-[40vw] flex-col gap-3 rounded-l-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-3 text-sm text-white">
                <Link href="/about">About</Link>
                <Link href="/contribute">Contibute</Link>
                <Link href="/learnMore">Learn More</Link>
                <Link href="/userSettings" replace={true}>
                  User Settings
                </Link>
                <Link href="/dash" replace={true}>
                  Dashboard
                </Link>
                <button
                  className="absolute bottom-2 left-3"
                  onClick={() => {
                    logout();
                    nav.push("/home");
                  }}
                >
                  Logout
                </button>
              </animated.div>
            </animated.div>
          )
      )}
    </>
  );
}

export default TabBar;
