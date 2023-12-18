"use client";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";

const UserIcon = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const { profilePic, uuid } = useUserStore((s) => s.userInfo);
  const [href, setHref] = useState("/home");
  const { data: image } = trpc.userDB.findUserImageById.useQuery({
    uuid: uuid,
  });
  useEffect(() => {
    // console.log(pathname, uuid);
    if (uuid !== undefined && uuid !== null) {
      setHref(`/userProfile/${uuid}`);
    } else {
      setHref("/home");
    }
  }, [uuid, profilePic, pathname]);
  return (
    <Link
      href={href}
      className="fixed right-5 top-2.5 z-[1002] h-[50px] w-[50px] rounded-full border-2 border-zinc-300 border-opacity-20"
    >
      <img id="user-icon" src={image} className="h-full w-full rounded-full" />
    </Link>
  );
};

export default UserIcon;
