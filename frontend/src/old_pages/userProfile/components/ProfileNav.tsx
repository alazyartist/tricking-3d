import React from "react";

const ProfileNav = ({ activeView, setActiveView }) => {
  return (
    <div className={"flex gap-4"}>
      <div
        className={`${
          activeView === "Stats" ? "text-teal-400" : ""
        } mb-2 w-fit rounded-md bg-zinc-900 p-1 px-4`}
        onClick={() => {
          setActiveView("Stats");
        }}
      >
        Overall Stats
      </div>
      <div
        className={`${
          activeView === "Sessions" ? "text-teal-400" : ""
        } mb-2 w-fit rounded-md bg-zinc-900 p-1 px-4`}
        onClick={() => {
          setActiveView("Sessions");
        }}
      >
        Session Stats
      </div>
    </div>
  );
};

export default ProfileNav;
