"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";

const UserIcon = () => {
  const pathname = usePathname();
  const { profilePic, uuid, username } = useUserStore((s) => s.userInfo);
  const [src, setSrc] = useState("/images/noimg.jpeg");
  const [href, setHref] = useState("/home");

  useEffect(() => {
    if (uuid && profilePic) {
      setSrc(`/images/${uuid}/${profilePic}`);
      if (pathname.includes("/userProfile")) {
        setHref(`/userProfile/${uuid}`);
      } else {
        setHref("/home");
      }
    }
  }, [uuid, profilePic]);
  return (
    username !== null &&
    uuid !== (undefined || null) && (
      <Link
        href={href}
        className="fixed top-2.5 right-5 z-[1002] h-[50px] w-[50px] rounded-full border-2 border-zinc-300 border-opacity-20"
      >
        <img src={src} className="h-full w-full rounded-full" />
      </Link>
    )
  );
};

export default UserIcon;
