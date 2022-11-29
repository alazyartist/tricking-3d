import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
// import { Link, useLocation } from "react-router-dom";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
import { useUserStore } from "../../store/userStore";

const UserIcon = () => {
  const pathname = usePathname();
  if (typeof window === "undefined") return;
  const { profilePic, uuid, username } = useUserStore((s) => s.userInfo);
  // const location = useLocation();
  return (
    username !== null &&
    uuid !== undefined && (
      <Link
        href={
          pathname.includes("/userProfile") ? "/home" : `/userProfile/${uuid}`
        }
        className="fixed top-2.5 right-5 z-[1002] h-[50px] w-[50px] rounded-full border-2 border-zinc-300 border-opacity-20"
      >
        <img
          src={
            profilePic ? `/images/${uuid}/${profilePic}` : `/images/noimg.jpeg`
          }
          className="h-full w-full rounded-full"
        />
      </Link>
    )
  );
};

export default UserIcon;
