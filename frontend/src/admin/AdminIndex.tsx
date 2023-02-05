"use client";
import useIsAdmin from "hooks/useIsAdmin";
import React from "react";
import { useUserStore } from "../store/userStore";
import AdminDisplay from "./components/AdminDisplay";

const AdminIndex = () => {
  const userInfo = useUserStore((s) => s.userInfo);
  const isAdmin = useIsAdmin();
  return (
    <>
      {isAdmin ? (
        <div className="no-scrollbar flex h-[100vh] w-[100vw] flex-col place-content-start place-items-center gap-4 overflow-auto font-inter font-bold text-zinc-300">
          <div className="text-center text-3xl">
            Welcome {userInfo?.username}. Good Luck Today
          </div>
          <AdminDisplay />
        </div>
      ) : (
        <div className="col flex h-[100vh] w-[100vw] place-content-center place-items-center bg-red-500 font-inter text-5xl font-bold text-zinc-900">
          Uhh. You aren't an admin buddy. What are you trying to do?
        </div>
      )}
    </>
  );
};

export default AdminIndex;
