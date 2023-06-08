import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { UserProfile } from "@clerk/nextjs";
import ChangePassword from "./components/ChangePassword";
import DeleteUserAccount from "./components/DeleteUserAccount";

const UserSettings = () => {
  const router = useRouter();
  useEffect(() => {
    console.log(router);
  }, [router]);
  return (
    <div className=" flex h-[100vh] w-full flex-col place-content-start place-items-center gap-2 bg-zinc-800 bg-opacity-40 font-inter text-zinc-300 backdrop-blur-xl">
      <div className=" sticky top-0 flex w-full gap-2 p-2 pt-8 text-3xl font-bold">
        <Link href={`${"home"}`}>
          <IoIosArrowBack />
        </Link>
        <div>User Settings</div>
      </div>
      <UserProfile />
      {/* <ChangePassword /> */}
      {/* <DeleteUserAccount /> */}
    </div>
  );
};

export default UserSettings;
