// import RadarChart from "@components/d3/RadarChartAI";
import CapturesPage from "./components/CapturesPage";
import { FaQrcode } from "react-icons/fa";
import React, { useState } from "react";
import UserCard from "./components/UserCard";
import useLogout from "../../hooks/useLogout";
import { useUserStore } from "@store/userStore";
import Captures from "./components/Captures";
import useGetTricks from "api/useGetTricks";
import UserList from "@components/UserList";

function Dashboard() {
  const logout = useLogout();
  const user = useUserStore((s) => s.user);
  const { profilePic, uuid } = useUserStore((s) => s.userInfo);
  {/* 
    const { data: trickData } = useGetTricks();
    console.log(trickData); 
  */}
  return (
    <div className="mt-14 flex flex-col place-content-center place-items-center gap-2 text-zinc-400">
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
          p-4 m-auto
          max-h-[83vh] w-[98vw] max-w-[600px]
          bg-opacity-30 rounded-xl
          bg-zinc-900 
        "
      >
        <Captures />
        </div>
      </>
      {/* {trickData && <RadarChart data={trickData} />} */}
      <UserList />
      <button className="fixed right-5 bottom-14" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
