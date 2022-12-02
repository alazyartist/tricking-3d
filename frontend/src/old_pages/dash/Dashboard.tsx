import React, { useState } from "react";
import UserCard from "./components/UserCard";
import useLogout from "../../hooks/useLogout";
import { useUserStore } from "@store/userStore";
import ProfileCode from "./components/ProfileCode";
import Captures from "./components/Captures";
import { FaQrcode } from "react-icons/fa";

function Dashboard() {
  const user = useUserStore((s) => s.user);
  const { profilePic, uuid } = useUserStore((s) => s.userInfo);
  const logout = useLogout();

  return (
    <div className="mt-14 flex flex-col place-content-center place-items-center gap-2 text-zinc-400">
      <div className="p-4">
        Welcome <span className="font-semibold text-zinc-300">{user}</span>
      </div>
      {/* {profileCodeOpen ? (
				<ProfileCode />
			) : ( */}
      <>
        <UserCard
          edit
          src={
            profilePic !== null
              ? `./images/${uuid}/${profilePic}`
              : "./images/noimg.jpeg"
          }
        />
        <Captures />
      </>
      {/* )} */}

      {/* QR Code Generator and Reader
			<div
				onClick={() => setProfileCodeOpen(!profileCodeOpen)}
				className='absolute top-20 left-5 flex place-items-center gap-2'>
				<FaQrcode /> {!profileCodeOpen ? "Capture" : "Close"}
			</div> */}

      <button className="fixed right-5 bottom-14" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
