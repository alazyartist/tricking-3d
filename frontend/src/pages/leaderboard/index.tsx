import UserList from "@components/UserList";
import dynamic from "next/dynamic";
import React from "react";
const Leaderboards = () => {
  return (
    <div className="flex w-full flex-col place-items-center p-4 ">
      <div className="w-full max-w-[1300px] ">
        <UserList />
      </div>
    </div>
  );
};

export default Leaderboards;
