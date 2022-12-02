"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
import { useUserStore } from "../../store/userStore";

const UserIcon = () => {
  const router = useRouter();
  const { profilePic, uuid } = useUserStore((s) => s.userInfo);
  const [src, setSrc] = useState("/images/noimg.jpeg");
  const [href, setHref] = useState("/home");
  useEffect(() => {
    if (uuid && profilePic) {
      setSrc(`/images/${uuid}/${profilePic}`);
      if (router.pathname.includes("/userProfile")) {
        setHref(`/userProfile/${uuid}`);
      } else {
        setHref("/home");
      }
    }
  }, [uuid, profilePic]);
  return (
    <Link
      href={href}
      className="fixed top-2.5 right-5 z-[1002] h-[50px] w-[50px] rounded-full border-2 border-zinc-300 border-opacity-20"
    >
      <img src={src} className="h-full w-full rounded-full" />
    </Link>
  );
};

export default UserIcon;
