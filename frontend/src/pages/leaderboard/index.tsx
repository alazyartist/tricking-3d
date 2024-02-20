import UserList from "@components/UserList";
import dynamic from "next/dynamic";
import React from "react";
const Leaderboards = () => {
  return (
    <div className=" flex w-full flex-col place-items-center p-4 ">
      <div className="  w-[90vw] md:w-[60vw] ">
        <UserList />
        <div className="h-14 w-full" />
      </div>
    </div>
  );
};

export default Leaderboards;
