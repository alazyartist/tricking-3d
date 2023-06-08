//import { UserCard } from "./UserCard";
//import { useApiCreds } from "../../../hooks/useApiCreds";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../store/userStore";
import CapturedCard from "./CapturedCard";

const Captures = () => {
  const [captured, setCaptured] = useState<any>();
  const [capturedMe, setCapturedMe] = useState<any>();
  const userInfo = useUserStore((s) => s.userInfo);
  useEffect(() => {
    console.log(userInfo);
    setCaptured(userInfo.captures);
    setCapturedMe(userInfo.captured_me);
  }, [userInfo]);

  return (
    <div id="captureContainer" className=" w-full">
      {/* My Captures */}
      <RenderCaptures captureContent={captured} title="My Captures" />
      {/* Captured Me */}
      <RenderCaptures captureContent={capturedMe} title="Captured Me" />
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
        <div
          className={`
            ${captureGrid ? " flex flex-row" : " grid grid-cols-3"} 
            max-h-[50vh]
            gap-2
            overflow-auto
            p-2
          `}
        >
          {!!captureContent &&
            captureContent.map((c) => {
              c = c.capturedUser;
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
