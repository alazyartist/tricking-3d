"use client";
import HomeIcon from "@data/icons/HomeIcon";
import useClickOutside from "@hooks/useClickOutside";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { IoIosDesktop, IoIosPerson, IoIosSettings } from "react-icons/io";
import { useUserStore } from "../../store/userStore";

const UserIcon = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const { profilePic, uuid } = useUserStore((s) => s.userInfo);
  const [href, setHref] = useState("/home");
  const { data: image } = trpc.userDB.findUserImageById.useQuery({
    uuid: uuid,
  });
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  useEffect(() => {
    // console.log(pathname, uuid);
    if (uuid !== undefined && uuid !== null) {
      setHref(`/userProfile/${uuid}`);
    } else {
      setHref("/home");
    }
  }, [uuid, profilePic, pathname]);
  return (
    <>
      <button
        onClick={() => {
          setQuickMenuOpen((q) => !q);
        }}
        // href={href}
        className="fixed right-5 top-2.5 z-[1002] h-[50px] w-[50px] rounded-full border-2 border-zinc-300 border-opacity-20"
      >
        <img
          id="user-icon"
          src={image}
          className="h-full w-full rounded-full"
        />
      </button>
      <QuickMenu
        uuid={uuid}
        setQuickMenuOpen={setQuickMenuOpen}
        quickMenuOpen={quickMenuOpen}
      />
    </>
  );
};

export default UserIcon;
type optionsProps = {
  title: string;
  href: string;
  icon: React.ReactNode;
};
const QuickMenu = ({ setQuickMenuOpen, quickMenuOpen, uuid }) => {
  const menuref = useClickOutside(() => setQuickMenuOpen(false));
  const options: optionsProps[] = [
    { icon: <HomeIcon />, title: "Home", href: "/home" },
    { icon: <IoIosPerson />, title: "Profile", href: `/userProfile/${uuid}` },
    { icon: <IoIosDesktop />, title: "Dash", href: "/dash" },
    { icon: <IoIosSettings />, title: "Settings", href: "/userSettings" },
  ];
  return (
    !!quickMenuOpen && (
      <>
        <div
          ref={menuref}
          id="quick-menu"
          className="fixed right-5 top-20 z-[1014] w-[90vw] rounded-md bg-zinc-900 p-4 text-zinc-300 md:w-[30vw]"
        >
          <div className="flex w-full flex-col gap-3">
            {options.map((opt) => (
              <Link
                key={opt.title}
                onClick={() => setQuickMenuOpen(false)}
                href={opt.href}
              >
                <div className="flex place-items-center gap-3">
                  {opt.icon}
                  <p className="bg-zinc-900 text-xl">{opt.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[1000] h-[100vh] w-[100vw] bg-zinc-800 bg-opacity-30 backdrop-blur-md" />
      </>
    )
  );
};
