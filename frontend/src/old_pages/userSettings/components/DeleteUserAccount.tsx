import { useRouter } from "next/router";
import React, { useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import useLogout from "../../../hooks/useLogout";
import { useUserStore } from "../../../store/userStore";

const DeleteUserAccount = () => {
  const uuid = useUserStore((s) => s.userInfo?.uuid);
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const apiPrivate = useApiCreds();
  const logout = useLogout();
  const nav = useRouter();
  const handleDeleteUser = async () => {
    logout();
    apiPrivate.delete(`/user/${uuid}`);
    nav.push("/home");
  };

  return (
    <>
      <div
        onClick={() => setDeleteOpen(!deleteOpen)}
        className="neumorphic active:neumorphicIn absolute bottom-16 right-4 py-2 px-4 text-sm text-red-200"
      >
        Delete User Account
      </div>
      {deleteOpen && (
        <div
          className={`neumorphicIn flex flex-col place-content-center place-items-center p-10 text-base`}
        >
          {deleteCheck ? (
            <div className="absolute top-0 left-0 flex h-[100vh] w-[100vw] flex-col place-content-center place-items-center bg-red-500">
              <div className=" mb-4 rounded-xl text-center text-xl font-black">
                ARE YOU ABSOLUTELY SURE!
                <div className="p-2 text-sm font-medium text-zinc-300">
                  to undo this action you must contact an admin to restore your
                  account.
                </div>
              </div>
              <div className="neumorphic  grid grid-cols-2 gap-2 bg-opacity-80 p-4 text-xl ">
                <button
                  onClick={() => handleDeleteUser()}
                  className="neumorphic active:neumorphicIn bg-red-500 p-2 active:bg-red-500"
                >
                  Yes, Delete It All
                </button>
                <button
                  onClick={() => setDeleteCheck(false)}
                  className="neumorphic active:neumorphicIn  bg-emerald-500 p-2 active:bg-emerald-500"
                >
                  No, I was Kidding!!
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setDeleteCheck(true)}
              className="neumorphic active:neumorphicIn bg-red-500 bg-opacity-80 p-4 text-xl active:bg-red-500"
            >
              DELETE
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default DeleteUserAccount;
