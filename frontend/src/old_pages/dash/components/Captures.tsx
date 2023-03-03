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
    setCaptured(userInfo.Captured);
    setCapturedMe(userInfo.CapturedMe);
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
          ${title === "My Captures" ? "text-cyan-200" : "text-teal-200"}
          mt-4 max-h-[60vh] 
          w-full
          rounded-lg 
          bg-zinc-400 bg-opacity-30
        `}
      >
        {/* Container Header */}
        <div
          className={` rounded-t-lg bg-zinc-900 bg-opacity-70 p-1 pl-2 text-xl font-bold`}
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
            Object.keys(captureContent).map((key) => (
              <div
                onClick={() =>
                  nav.push(`/userProfile/${captureContent[key].uuid}`)
                }
                key={captureContent[key].uuid}
              >
                <CapturedCard
                  userid={captureContent[key].id}
                  name={
                    captureContent[key].first_name +
                    " " +
                    captureContent[key].last_name
                  }
                  src={
                    captureContent[key].profilePic
                      ? `./images/${captureContent[key].uuid}/${captureContent[key].profilePic}`
                      : `./images/noimg.jpeg`
                  }
                  username={`${captureContent[key].username}`}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
