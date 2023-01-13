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
  const nav = useRouter();
  useEffect(() => {
    console.log(userInfo);
    setCaptured(userInfo.Captured);
    setCapturedMe(userInfo.CapturedMe);
  }, [userInfo]);

  const RenderCaptures = (props) => {
    const captureContent = props.captureConten
    return <>
      <div id="myCaptures"
        className={`
          ${captureContent === captured ? "border-cyan-300" : "border-teal-200"} 
          border-2 w-full py-1 p-2 rounded-md order-2
          flex flex-col
        `}
      >
        <div className="text-zinc-300">
          Your Captures
        </div>
        <div className="flex flex-row overflow-x-auto">
          {!!captureContent &&
            Object.keys(captureContent).map((key) => (
              <div
                onClick={() => nav.push(`/userProfile/${captureContent[key].uuid}`)}
                key={`${captureContent[key].username}`}
                className="flex flex-row gap-3"
              >
                <CapturedCard
                  name={
                    captureContent[key].first_name + " " + captureContent[key].last_name
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
  }

  return (
    <div
      id="captureContainer"
      className="w-full pt-4 flex flex-col gap-4 place-items-center font-inter"
    >
      {/* My Captures */}
      <RenderCaptures captureConten={captured} />
      {/* Captured Me */}
      <RenderCaptures captureConten={capturedMe} />
    </div>
  );
};

export default Captures;
