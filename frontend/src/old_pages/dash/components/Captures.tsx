//import { UserCard } from "./UserCard";
//import { useApiCreds } from "../../../hooks/useApiCreds";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../store/userStore";
import CapturedCard from "./CapturedCard";

const Captures = ({ dash }) => {
  const [captured, setCaptured] = useState<any>();
  const [capturedMe, setCapturedMe] = useState<any>();
  const userInfo = useUserStore((s) => s.userInfo);
  useEffect(() => {
    console.log(userInfo);
    setCaptured(userInfo.captures);
    setCapturedMe(userInfo.captured_me);
  }, [userInfo]);
  const [activeView, setActiveView] = useState(
    "My Captures" as "My Captures" | "Captured Me"
  );
  return (
    <div
      id="captureContainer"
      className={`${dash ? "pb-8  lg:pb-2" : ""} w-full`}
    >
      {/* My Captures */}
      <CaptureNav setActiveView={setActiveView} activeView={activeView} />
      {activeView === "My Captures" && (
        <RenderCaptures captureContent={captured} title="My Captures" />
      )}
      {/* Captured Me */}
      {activeView === "Captured Me" && (
        <RenderCaptures captureContent={capturedMe} title="Captured Me" />
      )}
    </div>
  );
};
const CaptureNav = ({ setActiveView, activeView }) => {
  return (
    <div className="flex w-full justify-between gap-2 pt-2">
      <button
        className={`${
          activeView === "My Captures" ? "text-indigo-400" : "text-zinc-500"
        } w-full rounded-md bg-zinc-800 p-2`}
        onClick={(e) => setActiveView("My Captures")}
      >
        My Captures
      </button>
      <button
        className={`${
          activeView === "Captured Me" ? "text-indigo-400" : "text-zinc-500"
        } w-full rounded-md bg-zinc-800 p-2`}
        onClick={(e) => setActiveView("Captured Me")}
      >
        Captured Me
      </button>
    </div>
  );
};

export default Captures;
const RenderCaptures = ({ captureContent, title }) => {
  const [captureGrid, setCaptureGrid] = useState(true);
  const nav = useRouter();
  return (
    <>
      <div
        id="myCaptures"
        className={`
          ${title === "My Captures" ? "text-zinc-200" : "text-zinc-300"}
          mt-4 max-h-[60vh] 
          w-full
          rounded-lg 
          bg-zinc-900 bg-opacity-70
        `}
      >
        {/* Container Header */}
        <div
          className={` rounded-t-lg  p-1 pl-2 text-xl font-bold`}
          onClick={() => setCaptureGrid(!captureGrid)}
        >
          {title}
        </div>

        {/* Container Content */}
        {/* ${captureGrid ? " flex flex-row" : " grid grid-cols-3"}  */}
        <div
          className={`
          minimalistScroll flex
            max-h-[50vh]
            flex-col
            gap-2
            overflow-auto
            p-2
          `}
        >
          {!!captureContent &&
            captureContent.map((c) => {
              c = title === "My Captures" ? c.capturedUser : c.user;
              return (
                <div
                  onClick={() => nav.push(`/userProfile/${c.uuid}`)}
                  key={c.uuid}
                >
                  <CapturedCard
                    userid={c.id}
                    name={c.first_name + " " + c.last_name}
                    src={
                      c.profilePic
                        ? `./images/${c.uuid}/${c.profilePic}`
                        : `./images/noimg.jpeg`
                    }
                    username={`${c.username}`}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
