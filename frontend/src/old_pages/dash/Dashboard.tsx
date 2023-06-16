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

function Dashboard() {
  const logout = useLogout();
  const user = useUserStore((s) => s.user);
  const { profilePic, uuid } = useUserStore((s) => s.userInfo);

  return (
    <div className="mt-4 flex flex-col place-content-center place-items-center gap-2 text-zinc-400">
      <div className="p-4">
        Welcome <span className="font-semibold text-zinc-300">{user}</span>
      </div>
      <>
        <UserCard
          edit
          src={
            profilePic !== null
              ? `./images/${uuid}/${profilePic}`
              : "./images/noimg.jpeg"
          }
        />
        <div
          className="
          m-auto max-h-[83vh]
          w-[98vw] max-w-[600px] rounded-xl
          bg-zinc-900 bg-opacity-30
          p-4 
        "
        >
          <SessionList uuid={uuid} />
          <ClaimTricks user_id={uuid} />
          <Captures />
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
