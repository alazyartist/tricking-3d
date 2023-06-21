import RadarChart from "@components/d3/RadarChartAI";
import CapturesPage from "./components/CapturesPage";
import { FaQrcode } from "react-icons/fa";
import React, { useState } from "react";
import UserCard from "./components/UserCard";
import useLogout from "../../hooks/useLogout";
import { useUserStore } from "@store/userStore";
import Captures from "./components/Captures";
import useGetTricks from "api/useGetTricks";
import UserList from "@components/UserList";
import SessionList from "./components/SessionList";
import ClaimTricks from "@old_pages/claimtricks/ClaimTricks";
import Link from "next/link";

function Dashboard() {
  const logout = useLogout();
  const user = useUserStore((s) => s.user);
  const { profilePic, uuid } = useUserStore((s) => s.userInfo);

  return (
    <div className="my-4 flex flex-col place-content-center place-items-center gap-2 text-zinc-400">
      <div className="p-4">
        Welcome <span className="font-semibold text-zinc-300">{user}</span>
      </div>
      <>
        <Link href={`userProfile/${uuid}`}>
          <UserCard
            edit
            src={
              profilePic !== null
                ? `./images/${uuid}/${profilePic}`
                : "./images/noimg.jpeg"
            }
          />
        </Link>
        <div
          className="
          m-auto max-h-[83vh] w-[98vw] max-w-[600px]
          rounded-xl bg-zinc-900 bg-opacity-30 p-4
          lg:grid lg:max-w-[90vw] lg:grid-cols-2
          lg:gap-2 
        "
        >
          <SessionList uuid={uuid} />
          <ClaimTricks user_id={uuid} />
          <Captures dash />
        </div>
      </>

      {/* <UserList /> */}
      {/* <button className="fixed right-5 bottom-14" onClick={() => logout()}>
        Logout
      </button> */}
    </div>
  );
}

export default Dashboard;
