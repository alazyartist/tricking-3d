import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
import { useUserStore } from "../../store/userStore";

const UserIcon = () => {
  const router = useRouter();
  const { profilePic, uuid, username } = useUserStore((s) => s.userInfo);
  // const location = useLocation();
  return (
    username !== null &&
    uuid !== undefined && (
      <Link
        href={
          router.pathname.includes("/userProfile")
            ? "/home"
            : `/userProfile/${uuid}`
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
