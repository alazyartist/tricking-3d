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
    console.log(userInfo)
    setCaptured(userInfo.Captured)
    setCapturedMe(userInfo.Captured);
  }, [userInfo]);

  const RenderCaptures = (props) => {
    const [captureGrid, setCaptureGrid] = useState(true)
    const captureContent = props.captureConten
    let captureTitle = props.title
    return <>
      <div id="myCaptures"
        className={`
          ${captureContent === captured ? "border-cyan-300" : "border-teal-200"}
          w-full h-full py-1 p-2 
          border-2 rounded-md order-2
          flex flex-col
          text-zinc-300
        `}
      >
        <div className="mb-2 text-zinc-300" onClick={() => setCaptureGrid(!captureGrid)} >
          {captureTitle}
        </div>
        <div className={`flex ${captureGrid ? " flex-row" : " flex-wrap flex-col-3 max-h-[50vh] justify-center"} overflow-x-auto`}>
          {!!captureContent &&
            Object.keys(captureContent).map((key) => (
              <div
                onClick={() => nav.push(`/userProfile/${captureContent[key].uuid}`)}
                key={captureContent[key].uuid}
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
      <RenderCaptures captureConten={captured} title="My Captures" />
      {/* Captured Me */}
      <RenderCaptures captureConten={capturedMe} title="Captured Me"/>
    </div>
  );
};

export default Captures;
